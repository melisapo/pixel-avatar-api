# ✎ᝰ PixelAvatar — Generador de Avatares Pixel Art



PixelAvatar es una pequeña API escrita en **ASP.NET Core 9** que genera avatares *pixel art* únicos a partir de un string.  
Cada nombre (por ejemplo, “Max” o “luna01”) produce siempre el mismo avatar, generado mediante un hash MD5 y la combinación aleatoria de capas gráficas (base, cara, pelo, ropa y accesorios).

---

## ✰ Características

- ✿ Generación de avatares **pixel art** a partir de un identificador (`string`).
- ᯓ Uso de **MD5 hash** para generar combinaciones determinísticas.
- ᰔ Combina automáticamente capas de imagen (`base`, `face`, `hair`, `clothes`, `accessories`).
- ꩜ Misma entrada ⇒ mismo resultado.
- ☁︎ Soporte para tamaño variable (`?size=64`, `?size=128`, etc.).
- ౨ৎ Devuelve imágenes directamente vía `<img src="...">`.

---

## ⚙ Instalación y ejecución

### 1. Clona el repositorio

```bash
  git clone https://github.com/melisapo/pixel-avatar-api.git
cd pixel-avatar-api
```
### 2. Instala dependencias
Asegúrate de tener instalado el SDK de .NET 9:
```bash
  dotnet restore
```

### 3. Ejecuta el proyecto:

```bash
  dotnet build
```
Y luego:
```bash
  dotnet run
```

---
## 𑣲 Algunos ejemplos
| Nombre      |                       Avatar                       |
|:------------|:--------------------------------------------------:|
| Cupido      |   <img src="Examples/Cupido.png" width="256" />    |
| luna02      |   <img src="Examples/luna02.png" width="256" />    |
| neo@example | <img src="Examples/neo@example.png" width="256" /> |


## Hecho con ❤ y pixeles! (˶ᵔ ᵕ ᵔ˶) ‹𝟹