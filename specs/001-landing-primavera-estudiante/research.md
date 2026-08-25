# Phase 0 Research: Landing del Festival de la Primavera y el Estudiante

Todas las decisiones de stack fueron indicadas explícitamente por el usuario en el
brief técnico; este documento fija el razonamiento y las alternativas descartadas
para cada una, y resuelve los puntos que el brief dejaba abiertos (testing,
manejo de `prefers-reduced-motion`, estructura de contenido, hosting).

## 1. Framework: Astro (modo estático/SSG)

- **Decision**: Astro con `output: 'static'`.
- **Rationale**: sitio 100% de contenido, sin estado de servidor ni backend; Astro
  genera HTML estático por defecto y envía cero JavaScript salvo el que se declara
  explícitamente (`client:*` directives), lo que encaja con el estándar de
  performance de la constitución. Su modelo de componentes (`.astro`) mapea
  directamente al requisito de "arquitectura por componentes" (Principio VI).
- **Alternatives considered**: Next.js (overhead de SSR/routing innecesario para
  una sola página), HTML/CSS/JS plano (pierde la organización por componentes y la
  optimización de imágenes integrada), Eleventy (viable, pero el usuario ya definió
  Astro explícitamente).

## 2. Animación / Parallax: GSAP + ScrollTrigger

- **Decision**: GSAP core + plugin `ScrollTrigger`, cargado solo en el cliente e
  inicializado en `scripts/scroll-fx.ts`.
- **Rationale**: da control preciso sobre múltiples capas de parallax ligadas al
  scroll, con las animaciones aplicadas sobre `transform`/`opacity` (propiedades
  compuestas en GPU, sin recalcular layout), cumpliendo el Principio III de la
  constitución. Es la opción explícitamente pedida por el usuario.
- **Alternatives considered**: CSS `animation-timeline: scroll()` (soporte de
  navegador aún parcial en 2026 para Safari/Firefox más viejos, no confiable para un
  efecto "notorio" cross-browser); `IntersectionObserver` + CSS custom properties a
  mano (requiere reimplementar lo que ScrollTrigger ya resuelve: throttling,
  múltiples triggers, cleanup).
- **Mitigación de riesgo de performance**: registrar el plugin y crear los
  ScrollTrigger únicamente dentro de un chequeo de `prefers-reduced-motion: no-preference`
  (ver punto 4); usar `ScrollTrigger.batch`/`gsap.matchMedia()` para desactivar o
  simplificar el efecto en mobile de gama baja si el brief de performance lo exige
  más adelante.

## 3. Scroll suave: Lenis (opcional)

- **Decision**: Integrar Lenis como mejora progresiva, inicializada en el mismo
  módulo `scroll-fx.ts` y sincronizada con el ticker de GSAP
  (`gsap.ticker.add(lenis.raf)`), pero con un flag para desactivarla sin romper el
  parallax si en la práctica introduce jank en algún dispositivo de referencia.
