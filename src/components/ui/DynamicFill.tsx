"use client";

import * as React from "react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

type DynamicFillProps = {
  children: React.ReactNode;
  className?: string;
  fillColor?: string;
};

/**
 * Directional "dynamic fill" hover effect — a color sweep enters from
 * whichever edge the cursor approaches and exits back out toward wherever
 * it leaves, rather than a plain center fade. Originally a nav-link
 * pattern; used here as a soft energy-sweep behind the hero headline.
 * Original implementation (no source was ever accessible to adapt from).
 *
 * Listens on `document` and re-locates its container/fill nodes by
 * attribute on every event instead of caching refs at mount: when this
 * wraps content inside a heading that GSAP's SplitText later re-splits
 * into lines (see heroTimeline.ts), SplitText rebuilds that heading's
 * child nodes, and any ref captured before that rebuild would silently
 * point at a detached clone forever after — the delegated pointerover/
 * pointerout + closest()/querySelector() pattern is immune to that since
 * it always resolves against whatever is actually live in the DOM.
 */
export default function DynamicFill({ children, className, fillColor = "rgba(69, 245, 140, 0.16)" }: DynamicFillProps) {
  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    const sweep = (container: HTMLElement, clientX: number, edge: "enter" | "leave") => {
      const fill = container.querySelector<HTMLElement>("[data-dynamic-fill-glow]");
      if (!fill) return;
      const rect = container.getBoundingClientRect();
      const fromLeft = clientX - rect.left < rect.width / 2;
      gsap.set(fill, { transformOrigin: fromLeft ? "left center" : "right center" });
      if (edge === "enter") {
        gsap.to(fill, { scaleX: 1, duration: 0.5, ease: "power3.out" });
      } else {
        gsap.to(fill, { scaleX: 0, duration: 0.45, ease: "power3.inOut" });
      }
    };

    const onOver = (e: PointerEvent) => {
      const container = (e.target as HTMLElement).closest<HTMLElement>("[data-dynamic-fill]");
      if (!container) return;
      const related = e.relatedTarget as Node | null;
      if (related && container.contains(related)) return;
      sweep(container, e.clientX, "enter");
    };

    const onOut = (e: PointerEvent) => {
      const container = (e.target as HTMLElement).closest<HTMLElement>("[data-dynamic-fill]");
      if (!container) return;
      const related = e.relatedTarget as Node | null;
      if (related && container.contains(related)) return;
      sweep(container, e.clientX, "leave");
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <span data-dynamic-fill className={cn("relative inline-block", className)}>
      <span
        data-dynamic-fill-glow
        aria-hidden
        className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-2xl"
        style={{ background: fillColor, transform: "scaleX(0)" }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
