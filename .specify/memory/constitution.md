<!--
Sync Impact Report
===================
Version change: N/A (unratified template) → 1.0.0
Rationale: Initial ratification. The constitution file previously contained only
unfilled template placeholders; this is the first concrete adoption, hence MAJOR
version 1.0.0 rather than an incremental bump.

Modified principles: N/A (initial adoption, no prior named principles)

Added sections:
- Core Principles I–VI (Transparencia de Ficción y Ética de Marca;
  Mobile-First Inquebrantable; Parallax Fluido sin Sacrificar Performance;
  Identidad Visual Primaveral-Institucional; Estructura de Contenido
  Obligatoria; Arquitectura por Componentes y Accesibilidad)
- Estándares Técnicos de Performance (Section 2)
- Flujo de Trabajo y Quality Gates (Section 3)
- Governance

Removed sections: none

Templates requiring follow-up review (not modified by this command, per scope guard):
- .specify/templates/plan-template.md — ⚠ pending manual check that its Constitution
  Check gate references these six principles by name
- .specify/templates/spec-template.md — ⚠ pending manual check for alignment
- .specify/templates/tasks-template.md — ⚠ pending manual check for alignment
- Command/agent guidance files (if any reference prior placeholder principle names) — ⚠ pending

Deferred placeholders: none — all bracketed tokens resolved.
-->

# Festival de la Primavera y el Estudiante — Landing Constitution

<!-- Portfolio landing page for a fictitious government event, built as a design/dev showcase -->

## Core Principles

### I. Transparencia de Ficción y Ética de Marca (NON-NEGOTIABLE)

El evento "Festival de la Primavera y el Estudiante" es 100% ficticio y el sitio existe
únicamente como pieza de portfolio. El footer DEBE incluir, en todas las páginas, una
aclaración visible de que se trata de un proyecto ficticio/demo sin validez oficial.
Está PROHIBIDO usar el escudo, el isologo o cualquier símbolo oficial real del Gobierno
de la Ciudad de Buenos Aires o del Gobierno de Argentina de forma que sugiera oficialidad
real; los colores institucionales (celeste/blanco) pueden usarse solo como acento estético,
nunca reproduciendo marca oficial. Ninguna copia del sitio (textos, CTAs, metadata) puede
afirmar o insinuar que el evento es real.
**Rationale**: es un proyecto de portfolio personal; confundir a un visitante sobre la
veracidad de un evento gubernamental sería engañoso y podría interpretarse como
suplantación de una comunicación oficial real.

### II. Mobile-First Inquebrantable

Todo diseño y toda implementación se construyen primero para viewport móvil y luego se
expanden a tablet/desktop. Ninguna sección se considera terminada si su versión mobile
tiene texto cortado, elementos superpuestos, targets táctiles menores a 44x44px, o
scroll horizontal no intencional. Las decisiones de layout, tipografía y espaciado se
validan en mobile antes que en desktop.
**Rationale**: el público objetivo (adolescentes y familias) navega mayoritariamente
desde el celular; una experiencia mobile deficiente invalida el propósito del portfolio.

### III. Parallax Fluido sin Sacrificar Performance

El sitio DEBE incluir un efecto parallax notorio como elemento distintivo del scroll,
pero el parallax NUNCA puede degradar la fluidez del scroll. Las animaciones de scroll
se implementan con propiedades que no disparan layout/reflow (`transform`, `opacity`),
preferentemente vía CSS o `IntersectionObserver`/`requestAnimationFrame`, evitando
listeners de scroll no throttled y JavaScript pesado en el hilo principal. Si en
cualquier dispositivo de referencia (mobile de gama media) el parallax introduce jank
perceptible, se simplifica el efecto antes que aceptar la degradación de performance.
**Rationale**: el parallax es la firma visual del proyecto, pero un scroll trabado
arruina la impresión de calidad que un portfolio busca transmitir.

### IV. Identidad Visual Primaveral-Institucional

La paleta de colores combina tonos primaverales (verdes, amarillos, rosas/violetas)
con los colores institucionales argentinos (celeste y blanco) usados como acento
secundario, sin que dominen la composición. La tipografía es moderna y legible, con
jerarquía tipográfica clara entre títulos, subtítulos y cuerpo de texto. El tono de
comunicación es institucional pero cercano y juvenil, apto tanto para adolescentes
como para familias — se evita el lenguaje excesivamente formal o burocrático.
**Rationale**: el evento ficticio simula una comunicación gubernamental dirigida a
estudiantes, por lo que necesita balancear seriedad institucional con calidez y
cercanía hacia un público joven.

