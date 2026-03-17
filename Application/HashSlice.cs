namespace pixel_avatar.Application;

public static class HashSlice
{
    /// <summary>
    /// Toma una parte del hash y la reduce a un rango (0..max-1).
    /// Ejemplo: SliceToRange("1a3f...", 0, 3, 5) -> número entre 0 y 4
    /// </summary>
    public static int ToRange(string hash, int start, int length, int max)
    {
        if (max == 0)
            throw new ArgumentException("Max no puede ser 0 — no hay assets en esta carpeta.", nameof(max));

        var slice = hash.Substring(start, length);
        var value = int.Parse(slice, System.Globalization.NumberStyles.HexNumber);
        return value % max;
    }
}