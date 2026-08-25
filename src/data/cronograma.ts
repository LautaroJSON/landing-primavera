import type { CronogramaItem } from "../types/content-schema";
import { actividades } from "./actividades";

// FR-003: cronograma ordenado cronológicamente, referenciando Actividad.id.
export const cronograma: CronogramaItem[] = [
  { hora: "10:00", actividadId: "apertura-bienvenida" },
  { hora: "11:00", actividadId: "feria-talleres" },
  { hora: "13:00", actividadId: "food-trucks" },
  { hora: "15:00", actividadId: "murga-batucada" },
  { hora: "17:00", actividadId: "recital-bandas" },
  { hora: "19:00", actividadId: "cierre-dj-sorteos" },
];

const actividadIds = new Set(actividades.map((actividad) => actividad.id));
const actividadIdsEnCronograma = new Set<string>();

for (const item of cronograma) {
  if (!actividadIds.has(item.actividadId)) {
    throw new Error(
      `cronograma.ts: actividadId "${item.actividadId}" no existe en actividades.ts`,
    );
  }
  if (actividadIdsEnCronograma.has(item.actividadId)) {
    throw new Error(
      `cronograma.ts: actividadId "${item.actividadId}" está duplicado en el cronograma`,
    );
  }
  actividadIdsEnCronograma.add(item.actividadId);
}
