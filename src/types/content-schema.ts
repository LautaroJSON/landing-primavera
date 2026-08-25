// Contrato de datos de contenido — ver specs/001-landing-primavera-estudiante/
// contracts/content-schema.ts y data-model.md.

export interface Evento {
  nombre: string;
  /** ISO date string, ej. "2026-09-21" */
  fecha: string;
  lugar: string;
  descripcionCorta: string;
}

export interface Actividad {
  /** slug único, ej. "taller-huerta" */
  id: string;
  titulo: string;
  descripcion: string;
  /** Obligatorio si la actividad tiene imagen asociada (FR-013). */
  imagenAlt?: string;
}

export interface CronogramaItem {
  /** formato 24h "HH:mm", usado para ordenar cronológicamente (FR-003) */
  hora: string;
  /** referencia lógica a Actividad.id */
  actividadId: string;
  notaHorario?: string;
}

export interface PuntoDeAcceso {
  direccionReferencia: string;
  /** al menos un elemento (FR-004) */
  mediosDeAcceso: string[];
}

export type EstadoRegistro = "idle" | "confirmado";

export interface ImagenDeFondoHero {
  /** orden en la rotación (0-indexed) */
  orden: number;
  /** import de astro:assets (ImageMetadata) para la imagen fuente */
  src: ImageMetadata;
  alt: string;
}
