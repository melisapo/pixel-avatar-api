using System.Security.Cryptography;
using System.Text;

namespace pixel_avatar.Infrastructure;

public static class HashUtils
{
    /// <summary>
    /// Convierte un string en un hash MD5 hexadecimal.
    /// </summary>
    public static string ToMd5(string input)
    {
        var inputBytes = Encoding.UTF8.GetBytes(input);
        var hashBytes = MD5.HashData(inputBytes);
        return Convert.ToHexStringLower(hashBytes);
    }
}