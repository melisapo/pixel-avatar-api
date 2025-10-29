using System.Drawing;
using pixel_avatar.Models;
using pixel_avatar.Utils;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace pixel_avatar.Services;

public class AvatarService(IWebHostEnvironment env)
{
    private const int BaseCount = 4;
    private const int FaceCount = 5;
    private const int HairCount = 8;
    private const int AccessoriesCount = 1;
    private const int ClothesCount = 5;

    //private readonly string _assetsPath = Path.Combine(env.ContentRootPath, "Assets");
    // Ruta temporal
    private const string AssetsPath = "/home/melissa/Programaxion/pixel-avatar/PixelAvatar/Assets";

    /// <summary>
    /// Genera las características del avatar a partir del string de entrada.
    /// </summary>
    public static AvatarCharacteristics GenerateCharacteristics(string input)
    {
        var hash = HashUtils.ToMd5(input);

        var baseIndex = HashUtils.SliceToRange(hash, 0, 3, BaseCount);
        var faceIndex = HashUtils.SliceToRange(hash, 3, 3, FaceCount);
        var hairIndex = HashUtils.SliceToRange(hash, 6, 3, HairCount);
        var accessoriesIndex = HashUtils.SliceToRange(hash, 9, 3, AccessoriesCount);
        var clothesIndex = HashUtils.SliceToRange(hash, 12, 3, ClothesCount);

        // 80% de probabilidad de tener accesorio
        var hasAccessory = (accessoriesIndex % 10) < 8;

        return new AvatarCharacteristics(
            @base: baseIndex,
            face: faceIndex,
            hair: hairIndex,
            accessories: hasAccessory ? accessoriesIndex : null,
            clothes: clothesIndex
        );
    }

    /// <summary>
    /// Ensambla las partes y genera el png con el tamano dado
    /// </summary>
    public static async Task<byte[]> GenerateAvatarImageAsync(AvatarCharacteristics avatar, int size = 32)
    {
        var layers = new List<string>
        {
            Path.Combine(AssetsPath, "bases", $"{avatar.Base}.png"),
            Path.Combine(AssetsPath, "faces", $"{avatar.Face}.png"),
            Path.Combine(AssetsPath, "hairs", $"{avatar.Hair}.png"),
            Path.Combine(AssetsPath, "clothes", $"{avatar.Clothes}.png")
        };

        if (avatar.Accessories is not null)
        {
            layers.Add(Path.Combine(AssetsPath, "accessories", $"{avatar.Accessories}.png"));
        }

        using var finalImage = new Image<Rgba32>(size, size, new Rgba32(0, 0, 0, 0)); // transparente real

        var graphicsOptions = new GraphicsOptions
        {
            BlendPercentage = 1f,
            AlphaCompositionMode = PixelAlphaCompositionMode.SrcOver
        };

        foreach (var layerPath in layers.Where(File.Exists))
        {
            using var layer = await Image.LoadAsync<Rgba32>(layerPath);
            layer.Mutate(x => x.Resize(size, size));
            finalImage.Mutate(x => x.DrawImage(layer, graphicsOptions));
        }


        using var ms = new MemoryStream();
        await finalImage.SaveAsPngAsync(ms);
        return ms.ToArray();
    }
}