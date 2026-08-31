"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { setupHorizontalScroll } from "@/lib/animations/horizontalScroll";
import { horizontalBackboneCards, networkFormats } from "@/lib/data/company";
import { trackEvent } from "@/lib/analytics";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";

export default function NetworkTeaser() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    if (trackRef.current) {
      setupHorizontalScroll(scope, trackRef.current);
    }
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden bg-bg-elevated py-24 sm:py-32">
      <Container className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Our network" title="Building India's charging backbone." />
        <CTAButton
          href="/network"
          variant="secondary"
          className="shrink-0"
          onClick={() => trackEvent("network_cta", { source: "home_network_teaser" })}
        >
          Explore Our Network
        </CTAButton>
      </Container>

      <div ref={trackRef} className="flex w-max gap-6 pl-6 sm:pl-10 lg:pl-[max(4rem,calc((100vw-1440px)/2+4rem))]">
        {horizontalBackboneCards.map((card) => (
          <div
            key={card.number}
            data-reveal
            className="technical-border group relative flex h-72 w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bright-green/40 sm:h-80 sm:w-[340px]"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="340px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
            <span className="relative z-10 font-mono-tech text-sm text-bright-green">{card.number}</span>
            <h3 className="relative z-10 font-display text-2xl font-medium leading-tight sm:text-3xl">{card.title}</h3>
          </div>
        ))}

        <div
          data-reveal
          className="flex h-72 w-[280px] shrink-0 flex-col justify-center gap-4 rounded-3xl border border-dashed border-card-border p-7 sm:h-80 sm:w-[340px]"
        >
          <p className="font-mono-tech text-xs uppercase tracking-widest text-muted">Network formats</p>
          {networkFormats.map((format) => (
            <div key={format.title}>
              <p className="font-display text-base font-medium">{format.title}</p>
              <p className="mt-1 text-xs text-muted">{format.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
