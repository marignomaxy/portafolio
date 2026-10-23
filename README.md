# Maximiliano Marigno · Portafolio

Portafolio estático en Angular, orientado a oportunidades profesionales y proyectos freelance. Su contenido principal no depende de Supabase, Railway ni de una API.

## Empezar

Requiere Node.js 22.12+ o 24 y npm.

```sh
npm ci
npm start
```

## Verificar y compilar

```sh
npm run test:content
npm test
npm run build
```

Las pruebas de interfaz usan Chrome o Edge en modo headless. En Windows se detecta Edge si Chrome no está instalado; en otros entornos se puede definir CHROME_BIN.

La salida estática queda en dist/portafolio/browser. vercel.json conserva acceso directo a las fichas de proyectos.

## Fuente única y documentación

- Contenido público estructurado: src/app/data/portfolio.json.
- Contrato funcional y criterios de aceptación: specs/001-portafolio-local/spec.md.
- Índice de decisiones, operación y evidencia: [docs/README.md](docs/README.md).

El sitio incluye carrusel manual, fichas de cuatro proyectos, formación con filtros, tema claro/oscuro, navegación móvil y contacto mediante un borrador de correo. No almacena consultas ni incluye chatbot.

## Actualizar contenido

Editar el JSON y añadir los recursos públicos correspondientes en src/assets. No publicar credenciales, datos de clientes ni certificados con identificadores personales innecesarios.

Antes de publicar, regenerar el CV con python tools/generate-cv.py si cambia su contenido (requiere reportlab y pypdf) y revisar visualmente el PDF. npm run build sincroniza metadatos y sitemap automáticamente.

Los cinco cursos recibidos de Platzi están incorporados con copias locales y figuran entre los destacados. No se necesita compartir contraseñas de cuentas.
