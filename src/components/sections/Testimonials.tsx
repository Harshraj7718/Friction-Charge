"use client";

import { Quote, Star } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { testimonials } from "@/lib/data/testimonials";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";

export default function Testimonials() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    revealElements(scope, { y: 36, stagger: 0.1 });
  }, []);

  return (
    <section ref={scopeRef} className="relative bg-bg-elevated py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Partner & driver voices" title="What people are saying." />
          <span className="font-mono-tech text-[11px] uppercase tracking-widest text-muted/60">Illustrative reviews</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              data-reveal
              className={cn(
                "glass technical-border group flex flex-col justify-between rounded-2xl p-6 transition-all duration-300",
                "hover:-translate-y-1.5 hover:border-bright-green/40 hover:shadow-[0_0_40px_rgba(69,245,140,0.12)]",
                i % 2 === 1 && "sm:translate-y-4"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote size={22} className="text-bright-green/50 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={13}
                        className={si < t.rating ? "fill-bright-green text-bright-green" : "fill-transparent text-card-border"}
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed text-text sm:text-base">&ldquo;{t.quote}&rdquo;</blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-sm font-medium text-bright-green">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-text">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
