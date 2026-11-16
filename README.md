# Calentando Corazones — sitio inicial para Microsoft Azure

Primera versión informativa hecha con HTML, CSS y JavaScript. No requiere Astro, Node, base de datos ni servicios de pago. **No se ha publicado en Azure todavía.**

## 1. Probar en una computadora
- Abre esta carpeta en Visual Studio Code.
- Abre `index.html` en tu navegador, o usa la extensión Live Server.
- Revisa los enlaces de navegación, el menú móvil y el carrusel.

## 2. Contenido que falta (no inventar)
- Historia real y descripción aprobada de la organización.
- Enlaces oficiales a Facebook, Instagram, y WhatsApp o correo (si se desea publicar).
- Confirmación final de colores y textos antes de publicar.

El logotipo y una selección de fotografías optimizadas ya están incorporados. Los originales permanecen en `imagenes/` y las copias ligeras de la galería están en `imagenes/galeria/`. No hay formularios ni base de datos.

### Actualizar la próxima actividad
La sección **Próxima actividad** se actualiza manualmente. Convierte el flyer a WebP, llámalo `flyer-actual.webp` y guárdalo dentro de `imagenes/actividades/`. Para publicar el siguiente, reemplaza ese mismo archivo y vuelve a subir el sitio. No es necesario modificar el HTML.

## 3. Subir a GitHub
1. Crea un repositorio (por ejemplo `calentando-corazones-web`).
2. Sube **el contenido de esta carpeta**, de forma que `index.html` quede en la raíz del repositorio.
3. No subas contraseñas, claves ni información privada.

## 4. Publicar gratis en Azure Static Web Apps
1. En https://portal.azure.com busca **Static Web Apps** y selecciona **Create**.
2. Selecciona la suscripción y crea un grupo de recursos (por ejemplo `rg-calentando-corazones`).
3. Plan de hospedaje: **Free**. Origen de despliegue: **GitHub**.
4. Autoriza GitHub y elige el repositorio y rama principal.
5. En Build Details selecciona **Custom** (sitio sin framework).
6. `App location`: `/`; `Api location`: dejar vacío; `Output location`: dejar vacío. No se necesita comando de compilación.
7. Crea el recurso. Azure generará un flujo de GitHub Actions en `.github/workflows/` y publicará la página.
8. Entra en el URL generado `https://<nombre-asignado>.azurestaticapps.net` y comprueba la web en computadora y celular.
9. No compres el dominio todavía. Cuando la web esté aprobada, conéctalo en **Settings > Custom domains**.

**Aviso:** Algunos campos pueden verse distintos según la versión del portal. El URL final depende de Azure, no se puede conocer antes del despliegue.

## 5. Controles antes de publicar como sitio oficial
- Reemplazar textos de muestra y fotos de ejemplo por contenido real autorizado.
- Probar en móvil, escritorio y conexión lenta.
- Comprobar que las redes sociales apunten a las cuentas correctas.
- Verificar títulos, metadatos, accesibilidad, contenido y ortografía.
- Confirmar que la cuota gratuita y el plan seleccionado son los correctos.

## 6. Archivos principales
- `index.html`: secciones y textos.
- `css/estilos.css`: estilos y colores.
- `js/script.js`: menú y carrusel.
- `imagenes/`: fotos y logotipo oficiales.
- `staticwebapp.config.json`: configuración mínima para Azure, con encabezados de seguridad.

Más información: https://learn.microsoft.com/azure/static-web-apps/getting-started?tabs=vanilla-javascript
