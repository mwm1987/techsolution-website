# TechSolutions Website - Formulario sin abrir ventanas

Esta versión fuerza el envío del formulario desde la misma página usando JavaScript `fetch()`.

No usa EmailJS.
No usa `mailto:` para el formulario.
No abre Gmail, Outlook ni otra ventana del navegador para enviar.

Destino:
techsolution.cod@gmail.com

## Importante

FormSubmit puede pedir una confirmación inicial al correo techsolution.cod@gmail.com.
Después de confirmar, el formulario queda activo.

## Subir a GitHub

```bash
git add index.html styles.css script.js assets/techsolutions-logo.png
git commit -m "Fix contact form without redirects"
git push
```
