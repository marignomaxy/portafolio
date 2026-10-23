# Recursos públicos

Los registros de certificados y sus rutas están en `src/app/data/portfolio.json`. `sourceFile` y `sourceSha256` permiten cotejar los archivos originales recibidos; el sitio consume únicamente las copias de `src/assets/certificates`.

## Certificados

Los originales se conservan durante la preparación en `tmp/certificates`, excluido de Git. No copiar esa carpeta a assets. `tools/prepare-certificates.py` lee los registros del JSON, prepara copias para publicación y genera vistas previas WebP. Requiere Python con pdfplumber, Pillow, reportlab, pypdf y Poppler en PATH.

Las copias PDF actuales se reconstruyeron desde páginas renderizadas para no conservar identificadores en texto u objetos originales. Las imágenes de EDteam omiten el código personal de verificación. Cada credencial debe inspeccionarse visualmente después del procesamiento: las reglas del script corresponden a los formatos recibidos y no garantizan detectar todos los datos de certificados futuros.

Los cinco diplomas de Platzi recibidos el 23 de octubre de 2026 son PDF de una página basados en imágenes. Sus datos se verificaron visualmente, sin inferirlos del nombre del archivo. Se añadieron copias públicas sin el código personal de verificación y vistas previas. Para procesar únicamente ese emisor: `python tools/prepare-certificates.py --issuer Platzi`. Los adjuntos originales de `.codex-remote-attachments` también quedan excluidos de Git.

Para agregar una credencial, cotejar título, emisor y fecha; preparar y revisar su copia pública; completar su registro en el JSON y ejecutar las pruebas de contenido. Un curso pendiente de recepción no se publica como verificado.

## Visuales y CV

Los cuatro WebP de proyectos son composiciones de presentación. Nexio, Lorena Importados y Kreativa utilizan material de identidad o imágenes de los propios proyectos; Saint James utiliza una composición conceptual original. Los textos alternativos y epígrafes explican su naturaleza. No se presentan como capturas verificadas de todas las funciones.

`tools/generate-social.py` genera la imagen social a partir de los datos del perfil. El CV y su revisión se describen en [Revisión del CV](./revision-cv.md). Ambos recursos generados permanecen en assets para que el build del sitio no dependa de Python.
