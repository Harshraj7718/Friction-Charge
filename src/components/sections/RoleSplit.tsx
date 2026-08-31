"use client";

import { User, Building2, Check } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { partnerRole, companyRole } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

export default function RoleSplit() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Who does what" title="A clear split of responsibility." />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard data-reveal hover={false} className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                <User size={20} />
              </span>
              <h3 className="font-display text-2xl font-medium">Partner</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {partnerRole.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted sm:text-base">
                  <Check size={16} className="mt-0.5 shrink-0 text-bright-green" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard data-reveal hover={false} className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                <Building2 size={20} />
              </span>
              <h3 className="font-display text-2xl font-medium">Friction Charge</h3>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {companyRole.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted sm:text-base">
                  <Check size={16} className="mt-0.5 shrink-0 text-bright-green" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
