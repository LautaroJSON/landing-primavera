# Implementation Plan: Landing del Festival de la Primavera y el Estudiante

**Branch**: `001-landing-primavera-estudiante` | **Date**: 2026-08-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-landing-primavera-estudiante/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Landing page de una sola página (single-page, estática) que promociona el evento
ficticio "Festival de la Primavera y el Estudiante" (21 de septiembre, Plaza de Mayo,
Buenos Aires) como pieza de portfolio. Muestra hero con fecha/lugar sin scroll,
actividades, cronograma, cómo llegar y un CTA de registro simulado (sin backend),
con un efecto parallax notorio y fluido como firma visual del scroll y un fondo de
hero que rota automáticamente entre varias imágenes cada 5 segundos con crossfade
(FR-017/FR-018), sin interferir con el parallax. Se construye
como sitio estático con Astro (salida SSG), estilado con Tailwind CSS, animado con
GSAP + ScrollTrigger (scroll suave opcional vía Lenis), imágenes optimizadas con
`astro:assets`, y desplegado en Vercel o Netlify vía build automático desde GitHub.

## Technical Context

**Language/Version**: TypeScript + Astro 4.x (componentes `.astro`), Node.js 20 LTS para build

**Primary Dependencies**: Astro (modo `output: 'static'`/SSG), Tailwind CSS, GSAP +
plugin ScrollTrigger, Lenis (scroll suave, opcional/progresivo), `astro:assets`
(optimización de imágenes integrada), Leaflet + `@types/leaflet` (mapa
interactivo de "Cómo llegar" sobre tiles de OpenStreetMap servidos por CartoDB
Positron, FR-019) — cargado vía `import()` dinámico disparado por
`IntersectionObserver` (sin framework de UI adicional; ver Complexity Tracking)

**Storage**: N/A — sitio estático sin base de datos ni backend; el CTA de registro es
una confirmación simulada en el cliente (FR-014), sin persistencia de datos

**Testing**: Sin framework de test unitario dedicado (no hay lógica de negocio no
trivial que lo justifique); validación mediante QA manual guiada por
`quickstart.md` contra los escenarios de aceptación del spec, más auditorías
Lighthouse (Performance/Accessibility/Best Practices) como gate de calidad. Ver
`research.md` para el razonamiento completo.

**Target Platform**: Web — navegadores evergreen (Chrome, Firefox, Safari, Edge)
desde mobile hasta desktop; hosting estático en Vercel o Netlify (CDN + build
automático desde GitHub)

**Project Type**: web (sitio estático de una sola página)

**Performance Goals**: scroll (incluido el parallax) percibido fluido a ~60fps en
mobile de gama media, incluso mientras el fondo del hero rota (FR-017/FR-018);
Lighthouse Performance ≥ 90 y Accessibility ≥ 90 en mobile; LCP < 2.5s en
condiciones de red 4G simuladas (la rotación de imágenes de fondo no debe
contarse ni afectar el LCP, ya que ocurre después de la carga inicial del hero)

**Constraints**: sin backend/base de datos (FR-014); mobile-first (Constitución
Principio II); parallax implementado sin degradar el scroll (Constitución Principio
III); contraste WCAG AA (FR-011); debe respetar `prefers-reduced-motion` (FR-009,
FR-018 — incluye la rotación/crossfade del fondo del hero, no solo el parallax);
sin símbolos oficiales reales de Argentina/CABA (Constitución Principio I); sitio
solo en español (FR-015); sección "cómo llegar" con mapa interactivo propio
(Leaflet, no iframe de terceros) cargado de forma diferida vía
`IntersectionObserver` para no afectar el LCP del hero, con fallback textual si
no carga (FR-019/FR-020/FR-021, ver Assumptions del spec — actualizado);
rotación de fondo del hero cada 5s con crossfade, corriendo en paralelo al
parallax sin interrumpirlo (FR-017/FR-018)

