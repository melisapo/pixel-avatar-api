namespace pixel_avatar.Application;

public sealed class AvatarCharacteristics(int @base, int face, int hair, int clothes, int? accessories)
{
    public int Base { get; } = @base;
    public int Face { get; } = face;
    public int Hair { get; } = hair;
    public int Clothes { get; } = clothes;
    public int? Accessories { get; } = accessories;
}
