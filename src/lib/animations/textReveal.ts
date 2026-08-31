"use client";

import { gsap, SplitText, prefersReducedMotion } from "./gsap";

/**
 * Splits every `[data-split-text]` heading within `scope` into lines and
 * animates them upward into view as the user scrolls.
 */
export function splitTextReveal(scope: HTMLElement, selector = "[data-split-text]") {
  const targets = gsap.utils.toArray<HTMLElement>(selector, scope);

  targets.forEach((el) => {
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
    gsap.set(el, { autoAlpha: 1 });

    gsap.fromTo(
      split.lines,
      { yPercent: 110, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}
