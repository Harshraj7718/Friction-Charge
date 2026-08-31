"use client";

import { useState } from "react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { SplitText, gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { setupEditorialParallax } from "@/lib/animations/editorialParallax";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

export type EditorialStatement = {
  eyebrow: string;
  heading: string;
  numeral?: string;
};

type EditorialParallaxStoryProps = {
  statements: EditorialStatement[];
  className?: string;
};

/**
 * A scroll-scrubbed sequence of large editorial statements — originally
 * requested as a "Slot Text" / "Editorial Parallax Story" effect;
 * reimplemented on the site's own GSAP + ScrollTrigger stack (see
 * editorialParallax.ts) rather than depending on a remote module. Each
 * statement's heading lines drift past each other at slightly different
 * speeds during the transition, so it reads as layered depth rather than a
 * flat crossfade.
 *
 * The outer wrapper is a tall scroll "runway" (explicit height, one
 * viewport per statement); the inner section is CSS `position: sticky`,
 * which holds it in view while GSAP scrubs the crossfade — deliberately
 * not GSAP's pin:true, since that requires measuring this element's own
 * box, and every statement inside is position:absolute (stacked on top of
 * each other) and so contributes no intrinsic height for GSAP to measure.
 */
export default function EditorialParallaxStory({ statements, className }: EditorialParallaxStoryProps) {
  const [active, setActive] = useState(0);

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    const wrappers = Array.from(scope.querySelectorAll<HTMLElement>("[data-statement]"));

    const refs = wrappers.map((wrapper) => {
      const headingEl = wrapper.querySelector<HTMLElement>("[data-split-heading]");
      const numeral = wrapper.querySelector<HTMLElement>("[data-numeral]");
      const split =
        headingEl && !prefersReducedMotion()
          ? SplitText.create(headingEl, { type: "lines", mask: "lines", linesClass: "split-line" })
          : null;
      if (headingEl) gsap.set(headingEl, { autoAlpha: 1 });

      return {
        wrapper,
        lines: split?.lines.length ? (split.lines as HTMLElement[]) : headingEl ? [headingEl] : [],
        numeral,
      };
    });

    setupEditorialParallax({ runway: scope, statements: refs, onActiveChange: setActive });
  }, [statements]);

  return (
    <section
      ref={scopeRef}
      className={cn("relative", className)}
      style={{ height: `${statements.length * 130}vh` }}
    >
      <div className="grid-pattern sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="relative h-full w-full">
          {statements.map((statement, i) => (
            <div key={statement.heading} data-statement className="absolute inset-0 flex items-center">
              <div className="relative w-full">
                <span
                  data-numeral
                  aria-hidden
                  className="font-display pointer-events-none absolute -left-2 -top-16 select-none text-[9rem] font-medium leading-none text-bright-green sm:-top-24 sm:text-[14rem]"
                >
                  {statement.numeral ?? String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative max-w-5xl">
                  <p className="font-mono-tech mb-4 text-xs uppercase tracking-[0.2em] text-bright-green">{statement.eyebrow}</p>
                  <h2 data-split-heading className="font-display text-4xl font-medium leading-[1.1] sm:text-6xl lg:text-7xl">
                    {statement.heading}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </Container>

        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-hidden>
          {statements.map((statement, i) => (
            <span
              key={statement.heading}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-8 bg-bright-green" : "w-1.5 bg-card-border"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
