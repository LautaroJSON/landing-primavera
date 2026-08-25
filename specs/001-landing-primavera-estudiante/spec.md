# Feature Specification: Landing del Festival de la Primavera y el Estudiante

**Feature Branch**: `001-landing-primavera-estudiante`

**Created**: 2026-08-25

**Status**: Draft

**Input**: User description: "Landing page para promocionar un evento ficticio del gobierno de la Ciudad de Buenos Aires por el Día de la Primavera y del Estudiante (21 de septiembre), en Plaza de Mayo. Dirigido a estudiantes, adolescentes y familias. Debe incluir: hero con fecha y ubicación, sección de actividades, cronograma, cómo llegar, y un CTA de registro. Debe verse pulida y usar un efecto parallax notorio en el scroll"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Descubrir el evento de un vistazo (Priority: P1)

Un visitante (estudiante, adolescente o familia) llega a la landing desde un link
compartido y, sin necesidad de scrollear, entiende de qué evento se trata, cuándo es
(21 de septiembre) y dónde es (Plaza de Mayo, Buenos Aires).

**Why this priority**: Es el valor mínimo indispensable de una landing de evento: si el
visitante no capta qué/cuándo/dónde en los primeros segundos, el resto del sitio no
importa. Sin esto no hay MVP.

**Independent Test**: Se puede probar completamente cargando la página en un viewport
mobile y desktop y verificando que el nombre del evento, la fecha y el lugar son
visibles sin scrollear, sin depender de ninguna otra sección.

**Acceptance Scenarios**:

1. **Given** un visitante abre la landing por primera vez en su celular, **When** la
   página termina de cargar, **Then** ve el nombre del evento, "21 de septiembre" y
   "Plaza de Mayo, Buenos Aires" sin necesidad de hacer scroll.
2. **Given** un visitante abre la landing en desktop, **When** la página carga,
   **Then** ve la misma información esencial (nombre, fecha, lugar) sin scroll.

---

### User Story 2 - Explorar actividades y cronograma (Priority: P2)

Un visitante interesado quiere saber qué va a pasar durante el evento y a qué hora,
para decidir si le interesa asistir y cuándo.

**Why this priority**: Aporta el contenido que convierte el interés inicial en una
decisión de asistencia; es el segundo motivo más fuerte por el que alguien visita una
landing de evento, después de saber qué/cuándo/dónde.

**Independent Test**: Se puede probar navegando directamente a la sección de
actividades/cronograma y verificando que lista actividades con sus horarios, sin
necesidad de haber interactuado con otras secciones.

**Acceptance Scenarios**:

1. **Given** un visitante scrollea hasta la sección de actividades, **When** la
   sección se muestra, **Then** ve una lista de actividades del evento con una breve
   descripción de cada una.
2. **Given** un visitante scrollea hasta el cronograma, **When** la sección se
   muestra, **Then** ve los horarios asociados a cada actividad ordenados
   cronológicamente.

---

### User Story 3 - Registrarse para asistir (Priority: P2)

Un visitante que ya decidió que quiere ir busca una acción clara para confirmar su
interés o asistencia.

**Why this priority**: Es el objetivo de conversión del sitio (llamado a la acción),
pero solo tiene sentido una vez que el visitante ya entendió el evento (US1) y, en
muchos casos, revisó el programa (US2).

**Independent Test**: Se puede probar localizando el CTA de registro desde cualquier
punto de scroll relevante, activándolo, y verificando que el visitante recibe una
confirmación clara de que su acción fue registrada.

**Acceptance Scenarios**:

1. **Given** un visitante decide asistir, **When** hace clic en el CTA de registro,
   **Then** el sistema le muestra una confirmación clara de que su registro fue
   recibido.
2. **Given** un visitante en cualquier parte de la página, **When** busca cómo
   registrarse, **Then** encuentra un CTA de registro visible y accesible sin tener
   que buscar en exceso (por ejemplo, repetido en el hero y cerca del cierre de la
   página).

---

