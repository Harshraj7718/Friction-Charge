"use client";

import * as React from "react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { SplitText, gsap, prefersReducedMotion } from "@/lib/animations/gsap";

type LetterRevealProps = {
  text: string;
  className?: string;
};

/**
 * Scroll-triggered letter-by-letter reveal for a large closing wordmark —
 * an original implementation built on the site's own GSAP + SplitText +
 * ScrollTrigger stack (each letter masks in from below, staggered
 * left-to-right, once, as the element scrolls into view).
 */
export default function LetterReveal({ text, className }: LetterRevealProps) {
  const scopeRef = useGsapContext<HTMLHeadingElement>(({ scope }) => {
    if (prefersReducedMotion()) {
      gsap.set(scope, { autoAlpha: 1 });
      return;
    }

    const split = SplitText.create(scope, { type: "chars", mask: "chars", charsClass: "letter-reveal-char" });
    gsap.set(scope, { autoAlpha: 1 });
    gsap.fromTo(
      split.chars,
      { yPercent: 110, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.025,
        scrollTrigger: {
          trigger: scope,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, [text]);

  return (
    <h2 ref={scopeRef} className={className} aria-label={text}>
      {text}
    </h2>
  );
}
