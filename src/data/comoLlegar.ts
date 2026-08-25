import type { PuntoDeAcceso } from "../types/content-schema";

// FR-004/FR-019: referencia de acceso + coordenadas del marcador del mapa
// interactivo (ver Assumptions del spec).
export const puntoDeAcceso: PuntoDeAcceso = {
  direccionReferencia: "Plaza de Mayo, Buenos Aires",
  mediosDeAcceso: [
    "Subte Línea A — Estación Perú",
    "Subte Línea D — Estación Catedral",
    "Subte Línea E — Estación Bolívar",
    "Colectivos: 22, 29, 64, 86, 152",
  ],
  lat: -34.60837,
  lng: -58.3716,
};
