"use client";

import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

type RevealOptions = {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
};

/**
 * Scroll-reveals every `[data-reveal]` element within `scope`, batched via
 * ScrollTrigger.batch so elements that enter the viewport together animate
 * as one distributed stagger (fewer ScrollTrigger instances, correct group
 * timing) while elements spread across the page still trigger independently
 * near their own scroll position.
 *
 * Entrance and exit are deliberately asymmetric: entrance is the full
 * choreography (ease-out, longer), exit-on-scroll-up is shorter, smaller,
 * and eases in — matching how motion should read (arrive with intention,
 * leave quietly).
 */
export function revealElements(scope: HTMLElement, options: RevealOptions = {}) {
  const { selector = "[data-reveal]:not([data-split-text])", y = 28, stagger = 0.08, duration = 0.75 } = options;
  const els = gsap.utils.toArray<HTMLElement>(selector, scope);
  if (!els.length) return;

  if (prefersReducedMotion()) {
    gsap.set(els, { autoAlpha: 1, y: 0 });
    return;
  }

  gsap.set(els, { autoAlpha: 0, y });

  ScrollTrigger.batch(els, {
    start: "top 87%",
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: "power3.out",
        stagger: { each: stagger, from: "start" },
        overwrite: true,
      }),
    onLeaveBack: (batch) =>
      gsap.to(batch, {
        autoAlpha: 0,
        y: y * 0.5,
        duration: duration * 0.5,
        ease: "power2.in",
        stagger: { each: stagger * 0.5, from: "end" },
        overwrite: true,
      }),
  });
}

/** Animates an SVG line/path drawing itself in as it scrolls into view. */
export function drawLine(scope: HTMLElement, selector = "[data-draw-line]") {
  const paths = gsap.utils.toArray<SVGGeometryElement>(selector, scope).filter((el) => typeof el.getTotalLength === "function");
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: prefersReducedMotion() ? 0 : length });
    if (prefersReducedMotion()) return;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

/**
 * Wipes a visual panel/image into view via a clip-path reveal instead of a
 * plain fade — used for the site's larger visual blocks (dashboards, phone
 * mockups, diagrams) so they read as a distinct "reveal" moment rather than
 * competing with the surrounding text fades. One-shot: doesn't un-wipe on
 * scroll-up, since re-wiping on every pass back up would feel gimmicky.
 */
export function imageReveal(scope: HTMLElement, selector = "[data-image-reveal]") {
  const els = gsap.utils.toArray<HTMLElement>(selector, scope);
  if (!els.length) return;

  if (prefersReducedMotion()) {
    gsap.set(els, { clipPath: "inset(0% 0% 0% 0%)" });
    return;
  }

  els.forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
}

/**
 * Slides a visual in from one side while fading it up, scaling slightly —
 * an alternative to `imageReveal`'s clip-path wipe for sections that sit
 * next to body copy, so the visual reads as "arriving alongside" the text
 * rather than being wiped open. One-shot, like `imageReveal`.
 */
export function slideReveal(scope: HTMLElement, selector = "[data-slide-reveal]", direction: "left" | "right" = "right") {
  const els = gsap.utils.toArray<HTMLElement>(selector, scope);
  if (!els.length) return;

  if (prefersReducedMotion()) {
    gsap.set(els, { autoAlpha: 1, x: 0, scale: 1 });
    return;
  }

  const x = direction === "right" ? 60 : -60;
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, x, scale: 0.96 },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  });
}

/**
 * Scales a visual up from slightly-small-and-faded to full size — a softer,
 * more "settling into place" arrival than the clip-path wipe or slide-in,
 * for visuals that should feel like they're gently focusing into view.
 */
export function scaleReveal(scope: HTMLElement, selector = "[data-scale-reveal]") {
  const els = gsap.utils.toArray<HTMLElement>(selector, scope);
  if (!els.length) return;

  if (prefersReducedMotion()) {
    gsap.set(els, { autoAlpha: 1, scale: 1 });
    return;
  }

  els.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 0.85 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  });
}

export { ScrollTrigger };
