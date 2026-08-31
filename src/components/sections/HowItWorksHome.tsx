"use client";

import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements, drawLine } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { howItWorksSteps } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HowItWorksHome() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    drawLine(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="How it works" title="From plan to payout." />

        <div className="relative mt-16">
          <svg className="pointer-events-none absolute left-0 top-6 hidden h-px w-full lg:block" preserveAspectRatio="none">
            <line data-draw-line x1="6%" y1="0" x2="94%" y2="0" stroke="#2ebd59" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step) => (
              <div key={step.number} data-reveal className="relative flex flex-col gap-3">
                <span className="font-mono-tech relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-bright-green/50 bg-bg text-sm text-bright-green">
                  {step.number}
                </span>
                <h3 className="font-display text-lg font-medium sm:text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
