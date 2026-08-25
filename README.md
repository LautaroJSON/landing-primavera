# Festival de la Primavera y el Estudiante

Landing de una sola página para un evento **100% ficticio** ("Festival de la
Primavera y el Estudiante", 21 de septiembre en Plaza de Mayo, Buenos Aires),
construida como pieza de portfolio de diseño/desarrollo web. No tiene
afiliación real con ningún organismo de gobierno — ver el disclaimer en el
footer del sitio.

🔗 **Demo**: https://lautarojson.github.io/landing-primavera/

## Qué incluye

- **Hero** con nombre, fecha y lugar del evento visibles sin necesidad de
  scroll, con un fondo que rota entre imágenes por crossfade y un efecto
  parallax fluido (GSAP + ScrollTrigger, animando solo `transform`/`opacity`).
- **Actividades** y **Cronograma** con el programa del día, ordenado
  cronológicamente.
- **Cómo llegar**, con la referencia de ubicación/transporte y un **mapa
  interactivo** (Leaflet + tiles de OpenStreetMap/CartoDB Positron) centrado en
  Plaza de Mayo. El mapa se carga de forma diferida (`IntersectionObserver` +
  `import()` dinámico) recién cuando la sección entra en el viewport, para no
  afectar el tiempo de carga inicial; si no llega a cargar, la referencia
  textual queda como respaldo.
- **CTA de registro** simulado (sin backend, sin datos personales) repetido en
  el hero y antes del footer.
- **Footer** con el disclaimer de proyecto ficticio, presente en toda la
  página.
- Mobile-first, `prefers-reduced-motion` respetado, contraste WCAG AA y
  navegación completa por teclado con foco visible.

## Stack

- [Astro](https://astro.build/) (`output: 'static'`, sitio 100% estático)
- [Tailwind CSS v4](https://tailwindcss.com/) (tokens de diseño CSS-first vía
  `@theme` en `src/styles/global.css`)
- [GSAP](https://gsap.com/) + `ScrollTrigger` para el parallax y la rotación
  de fondo del hero
- [Leaflet](https://leafletjs.com/) para el mapa interactivo de "Cómo llegar"
- `astro:assets` para la optimización de imágenes (WebP responsive)

Sin base de datos ni backend: todo el contenido es TypeScript tipado en
`src/data/`.

## Desarrollo

Requiere Node.js 20+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build de producción en dist/
npm run preview   # sirve el build de dist/ localmente
npm run lint       # ESLint
npm run format     # Prettier (incluye .astro)
```

## Estructura del proyecto

```
src/
├── layouts/BaseLayout.astro   # <html>/<head>, fuentes, meta tags
├── pages/index.astro          # ensambla todas las secciones
├── components/                # una sección/pieza de UI por archivo
├── scripts/scroll-fx.ts       # parallax + crossfade del hero (GSAP)
├── data/                      # contenido ficticio tipado (evento, agenda, etc.)
├── types/content-schema.ts    # contrato de tipos del contenido
└── styles/global.css          # paleta, tipografía y tokens de diseño
```

## Deploy

El sitio se despliega en **GitHub Pages** vía GitHub Actions
(`.github/workflows/deploy.yml`): cada push a `main` corre `astro build` y
publica `dist/`. Como el repo no es del tipo `usuario.github.io`, `astro.config.mjs`
define `site`/`base` para servir el sitio en el subpath `/landing-primavera/`.

Para que el deploy funcione en un repo nuevo, hay que habilitarlo una vez de
forma manual: **Settings → Pages → Build and deployment → Source → GitHub
Actions**.

## Documentación del feature

Este proyecto se desarrolló con metodología [spec-kit](https://github.com/github/spec-kit):
la especificación completa (historias de usuario, requisitos funcionales,
criterios de aceptación), el plan técnico y las tareas de implementación están
en [`specs/001-landing-primavera-estudiante/`](specs/001-landing-primavera-estudiante/).
Las reglas de negocio no negociables del sitio (disclaimer de ficción,
mobile-first, parallax sin degradar performance, etc.) están en
[`.specify/memory/constitution.md`](.specify/memory/constitution.md).
