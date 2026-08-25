import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  site: "https://landing-primavera-estudiante.example",
  vite: {
    plugins: [tailwindcss()],
  },
});
