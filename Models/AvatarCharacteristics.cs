namespace pixel_avatar.Models;

public class AvatarCharacteristics(int @base, int face, int hair, int? accessories, int clothes)
{
    public int Base { get; set; } = @base;
    public int Face { get; set; } = face;
    public int Hair { get; set; } = hair;
    public int Clothes { get; set; } = clothes;
    public int? Accessories { get; set; } = accessories;
}
