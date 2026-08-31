"use client";

import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Pins `container` and translates `track` horizontally as the page scrolls
 * vertically, so the vertical scroll distance drives horizontal movement.
 * Returns nothing — cleanup happens via the enclosing gsap.context().
 */
export function setupHorizontalScroll(container: HTMLElement, track: HTMLElement) {
  if (prefersReducedMotion()) return;

  const getScrollDistance = () => Math.max(track.scrollWidth - container.clientWidth, 0);

  gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${getScrollDistance()}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}