### User Story 4 - Saber cómo llegar (Priority: P3)

Un visitante que ya decidió asistir necesita saber cómo llegar a Plaza de Mayo.

**Why this priority**: Es información de soporte logístico; valiosa pero secundaria
frente a saber qué es el evento y poder registrarse.

**Independent Test**: Se puede probar navegando a la sección "Cómo llegar" y
verificando que contiene una referencia clara a la ubicación, opciones de acceso y
un mapa interactivo centrado en Plaza de Mayo, sin depender de otras secciones; y
verificando en la pestaña Network que el mapa no descarga nada hasta que la
sección entra en el viewport.

**Acceptance Scenarios**:

1. **Given** un visitante scrollea hasta "Cómo llegar", **When** la sección se
   muestra, **Then** ve la dirección/referencia de ubicación (Plaza de Mayo, Buenos
   Aires) y al menos una referencia de cómo acceder (por ejemplo, transporte público
   cercano).
2. **Given** un visitante llega a la sección "Cómo llegar" con JavaScript
   habilitado, **When** el mapa interactivo entra en el viewport, **Then** ve un
   mapa centrado en Plaza de Mayo con un marcador que señala el punto del evento,
   y puede desplazarlo/acercarlo con mouse, touch o teclado.
3. **Given** un visitante recién carga la landing, **When** el hero termina de
   renderizarse, **Then** el mapa interactivo de "Cómo llegar" todavía no
   descargó su JavaScript ni sus tiles (verificable en la pestaña Network del
   navegador), de forma que no afecta el tiempo de carga inicial.
4. **Given** un visitante cuyo navegador no ejecuta JavaScript o cuya conexión
   falla al cargar el mapa, **When** llega a la sección "Cómo llegar", **Then**
   sigue viendo la dirección de referencia y los medios de acceso en texto, sin
   que la sección quede vacía o rota.

---

### Edge Cases

- ¿Qué ve un visitante que abre la landing con JavaScript deshabilitado o con el
  efecto parallax desactivado (ej. usuario con "reducir movimiento" activado en su
  sistema)? El contenido esencial (hero, actividades, cronograma, cómo llegar, CTA)
  debe seguir siendo legible y usable sin el efecto parallax.
- ¿Qué pasa si un visitante hace clic en el CTA de registro más de una vez? El
  sistema debe evitar mostrar confirmaciones duplicadas o estados confusos.
- ¿Qué ve un visitante con una conexión lenta mientras las imágenes de fondo del
  parallax todavía están cargando? El contenido de texto esencial (hero, horarios)
  debe ser legible antes de que las imágenes terminen de cargar.
- ¿Qué ve un visitante que navega solo con teclado? Debe poder llegar al CTA de
  registro y a todos los links de navegación mediante tabulación, con foco visible.
- ¿Qué pasa si un visitante hace scroll justo mientras el fondo del hero está
  rotando de una imagen a otra? El efecto parallax debe seguir respondiendo al
  scroll con fluidez, sin saltos ni interrupciones, independientemente del estado
  de la rotación/crossfade de fondo.
- ¿Qué ve un visitante con "reducir movimiento" activado respecto de la rotación
  de imágenes del hero? La rotación automática de fondos se detiene o se muestra
  sin animación de crossfade (cambio directo, sin transición), igual que el resto
  de las animaciones de scroll (ver FR-018).
- ¿Qué ve un visitante si el mapa interactivo de "Cómo llegar" no llega a cargar
  (falla de red o JavaScript deshabilitado)? Debe seguir viendo la dirección de
  referencia y los medios de acceso en texto (ver FR-004); la sección no debe
  quedar vacía ni mostrar un error visible.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar en el hero, sin necesidad de scroll, el nombre
  del evento ("Festival de la Primavera y el Estudiante"), la fecha (21 de
  septiembre) y el lugar (Plaza de Mayo, Buenos Aires).
- **FR-002**: El sistema DEBE presentar una sección de actividades que liste las
  actividades disponibles durante el evento, cada una con una breve descripción.
