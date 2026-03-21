using Microsoft.AspNetCore.Mvc;
using pixel_avatar.Application.Interfaces;

namespace pixel_avatar.Controllers;

[ApiController]
[Route("{name}")]
public class AvatarController(IAvatarService avatarService) : ControllerBase
{
    /// <summary>
    /// Devuelve un avatar pixel-art basado en el texto dado.
    /// Ejemplo: GET /cupido?size=64
    /// </summary>
    /// <param name="name">Texto base del avatar</param>
    /// <param name="size">Tamaño del PNG cuadrado (por defecto 16x16)</param>
    /// <param name="bg">Color de fondo: nombre predefinido (blue-light), hex (FF5733) o vacío para transparente</param>
    [HttpGet]
    [ResponseCache(Duration = 3600)]
    public async Task<IActionResult> GetAvatar(
        string name,
        [FromQuery] int size = 16,
        [FromQuery] string? bg = null
    )
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Debe especificar un nombre válido.");

        if (size is < 8 or > 512)
            return BadRequest("El tamaño debe estar entre 8 y 512 píxeles.");

        var characteristics = avatarService.GenerateCharacteristics(name);
        var pngBytes = await avatarService.GenerateAvatarImageAsync(characteristics, size, bg);

        return File(pngBytes, "image/png");
    }
}
