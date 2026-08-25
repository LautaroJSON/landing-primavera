import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// FR-009: toda animación de scroll queda condicionada a esta media query.
// Fuera de este contexto ("reduce"), gsap.matchMedia() no ejecuta el callback,
// así que los elementos quedan en su posición/estado final estático por defecto.
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Los tweens/ScrollTriggers creados acá quedan registrados en el contexto de
  // gsap.matchMedia() y se revierten automáticamente si el visitante activa
  // "reducir movimiento" en caliente — no hace falta un cleanup manual.
  initHeroBackgroundRotation();
  initHeroParallax();
});

/**
 * FR-017/FR-018: crossfade que rota las capas de fondo del hero cada 5s
 * (≈3.8s visible + 1.2s de transición), sin depender del scroll — corre en
 * paralelo al parallax de initHeroParallax(), que anima `transform` en el
 * contenedor en vez de `opacity` en las imágenes, así que ambos conviven sin
 * pisarse ni reiniciarse entre sí.
 */
function initHeroBackgroundRotation() {
  const layers = gsap.utils.toArray<HTMLElement>("[data-hero-bg-layer]");
  if (layers.length < 2) return;

  const HOLD_VISIBLE = 3.8;
  const CROSSFADE = 1.2;

  const timeline = gsap.timeline({ repeat: -1 });
  layers.forEach((layer, index) => {
    const next = layers[(index + 1) % layers.length];
    timeline
      .to(
        layer,
        { opacity: 0, duration: CROSSFADE, ease: "power1.inOut" },
        `+=${HOLD_VISIBLE}`,
      )
      .to(next, { opacity: 1, duration: CROSSFADE, ease: "power1.inOut" }, "<");
  });
}

/**
 * FR-008: parallax notorio y fluido. Anima `transform` (vía ScrollTrigger
 * `scrub`) en las capas de fondo y frente del hero — nunca `opacity`, para no
 * interferir con el crossfade de initHeroBackgroundRotation().
 */
function initHeroParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const layers = gsap.utils.toArray<HTMLElement>("[data-parallax-speed]", hero);

  layers.forEach((layer) => {
    const speed = Number(layer.dataset.parallaxSpeed ?? 0);
    gsap.to(layer, {
      yPercent: speed * 20,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}