- **FR-003**: El sistema DEBE presentar un cronograma del evento que asocie
  actividades con horarios, ordenado cronológicamente.
- **FR-004**: El sistema DEBE incluir una sección "Cómo llegar" con la referencia de
  ubicación (Plaza de Mayo, Buenos Aires) y al menos una referencia de acceso (por
  ejemplo, líneas de transporte público cercanas).
- **FR-005**: El sistema DEBE ofrecer un llamado a la acción (CTA) de registro,
  visible y accesible desde múltiples puntos de scroll de la página (como mínimo en
  el hero y en una sección posterior).
- **FR-006**: Al activar el CTA de registro, el sistema DEBE mostrar una confirmación
  clara al visitante de que su acción fue recibida.
- **FR-007**: El sistema DEBE mostrar en el footer, de forma visible, una aclaración
  de que el evento y el sitio son un proyecto ficticio de portfolio, sin validez
  oficial ni afiliación real con el Gobierno de la Ciudad de Buenos Aires.
- **FR-008**: El sistema DEBE implementar un efecto parallax notorio durante el
  scroll como elemento distintivo visual, sin degradar la fluidez percibida del
  scroll.
- **FR-009**: El sistema DEBE respetar la preferencia de "reducir movimiento" del
  sistema operativo del visitante, atenuando o desactivando el efecto parallax sin
  ocultar contenido cuando esa preferencia está activa.
- **FR-010**: El sistema DEBE ser completamente legible y usable en viewport mobile
  antes que en desktop (mobile-first), sin cortes de texto ni scroll horizontal no
  intencional.
- **FR-011**: El sistema DEBE cumplir contraste de color mínimo WCAG AA en todo texto,
  incluyendo texto superpuesto a las imágenes del efecto parallax.
- **FR-012**: El sistema DEBE ser navegable con teclado, incluyendo el CTA de
  registro y todos los links de navegación, con foco visible.
- **FR-013**: El sistema DEBE proveer texto alternativo descriptivo en toda imagen
  con significado (por ejemplo, imágenes de las actividades).
- **FR-014**: El CTA de registro DEBE mostrar una confirmación simulada al
  activarse, sin capturar ni almacenar ningún dato personal real del visitante y sin
  requerir backend ni servicios externos.
- **FR-015**: El sitio DEBE estar disponible únicamente en español.
- **FR-016**: El CTA de registro NO DEBE incluir lenguaje de urgencia o escasez
  (por ejemplo, "cupos limitados"); el registro se comunica como abierto, con tono
  institucional y cercano.
- **FR-017**: El fondo del hero (capa de parallax) DEBE rotar automáticamente
  entre varias imágenes cada 5 segundos, con una transición de crossfade suave
  entre una imagen y la siguiente, sin intervención del visitante.
- **FR-018**: La rotación automática de imágenes de fondo del hero NO DEBE
  interrumpir, reiniciar ni entrar en conflicto con el efecto de parallax del
  scroll (FR-008): ambos comportamientos deben poder ocurrir simultáneamente sin
  saltos visuales. Además, cuando el visitante tiene activada la preferencia de
  "reducir movimiento" (FR-009), el sistema DEBE detener la rotación automática o
  quitar la animación de crossfade (cambio directo entre imágenes, si es que
  continúan rotando).
- **FR-019**: El sistema DEBE mostrar, dentro de la sección "Cómo llegar", un
  mapa interactivo (tiles de OpenStreetMap/CartoDB Positron) centrado en Plaza
  de Mayo, Buenos Aires, con un marcador que identifique el punto de encuentro
  del evento; el visitante DEBE poder desplazarlo y acercarlo/alejarlo con
  mouse, touch o teclado.
- **FR-020**: El mapa interactivo (FR-019) NO DEBE afectar el tiempo de carga
  inicial de la página: su JavaScript y sus tiles se cargan de forma diferida,
  únicamente cuando la sección "Cómo llegar" entra en el viewport del
  visitante.
