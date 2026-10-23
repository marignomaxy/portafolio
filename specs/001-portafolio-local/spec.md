# SDD 001 · Portafolio local

Estado: implementado y validado localmente · Actualización: 2026-10-23

## Objetivo

Presentar el trabajo de Maximiliano a reclutadores y clientes freelance mediante una experiencia visual cuidada y rápida, independiente del antiguo backend. El usuario autoriza modernizar el proyecto existente y conservar el despliegue estático.

## Alcance y requisitos

| ID | Contrato verificable |
| --- | --- |
| R01 | Inicio, proyectos, formación y contacto se renderizan desde contenido local, sin peticiones a Supabase ni Railway. |
| R02 | Nexio, Lorena Importados y Kreativa Studio son principales; Saint James Hotel es adicional y se identifica como propuesta visual, sin reservas reales. |
| R03 | Cada trabajo incluye contexto, aporte, decisiones, tecnologías, estado y enlace público verificado. No se publican enlaces de repositorios. |
| R04 | Carrusel manual con anterior/siguiente, selectores, teclado y gesto horizontal; indicador de posición y nombre accesible. No avanza solo. |
| R05 | Diseño adaptable desde 360 px, navegación móvil operable, foco visible, movimiento reducido, controles descriptivos y sin desplazamiento horizontal de la página. |
| R06 | Las fichas de proyecto tienen URL propia; ID desconocido muestra un estado de no encontrado. Conservar rutas históricas útiles y soportar recarga en Vercel. |
| R07 | El contacto prepara un correo en el cliente del visitante y ofrece copiar la dirección. Nunca anuncia que un mensaje fue enviado ni guarda consultas en un servidor. |
| R08 | Certificados agrupados y filtrables, con metadatos verificados y recursos locales cuando estén disponibles. No enlazar una carpeta personal como sustituto de un certificado. |
| R09 | Los cinco cursos recibidos de Platzi tienen título, emisor, fecha, horas, copia pública y vista previa verificados contra los diplomas originales. No se inventan cursos ni credenciales. |
| R10 | Conservar CV original; generar revisión documentada y, si los datos alcanzan, una nueva versión sin inventar empleo ni fechas. |
| R11 | IA como herramienta de diseño y desarrollo, por aclaración expresa del usuario. No incorporar chatbot, inferencia, descarga de modelos ni claves en la experiencia pública. |
| R12 | Metadatos, recursos visuales y tipografías del sitio se sirven localmente. Build de producción y pruebas de contenido y comportamiento deben pasar. |

## Criterios de aceptación

- Visitante sin backend: puede leer presentación, explorar los cuatro proyectos, abrir formación y preparar contacto.
- Carrusel: los cuatro controles de selección cambian contenido e imagen coherentemente; flechas y teclado recorren la selección sin mover el foco arbitrariamente.
- Navegación: los enlaces de sección funcionan desde inicio y detalle; Escape cierra el menú móvil. Una URL desconocida no rompe el renderizado.
- Contenido: los datos de una ficha y sus vistas resumidas provienen del mismo registro. No hay estadísticas comerciales ni años de experiencia inferidos.
- Contacto: campos inválidos muestran explicación; correo preparado usa asunto y cuerpo codificados y no produce solicitudes HTTP.
- Dependencias externas: las demos, redes y cualquier modelo opcional no son necesarias para ver el portafolio.

## Fuera de alcance

Publicar los repositorios, cambiar su visibilidad, acceder a cuentas con contraseñas compartidas, operar aplicaciones de clientes, activar pagos o modificar bases externas. No incluye publicar el nuevo sitio en una cuenta de hosting distinta de la existente.
