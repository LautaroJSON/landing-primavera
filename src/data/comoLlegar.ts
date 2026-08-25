import type { PuntoDeAcceso } from "../types/content-schema";

// FR-004: referencia estática de acceso (sin mapa interactivo de terceros,
// ver Assumptions del spec).
export const puntoDeAcceso: PuntoDeAcceso = {
  direccionReferencia: "Plaza de Mayo, Buenos Aires",
  mediosDeAcceso: [
    "Subte Línea A — Estación Perú",
    "Subte Línea D — Estación Catedral",
    "Subte Línea E — Estación Bolívar",
    "Colectivos: 22, 29, 64, 86, 152",
  ],
};
