"use client";

import { ShieldCheck, Gauge, Handshake } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { values } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const icons = [ShieldCheck, Gauge, Handshake];

export default function Values() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="What we stand for" title="Our values." align="center" className="mx-auto" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value, i) => {
            const Icon = icons[i];
            return (
              <GlassCard key={value.title} data-reveal className="text-center">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-xl font-medium">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
