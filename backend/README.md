# TechSolutions Contact Backend

Backend propio para enviar correos desde el formulario de la web.

## Requisitos

- Node.js 18 o superior
- Una cuenta SMTP. Para Gmail necesitas una contraseña de aplicación.

## Instalación local

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

En Mac/Linux:

```bash
cp .env.example .env
npm run dev
```

Luego abre:

```text
http://localhost:3000
```

Prueba el health check:

```text
http://localhost:3000/api/health
```

## Configurar Gmail

En `.env` coloca:

```env
SMTP_USER=techsolution.cod@gmail.com
SMTP_PASS=TU_CONTRASEÑA_DE_APLICACION
MAIL_TO=techsolution.cod@gmail.com
MAIL_FROM=techsolution.cod@gmail.com
```

No uses tu contraseña normal de Gmail. Usa una contraseña de aplicación.

## GitHub Pages + Backend

GitHub Pages solo aloja HTML/CSS/JS. El backend debe estar desplegado en otro servicio, por ejemplo:

- Render
- Railway
- Fly.io
- VPS propio
- Cloud Run

Cuando tengas la URL del backend, cambia en `frontend/index.html`:

```html
window.TECHSOLUTIONS_API_URL = "https://tu-backend.com";
```

## Seguridad incluida

- CORS configurable
- Helmet
- Rate limit
- Validación básica
- Sanitización simple
- Reply-To al email del cliente