**Scale/Scope**: una sola página con ~6 secciones (hero, actividades, cronograma,
cómo llegar, CTA repetido, footer); contenido ficticio estático; sin usuarios
concurrentes reales que dimensionar (demo de portfolio)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principio / Estándar                             | Estado                             | Nota                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I. Transparencia de Ficción y Ética de Marca     | PASS                               | Footer con disclaimer (FR-007); sin escudos/símbolos oficiales reales (fuera de alcance del stack, se aplica en contenido)                                                                                                                                                                                                                                                   |
| II. Mobile-First Inquebrantable                  | PASS                               | Tailwind CSS con enfoque mobile-first (breakpoints `sm:`/`md:`/`lg:` como progressive enhancement); FR-010                                                                                                                                                                                                                                                                   |
| III. Parallax Fluido sin Sacrificar Performance  | PASS (con complejidad justificada) | GSAP+ScrollTrigger anima `transform`/`opacity` vía RAF batching; la rotación de fondo del hero (FR-017) se implementa como un timeline GSAP separado que solo anima `opacity` entre capas de imagen (crossfade), corriendo en paralelo al ScrollTrigger sin bloquear ni reiniciar el hilo de scroll; ver Complexity Tracking por la dependencia de 2-3 librerías de terceros |
| IV. Identidad Visual Primaveral-Institucional    | PASS                               | Se define en `data-model.md`/design tokens de Tailwind (paleta), no bloquea el stack técnico                                                                                                                                                                                                                                                                                 |
| V. Estructura de Contenido Obligatoria           | PASS                               | Cada sección obligatoria (hero, actividades, cronograma, cómo llegar, CTA, footer) es un componente Astro dedicado                                                                                                                                                                                                                                                           |
| VI. Arquitectura por Componentes y Accesibilidad | PASS                               | Astro fuerza organización por componentes; contraste/alt/teclado se validan en quickstart.md                                                                                                                                                                                                                                                                                 |
| Estándares Técnicos de Performance               | PASS                               | `astro:assets` cubre optimización de imágenes; animaciones en GPU (`transform`/`opacity`); Astro emite cero JS por defecto salvo los scripts de parallax; el mapa interactivo (Leaflet, FR-019) se carga con `import()` dinámico + `IntersectionObserver`, sin `<link>`/`<script>` eager en el HTML (verificado en build), así que no afecta el LCP del hero (FR-020)        |
| Flujo de Trabajo y Quality Gates                 | PASS                               | `quickstart.md` codifica el checklist de mobile/contraste/teclado/parallax/footer antes de dar una sección por terminada                                                                                                                                                                                                                                                     |

**Resultado**: PASS con una complejidad justificada (uso de GSAP/ScrollTrigger/Lenis)
documentada en Complexity Tracking. No bloquea el avance a Phase 0.

**Re-check post Phase 1**: confirmado tras generar `data-model.md`, `contracts/` y
`quickstart.md` — el modelo de datos no introduce almacenamiento (mantiene N/A de
Storage), los contratos de componentes mapean 1:1 a las secciones obligatorias del
Principio V, y `quickstart.md` codifica explícitamente los gates de mobile,
contraste, teclado, reduced-motion y footer. Ningún hallazgo de diseño cambia el
resultado PASS ni agrega violaciones nuevas a Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-primavera-estudiante/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
astro.config.mjs
tailwind.config.mjs
package.json

