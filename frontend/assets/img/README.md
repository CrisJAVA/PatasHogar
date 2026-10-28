# Imágenes del prototipo

Todas las imágenes de la landing viven en esta carpeta. Los archivos actuales
son **recortes de la referencia de diseño** (imagen de baja resolución), así que
sirven como marcadores de posición hasta tener los archivos originales.

| Archivo | Uso | Tamaño actual | Tamaño sugerido para el original |
| --- | --- | --- | --- |
| `hero-donacion.png` | Foto principal del hero (perro y gato) | 488 × 448 | 1100 × 1000 (o superior, misma proporción) |
| `albergue-aphab-ica.png` | Tarjeta del albergue APHAB Ica | 356 × 232 | 800 × 520 |
| `albergue-patitas-de-apoyo.png` | Tarjeta del Refugio Patitas de Apoyo | 356 × 232 | 800 × 520 |
| `albergue-san-martin.png` | Tarjeta del Albergue San Martín | 356 × 232 | 800 × 520 |
| `logo-mark.svg` | Isotipo de PatasHogar (header, footer y favicon) | vectorial | — |

## Cómo reemplazarlas

1. Guarda la imagen nueva con el **mismo nombre** en esta carpeta.
2. Mantén la proporción indicada para que `object-fit: cover` no recorte nada
   importante.
3. Si agregas más albergues, duplica el bloque `.shelter-card` en
   `index.html` y apunta `src` al nuevo archivo.
