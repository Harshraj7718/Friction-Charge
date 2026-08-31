"use client";

import { gsap, prefersReducedMotion } from "./gsap";

export type EditorialStatementRefs = {
  wrapper: HTMLElement;
  lines: HTMLElement[];
  numeral: HTMLElement | null;
};

type EditorialParallaxOptions = {
  /** The tall scroll-runway wrapper — its own explicit height sets the scroll distance. */
  runway: HTMLElement;
  statements: EditorialStatementRefs[];
  onActiveChange?: (index: number) => void;
};

/**
 * Crossfades between statements as the user scrolls through `runway`, with
 * each statement's text lines drifting past each other at slightly
 * different speeds (parallax depth) rather than moving as one flat block —
 * the "editorial" read: layered, not just faded. The visual "pin" itself is
 * CSS `position: sticky` on the inner element (see EditorialParallaxStory),
 * not GSAP's pin:true — sticky needs no pin-spacer measurement at all.
 */
export function setupEditorialParallax({ runway, statements, onActiveChange }: EditorialParallaxOptions) {
  if (!statements.length) return;

  if (prefersReducedMotion()) {
    statements.forEach((s, i) => {
      gsap.set(s.wrapper, { autoAlpha: i === 0 ? 1 : 0 });
      gsap.set(s.lines, { yPercent: 0 });
      if (s.numeral) gsap.set(s.numeral, { autoAlpha: 0.08, yPercent: 0 });
    });
    return;
  }

  statements.forEach((s, i) => {
    gsap.set(s.wrapper, { autoAlpha: i === 0 ? 1 : 0 });
    gsap.set(s.lines, { yPercent: i === 0 ? 0 : 42 });
    if (s.numeral) gsap.set(s.numeral, { autoAlpha: 0, yPercent: 15 });
  });

  let lastActive = -1;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: runway,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const active = Math.min(statements.length - 1, Math.floor(self.progress * statements.length));
        if (active !== lastActive) {
          lastActive = active;
          onActiveChange?.(active);
        }
      },
    },
  });

  statements.forEach((statement, i) => {
    const isFirst = i === 0;
    const isLast = i === statements.length - 1;

    if (statement.numeral) {
      tl.to(statement.numeral, { autoAlpha: 0.08, yPercent: 0, duration: 1, ease: "none" }, i);
    }

    if (!isFirst) {
      tl.to(statement.wrapper, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, i - 0.3);
      tl.to(
        statement.lines,
        { yPercent: 0, duration: 0.35, ease: "power2.out", stagger: (idx: number) => idx * 0.05 },
        i - 0.3
      );
    }

    if (!isLast) {
      tl.to(statement.wrapper, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, i + 1 - 0.3);
      tl.to(
        statement.lines,
        {
          yPercent: (idx: number) => -34 - idx * 10,
          duration: 0.35,
          ease: "power1.in",
          stagger: (idx: number) => idx * 0.05,
        },
        i + 1 - 0.3
      );
    }
  });

  return tl;
}
