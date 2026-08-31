"use client";

import * as React from "react";
import { prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

type TextPressureProps = {
  text: string;
  className?: string;
  /** Extra scale applied to a character directly under the cursor. */
  strength?: number;
  /** Pixel radius of cursor influence. */
  radius?: number;
  /**
   * CSS gradient (e.g. the brand's `linear-gradient(...)`) to render the
   * text in. Needed because `display: inline-block` on each character span
   * — required for `transform: scale()` to apply at all — breaks a
   * gradient's `background-clip: text` when it's only set on the wrapper;
   * intervening inline-block boxes stop the ancestor's clip from reaching
   * through to each glyph, and the text quietly renders fully transparent.
   * When set, the clip is applied per character instead, each showing its
   * own accurately-positioned slice of one continuous gradient.
   */
  gradient?: string;
};

/**
 * Mouse-proximity "text pressure" effect: characters scale up and gain
 * weight the closer the cursor gets, easing back to rest as it moves away.
 * An original implementation (no variable-font axis dependency — weight
 * snaps between whichever static cuts are already loaded, scale carries
 * the primary motion), event-driven rather than a perpetual rAF loop so it
 * costs nothing while the cursor isn't nearby.
 */
export default function TextPressure({ text, className, strength = 0.22, radius = 160, gradient }: TextPressureProps) {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const scheduledRef = React.useRef(false);

  const applyPressure = React.useCallback(
    (x: number | null, y: number | null) => {
      const container = containerRef.current;
      if (!container) return;
      const chars = container.querySelectorAll<HTMLSpanElement>("[data-pressure-char]");

      chars.forEach((el) => {
        let scale = 1;
        let weight = 500;

        if (x !== null && y !== null) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(x - cx, y - cy);
          const proximity = Math.max(0, 1 - dist / radius);
          scale = 1 + proximity * strength;
          weight = 500 + proximity * 250;
        }

        el.style.transform = `scale(${scale})`;
        el.style.fontWeight = String(Math.round(weight));
      });
    },
    [radius, strength]
  );

  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    const onPointerMove = (e: PointerEvent) => {
      if (scheduledRef.current) return;
      scheduledRef.current = true;
      const { clientX, clientY } = e;
      requestAnimationFrame(() => {
        scheduledRef.current = false;
        applyPressure(clientX, clientY);
      });
    };

    const onPointerLeave = () => applyPressure(null, null);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [applyPressure]);

  const chars = React.useMemo(() => text.split(""), [text]);

  return (
    <span ref={containerRef} className={cn("inline-block", className)}>
      {chars.map((char, i) =>
        // Spaces render as plain sibling text, not their own inline-block
        // box: a space that is the *sole* content of an inline-block span
        // collapses to zero width — and even a non-breaking space gets
        // normalized back to a regular one when GSAP's SplitText re-splits
        // this heading into lines afterward (confirmed via the live DOM).
        // A bare space between two inline-block siblings keeps its width
        // correctly either way, so it doesn't need to survive anything.
        char === " " ? (
          <React.Fragment key={i}> </React.Fragment>
        ) : (
          <span
            key={i}
            data-pressure-char
            className="inline-block transition-[transform,font-weight] duration-200 ease-out will-change-transform"
            style={
              gradient
                ? {
                    backgroundImage: gradient,
                    backgroundSize: `${chars.length * 100}% 100%`,
                    backgroundPosition: `${chars.length > 1 ? (i / (chars.length - 1)) * 100 : 0}% 0%`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }
                : undefined
            }
          >
            {char}
          </span>
        )
      )}
    </span>
  );
}
