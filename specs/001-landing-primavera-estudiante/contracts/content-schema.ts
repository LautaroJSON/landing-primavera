// Contrato de datos de contenido (Phase 1).
// No hay API HTTP: este es el "contrato" que consumen los componentes Astro,
// definido como tipos TypeScript que src/data/*.ts debe satisfacer.
// Ver data-model.md para la descripción semántica de cada campo.

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
  /**
   * Obligatorio si la actividad tiene imagen asociada (FR-013).
   * No puede ser un string vacío ni un alt genérico como "imagen".
   */
  imagenAlt?: string;
}

export interface CronogramaItem {
  /** formato 24h "HH:mm", usado para ordenar cronológicamente (FR-003) */
  hora: string;
  /** referencia lógica a Actividad.id — debe existir en la colección de actividades */
  actividadId: string;
  notaHorario?: string;
}

export interface PuntoDeAcceso {
  direccionReferencia: string;
  /** al menos un elemento (FR-004) */
  mediosDeAcceso: string[];
}

export type EstadoRegistro = "idle" | "confirmado";
