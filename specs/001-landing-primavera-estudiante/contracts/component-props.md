# Contrato de props de componentes (Phase 1)

Sitio estático sin API — este es el contrato de interfaz relevante: qué props
recibe cada componente Astro obligatorio (spec §User Scenarios / Requirements) y
qué requisito(s) funcional(es) satisface. Los tipos referenciados están en
`content-schema.ts`.

| Componente          | Props                                                                                      | FR relacionados                 |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------- |
| `Hero.astro`        | `evento: Evento`                                                                           | FR-001                          |
| `Actividades.astro` | `actividades: Actividad[]`                                                                 | FR-002, FR-013                  |
| `Cronograma.astro`  | `items: CronogramaItem[]`, `actividades: Actividad[]`                                      | FR-003                          |
| `ComoLlegar.astro`  | `punto: PuntoDeAcceso`                                                                     | FR-004                          |
| `CtaRegistro.astro` | `variante: 'hero' \| 'seccion'` (para el copy/estilo según dónde se renderiza, ver FR-005) | FR-005, FR-006, FR-014, FR-016  |
| `Footer.astro`      | _(sin props — el disclaimer de proyecto ficticio es contenido fijo)_                       | FR-007                          |
| `Nav.astro`         | `secciones: { id: string; label: string }[]`                                               | FR-012 (navegación por teclado) |

## Comportamiento de `CtaRegistro.astro` (contrato de interacción)

Dado que no hay backend, el "contrato" de este componente es su comportamiento en
cliente, no un endpoint:

1. **Estado inicial**: `estado = 'idle'`, botón habilitado con copy de registro
   (sin lenguaje de urgencia — FR-016).
2. **On click/Enter/Space** (activable por teclado — FR-012): transiciona a
   `estado = 'confirmado'`, muestra confirmación visible y accesible (anunciable
   por lector de pantalla, ej. vía `aria-live="polite"`) — FR-006, FR-014.
   2a. **Clicks repetidos estando en `'confirmado'`**: no debe crear una nueva
   confirmación duplicada ni cambiar de estado de forma confusa (idempotente) —
   edge case del spec.
3. **No hay llamada de red**: el componente no envía datos a ningún servicio
   externo ni backend (FR-014).
4. **El estado no persiste** entre cargas de página (no hay `localStorage` ni
   cookies involucrados) — se resetea a `'idle'` en cada carga.

## Comportamiento de `scroll-fx.ts` (contrato del módulo de animación)

No es un componente Astro sino el módulo que inicializa GSAP/ScrollTrigger/Lenis
para los elementos con un data-attribute de parallax (ej. `data-parallax-speed`).
Contrato:

- **Input**: elementos del DOM marcados con `data-parallax-speed="<number>"`.
- **Comportamiento**: si `matchMedia('(prefers-reduced-motion: reduce)')` es
  `true`, el módulo NO inicializa ScrollTrigger/Lenis para esos elementos — quedan
  en su posición final estática (FR-009). Si es `false`, inicializa el parallax
  ligado al scroll usando `transform`/`opacity` (Constitución Principio III).
- **Output**: ningún elemento de contenido queda oculto u inaccesible en ningún
  caso — el parallax es una mejora visual, nunca una condición para ver el
  contenido (edge case del spec sobre JS deshabilitado/reduced motion).
