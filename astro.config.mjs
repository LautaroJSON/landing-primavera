import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  // GitHub Pages sirve este repo como project page en /landing-primavera/
  // (no es un repo <usuario>.github.io), por eso hace falta `base`.
  site: "https://lautarojson.github.io",
  base: "/landing-primavera/",
  vite: {
    plugins: [tailwindcss()],
  },
});
