"use client";

import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Moves every `[data-parallax]` element within `scope` at a speed set by
 * `data-parallax-speed` (defaults to 0.3). Positive speeds move slower than
 * scroll (background layers), values > 1 move faster (foreground layers).
 */
export function applyParallax(scope: HTMLElement, selector = "[data-parallax]") {
  if (prefersReducedMotion()) return;

  const els = gsap.utils.toArray<HTMLElement>(selector, scope);
  els.forEach((el) => {
    const speed = Number(el.dataset.parallaxSpeed) || 0.3;
    gsap.to(el, {
      yPercent: speed * -30,
      ease: "none",
      scrollTrigger: {
        trigger: el.dataset.parallaxTrigger ? el.closest<HTMLElement>(el.dataset.parallaxTrigger) || el : el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  });
}
