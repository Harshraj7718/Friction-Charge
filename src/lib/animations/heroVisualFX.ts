"use client";

import { gsap, prefersReducedMotion } from "./gsap";

type HeroVisualFXTargets = {
  float: HTMLElement | null;
  glow: HTMLElement | null;
  dots: HTMLElement[];
};

/**
 * Continuous, looping ambient motion for the hero charger image — separate
 * from playHeroTimeline's one-time entrance so the two don't fight over the
 * same tween targets. Runs inside the same gsap.context() as the entrance
 * timeline (see Hero.tsx), so its infinite tweens still get killed on
 * unmount without any manual cleanup here.
 */
export function playHeroVisualFX({ float, glow, dots }: HeroVisualFXTargets) {
  if (prefersReducedMotion()) {
    // Static resting state: visible, no motion, rather than skipped
    // entirely — the glow/dots are decorative but shouldn't just vanish.
    gsap.set([glow, ...dots].filter(Boolean), { autoAlpha: 1 });
    return;
  }

  if (float) {
    gsap.to(float, {
      y: -16,
      rotate: 1.2,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  if (glow) {
    gsap.to(glow, {
      scale: 1.15,
      opacity: 0.5,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  dots.forEach((dot, i) => {
    gsap.to(dot, {
      opacity: 1,
      scale: 1.4,
      duration: 1.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.5,
    });
  });
}
