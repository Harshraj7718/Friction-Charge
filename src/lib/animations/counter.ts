"use client";

import { gsap, prefersReducedMotion } from "./gsap";

type CountUpOptions = {
  from?: number;
  to: number;
  duration?: number;
  onUpdate: (value: number) => void;
  trigger?: Element;
};

/** Counts a number up from `from` to `to`, scroll-triggered by default. */
export function countUp({ from = 0, to, duration = 1.6, onUpdate, trigger }: CountUpOptions) {
  if (prefersReducedMotion()) {
    onUpdate(to);
    return;
  }

  const obj = { value: from };
  gsap.to(obj, {
    value: to,
    duration,
    ease: "power2.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        }
      : undefined,
    onUpdate: () => onUpdate(obj.value),
  });
}