- **Rationale**: el usuario la marcó como opcional; se adopta porque complementa el
  efecto parallax con una sensación de scroll más pulida (alineado con "diseño
  pulido, moderno y profesional" de la constitución), pero no es un requisito
  funcional (FR) — si en el testing de Phase de implementación degrada la
  performance, se puede remover sin afectar ningún FR.
- **Alternatives considered**: sin scroll suave (scroll nativo del navegador) —
  sigue siendo la opción de fallback si Lenis se descarta.

## 4. Accesibilidad de movimiento: `prefers-reduced-motion`

- **Decision**: el módulo `scroll-fx.ts` verifica
  `window.matchMedia('(prefers-reduced-motion: reduce)')` antes de inicializar
  ScrollTrigger/Lenis. Si el usuario prefiere movimiento reducido, el contenido se
  muestra en su posición final sin animación de parallax (FR-009), usando
  `gsap.matchMedia()` para definir el breakpoint de accesibilidad como un contexto
  aparte.
- **Rationale**: FR-009 lo exige explícitamente; `gsap.matchMedia()` es el patrón
  recomendado por GSAP para condicionar animaciones a media queries de forma
  reactiva y con limpieza automática.
- **Alternatives considered**: desactivar el JS de animación por completo vía
  server-side detection — no es posible de forma fiable en un sitio estático sin
  backend, así que se descarta a favor de la detección en cliente.

## 5. Estilos: Tailwind CSS

- **Decision**: Tailwind CSS integrado vía `@astrojs/tailwind`, con paleta
  primaveral + acentos celeste/blanco definida como design tokens en
  `tailwind.config.mjs` (colores custom, no los defaults de Tailwind).
- **Rationale**: utility-first acelera la implementación mobile-first (breakpoints
  `sm:`/`md:`/`lg:` aplicados como progressive enhancement, Principio II), y en
  build Tailwind purga las clases no usadas, por lo que no penaliza el peso final
  del sitio (alineado con el estándar de performance). Es una dependencia de build,
  no de runtime, por lo que no compite con la regla de "no agregar dependencias
  para lo que HTML/CSS ya resuelve" del mismo modo que una librería de JS en
  cliente.
- **Alternatives considered**: CSS plano/BEM (más control pero más lento de
  mantener para el mismo resultado visual); CSS Modules (viable, pero el usuario
  pidió Tailwind explícitamente).

## 6. Imágenes: `astro:assets`

- **Decision**: todas las imágenes con significado (hero, actividades) se procesan
  vía el helper `<Image />` / `getImage()` de `astro:assets`, sirviendo formatos
  modernos (WebP/AVIF) y tamaños responsive automáticamente, con `alt` obligatorio
  (FR-013).
- **Rationale**: cumple directamente el estándar técnico de la constitución
  ("imágenes optimizadas... formatos modernos, dimensiones responsive, lazy
  loading") sin necesitar una pipeline de optimización manual.
- **Alternatives considered**: `<img>` plano con optimización manual — más trabajo
  y más propenso a error humano (olvidar un tamaño responsive o un formato).

## 7. Deploy: Vercel o Netlify

- **Decision**: build automático desde GitHub en Vercel o Netlify (ambos
  soportan `astro build` con adapter estático out-of-the-box); la elección final
  entre los dos queda como detalle operativo sin impacto en el diseño del feature
  (cualquiera sirve un sitio estático detrás de CDN).
- **Rationale**: ambos ofrecen preview deployments por PR, HTTPS y CDN global sin
  configuración adicional, adecuado para un proyecto de portfolio sin backend.
- **Alternatives considered**: GitHub Pages (viable pero sin preview deployments
  por PR); no se descarta, pero el usuario ya acotó a Vercel/Netlify.

## 8. Testing / Validación de calidad

- **Decision**: sin framework de test unitario/integración dedicado. La
  validación se apoya en (a) QA manual guiado por `quickstart.md`, ejecutando cada
  escenario de aceptación del spec en un viewport mobile de referencia y en
  desktop, y (b) auditorías Lighthouse (Performance/Accessibility/Best Practices)
  ejecutadas contra el build de producción.
- **Rationale**: el sitio no tiene lógica de negocio compleja (sin backend, sin
  estado persistente, sin cálculos) que justifique una suite de tests unitarios;
  el riesgo real del feature es visual/UX/performance (parallax fluido, contraste,
  mobile-first), que se valida mejor con auditorías de navegador reales y checklist
  manual que con tests unitarios. Esto es consistente con la sección "Flujo de
  Trabajo y Quality Gates" de la constitución, que ya define gates manuales
  (viewport mobile, contraste WCAG AA, teclado, jank de parallax, footer).
- **Alternatives considered**: Playwright para smoke tests end-to-end — se deja
  como mejora opcional futura (no bloqueante), útil si el sitio creciera más allá
  de una landing de una sola página.

## 9. Estructura de contenido ficticio (actividades/cronograma)

- **Decision**: el contenido de actividades y cronograma se modela como datos
  tipados en TypeScript (`src/data/actividades.ts`, `src/data/cronograma.ts`),
  importados por los componentes Astro correspondientes, en vez de hardcodear el
  contenido directamente en el markup.
- **Rationale**: permite editar/expandir el programa ficticio del evento sin tocar
  la lógica de presentación, y le da a `Cronograma.astro` una fuente de datos
  ordenable cronológicamente (FR-003) de forma directa.
- **Alternatives considered**: Content Collections de Astro (Markdown/MDX por
  actividad) — más apropiado para contenido extenso o editorial; se descarta por
  sobre-ingeniería dado el volumen chico de contenido de una landing de portfolio.

## Resumen de resolución de incógnitas

No quedan `NEEDS CLARIFICATION` pendientes en el Technical Context del plan: todas
las decisiones de stack fueron provistas por el usuario o resueltas arriba con una
alternativa por defecto razonable y su justificación.
