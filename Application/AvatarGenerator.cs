using System.Globalization;
using Microsoft.Extensions.Caching.Memory;
using pixel_avatar.Application.Interfaces;
using pixel_avatar.Infrastructure;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace pixel_avatar.Application;

public class AvatarGenerator(FileSystemLayerRepository repo, IMemoryCache cache) : IAvatarService
{
    private static readonly Dictionary<string, Rgba32> PredefinedColors = new()
    {
        ["blue-light"]   = new Rgba32(196, 231, 255),
        ["blue-dark"]    = new Rgba32(14,  15,  66),
        ["green-light"]  = new Rgba32(203, 255, 196),
        ["green-dark"]   = new Rgba32(14,  66,  17),
        ["yellow-light"] = new Rgba32(252, 255, 196),
        ["yellow-dark"]  = new Rgba32(66, 54,  14),
        ["red-light"]    = new Rgba32(255, 208, 196),
        ["red-dark"]     = new Rgba32(66, 14,  14),
        ["pink-light"]   = new Rgba32(255, 196, 233),
        ["pink-dark"]    = new Rgba32(66, 14,  51),
        ["purple-light"] = new Rgba32(233, 196, 255),
        ["purple-dark"]  = new Rgba32(50,  14,  66),
        ["cyan-light"]   = new Rgba32(196, 255, 255),
        ["cyan-dark"]    = new Rgba32(14,  66,  66),
        ["white"]        = new Rgba32(255, 255, 255),
        ["black"]        = new Rgba32(0,   0,   0),
    };
    
    private static Rgba32? ParseBackground(string? bg)
    {
        if (string.IsNullOrWhiteSpace(bg))
            return null;

        if (PredefinedColors.TryGetValue(bg.ToLower(), out var predefined))
            return predefined;

        // Hex con o sin #
        var hex = bg.TrimStart('#');
        if (hex.Length == 6 &&
            byte.TryParse(hex[0..2], NumberStyles.HexNumber, null, out var r) &&
            byte.TryParse(hex[2..4], NumberStyles.HexNumber, null, out var g) &&
            byte.TryParse(hex[4..6], NumberStyles.HexNumber, null, out var b))
            return new Rgba32(r, g, b);

        return null;
    }
    
    public AvatarCharacteristics GenerateCharacteristics(string input)
    {
        var hash = HashUtils.ToMd5(input);

        var baseIndex = HashSlice.ToRange(hash, 0,  4, repo.GetCount("base"));
        var faceIndex = HashSlice.ToRange(hash, 4,  4, repo.GetCount("face"));
        var hairIndex = HashSlice.ToRange(hash, 8,  4, repo.GetCount("hair"));
        var clothesIndex     = HashSlice.ToRange(hash, 12, 4, repo.GetCount("clothes"));
        var accessoriesIndex = HashSlice.ToRange(hash, 16, 4, repo.GetCount("accessories"));

        var hasAccessory = (accessoriesIndex % 10) < 4; //40% prob de que tenga accesorio

        return new AvatarCharacteristics(
            @base:       baseIndex,
            face:        faceIndex,
            hair:        hairIndex,
            clothes:     clothesIndex,
            accessories: hasAccessory ? accessoriesIndex : null
        );
    }

    public async Task<byte[]> GenerateAvatarImageAsync(AvatarCharacteristics avatar, int size = 32, string? bg = null)
    {
        var cacheKey = $"avatar_{avatar.Base}_{avatar.Face}_{avatar.Hair}" +
                       $"_{avatar.Clothes}_{avatar.Accessories}_{size}_{bg ?? "transparent"}";

        if (cache.TryGetValue(cacheKey, out byte[]? cached))
            return cached!;

        var image = await BuildImageAsync(avatar, size, bg);

        cache.Set(cacheKey, image, TimeSpan.FromHours(1));
        return image;
    }

    private async Task<byte[]> BuildImageAsync(AvatarCharacteristics avatar, int size, string? bg)
    {
        using var finalImage = new Image<Rgba32>(size, size, new Rgba32(0, 0, 0, 0));

        var bgColor = ParseBackground(bg);
        if (bgColor is not null)
            finalImage.Mutate(x => x.BackgroundColor(bgColor.Value));

        var layers = new List<string>
        {
            repo.GetPath("bases",   avatar.Base),
            repo.GetPath("hairs",   avatar.Hair),
            repo.GetPath("clothes", avatar.Clothes),
            repo.GetPath("faces",   avatar.Face)
        };

        if (avatar.Accessories is not null)
            layers.Add(repo.GetPath("accessories", avatar.Accessories.Value));

        var graphicsOptions = new GraphicsOptions
        {
            BlendPercentage      = 1f,
            AlphaCompositionMode = PixelAlphaCompositionMode.SrcOver
        };

        foreach (var path in layers.Where(File.Exists))
        {
            using var layer = await Image.LoadAsync<Rgba32>(path);
            
            layer.Mutate(x => x.Resize(new ResizeOptions
            {
                Size = new Size(size, size),
                Sampler = KnownResamplers.NearestNeighbor,
                Mode = ResizeMode.Stretch
            }));
            
            finalImage.Mutate(x => x.DrawImage(layer, graphicsOptions));
        }

        using var ms = new MemoryStream();
        await finalImage.SaveAsPngAsync(ms);
        return ms.ToArray();
    }
}