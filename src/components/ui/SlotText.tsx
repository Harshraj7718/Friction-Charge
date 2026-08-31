"use client";

import { createElement, useMemo, type Ref } from "react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

type SlotTextProps = {
  text: string;
  className?: string;
  charClassName?: string;
  /** Number of flip cycles before a character lands on its final value. */
  flips?: number;
  /** Delay between each character's flip sequence starting, in seconds. */
  stagger?: number;
  as?: "span" | "h2" | "h3";
  /** Force the whole text onto a single line instead of wrapping between words. */
  nowrap?: boolean;
};

/**
 * Slot-machine-style 3D character reveal: each letter rotates through a few
 * quick flips (like a split-flap display) before landing on its real
 * character, cascading left to right. An original implementation built on
 * the site's own GSAP + ScrollTrigger stack — used once, on the closing CTA,
 * so it reads as a deliberate flourish rather than a repeated effect.
 */
export default function SlotText({
  text,
  className,
  charClassName,
  flips = 3,
  stagger = 0.035,
  as = "span",
  nowrap = false,
}: SlotTextProps) {
  const words = useMemo(() => text.split(" "), [text]);

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    const els = Array.from(scope.querySelectorAll<HTMLSpanElement>("[data-slot-char]"));
    if (!els.length) return;

    if (prefersReducedMotion()) {
      gsap.set(els, { autoAlpha: 1, rotationX: 0 });
      return;
    }

    gsap.set(els, { autoAlpha: 0 });

    const master = gsap.timeline({
      scrollTrigger: { trigger: scope, start: "top 85%", once: true },
    });

    els.forEach((el, i) => {
      const finalChar = el.dataset.char ?? "";
      const charTl = gsap.timeline();

      charTl.set(el, { autoAlpha: 1 });
      for (let f = 0; f < flips; f++) {
        const isLast = f === flips - 1;
        charTl
          .to(el, {
            rotationX: 90,
            duration: 0.08,
            ease: "power1.in",
            onComplete: () => {
              el.textContent = isLast ? finalChar : randomChar();
            },
          })
          .set(el, { rotationX: -90 })
          .to(el, {
            rotationX: 0,
            duration: 0.09 + f * 0.025,
            ease: "power2.out",
          });
      }

      master.add(charTl, i * stagger);
    });
  }, [text]);

  return createElement(
    as,
    { ref: scopeRef as Ref<HTMLElement>, className },
    createElement(
      "span",
      // flex-wrap here wraps between whole *words* (each its own flex item
      // below), never mid-word — wrapping at the character level (as when
      // every character was a direct flex-wrap item) let the browser break
      // a word anywhere, since flex-wrap has no notion of word boundaries.
      { "aria-hidden": true, className: cn("inline-flex", nowrap ? "flex-nowrap" : "flex-wrap") },
      words.flatMap((word, wi) => {
        const wordSpan = createElement(
          "span",
          // perspective lives per-word now (each word is its own 3D context
          // for its characters' rotationX flips), since the outer wrapper no
          // longer directly parents the animated character spans.
          { key: `w${wi}`, className: "inline-flex [perspective:400px]" },
          word.split("").map((char, ci) =>
            createElement(
              "span",
              {
                key: ci,
                "data-slot-char": true,
                "data-char": char,
                className: cn("inline-block [transform-style:preserve-3d] will-change-transform", charClassName),
              },
              char
            )
          )
        );
        if (wi === words.length - 1) return [wordSpan];
        // A space rendered as the sole content of its own box collapses to
        // zero width under normal whitespace rules — and this flex-wrap
        // parent blockifies every direct child (flex items are always
        // block-level per spec), so even a plain span isn't safe from it.
        // `white-space: pre` stops it being trimmed regardless of context.
        const spaceSpan = createElement("span", { key: `s${wi}`, style: { whiteSpace: "pre" } }, " ");
        return [wordSpan, spaceSpan];
      })
    ),
    createElement("span", { className: "sr-only" }, text)
  );
}
