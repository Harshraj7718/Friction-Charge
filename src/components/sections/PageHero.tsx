"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { cn } from "@/lib/utils/cn";
import Container from "@/components/ui/Container";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  /** Large, faint FC mark watermarked behind the hero content. */
  backgroundLogo?: boolean;
  /** A product/illustrative image shown beside the hero copy, lg:grid-cols-2. */
  visual?: { src: string; alt: string };
};

export default function PageHero({ eyebrow, title, description, children, backgroundLogo, visual }: PageHeroProps) {
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
      {backgroundLogo && (
        <Image
          src="/images/logo-icon.webp"
          alt=""
          width={908}
          height={589}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:w-[70%]"
        />
      )}
      <Container
        className={cn("relative z-10", visual ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-2" : "flex flex-col gap-6")}
      >
        <div className={cn(visual && "flex flex-col gap-6")}>
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
        </div>

        {visual && (
          <div data-reveal className="relative h-[320px] sm:h-[420px] lg:h-[480px]">
            <Image src={visual.src} alt={visual.alt} fill className="object-contain" sizes="(min-width: 1024px) 500px, 100vw" />
          </div>
        )}
      </Container>
    </section>
  );
}