### V. Estructura de Contenido Obligatoria

Toda versión publicada del sitio DEBE incluir, como mínimo:

- **Hero**: nombre del evento, fecha (21 de septiembre) y lugar (Plaza de Mayo,
  Buenos Aires) visibles sin necesidad de scroll, en cualquier viewport soportado.
- **Actividades/cronograma**: sección que detalla el programa del evento.
- **Cómo llegar**: sección con referencia clara a la ubicación (Plaza de Mayo).
- **Llamado a la acción**: CTA explícito (registro, "más información" o equivalente).
- **Footer**: aclaración de proyecto ficticio de portfolio (ver Principio I).
  Ninguna de estas secciones puede eliminarse ni quedar implícita; son reglas de
  negocio del sitio, no sugerencias de diseño.
  **Rationale**: estas secciones son el contrato de contenido mínimo que define al
  sitio como landing de evento y evitan que iteraciones de diseño omitan información
  funcional clave.

### VI. Arquitectura por Componentes y Accesibilidad

El código se organiza por secciones/componentes (hero, cronograma, cómo-llegar, CTA,
footer, etc.), nunca como un único archivo monolítico. Cada componente es responsable
de su propia sección y reutilizable/testeable de forma aislada. Se cumplen requisitos
básicos de accesibilidad: contraste de color conforme a WCAG AA para texto sobre
fondos o imágenes con parallax, texto alternativo (`alt`) en toda imagen con
significado, y navegación completa por teclado (foco visible, orden lógico de
tabulación) en CTAs, links y controles interactivos.
**Rationale**: un portfolio también demuestra criterio profesional de arquitectura de
código y de accesibilidad, no solo estética visual.

## Estándares Técnicos de Performance

Las imágenes se sirven optimizadas (formatos modernos como WebP/AVIF cuando sea
viable, dimensiones responsive, `loading="lazy"` fuera del viewport inicial). Las
animaciones de scroll y parallax evitan recalculo de layout en cada frame; se prefiere
CSS puro o composición en GPU (`transform`, `will-change` con moderación) sobre
librerías pesadas de animación cuando el efecto pueda lograrse de forma nativa. No se
agregan dependencias de terceros para funcionalidad que pueda resolverse con HTML/CSS/
JS estándar. El objetivo de referencia es scroll a 60fps en dispositivos de gama media.

## Flujo de Trabajo y Quality Gates

Antes de considerar una sección o feature terminada, se verifica: (1) render correcto
y sin cortes en viewport mobile de referencia (~375px de ancho); (2) el efecto
parallax no introduce jank perceptible al hacer scroll; (3) contraste de texto
conforme a WCAG AA en todas las combinaciones de color usadas, incluyendo texto sobre
imágenes; (4) toda imagen con significado tiene `alt` descriptivo; (5) navegación por
teclado funcional en CTAs y links; (6) el footer con la aclaración de proyecto
ficticio está presente y visible. Cambios que toquen paleta de colores, símbolos
institucionales o el texto del disclaimer del footer se revisan explícitamente contra
el Principio I antes de mergear.

## Governance

Esta constitución prevalece sobre cualquier otra guía de estilo o preferencia de
implementación dentro del proyecto. Toda enmienda debe documentarse en este archivo,
incluyendo un Sync Impact Report que registre el cambio de versión y su motivo.

**Política de versionado semántico**:

- MAJOR: eliminación o redefinición incompatible de un principio existente.
- MINOR: adición de un nuevo principio o expansión material de una guía existente.
- PATCH: aclaraciones, correcciones de redacción o ajustes no semánticos.

Cualquier revisión de diseño o pull request debe verificar cumplimiento de los
Principios I–VI antes de aprobarse. Complejidad técnica adicional (nuevas
dependencias, librerías de animación, frameworks) debe justificarse explícitamente
contra el Principio III (Parallax Fluido sin Sacrificar Performance) y el estándar de
"no agregar dependencias para lo que HTML/CSS/JS estándar ya resuelve".

**Version**: 1.0.0 | **Ratified**: 2026-08-25 | **Last Amended**: 2026-08-25
