using System.Security.Cryptography;
using System.Text;

namespace pixel_avatar.Utils;

public static class HashUtils
{
    /// <summary>
    /// Convierte un string (por ejemplo "johndoe") en un hash MD5 hexadecimal.
    /// </summary>
    public static string ToMd5(string input)
    {
        var inputBytes = Encoding.UTF8.GetBytes(input);
        var hashBytes = MD5.HashData(inputBytes);

        return Convert.ToHexStringLower(hashBytes);
    }

    /// <summary>
    /// Convierte un string hexadecimal (por ejemplo "1a3") en número entero.
    /// </summary>
    private static int FromHex(string hex)
    {
        return int.Parse(hex, System.Globalization.NumberStyles.HexNumber);
    }

    /// <summary>
    /// Toma una parte del hash y la reduce a un rango (0..max-1).
    /// Ejemplo: SliceToRange(hash, 0, 3, 5) -> número entre 0 y 4
    /// </summary>
    public static int SliceToRange(string hash, int start, int length, int max)
    {
        if (max == 0)
        {
            Console.WriteLine("Max length is 0.");
            return 0;
        }
        else
        {
            var slice = hash.Substring(start, length);
            var value = FromHex(slice);
            return value % max;
        }
    }
}