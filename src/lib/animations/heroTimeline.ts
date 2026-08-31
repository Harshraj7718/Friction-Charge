"use client";

import { gsap, SplitText, prefersReducedMotion } from "./gsap";

type HeroTimelineTargets = {
  eyebrow: HTMLElement | null;
  heading: HTMLElement | null;
  subtext: HTMLElement | null;
  ctas: HTMLElement | null;
  visual: HTMLElement | null;
  scrollHint: HTMLElement | null;
};

/**
 * The hero's one-time entrance choreography. Unlike the rest of the site
 * (scroll-revealed, each element independent), the hero is visible on load
 * with nothing to scroll past first — so it gets a single authored
 * gsap.timeline() instead, with each stage overlapping the previous
 * slightly (position offsets like "<0.15") for a connected, cinematic feel
 * rather than a sequence of disjointed fades.
 */
export function playHeroTimeline(targets: HeroTimelineTargets) {
  const { eyebrow, heading, subtext, ctas, visual, scrollHint } = targets;

  if (prefersReducedMotion()) {
    gsap.set([eyebrow, heading, subtext, ctas, visual, scrollHint].filter(Boolean), { autoAlpha: 1, y: 0, scale: 1 });
    return;
  }

  const split = heading ? SplitText.create(heading, { type: "lines", mask: "lines", linesClass: "split-line" }) : null;
  if (heading) gsap.set(heading, { autoAlpha: 1 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (eyebrow) tl.fromTo(eyebrow, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 });

  if (split?.lines.length) {
    tl.fromTo(
      split.lines,
      { yPercent: 110, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09, ease: "power4.out" },
      "<0.15"
    );
  }

  if (subtext) tl.fromTo(subtext, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "<0.35");

  if (ctas) {
    // ctas itself carries the CSS FOUC-prevention baseline (opacity:0 before
    // JS runs); the animation targets its children individually for the
    // stagger, so the wrapper's own opacity must be released explicitly or
    // the children stay invisible inside an opacity:0 parent.
    tl.set(ctas, { autoAlpha: 1 }, "<");
    const buttons = ctas.children.length ? Array.from(ctas.children) : ctas;
    tl.fromTo(buttons, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "<0.15");
  }

  if (visual) tl.fromTo(visual, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" }, "<0.1");

  if (scrollHint) tl.fromTo(scrollHint, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, "<0.4");

  return tl;
}
