"use client";

import Image from "next/image";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements, slideReveal } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { trackEvent } from "@/lib/analytics";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";

export default function TechnologyTeaser() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    slideReveal(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="Technology" title="Software-run stations. Hardware-grade reliability." />
          <p data-reveal className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Every charger runs on our charging management software — enabling live monitoring, billing, diagnostics
            and uptime management across the network.
          </p>
          <CTAButton
            href="/technology"
            variant="secondary"
            className="w-fit"
            onClick={() => trackEvent("technology_cta", { source: "home_technology_teaser" })}
          >
            Explore Technology
          </CTAButton>
        </div>

        <div
          data-slide-reveal
          data-parallax
          data-parallax-speed="0.1"
          className="technical-border overflow-hidden rounded-3xl"
        >
          <Image
            src="/images/software.png"
            alt="Friction Charge charging management platform showing network overview, live station map, and uptime dashboard"
            width={1254}
            height={1254}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 620px, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
