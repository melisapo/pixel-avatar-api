using Microsoft.AspNetCore.Mvc;
using pixel_avatar.Services;

namespace pixel_avatar.Controllers;

[ApiController]
[Route("{name}")]
public class AvatarController : ControllerBase
{
    /// <summary>
    /// Devuelve un avatar pixel-art basado en el texto dado.
    /// Ejemplo: GET /cupido?size=64
    /// </summary>
    /// <param name="name">Texto base del avatar</param>
    /// <param name="env">Ruta de la web</param>
    /// <param name="size">Tamaño del PNG cuadrado (por defecto 32x32)</param>
    [HttpGet]
    [ResponseCache(Duration = 3600)]
    public async Task<IActionResult> GetAvatar(string name, IWebHostEnvironment env, [FromQuery] int size = 32)
    {
        var avatarService = new AvatarService(env);
        
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Debe especificar un nombre válido.");
        
        var characteristics = AvatarService.GenerateCharacteristics(name);
        
        var pngBytes = await avatarService.GenerateAvatarImageAsync(characteristics, size);
        
        return File(pngBytes, "image/png");
    }
}