- **FR-021**: Si el mapa interactivo (FR-019) no llega a cargar (falla de red o
  JavaScript deshabilitado), el sistema DEBE seguir mostrando la referencia
  textual de ubicación y los medios de acceso (FR-004) sin que la sección quede
  vacía o rota.

### Key Entities

- **Evento**: Representa el "Festival de la Primavera y el Estudiante"; atributos
  clave: nombre, fecha, lugar, descripción general.
- **Actividad**: Una actividad puntual dentro del evento; atributos clave: título,
  descripción breve, horario, posiblemente ubicación dentro de la plaza.
- **Registro/Interés**: Representa la acción de un visitante confirmando su interés
  en asistir; es un estado de confirmación efímero en el cliente (sin datos
  personales capturados ni persistidos), según FR-014.
- **ImagenDeFondoHero**: Una imagen dentro del set que rota en el fondo del hero
  (FR-017); atributos clave: orden en la rotación, texto alternativo. El conjunto
  tiene como mínimo 2 imágenes (para que "rotar" tenga sentido); ver Assumptions
  para el tamaño sugerido del set.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: El 100% de los visitantes en un viewport mobile estándar (375px de
  ancho) ve el nombre del evento, la fecha y el lugar sin necesidad de hacer scroll.
- **SC-002**: Un visitante puede identificar cómo llegar al evento (ubicación y
  medio de acceso) en menos de 30 segundos desde que entra a la página.
- **SC-003**: Un visitante puede completar la acción de registro/CTA en menos de 15
  segundos desde que decide hacerlo.
- **SC-004**: El scroll de la página, incluyendo el efecto parallax, se percibe
  fluido (sin trabas visibles) en un dispositivo móvil de gama media.
- **SC-005**: El 100% del texto de la página cumple el contraste mínimo WCAG AA,
  verificable con una herramienta estándar de auditoría de accesibilidad.
- **SC-006**: El 100% de las páginas del sitio muestra la aclaración de proyecto
  ficticio de portfolio en el footer.
- **SC-007**: El fondo del hero cambia de imagen automáticamente sin intervención
  del visitante, con una transición percibida como suave (sin parpadeo ni salto
  abrupto) en el 100% de las rotaciones, mientras el scroll y el efecto parallax
  siguen respondiendo con fluidez en simultáneo (consistente con SC-004).
- **SC-008**: El mapa interactivo de "Cómo llegar" no descarga JavaScript ni
  tiles hasta que la sección entra en el viewport, verificable en la pestaña
  Network del navegador inmediatamente después de que carga el hero (consistente
  con FR-020).

## Assumptions

- El evento es de acceso libre y gratuito (no se manejan precios de entrada ni
  proceso de pago).
- El contenido del cronograma y las actividades es ficticio e inventado
  específicamente para este proyecto de portfolio; no representa programación real.
- La landing es de una sola página (single-page) con navegación por scroll/anclas
  entre secciones, sin rutas adicionales.
- "Cómo llegar" combina la referencia textual (dirección, transporte público)
  con un mapa interactivo propio (Leaflet + tiles de OpenStreetMap/CartoDB
  Positron, ver FR-019/FR-020/FR-021) en lugar de un `<iframe>` embebido de un
  proveedor externo (ej. Google Maps): esto da control total de estilos/marca
  (marcador e interfaz del mapa reutilizan la paleta del sitio) y permite
  diferir su carga hasta que la sección entra en viewport, algo que un iframe
  de terceros no garantiza. La referencia textual se mantiene siempre visible
  como fallback si el mapa no carga (FR-021).
- No se requiere un sistema de autenticación ni cuentas de usuario.
- El footer con la aclaración de proyecto ficticio (FR-007) aplica a toda la página,
  dado que es un sitio de una sola página.
- El set de imágenes que rota en el fondo del hero (FR-017) es un conjunto fijo y
  chico (sugerido: 3–5 imágenes ilustrativas de temática primaveral/estudiantil),
  empaquetado con el sitio como asset estático; no se requiere carga dinámica
  desde un backend ni un CMS.
