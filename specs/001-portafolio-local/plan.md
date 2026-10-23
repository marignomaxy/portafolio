# Plan y decisiones · SDD 001

1. Inventariar fuentes existentes, CV y certificados; preservar el trabajo local previo.
2. Crear el registro de contenido tipado, con proyectos y formación verificados.
3. Sustituir lectura remota por datos locales. Retirar servicios y pantallas heredados que dependían del backend.
4. Implementar presentación editorial, carrusel, fichas, filtros, contacto y navegación adaptable.
5. Incorporar recursos locales y evaluar el CV; preparar versiones públicas de certificados sin datos innecesarios.
6. Aplicar IA al proceso de diseño y desarrollo, sin chatbot (aclaración del usuario).
7. Compilar, ejecutar pruebas dirigidas y revisar las pantallas en navegador de escritorio y móvil. Registrar evidencia y pendientes reales.

## Decisiones

- **ADR-001: datos versionados.** JSON local y tipos TypeScript. No usar localStorage como base de datos ni introducir un panel de administración.
- **ADR-002: contacto sin backend.** `mailto:` y copia de email; no existe una bandeja de mensajes ni una confirmación de envío.
- **ADR-003: diseño.** Grafito, papel cálido y celeste; composición editorial, tipografía amplia y visuales reales de los trabajos. Evitar un catálogo de insignias o efectos que dificulten leer.
- **ADR-004: rutas.** Mantener Angular y rutas estáticas con fallback de Vercel; detalles separados del contenido de portada.
- **ADR-005: contenido sensible.** Conservar originales de certificados fuera de los assets públicos si contienen identificadores. No publicar capturas con datos reales de clientes.
- **ADR-006: IA.** El usuario aclaró que se refiere al uso de IA durante diseño y desarrollo. No incorporar chatbot ni modelos a la aplicación.
- **ADR-007: plataforma (sustituida).** La primera implementación se verificó en Angular 17 para conservar una base de comparación.
- **ADR-008: plataforma actualizada.** Tras pasar las pruebas iniciales, actualizar a Angular 21 con paquetes fijados y TypeScript 5.9. Es compatible con Node 24 y elimina la deuda de Angular 17 sin mezclar fallos de la reimplementación con fallos de migración. Retirar AOS, Material, Tailwind y otros paquetes sin uso. Verificar de nuevo build y comportamiento.
- **ADR-009: perfil inicial derivado.** Generar el perfil de cabecera y SEO desde el JSON canónico al iniciar, probar o compilar. El catálogo completo se carga con las páginas; agregar certificados no aumenta la carga inicial. El archivo generado no se edita manualmente y se comprueba su equivalencia con la fuente.
- **ADR-010: publicación existente.** El usuario confirmó que `main` del repositorio existente activa el despliegue automático de Vercel. Publicar mediante commit y push ordinario; comprobar luego la URL pública. No crear un proyecto de hosting adicional.