src/
├── layouts/
│   └── BaseLayout.astro       # <html>/<head>/meta, carga global de estilos y scripts
├── pages/
│   └── index.astro            # Ensambla las secciones en una sola página
├── components/
│   ├── Nav.astro               # Navegación por anclas (accesible por teclado)
│   ├── Hero.astro              # FR-001: nombre, fecha, lugar, CTA primario
│   ├── Actividades.astro       # FR-002
│   ├── Cronograma.astro        # FR-003
│   ├── ComoLlegar.astro        # FR-004: referencia de ubicación/acceso +
│   │                            #   FR-019/020/021: mapa interactivo Leaflet
│   │                            #   (script propio, import() dinámico vía
│   │                            #   IntersectionObserver, fallback textual)
│   ├── CtaRegistro.astro       # FR-005/006/014/016: CTA + confirmación simulada
│   └── Footer.astro            # FR-007: disclaimer de proyecto ficticio
├── scripts/
│   └── scroll-fx.ts            # Init de GSAP/ScrollTrigger, Lenis y del
│                                #   crossfade rotativo del fondo del hero
│                                #   (timeline GSAP independiente, FR-017/018);
│                                #   respeta prefers-reduced-motion (FR-009/018)
├── data/
│   ├── actividades.ts          # Contenido ficticio tipado (ver data-model.md)
│   ├── cronograma.ts           # Contenido ficticio tipado (ver data-model.md)
│   └── heroBackgrounds.ts      # Set ordenado de imágenes de fondo del hero
│                                #   (FR-017, ver data-model.md: ImagenDeFondoHero)
├── styles/
│   └── global.css              # Directivas de Tailwind + design tokens de paleta
└── assets/
    └── images/
        └── hero/                # Set de imágenes que rota en el fondo del hero
                                  #   (FR-017), procesadas por astro:assets

public/
└── favicon.svg, robots.txt, etc.
```

**Structure Decision**: Proyecto único Astro (sin separación frontend/backend: no
hay backend). Cada sección obligatoria del spec (Principio V/VI de la constitución)
es un componente `.astro` independiente ensamblado en `pages/index.astro`, con la
lógica de scroll/parallax aislada en `scripts/scroll-fx.ts` para poder probarla y
ajustarla sin tocar el markup de las secciones.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                                                                                                                                                                                       | Why Needed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Simpler Alternative Rejected Because                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dependencias de terceros para animación (GSAP + plugin ScrollTrigger, y opcionalmente Lenis), en tensión con el estándar de "no agregar dependencias para lo que HTML/CSS/JS estándar resuelva" | El brief técnico del usuario pide explícitamente este stack, y el Principio III exige un parallax "notorio y fluido" como firma visual; GSAP/ScrollTrigger da control fino multi-capa y comportamiento consistente entre navegadores con optimización de rendimiento ya resuelta (batching vía RAF, animación en `transform`/`opacity`)                                                                                                                                                                                                                                   | CSS puro (`animation-timeline: scroll()`) o `IntersectionObserver` a mano fueron considerados, pero tienen soporte de navegador desigual (scroll-driven animations aún no universal) y requerirían reimplementar a mano el manejo de múltiples capas parallax con la misma robustez, lo cual es justamente el problema que GSAP/ScrollTrigger ya resuelve de forma madura |
| Dependencia de terceros para el mapa interactivo (Leaflet), pese a que el spec original rechazaba explícitamente "un mapa interactivo embebido de un proveedor externo" para "Cómo llegar"      | El usuario pidió explícitamente esta funcionalidad (FR-019/FR-020/FR-021), priorizándola sobre la restricción original. A diferencia de un `<iframe>` de Google Maps (lo que el spec original rechazaba), Leaflet es una biblioteca, no un embed: da control total de estilos (marcador y controles reusan la paleta papel/tinta) y se carga con `import()` dinámico + `IntersectionObserver`, sin agregar un framework de UI solo para poder usar `client:visible` — mismo efecto (cero JS/CSS hasta que la sección entra en viewport) vía code-splitting nativo de Vite | Un `<iframe>` embebido de Google Maps/OSM fue descartado por ser justo la opción que el spec original rechazaba (sin control de marca, sin garantía de carga diferida, posible tracking de terceros); mantener solo la referencia estática fue la opción anterior, pero el usuario pidió explícitamente reemplazarla por un mapa real                                     |
