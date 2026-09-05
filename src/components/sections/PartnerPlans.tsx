"use client";

import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { partnerPlans, planInclusions } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import PricingCard from "@/components/cards/PricingCard";

export default function PartnerPlans() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Partner plans" title="Choose your charger." />
          <CTAButton href="/franchise" variant="secondary">
            Compare Plans
          </CTAButton>
        </div>
      </Container>

      <Container>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {partnerPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} inclusions={planInclusions} />
          ))}
        </div>
      </Container>
    </section>
  );
}
