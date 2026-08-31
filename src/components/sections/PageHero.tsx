"use client";

import type { ReactNode } from "react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import Container from "@/components/ui/Container";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="grid-pattern relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-0 h-[420px] w-[420px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #45f58c, transparent 70%)" }}
      />
      <Container className="relative z-10 flex flex-col gap-6">
        {eyebrow && (
          <TechnicalLabel data-reveal className="w-fit">
            {eyebrow}
          </TechnicalLabel>
        )}
        <h1 data-reveal data-split-text className="font-display max-w-3xl text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p data-reveal className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
