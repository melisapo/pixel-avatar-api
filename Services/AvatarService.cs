using System.Drawing;
using pixel_avatar.Models;
using pixel_avatar.Utils;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using Color = SixLabors.ImageSharp.Color;

namespace pixel_avatar.Services;

public class AvatarService
{
    private const int BaseCount = 5;
    private const int FaceCount = 5;
    private const int HairCount = 6;
    private const int AccessoriesCount = 5;
    private const int ClothesCount = 5;

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
    /// Genera un PNG representando el avatar (por ahora de color distinto según Base).
    /// </summary>
    public static async Task<byte[]> GenerateAvatarImageAsync(AvatarCharacteristics avatar, int size = 32)
    {
        // Imagen cuadrada de fondo aleatorio según la base
        using var image = new Image<Rgba32>(size, size);

        var color = GetColorFromIndex(avatar.Base);
        image.Mutate(x => x.BackgroundColor(color));

        using var ms = new MemoryStream();
        await image.SaveAsPngAsync(ms);
        return ms.ToArray();
    }

    private static Color GetColorFromIndex(int index)
    {
        var colors = new[]
        {
            Color.Aqua,
            Color.Blue,
            Color.Red,
            Color.Orange,
            Color.Green,
        };

        return colors[index % colors.Length];
    }
}
/* using pixel_avatar.Models;
   using SixLabors.ImageSharp;
   using SixLabors.ImageSharp.PixelFormats;
   using SixLabors.ImageSharp.Processing;
   
   namespace pixel_avatar.Services;
   
   public class AvatarService
   {
       private readonly string _assetsPath;
   
       public AvatarService(IWebHostEnvironment env)
       {
           // Ruta absoluta al directorio /Assets
           _assetsPath = Path.Combine(env.ContentRootPath, "Assets");
       }
   
       public async Task<byte[]> GenerateAvatarImageAsync(AvatarCharacteristics avatar, int size = 32)
       {
           // Cargar las capas en orden
           var layers = new List<string>
           {
               Path.Combine(_assetsPath, "base", $"{avatar.Base}.png"),
               Path.Combine(_assetsPath, "face", $"{avatar.Face}.png"),
               Path.Combine(_assetsPath, "hair", $"{avatar.Hair}.png"),
               Path.Combine(_assetsPath, "clothes", $"{avatar.Clothes}.png")
           };
   
           if (avatar.Accessories is not null)
           {
               layers.Add(Path.Combine(_assetsPath, "accessories", $"{avatar.Accessories}.png"));
           }
   
           // Composición de imagen
           using var finalImage = new Image<Rgba32>(size, size);
   
           foreach (var layerPath in layers)
           {
               if (!File.Exists(layerPath))
                   continue; // si no existe, la saltamos
   
               using var layer = await Image.LoadAsync<Rgba32>(layerPath);
               layer.Mutate(x => x.Resize(size, size)); // ajustar tamaño
               finalImage.Mutate(x => x.DrawImage(layer, 1f));
           }
   
           // Guardar en memoria como PNG
           using var ms = new MemoryStream();
           await finalImage.SaveAsPngAsync(ms);
           return ms.ToArray();
       }
   }
   */