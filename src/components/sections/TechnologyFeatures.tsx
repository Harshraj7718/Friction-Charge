"use client";

import { Activity, CreditCard, Radio, BarChart3 } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { technologyFeatures } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const iconMap = { activity: Activity, "credit-card": CreditCard, radio: Radio, "bar-chart-3": BarChart3 };

export default function TechnologyFeatures() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Platform features" title="What the platform does." />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {technologyFeatures.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <GlassCard key={feature.title} data-reveal>
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-lg font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
