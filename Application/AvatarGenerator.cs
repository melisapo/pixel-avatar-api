using Microsoft.Extensions.Caching.Memory;
using pixel_avatar.Application.Interfaces;
using pixel_avatar.Infrastructure;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace pixel_avatar.Application;

public class AvatarGenerator(FileSystemLayerRepository repo, IMemoryCache cache) : IAvatarService
{
    public AvatarCharacteristics GenerateCharacteristics(string input)
    {
        var hash = HashUtils.ToMd5(input);

        var baseIndex = HashSlice.ToRange(hash, 0,  4, repo.GetCount("base"));
        var faceIndex = HashSlice.ToRange(hash, 4,  4, repo.GetCount("face"));
        var hairIndex = HashSlice.ToRange(hash, 8,  4, repo.GetCount("hair"));
        var clothesIndex     = HashSlice.ToRange(hash, 12, 4, repo.GetCount("clothes"));
        var accessoriesIndex = HashSlice.ToRange(hash, 16, 4, repo.GetCount("accessories"));

        var hasAccessory = (accessoriesIndex % 10) < 8;

        return new AvatarCharacteristics(
            @base:       baseIndex,
            face:        faceIndex,
            hair:        hairIndex,
            clothes:     clothesIndex,
            accessories: hasAccessory ? accessoriesIndex : null
        );
    }

    public async Task<byte[]> GenerateAvatarImageAsync(AvatarCharacteristics avatar, int size = 32)
    {
        var cacheKey = $"avatar_{avatar.Base}_{avatar.Face}_{avatar.Hair}" +
                       $"_{avatar.Clothes}_{avatar.Accessories}_{size}";

        if (cache.TryGetValue(cacheKey, out byte[]? cached))
            return cached!;

        var image = await BuildImageAsync(avatar, size);

        cache.Set(cacheKey, image, TimeSpan.FromHours(1));
        return image;
    }

    private async Task<byte[]> BuildImageAsync(AvatarCharacteristics avatar, int size)
    {
        var layers = new List<string>
        {
            repo.GetPath("bases",   avatar.Base),
            repo.GetPath("faces",   avatar.Face),
            repo.GetPath("hairs",   avatar.Hair),
            repo.GetPath("clothes", avatar.Clothes),
        };

        if (avatar.Accessories is not null)
            layers.Add(repo.GetPath("accessories", avatar.Accessories.Value));

        var graphicsOptions = new GraphicsOptions
        {
            BlendPercentage       = 1f,
            AlphaCompositionMode  = PixelAlphaCompositionMode.SrcOver
        };

        using var finalImage = new Image<Rgba32>(size, size, new Rgba32(0, 0, 0, 0));

        foreach (var path in layers.Where(File.Exists))
        {
            using var layer = await Image.LoadAsync<Rgba32>(path);
            layer.Mutate(x => x.Resize(size, size));
            finalImage.Mutate(x => x.DrawImage(layer, graphicsOptions));
        }

        using var ms = new MemoryStream();
        await finalImage.SaveAsPngAsync(ms);
        return ms.ToArray();
    }
}