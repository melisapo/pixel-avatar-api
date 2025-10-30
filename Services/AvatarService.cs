using System.Drawing;
using pixel_avatar.Models;
using pixel_avatar.Utils;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace pixel_avatar.Services;

public class AvatarService
{
    private readonly string _assetsPath;
    private static readonly Dictionary<string, int> PartCounts = new();
    public AvatarService(IWebHostEnvironment env)
    {
        _assetsPath = Path.Combine(Directory.GetCurrentDirectory(), "Assets");
        
        PartCounts["base"] = CountAssets("bases");
        PartCounts["face"] = CountAssets("faces");
        PartCounts["hair"] = CountAssets("hairs");
        PartCounts["clothes"] = CountAssets("clothes");
        PartCounts["accessories"] = CountAssets("accessories");
    }
    
    private int CountAssets(string folder)
    {
        var path = Path.Combine(_assetsPath, folder);
        return !Directory.Exists(path) ? 0 :
            Directory.GetFiles(path, "*.png").Length;
    }

    /// <summary>
    /// Genera las características del avatar a partir del string de entrada.
    /// </summary>
    public static AvatarCharacteristics GenerateCharacteristics(string input)
    {
        var hash = HashUtils.ToMd5(input);

        var baseIndex = HashUtils.SliceToRange(hash, 0, 4, PartCounts["base"]);
        var faceIndex = HashUtils.SliceToRange(hash, 4, 4, PartCounts["face"]);
        var hairIndex = HashUtils.SliceToRange(hash, 8, 4, PartCounts["hair"]);
        var clothesIndex = HashUtils.SliceToRange(hash, 12, 4, PartCounts["clothes"]);
        var accessoriesIndex = HashUtils.SliceToRange(hash, 16, 4, PartCounts["accessories"]);
        
        // 80% de probabilidad de tener accesorio
        var hasAccessory = (accessoriesIndex % 10) < 8;

        return new AvatarCharacteristics(
            @base: baseIndex,
            face: faceIndex,
            hair: hairIndex,
            clothes: clothesIndex,
            accessories: hasAccessory ? accessoriesIndex : null
        );
    }

    /// <summary>
    /// Ensambla las partes y genera el png con el tamano dado
    /// </summary>
    public async Task<byte[]> GenerateAvatarImageAsync(AvatarCharacteristics avatar, int size = 32)
    {
        var layers = new List<string>
        {
            Path.Combine(_assetsPath, "bases", $"{avatar.Base}.png"),
            Path.Combine(_assetsPath, "faces", $"{avatar.Face}.png"),
            Path.Combine(_assetsPath, "hairs", $"{avatar.Hair}.png"),
            Path.Combine(_assetsPath, "clothes", $"{avatar.Clothes}.png")
        };

        if (avatar.Accessories is not null)
        {
            layers.Add(Path.Combine(_assetsPath, "accessories", $"{avatar.Accessories}.png"));
        }

        using var finalImage = new Image<Rgba32>(size, size, new Rgba32(0, 0, 0, 0));

        var graphicsOptions = new GraphicsOptions
        {
            BlendPercentage = 1f,
            AlphaCompositionMode = PixelAlphaCompositionMode.SrcOver
        };

        foreach (var layerPath in layers.Where(File.Exists))
        {
            using var layer = await Image.LoadAsync<Rgba32>(layerPath);
            layer.Mutate(x => x.Resize(size, size));
            finalImage.Mutate(x => { x.DrawImage(layer, graphicsOptions); });
        }


        using var ms = new MemoryStream();
        await finalImage.SaveAsPngAsync(ms);
        return ms.ToArray();
    }
}