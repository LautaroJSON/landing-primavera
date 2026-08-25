import type { Actividad } from "../types/content-schema";

// FR-002: contenido ficticio de actividades del evento (ver spec.md → Assumptions).
export const actividades: Actividad[] = [
  {
    id: "apertura-bienvenida",
    titulo: "Apertura y bienvenida",
    descripcion:
      "Arrancamos la jornada con la bienvenida oficial y una recorrida por " +
      "todos los stands del festival.",
  },
  {
    id: "feria-talleres",
    titulo: "Feria de talleres estudiantiles",
    descripcion:
      "Talleres cortos de arte, huerta urbana y robótica armados por " +
      "estudiantes de escuelas de la ciudad.",
  },
  {
    id: "food-trucks",
    titulo: "Food trucks y espacio de descanso",
    descripcion:
      "Zona de comida y mesas a la sombra para parar, comer algo y " +
      "recargar energía entre actividad y actividad.",
  },
  {
    id: "murga-batucada",
    titulo: "Concurso de murga y batucada",
    descripcion:
      "Competencia amistosa entre murgas y batucadas estudiantiles, con el " +
      "público como jurado.",
  },
  {
    id: "recital-bandas",
    titulo: "Recital de bandas estudiantiles",
    descripcion:
      "Bandas formadas en talleres de música de distintas escuelas suben al " +
      "escenario principal.",
  },
  {
    id: "cierre-dj-sorteos",
    titulo: "Cierre con DJ set y sorteos",
    descripcion:
      "Cerramos el festival con un DJ set y sorteos de merchandising del " +
      "evento entre los asistentes registrados.",
  },
];
