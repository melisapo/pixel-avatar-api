# PixelAvatar

> Genera avatares pixel art únicos y determinísticos a partir de cualquier string.

**PixelAvatar** es una API REST escrita en ASP.NET Core 9 que convierte un nombre de usuario (o cualquier string) en un avatar pixel art. El mismo input produce siempre el mismo avatar — sin base de datos, sin sesiones, sin estado.

---


## Ejemplos


| "Cupido"                                    | "luna01"                                     | "noe@example"                                     |
|---------------------------------------------|----------------------------------------------|---------------------------------------------------|
| <img src="./Examples/cupido.png" width=128> | <img src="./Examples/luna01.png" width=128 > | <img src="./Examples/noe@example.png" width=128 > | 

---

## Cómo funciona

1. El string de entrada se convierte en un hash MD5.
2. El hash se divide en segmentos que determinan el índice de cada capa gráfica.
3. Las capas (`base`, `face`, `hair`, `clothes`, `accessories`) se componen en orden.
4. El resultado se devuelve como un PNG.

El proceso es completamente determinístico: la misma entrada siempre produce el mismo avatar, con 37.800 combinaciones posibles.

---

## Uso

### Endpoint

```
GET /{name}?size={size}&bg={color}
```

| Parámetro | Tipo     | Por defecto  | Descripción                         |
|-----------|----------|--------------|-------------------------------------|
| `name`    | `string` | requerido    | Identificador base del avatar       |
| `size`    | `int`    | `16`         | Tamaño del PNG en píxeles (8–512)   |
| `bg`      | `string` | transparente | Color de fondo (ver opciones abajo) |

### Colores de fondo

El parámetro `bg` acepta dos formatos:

**Nombres predefinidos**

| Color    | Claro          | Oscuro        |
|----------|----------------|---------------|
| azul     | `blue-light`   | `blue-dark`   |
| verde    | `green-light`  | `green-dark`  |
| amarillo | `yellow-light` | `yellow-dark` |
| rojo     | `red-light`    | `red-dark`    |
| rosa     | `pink-light`   | `pink-dark`   |
| morado   | `purple-light` | `purple-dark` |
| cyan     | `cyan-light`   | `cyan-dark`   |
| —        | `white`        | `black`       |

**Hex personalizado** (con o sin `#`)

```
?bg=FF5733
?bg=%23FF5733   # # escapado en URL
```

Si el valor es inválido, el fondo será transparente.

### Ejemplos de request

```
# Avatar con fondo predefinido
GET https://pixelavatar.onrender.com/luna01?size=128&bg=purple-dark

# Avatar con fondo hex personalizado
GET https://pixelavatar.onrender.com/luna01?size=128&bg=1a1a2e

# Avatar sin fondo (transparente)
GET https://pixelavatar.onrender.com/luna01?size=128

# Avatar por defecto (16x16, transparente)
GET https://pixelavatar.onrender.com/luna01
```

La respuesta es directamente un `image/png`.

---

## Integración

### HTML

```html
<!-- Sin fondo -->
<img src="https://pixelavatar.onrender.com/luna01?size=128" alt="Avatar de luna01" />

<!-- Con fondo predefinido -->
<img src="https://pixelavatar.onrender.com/luna01?size=128&bg=purple-dark" alt="Avatar de luna01" />

<!-- Con fondo hex -->
<img src="https://pixelavatar.onrender.com/luna01?size=128&bg=1a1a2e" alt="Avatar de luna01" />
```

### JavaScript / React

```jsx
function Avatar({ username, hasPhoto, photoUrl, bg = "" }) {
  const params = new URLSearchParams({ size: 128, ...(bg && { bg }) });
  const fallback = `https://pixelavatar.onrender.com/${username}?${params}`;
  return <img src={hasPhoto ? photoUrl : fallback} alt={username} />;
}
```

### Python

```python
def get_avatar_url(username: str, size: int = 128, bg: str = "") -> str:
    url = f"https://pixelavatar.onrender.com/{username}?size={size}"
    if bg:
        url += f"&bg={bg}"
    return url
```

### PHP

```php
function getAvatarUrl(string $username, int $size = 128, string $bg = ""): string {
    $url = "https://pixelavatar.onrender.com/{$username}?size={$size}";
    if ($bg) $url .= "&bg={$bg}";
    return $url;
}
```