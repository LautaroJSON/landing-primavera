# Quickstart: Landing del Festival de la Primavera y el Estudiante

Guía de validación end-to-end para comprobar que el feature funciona según el
spec. No incluye código de implementación — eso corresponde a `tasks.md` y a la
fase de implementación.

## Prerrequisitos

- Node.js 20 LTS y un gestor de paquetes (`npm`/`pnpm`).
- Proyecto Astro inicializado con las dependencias de `plan.md` (Astro, Tailwind,
  GSAP + ScrollTrigger, Lenis, `astro:assets`) instaladas.

## Setup

```bash
npm install
npm run dev
```

Abrir la URL local (por defecto `http://localhost:4321`).

## Validación por escenario de aceptación

Ejecutar cada paso en **viewport mobile** (375px de ancho, ej. DevTools mobile
emulation) y repetir los relevantes en desktop.

### US1 — Descubrir el evento de un vistazo (P1)

1. Cargar la página sin scrollear.
2. **Esperado**: nombre del evento, "21 de septiembre" y "Plaza de Mayo, Buenos
   Aires" visibles en el viewport inicial, en mobile y en desktop (SC-001).

### US2 — Explorar actividades y cronograma (P2)

1. Scrollear hasta la sección de actividades.
2. **Esperado**: lista de actividades con descripción breve.
3. Scrollear hasta el cronograma.
4. **Esperado**: horarios ordenados cronológicamente, cada uno asociado a una
   actividad.

### US3 — Registrarse para asistir (P2)

1. Localizar el CTA de registro (debe existir al menos en el hero y en una
   sección posterior — FR-005).
2. Activar el CTA con click y, por separado, con teclado (Tab hasta el botón +
   Enter/Space).
3. **Esperado**: confirmación clara y accesible se muestra en ambos casos, en
   menos de lo que tarda un click (SC-003); ningún dato personal se envía a
   ningún servicio (verificar en la pestaña Network del navegador que no hay
   requests salientes al activar el CTA).
4. Repetir el click sobre el CTA ya confirmado.
5. **Esperado**: no aparecen confirmaciones duplicadas ni un estado confuso.

### US4 — Saber cómo llegar (P3)

1. Scrollear hasta "Cómo llegar".
2. **Esperado**: referencia a Plaza de Mayo, Buenos Aires y al menos un medio de
   acceso (ej. transporte público) visibles (SC-002).

## Validación de edge cases

- **Reduced motion**: activar "reducir movimiento" en el SO (macOS: Accessibility
  → Display → Reduce motion; Windows: Settings → Ease of Access → Show animations)
  y recargar. **Esperado**: todo el contenido sigue siendo legible y usable, sin
  el efecto de parallax animado (FR-009).
- **Teclado únicamente**: navegar toda la página solo con Tab/Shift+Tab/Enter.
  **Esperado**: se puede llegar a cada link de navegación y al CTA de registro,
  con foco visible en todo momento (FR-012).
- **Conexión lenta**: en DevTools, throttle a "Slow 4G" y recargar. **Esperado**:
  el texto del hero y los horarios son legibles antes de que las imágenes de
  fondo terminen de cargar.

## Auditorías automatizadas

```bash
npm run build
npm run preview
# Sobre la URL de preview:
npx lighthouse <preview-url> --view
```

**Esperado**: Performance ≥ 90 y Accessibility ≥ 90 en mobile (ver Performance
Goals en `plan.md`); 0 errores de contraste reportados por Lighthouse
(alineado con SC-005 / FR-011).

## Checklist final antes de considerar el feature listo

- [ ] Los 4 escenarios de aceptación (US1–US4) pasan en mobile y desktop.
- [ ] El footer con el disclaimer de proyecto ficticio es visible (FR-007 / SC-006).
- [ ] Ningún símbolo oficial real de Argentina/CABA está presente (Constitución
      Principio I).
- [ ] `prefers-reduced-motion` respetado (FR-009).
- [ ] Navegación completa por teclado, con foco visible (FR-012).
- [ ] Lighthouse Performance ≥ 90 y Accessibility ≥ 90 en mobile.
