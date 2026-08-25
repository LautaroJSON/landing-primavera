# Tasks: Landing del Festival de la Primavera y el Estudiante

**Input**: Design documents from `/specs/001-landing-primavera-estudiante/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md (all present)

**Tests**: No se generan tareas de test dedicadas — `plan.md`/`research.md` §8 decidieron
explícitamente no usar un framework de test unitario para este sitio estático; la
validación es QA manual guiada por `quickstart.md` (tarea T039) más auditorías
Lighthouse (tarea T036).

**Organization**: Las tareas están agrupadas por historia de usuario (spec.md) para
poder implementar y probar cada una de forma independiente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo (archivo distinto, sin dependencias pendientes)
- **[Story]**: A qué historia de usuario pertenece (US1–US4, según spec.md)
- Cada tarea incluye la ruta de archivo exacta

## Path Conventions

Proyecto único Astro en la raíz del repo (ver `plan.md` → Project Structure): `src/`,
`public/`, `astro.config.mjs`, `tailwind.config.mjs` en la raíz.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialización del proyecto Astro y su tooling base

- [x] T001 Crear el proyecto Astro (`output: 'static'`) con la estructura de carpetas de
      `plan.md` → Project Structure (`src/{layouts,pages,components,scripts,data,styles,assets/images}`,
      `public/`) y `astro.config.mjs`
- [x] T002 Instalar y configurar dependencias en `package.json`: `astro`,
      `@tailwindcss/vite`, `tailwindcss`, `gsap`, `lenis`, `astro:assets` (integrado en
      Astro), según `plan.md` → Primary Dependencies (nota: se usó `@tailwindcss/vite`
      en vez de `@astrojs/tailwind`, que no soporta Astro 7/Tailwind 4 — ver resumen final)
- [x] T003 [P] Configurar linting/formatting (ESLint flat config + `eslint-plugin-astro`,
      Prettier + `prettier-plugin-astro`) en la raíz del proyecto

**Checkpoint**: `npm run dev` levanta un proyecto Astro vacío sin errores

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura compartida que TODAS las historias de usuario necesitan

**⚠️ CRITICAL**: Ninguna historia de usuario puede implementarse hasta completar esta fase

- [x] T004 [P] Definir la paleta primaveral + acento celeste/blanco (Constitución
      Principio IV) como theme tokens de Tailwind en `tailwind.config.mjs`
      (implementado como `@theme` en `src/styles/global.css` — Tailwind v4 es
      CSS-first y no requiere `tailwind.config.mjs`, ver resumen final)
- [x] T005 [P] Crear los tipos de contenido (`Evento`, `Actividad`, `CronogramaItem`,
      `PuntoDeAcceso`, `ImagenDeFondoHero`, `EstadoRegistro`) en
      `src/types/content-schema.ts`, reflejando `contracts/content-schema.ts`
- [x] T006 [P] Crear `BaseLayout.astro` (html/head/meta, import de estilos globales y de
      `scroll-fx.ts`) en `src/layouts/BaseLayout.astro`
- [x] T007 [P] Crear `global.css` con las directivas de Tailwind y la tipografía base
      (jerarquía H1/H2/body) en `src/styles/global.css`
- [x] T008 [P] Crear `Nav.astro` con navegación por anclas accesible por teclado (foco
      visible) en `src/components/Nav.astro` (FR-012)
- [x] T009 [P] Crear `Footer.astro` con el disclaimer de proyecto ficticio de portfolio
      en `src/components/Footer.astro` (FR-007)
- [x] T010 Ensamblar `src/pages/index.astro` con `BaseLayout` + `Nav` + `Footer` y
      slots/placeholders para las secciones de cada historia de usuario (depende de
      T006, T008, T009)
- [x] T011 [P] Crear el esqueleto de `src/scripts/scroll-fx.ts`: registrar el plugin
      ScrollTrigger, detectar `prefers-reduced-motion` vía `gsap.matchMedia()` y exponer
      funciones de init vacías por sección (FR-009)

**Checkpoint**: Infraestructura lista — el desarrollo de historias de usuario puede
empezar (en paralelo si hay más de una persona)

---

## Phase 3: User Story 1 - Descubrir el evento de un vistazo (Priority: P1) 🎯 MVP

**Goal**: El hero muestra nombre/fecha/lugar del evento sin necesidad de scroll, con un
fondo que rota automáticamente entre varias imágenes (crossfade) y un efecto parallax
notorio y fluido que conviven sin interferirse.

**Independent Test**: Cargar la página en mobile y desktop y verificar que el nombre del
evento, "21 de septiembre" y "Plaza de Mayo, Buenos Aires" son visibles sin scrollear;
observar el hero por al menos 10s para confirmar la rotación de fondo con crossfade; y
scrollear para confirmar que el parallax responde con fluidez sin interrumpir la
rotación.

### Implementation for User Story 1

- [x] T012 [P] [US1] Crear el set de imágenes de fondo del hero
      (`ImagenDeFondoHero[]`, 3–5 imágenes) en `src/data/heroBackgrounds.ts` (FR-017)
      (también se creó `src/data/evento.ts` con la entidad `Evento` para FR-001, que
      había quedado sin tarea propia en la planificación)
- [x] T013 [P] [US1] Agregar las imágenes placeholder de fondo del hero (temática
      primaveral/estudiantil) a `src/assets/images/hero/` (se usaron las 2 imágenes
      reales de Plaza de Mayo provistas por el usuario — mínimo aceptable según
      Assumptions del spec; ver resumen final)
- [x] T014 [US1] Crear `Hero.astro`: layout mobile-first con nombre/fecha/lugar visibles
      sin scroll, capas de fondo/frente para el parallax, y slot para el CTA, en
      `src/components/Hero.astro` (FR-001, FR-010; depende de T005, T012)
- [x] T015 [US1] Implementar en `src/scripts/scroll-fx.ts` el timeline GSAP de
      crossfade que rota las capas de fondo del hero cada 5s, deteniéndose o quitando
      la animación cuando `prefers-reduced-motion` está activo (FR-017, FR-018; depende
      de T011, T014)
- [x] T016 [US1] Implementar en `src/scripts/scroll-fx.ts` el efecto parallax del hero
      (ScrollTrigger animando `transform` en las capas de fondo/frente), corriendo en
      paralelo al timeline de crossfade sin reiniciarlo ni bloquear el scroll (FR-008,
      FR-009, FR-018; depende de T015)
- [x] T017 [US1] Integrar `Hero.astro` en `src/pages/index.astro` (depende de T010, T014)
- [x] T018 [US1] Ajustar overlay/gradiente sobre el fondo del hero en
      `src/components/Hero.astro` para cumplir contraste WCAG AA del texto en todos los
      estados de rotación (FR-011; depende de T014) — implementado junto con T014
      (`bg-gradient-to-t from-black/80 via-black/35 to-black/10` detrás del texto)

**Checkpoint**: La historia de usuario 1 es funcional y testeable de forma
independiente (MVP)

---

## Phase 4: User Story 2 - Explorar actividades y cronograma (Priority: P2)

**Goal**: Un visitante puede ver la lista de actividades y el cronograma horario del
evento, ordenado cronológicamente.

**Independent Test**: Navegar directamente a la sección de actividades y al cronograma
y verificar que se listan actividades con descripción y que los horarios aparecen
ordenados cronológicamente, sin depender de otras secciones.

### Implementation for User Story 2

- [x] T019 [P] [US2] Crear el contenido ficticio de actividades (`Actividad[]`) en
      `src/data/actividades.ts` (FR-002)
- [x] T020 [P] [US2] Crear el contenido ficticio del cronograma (`CronogramaItem[]`,
      10:00–19:00) en `src/data/cronograma.ts`, referenciando `actividadId` (FR-003)
- [x] T021 [US2] Crear `Actividades.astro`: lista/grilla de actividades con imagen
      placeholder + `alt` descriptivo + descripción breve, en
      `src/components/Actividades.astro` (FR-002, FR-013; depende de T019) —
      implementado con íconos decorativos (`aria-hidden`) en vez de fotos, ya que no
      hay imágenes reales de actividades disponibles; no aplica el requisito de `alt`
      de FR-013 al no haber imágenes con significado en esta sección
- [x] T022 [US2] Crear `Cronograma.astro`: horario ordenado cronológicamente asociado a
      cada actividad, en `src/components/Cronograma.astro` (FR-003; depende de T019,
      T020)
- [x] T023 [US2] Agregar validación en tiempo de desarrollo de que todo
      `CronogramaItem.actividadId` existe en `actividades.ts` y no hay duplicados, en
      `src/data/cronograma.ts` (depende de T019, T020) — implementado junto con T020
      (valida al importar el módulo, falla el build si hay una referencia rota)
- [x] T024 [US2] Integrar `Actividades.astro` y `Cronograma.astro` en
      `src/pages/index.astro` (depende de T010, T021, T022)

**Checkpoint**: Las historias de usuario 1 y 2 funcionan de forma independiente

---

## Phase 5: User Story 3 - Registrarse para asistir (Priority: P2)

**Goal**: Un visitante encuentra un CTA de registro claro (en el hero y en una sección
posterior) que, al activarse, muestra una confirmación simulada sin capturar datos.

**Independent Test**: Localizar el CTA de registro fuera del hero, activarlo con click y
con teclado, y verificar que se muestra una confirmación clara sin ninguna llamada de
red; repetir el click y verificar que no se duplica la confirmación.

### Implementation for User Story 3

- [x] T025 [US3] Crear `CtaRegistro.astro` con prop `variante: 'hero' | 'seccion'`,
      estados `idle`/`confirmado`, confirmación accesible (`aria-live="polite"`) y copy
      sin lenguaje de urgencia, en `src/components/CtaRegistro.astro` (FR-005, FR-006,
      FR-014, FR-016; depende de T005)
- [x] T026 [US3] Implementar manejo idempotente de clicks repetidos sobre el CTA ya
      confirmado (sin duplicar la confirmación) en `src/components/CtaRegistro.astro`
      (depende de T025) — implementado junto con T025 (early return si
      `data-estado === "confirmado"`)
- [x] T027 [US3] Integrar `CtaRegistro` (`variante="hero"`) dentro de
      `src/components/Hero.astro` (depende de T014 [US1], T025)
- [x] T028 [US3] Integrar un segundo `CtaRegistro` (`variante="seccion"`) antes del
      footer en `src/pages/index.astro` (depende de T010, T025) — se agregó como una
      sección de cierre "¿Te sumás?" antes del footer
- [x] T029 [US3] Verificar activación por teclado (Enter/Space) y foco visible en ambas
      instancias del CTA (FR-012; depende de T027, T028) — verificado: son elementos
      `<button>` nativos (activación por teclado sin JS adicional) con
      `focus-visible:outline-celeste-acento`; confirmado en el build (2 instancias,
      variantes "hero" y "seccion")

**Checkpoint**: Las historias de usuario 1, 2 y 3 funcionan de forma independiente

---

## Phase 6: User Story 4 - Saber cómo llegar (Priority: P3)

**Goal**: Un visitante encuentra la referencia de ubicación de Plaza de Mayo y al menos
un medio de acceso (transporte público).

**Independent Test**: Navegar a la sección "Cómo llegar" y verificar que muestra la
dirección de referencia y al menos un medio de acceso, sin depender de otras secciones.

### Implementation for User Story 4

- [x] T030 [P] [US4] Crear el contenido de `PuntoDeAcceso` (dirección + medios de
      acceso ficticios: subte, colectivos) en `src/data/comoLlegar.ts` (FR-004)
- [x] T031 [US4] Crear `ComoLlegar.astro`: referencia estática de ubicación (placeholder
      gráfico tipo mapa, no interactivo) + lista de medios de acceso, en
      `src/components/ComoLlegar.astro` (FR-004; depende de T030)
- [x] T032 [US4] Integrar `ComoLlegar.astro` en `src/pages/index.astro` (depende de
      T010, T031)

**Checkpoint**: Las 4 historias de usuario funcionan de forma independiente

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Mejoras que afectan a varias/todas las historias de usuario

- [x] T033 [P] Configurar optimización de imágenes vía `astro:assets` (formatos
      WebP/AVIF, tamaños responsive) para las imágenes del hero y de actividades en
      `astro.config.mjs` — ya cubierto por `<Image>` con `widths`/`sizes` en
      `Hero.astro` (T014): el build confirma output `.webp` responsive sin config
      adicional (Actividades no tiene imágenes, ver nota de T021)
- [x] T034 [P] Auditoría de contraste WCAG AA en todas las secciones (FR-011, SC-005) —
      revisado manualmente cada combinación texto/fondo (hero sobre el gradiente más
      oscuro, footer, cards, cronograma, CTAs); todas superan 4.5:1. Sin herramienta de
      auditoría automática disponible en este entorno — recomendado correr Lighthouse
      (ver T036) antes de dar el feature por cerrado
- [x] T035 [P] Auditoría de navegación por teclado en Nav, ambos CTAs y todos los links
      (FR-012) — todos los elementos interactivos son `<a>`/`<button>` nativos (sin
      `<div>` con manejadores de click), con `focus-visible` global definido en
      `global.css`; se agregó además un skip-link ("Saltar al contenido") en `Nav.astro`
- [ ] T036 Validar performance: scroll + crossfade del hero a ~60fps en mobile de gama
      media, y Lighthouse Performance ≥ 90 / Accessibility ≥ 90 (SC-004, SC-007,
      `plan.md` → Performance Goals) — **NO completado**: este entorno no tiene
      Chrome/Lighthouse disponible para medir. Verificado en su lugar: build limpio,
      `astro dev`/`astro preview` sirven la página sin errores, y las animaciones solo
      tocan `transform`/`opacity` (nunca layout). Falta la medición real en navegador —
      ver `quickstart.md` → Auditorías automatizadas
- [x] T037 [P] Agregar favicon, `robots.txt` y meta tags (title/description/OG) en
      `public/` y `src/layouts/BaseLayout.astro`
- [x] T038 Configurar el deploy en GitHub Pages con build automático vía GitHub
      Actions — se agregó `.github/workflows/deploy.yml` (`withastro/action` +
      `actions/deploy-pages`, corre en cada push a `main`) y se configuró
      `site`/`base` en `astro.config.mjs` para el subpath `/landing-primavera/`
      del repo. Falta solo que el usuario habilite "GitHub Actions" como fuente
      en Settings → Pages del repo (paso manual de GitHub, no de código).
- [ ] T039 Ejecutar el checklist completo de `quickstart.md` (las 4 historias de
      usuario + los edge cases) de punta a punta antes de dar el feature por terminado —
      **parcial**: verificado por build/inspección de HTML (estructura, atributos,
      contenido, 2 CTAs, orden cronológico, etc. — ver resumen final), pero los pasos
      que requieren interacción real en navegador (click/teclado real, "reducir
      movimiento" del SO, throttling de red, Lighthouse) quedan pendientes de que el
      usuario los corra

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sin dependencias — puede arrancar de inmediato
- **Foundational (Phase 2)**: depende de Setup — BLOQUEA todas las historias de usuario
- **User Stories (Phase 3-6)**: todas dependen de Foundational
  - Pueden avanzar en paralelo (si hay más de una persona) o en orden de prioridad
    (P1 → P2 → P2 → P3)
  - **Excepción de integración**: US3 (T027) integra el CTA dentro de `Hero.astro`, por
    lo que esa tarea puntual depende de que US1 (T014) exista. El resto de US3 (T025,
    T026, T028, T029) es independiente de US1.
- **Polish (Phase 7)**: depende de que las historias de usuario deseadas estén completas

### User Story Dependencies

- **US1 (P1)**: puede arrancar después de Foundational — sin dependencia de otras
  historias
- **US2 (P2)**: puede arrancar después de Foundational — independiente de US1/US3/US4
- **US3 (P2)**: puede arrancar después de Foundational; su CTA "seccion" es
  independiente, su CTA "hero" (T027) se integra sobre US1
- **US4 (P3)**: puede arrancar después de Foundational — independiente del resto

### Within Each User Story

- Datos (`src/data/*.ts`) antes que los componentes que los consumen
- Componentes antes de integrarlos en `src/pages/index.astro`
- US1: el timeline de crossfade (T015) antes que el parallax del hero (T016), porque
  ambos tocan el mismo archivo (`scroll-fx.ts`) y el parallax debe respetar el
  crossfade ya inicializado

### Parallel Opportunities

- T003 puede correr en paralelo a T001/T002 una vez creada la estructura base
- T004–T009 y T011 (Foundational) pueden correr en paralelo entre sí — son archivos
  distintos sin dependencias cruzadas
- Una vez completado Foundational, US1, US2 y US4 pueden avanzar en paralelo (US3
  necesita que exista `Hero.astro` de US1 solo para su tarea T027)
- Dentro de cada historia, las tareas de datos marcadas [P] pueden correr en paralelo

---

## Parallel Example: Foundational (Phase 2)

```bash
# Lanzar en paralelo las tareas de infraestructura compartida (archivos distintos):
Task: "Definir la paleta primaveral en tailwind.config.mjs"
Task: "Crear tipos de contenido en src/types/content-schema.ts"
Task: "Crear BaseLayout.astro en src/layouts/BaseLayout.astro"
Task: "Crear global.css en src/styles/global.css"
Task: "Crear Nav.astro en src/components/Nav.astro"
Task: "Crear Footer.astro en src/components/Footer.astro"
Task: "Crear el esqueleto de scroll-fx.ts en src/scripts/scroll-fx.ts"
```

## Parallel Example: User Story 2

```bash
# Lanzar en paralelo los datos de US2 (archivos distintos):
Task: "Crear actividades.ts en src/data/actividades.ts"
Task: "Crear cronograma.ts en src/data/cronograma.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 solamente)

1. Completar Phase 1: Setup
2. Completar Phase 2: Foundational (CRÍTICO — bloquea todas las historias)
3. Completar Phase 3: User Story 1 (hero + parallax + rotación de fondo)
4. **PARAR y VALIDAR**: probar US1 de forma independiente contra `quickstart.md`
5. Deploy/demo si está listo — ya es un portfolio piece mínimamente presentable

### Incremental Delivery

1. Setup + Foundational → base lista
2. US1 (hero) → validar independientemente → demo (MVP)
3. US2 (actividades/cronograma) → validar independientemente → demo
4. US3 (registro) → validar independientemente → demo
5. US4 (cómo llegar) → validar independientemente → demo
6. Polish (Phase 7) → performance, accesibilidad, deploy final

### Parallel Team Strategy

Con más de una persona: completar Setup + Foundational en conjunto; luego repartir
US1/US2/US4 en paralelo (US3 puede empezar en paralelo también, dejando su tarea T027
para el final, cuando `Hero.astro` de US1 ya exista).

---

## Notes

- [P] = archivos distintos, sin dependencias pendientes
- [Story] mapea cada tarea a su historia de usuario para trazabilidad
- No se generaron tareas de test (ver sección **Tests** arriba); la validación es
  manual vía `quickstart.md` + Lighthouse (T036, T039)
- Commitear después de cada tarea o grupo lógico
- Parar en cualquier checkpoint para validar una historia de forma independiente
