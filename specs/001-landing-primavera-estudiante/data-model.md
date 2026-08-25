# Data Model: Landing del Festival de la Primavera y el Estudiante

No hay base de datos ni backend (ver Technical Context: Storage = N/A). Este
documento describe la forma de los datos de contenido que consumen los componentes
Astro (definidos como literales TypeScript tipados en `src/data/`, ver
`research.md` §9) y el único estado de interacción en cliente (confirmación de
registro).

## Evento

Representa el evento ficticio en sí. Es un único registro fijo, no una colección.

| Campo              | Tipo                        | Notas                                                    |
| ------------------ | --------------------------- | -------------------------------------------------------- |
| `nombre`           | `string`                    | "Festival de la Primavera y el Estudiante"               |
| `fecha`            | `string` (ISO `2026-09-21`) | Se formatea en UI como "21 de septiembre"                |
| `lugar`            | `string`                    | "Plaza de Mayo, Buenos Aires"                            |
| `descripcionCorta` | `string`                    | Copy del hero, tono institucional-cercano (Principio IV) |

**Validación**: `fecha` DEBE ser una fecha ISO válida; `nombre`/`lugar` no vacíos
(consumidos directamente por FR-001).

## Actividad

Una actividad puntual del evento (FR-002).

| Campo         | Tipo     | Notas                                                                            |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| `id`          | `string` | slug único, usado como `key` de lista y ancla opcional                           |
| `titulo`      | `string` | Nombre de la actividad                                                           |
| `descripcion` | `string` | Descripción breve (1–2 oraciones)                                                |
| `imagenAlt`   | `string` | Texto alternativo descriptivo (FR-013), obligatorio si la actividad tiene imagen |

**Validación**: `id` único dentro de la colección; `titulo`/`descripcion` no
vacíos; si la actividad define una imagen, `imagenAlt` es obligatorio (no puede ser
string vacío ni genérico tipo "imagen").

## CronogramaItem

Un ítem de horario que asocia una `Actividad` a un momento del día (FR-003).

| Campo         | Tipo                            | Notas                                  |
| ------------- | ------------------------------- | -------------------------------------- |
| `hora`        | `string` (formato `HH:mm`, 24h) | Usado para el ordenamiento cronológico |
| `actividadId` | `string`                        | Referencia a `Actividad.id`            |
| `notaHorario` | `string?`                       | Opcional, ej. "Apertura de puertas"    |

**Relación**: `CronogramaItem.actividadId` → `Actividad.id` (referencia lógica, no
FK real ya que no hay base de datos; se valida en build/desarrollo que todo
`actividadId` exista en la colección de `Actividad`).

**Validación**: la colección de `CronogramaItem` DEBE poder ordenarse
cronológicamente por `hora` (FR-003); no se permiten dos ítems con `actividadId`
repetido dentro del mismo cronograma.

## PuntoDeAcceso (Cómo llegar)

Referencia estática de acceso al lugar del evento (FR-004).

| Campo                 | Tipo       | Notas                                                                      |
| --------------------- | ---------- | -------------------------------------------------------------------------- |
| `direccionReferencia` | `string`   | "Plaza de Mayo, Buenos Aires"                                              |
| `mediosDeAcceso`      | `string[]` | Ej. líneas de subte/colectivo cercanas (contenido ficticio pero plausible) |

**Validación**: `mediosDeAcceso` DEBE tener al menos un elemento (FR-004 exige "al
menos una referencia de acceso").

## RegistroInteres (estado de interacción, no entidad persistida)

Estado efímero en el cliente que representa la confirmación simulada del CTA de
registro (FR-014). No es una entidad de datos con almacenamiento — es un estado de
UI.

| Campo    | Tipo                     | Notas                                          |
| -------- | ------------------------ | ---------------------------------------------- |
| `estado` | `'idle' \| 'confirmado'` | Transiciona a `'confirmado'` al activar el CTA |

**Reglas de transición de estado**:

- `idle → confirmado`: al hacer click/activar el CTA de registro.
- `confirmado → confirmado`: clicks adicionales del CTA mientras ya está
  confirmado NO deben generar una nueva confirmación duplicada ni un estado
  confuso (Edge Case del spec) — el CTA pasa a un estado deshabilitado/visual
  distinto una vez confirmado, o el mensaje de confirmación simplemente se
  vuelve a mostrar de forma idempotente.
- No hay persistencia entre cargas de página (FR-014): al recargar, el estado
  vuelve a `idle`.

## Config de accesibilidad de movimiento

No es una "entidad" de contenido, pero se documenta aquí por completitud: el
estado de `prefers-reduced-motion` del sistema operativo del visitante (booleano
derivado de `matchMedia`, no almacenado) determina si `scroll-fx.ts` inicializa
el parallax con animación o en su variante estática (FR-009). Ver
`research.md` §4.
