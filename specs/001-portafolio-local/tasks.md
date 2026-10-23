# Tareas y evidencia · SDD 001

## Implementación

- [x] Evaluar estado anterior y documentar contrato.
- [x] Contenido único y recursos locales.
- [x] Portada, carrusel y cuatro fichas.
- [x] Formación y certificados.
- [x] Contacto mediante borrador de correo, sin backend.
- [x] Resolución de IA: asistencia al diseño y desarrollo, sin chatbot ni descarga de modelos.
- [x] CV actualizado y registro de información faltante.
- [x] Pruebas y revisión visual de escritorio/móvil.
- [x] Cierre con resultados y límites.

## Evidencia

Estado inicial: build con 604 kB iniciales; tests fallaban por `AppComponent.title` inexistente; las páginas de datos quedaban en carga ante el dominio remoto inaccesible.

Validación final, 23 de octubre de 2026:

- `npm run test:content`: 6 pruebas aprobadas; perfil generado, contenido, recursos locales, ausencia de backend/credenciales, CV y fuentes locales.
- `npm test`: 11 pruebas aprobadas en Edge headless. Incluyen carrusel, filtros, menú móvil, tema, certificado con retorno de foco, contacto y navegación entre fichas. Edge requirió ejecutarse fuera del aislamiento de permisos del entorno.
- `npm run build`: compilación de producción aprobada sin advertencias; carga inicial de 285,72 kB, transferencia estimada de 80,71 kB. El catálogo completo se carga con las páginas.
- `git diff --check`: sin errores de espacios.
- Revisión en navegador de escritorio y móvil: temas, carrusel, navegación, formulario y ausencia de desbordamiento horizontal. Diploma local abierto y cargado correctamente en el diálogo.
- 22 credenciales verificadas contra sus archivos, incluidos los cinco diplomas recibidos de Platzi; copias públicas locales y vistas previas. Once PDF reconstruidos sin conservar objetos originales con identificadores. Los cinco Platzi aparecen entre los destacados y en el CV.
- CV regenerado desde el JSON, una página A4 con texto seleccionable y seis enlaces; render final revisado sin cortes ni superposiciones. Original conservado.
- Experiencia de Federación Patronal actualizada con proyectos internos y repositorios privados, sin nombres internos, código ni métricas inventadas.

## Límites y siguientes aportes

- La publicación se realizó mediante el repositorio conectado a Vercel; no se crearon cuentas ni se modificó la visibilidad de repositorios o servicios de Supabase.
- Los cinco certificados de Platzi recibidos quedaron incorporados; no se requieren contraseñas.
- Casos individuales del trabajo requieren una descripción compartible del problema, aporte y resultado. Hasta entonces se representan dentro de la experiencia laboral.
- Los visuales de proyectos son composiciones de presentación identificadas como tales; Saint James se presenta como concepto con interacciones simuladas.

## Publicación solicitada

El usuario autorizó publicar y confirmó la conexión automática del repositorio con Vercel. Rama local y remota de producción: `main`. Se subió el commit `be539e7c18d44ef98cbee1d72c88dc1b8a404e0d`; GitHub mostró el check de Vercel aprobado con «Deployment has completed».

Verificación pública del 23 de octubre de 2026: `https://portafoliomarignomaximiliano.vercel.app/` muestra la nueva portada y los cinco cursos de Platzi destacados. La vista previa de Spec Driven Development carga desde assets de producción y el acceso directo a `/proyectos/nexio` renderiza la ficha correctamente. URL del despliegue en Vercel: `https://vercel.com/marignomaxys-projects/portafolio/AyWcLsXYPvuV2XrNWNH3ALegKKHC`.
