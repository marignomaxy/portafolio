# Operación y edición

## Fuentes

- Editar contenido en `src/app/data/portfolio.json` y respetar sus tipos.
- Guardar recursos públicos en `src/assets/`; referenciarlos con rutas relativas al sitio.
- No incluir credenciales, identificadores personales o información real de clientes.
- No duplicar datos en componentes, prompts, documentación o pruebas.
- `npm start`, `npm test` y `npm run build` generan `profile.generated.ts` desde el JSON para cargar solo el perfil en la estructura inicial. No editar ese archivo generado.

## Desarrollo

`npm ci`, `npm start`, `npm run build`.

La salida estática es `dist/portafolio/browser`. El fallback de rutas se declara en `vercel.json`. No se necesitan variables de entorno de Supabase ni Railway.

## Contacto

Preparar un mensaje abre el programa de correo del visitante. Si no tiene uno configurado, puede copiar la dirección y usar su correo web. El sitio no confirma entrega ni almacena mensajes.

## Incorporar un curso

Verificar título, emisor y fecha contra el certificado. Crear una versión pública que oculte DNI o información personal innecesaria, guardar el recurso en assets y añadir su registro. Los cursos aún no recibidos se documentan como pendientes, no se muestran como obtenidos.

`featured` decide qué cursos aparecen al abrir la sección; `cvFeatured` selecciona la formación complementaria del CV. Ambos se editan en el mismo JSON.

## Experiencia con repositorios privados

Los proyectos internos se describen en `experience`, dentro de la empresa correspondiente. `highlights` registra aportes confirmados y `confidentiality` permite explicar la ausencia de código público. No hace falta enlazar GitLab para acreditar experiencia. Para un caso individual, usar solo problema, rol, tecnologías y resultados que puedan compartirse; no inventar métricas ni publicar información interna o capturas sin autorización de la empresa.

## Conservación y respaldo

Los datos locales evitan depender de una suscripción del backend; su conservación exige guardar y respaldar el repositorio y sus assets. Publicar requiere ejecutar build y las verificaciones documentadas en el SDD.
