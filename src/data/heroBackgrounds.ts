import type { ImagenDeFondoHero } from "../types/content-schema";
import plazaDeMayo1 from "../assets/images/hero/plaza-de-mayo-1.jpg";
import plazaDeMayo2 from "../assets/images/hero/plaza-de-mayo-2.jpg";

// FR-017: set de imágenes que rota en el fondo del hero (mínimo 2, ver Assumptions
// del spec para el tamaño sugerido de 3-5).
export const heroBackgrounds: ImagenDeFondoHero[] = [
  {
    orden: 0,
    src: plazaDeMayo1,
    alt: "Plaza de Mayo con árboles en flor durante la primavera porteña",
  },
  {
    orden: 1,
    src: plazaDeMayo2,
    alt: "Vista de Plaza de Mayo con estudiantes reunidos en un día soleado",
  },
];
