# TechSolutions Fullstack Website

Este paquete incluye:

```text
frontend/
  index.html
  styles.css
  script.js
  assets/techsolutions-logo.png

backend/
  server.js
  package.json
  .env.example
  README.md
```

## Uso local rápido

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Luego abre:

```text
http://localhost:3000
```

El backend sirve también el frontend.

## Producción

- El frontend puede seguir en GitHub Pages.
- El backend debe subirse a Render/Railway/Fly.io/VPS.
- Cuando tengas la URL del backend, edita `frontend/index.html`:

```js
window.TECHSOLUTIONS_API_URL = "https://tu-backend-url.com";
```
