# CV público

El CV se genera desde `src/app/data/portfolio.json`. El generador no mantiene una segunda copia del contenido: reutiliza `profile`, `experience`, los proyectos con `featured: true`, la educación con `category: "Carrera"` y `skills`.

## Artefactos

- Publicado por la aplicación: `src/assets/pdf/Maximiliano-Marigno-CV.pdf`.
- Original preservado para referencia: `src/assets/pdf/Cv-Maximiliano-Marigno.pdf`.
- Generador: `tools/generate-cv.py`.

## Regeneración

Con Python, `reportlab` y `pypdf` disponibles:

```sh
python tools/generate-cv.py
```

El script exige una página y comprueba que el PDF contenga texto seleccionable. Si el contenido crece demasiado, falla explícitamente para evitar publicar un CV con una segunda página accidental. Después de cambiar contenido o maquetación, renderizar con Poppler e inspeccionar el resultado visual.

## Decisiones de contenido

- Incluye el puesto de Software Developer en Federación Patronal desde febrero de 2025, confirmado por el usuario, con Angular, Java, PL/SQL, incidentes, seguridad, nuevas funcionalidades y Kiro con SDD.
- Los proyectos internos confirmados se representan dentro de esa experiencia, sin enlaces al GitLab privado ni nombres o resultados no proporcionados.
- Mantiene el antecedente colaborativo de No Country, diciembre de 2023 a marzo de 2024, verificado en el CV anterior.
- Incluye la Tecnicatura Superior en Programación de TECLAB, finalizada en 2024.
- Presenta Nexio, Lorena Importados y Kreativa Studio, con enlaces a sus sitios públicos y tecnologías. No enlaza repositorios.
- Omite el antiguo puesto de Data Entry para concentrar el documento en desarrollo y evitar atribuir una fecha de finalización que no fue confirmada.
- Incluye los cinco cursos recibidos de Platzi en formación complementaria, reutilizando los registros con `cvFeatured: true`. No se inventaron credenciales ni resultados cuantitativos.

## Validación inicial

Generación de una página A4, extracción de texto y seis enlaces verificados. Render final de Poppler revisado: sin solapamientos, cortes ni caracteres faltantes; texto legible y jerarquía consistente. El original conserva sus 56.114 bytes.
