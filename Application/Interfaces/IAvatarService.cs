namespace pixel_avatar.Application.Interfaces;

public interface IAvatarService
{
    AvatarCharacteristics GenerateCharacteristics(string input);
    Task<byte[]> GenerateAvatarImageAsync(AvatarCharacteristics avatar, int size = 32);
}