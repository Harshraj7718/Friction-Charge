"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { faqJsonLd } from "@/lib/seo/metadata";
import type { FaqItem } from "@/lib/data/faq";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";

type FAQProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  className?: string;
};

export default function FAQ({ items, eyebrow = "FAQ", title = "Questions, answered.", className }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    revealElements(scope);
  }, []);

  const jsonLd = faqJsonLd(items.map((item) => ({ question: item.question, answer: item.answer })));

  return (
    <section ref={scopeRef} className={cn("relative py-24 sm:py-32", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mx-auto" />

        <div className="mt-12 flex flex-col gap-4">
          {items.map((item, i) => {
            const open = openIndex === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;

            return (
              <div
                key={item.question}
                data-reveal
                className={cn(
                  "glass overflow-hidden rounded-2xl border-l-2 border-y border-r border-card-border transition-colors duration-300",
                  open ? "border-l-bright-green bg-bright-green/[0.03]" : "border-l-card-border"
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span
                      className={cn(
                        "font-mono-tech shrink-0 text-xs tracking-widest transition-colors duration-300",
                        open ? "text-bright-green" : "text-muted/50"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display flex-1 text-base font-medium transition-colors duration-300 sm:text-lg",
                        open ? "text-text" : "text-text/85 group-hover:text-text"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        open ? "border-bright-green bg-bright-green/10 rotate-180" : "border-card-border group-hover:border-bright-green/40"
                      )}
                    >
                      <ChevronDown size={15} className={open ? "text-bright-green" : "text-muted"} aria-hidden />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 pl-14 text-sm leading-relaxed text-muted sm:px-7 sm:pb-7 sm:pl-16 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
