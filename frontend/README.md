# Frontend — PatasHogar

Prototipo **visual** de la landing page de PatasHogar, recreado a partir de la
imagen de referencia. Por ahora no tiene lógica ni conexión con el backend:
solo estructura HTML y estilos CSS.

## Estructura

```
frontend/
├── index.html          # Landing completa (header, hero, donación, impacto,
│                       # albergues, cómo funciona y footer)
├── css/
│   └── styles.css      # Estilos, variables de color y responsive
└── assets/
    └── img/            # Todas las imágenes del sitio (ver README interno)
        ├── hero-donacion.png
        ├── albergue-aphab-ica.png
        ├── albergue-patitas-de-apoyo.png
        ├── albergue-san-martin.png
        └── logo-mark.svg
```

## Cómo verlo

Abre `index.html` en el navegador o levanta un servidor local:

```bash
cd frontend
python -m http.server 5500
```

Luego visita <http://localhost:5500>.

## Notas

- Los botones, enlaces y montos son decorativos (no ejecutan acciones).
- Las fotos son recortes de la referencia de diseño; reemplázalas por los
  originales manteniendo los nombres de archivo.
- La tipografía es **Plus Jakarta Sans** (Google Fonts). Si no hay conexión, el
  navegador usa la fuente del sistema como respaldo.
