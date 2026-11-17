# Calentando Corazones — sitio web

Sitio informativo y responsivo del voluntariado Calentando Corazones, construido con HTML, CSS y JavaScript sin dependencias externas, base de datos ni servicios de pago.

**Estado:** publicado en Azure Static Web Apps:

https://orange-coast-0ce482510.8.azurestaticapps.net/

El repositorio de GitHub es la fuente del sitio. Cada cambio enviado a la rama `main` activa automáticamente la validación y el despliegue en Azure.

## Probar cambios en la computadora

1. Abre esta carpeta en Visual Studio Code.
2. Abre `index.html` con la extensión Live Server o directamente con Google Chrome.
3. Revisa la navegación, el menú móvil, el flyer, el carrusel y los enlaces sociales.

Los cambios locales no modifican la página pública hasta hacer un commit y enviarlo a GitHub.

## Actualizar el flyer semanal

1. Convierte el nuevo flyer a WebP, preferentemente con proporción 4:5 y un peso menor a 500 KB.
2. Reemplaza `imagenes/actividades/flyer-actual.webp` conservando exactamente ese nombre.
3. En `index.html`, actualiza los datos visibles y accesibles del bloque `detalles-actividad`: día, hora, punto de encuentro y contactos.
4. Ajusta también el texto alternativo del flyer si cambia el tipo de actividad.
5. Comprueba la página antes de publicarla.

Azure tiene una regla de caché especial para ese archivo, por lo que el navegador volverá a comprobar si existe un flyer nuevo.

## Actualizar la galería

- Guarda las fotos públicas dentro de `imagenes/galeria/` en formato WebP.
- Se recomienda una proporción 16:9, resolución aproximada de 1280 × 720 y menos de 250 KB por imagen.
- Añade o retira la información de la foto únicamente en el arreglo `fotos` de `js/script.js`.
- Los puntos de navegación se generan automáticamente; no hace falta editar el HTML.

## Publicar una actualización

El despliegue no requiere ejecutar `az login` ni usar Azure CLI.

1. Revisa los cambios con `git status`.
2. Crea un commit.
3. Envía la rama `main` a GitHub.
4. GitHub Actions valida el JavaScript y la configuración de Azure.
5. Si las validaciones pasan, Azure Static Web Apps publica la nueva versión.

El flujo de publicación está en `.github/workflows/azure-static-web-apps-orange-coast-0ce482510.yml`.

## Seguridad, privacidad y contenido

- La política CSP solo permite recursos del propio sitio y bloquea scripts, marcos, conexiones y formularios externos.
- Azure envía encabezados contra clickjacking, detección incorrecta de tipos, permisos sensibles y filtración innecesaria de referencias.
- El sitio no tiene formularios, cuentas, pagos, analítica, base de datos ni código de terceros.
- Actualmente el sitio no instala cookies propias, por lo que no necesita un banner de consentimiento. Esto debe revisarse si se incorpora analítica, contenido incrustado o cualquier servicio externo.
- No guardes contraseñas, tokens, claves ni datos privados en el repositorio.
- Confirma por escrito los derechos de uso de cada fotografía. En imágenes de niñas, niños o personas en situaciones sensibles, conserva la autorización de su responsable legal antes de publicarlas.
- El número de WhatsApp y los teléfonos del flyer son públicos; usa únicamente números autorizados para recibir consultas.

## Cuando se conecte el dominio definitivo

Después de conectar el dominio propio en Azure:

1. Añade una URL canónica (`canonical`) y `og:url` con el dominio definitivo.
2. Cambia `og:image` para que use el dominio definitivo.
3. Crea o actualiza `sitemap.xml` y añade su dirección a `robots.txt`.
4. Registra el dominio en Google Search Console.
5. Verifica nuevamente HTTPS y los encabezados de seguridad.

No conviene fijar como canónica la dirección temporal de Azure antes de tener el dominio oficial.

## Validaciones locales

```powershell
node --check js/script.js
Get-Content staticwebapp.config.json -Raw | ConvertFrom-Json | Out-Null
git diff --check
```

## Archivos principales

- `index.html`: contenido, secciones y metadatos.
- `css/estilos.css`: diseño, colores y adaptación móvil.
- `js/script.js`: menú, carrusel, flyer y año del pie de página.
- `imagenes/`: recursos optimizados que sí se publican.
- `staticwebapp.config.json`: caché y encabezados de seguridad de Azure.
- `.github/workflows/`: validación y despliegue automático.

Documentación oficial: https://learn.microsoft.com/azure/static-web-apps/
