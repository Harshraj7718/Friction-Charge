"use client";

import { useRef } from "react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { setupHorizontalScroll } from "@/lib/animations/horizontalScroll";
import { roadmapPhases } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

export default function RoadmapHorizontal() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    if (trackRef.current) {
      setupHorizontalScroll(scope, trackRef.current);
    }
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden py-24 sm:py-32">
      <Container className="mb-4 flex flex-col gap-4">
        <TechnicalLabel data-reveal className="w-fit">
          Expansion roadmap
        </TechnicalLabel>
        <SectionHeading title="Where the network is headed." />
        <p data-reveal className="max-w-xl text-sm text-muted">
          A planned expansion path — not a list of currently operational locations.
        </p>
      </Container>

      <div ref={trackRef} className="mt-10 flex w-max gap-6 pl-6 sm:pl-10 lg:pl-[max(4rem,calc((100vw-1440px)/2+4rem))]">
        {roadmapPhases.map((phase) => (
          <div
            key={phase.phase}
            data-reveal
            className="glass technical-border flex h-72 w-[300px] shrink-0 flex-col justify-between rounded-3xl p-7 sm:h-80 sm:w-[380px]"
          >
            <span className="font-mono-tech text-sm text-bright-green">{phase.phase}</span>
            <div>
              <h3 className="font-display text-2xl font-medium leading-tight sm:text-3xl">{phase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{phase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
