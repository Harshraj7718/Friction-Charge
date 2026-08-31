"use client";

import { Building2 } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import Container from "@/components/ui/Container";

const slots = Array.from({ length: 6 });

/**
 * Layout-ready slot for a future partner/OEM logo wall. No real partner
 * logos exist yet, so these are explicitly empty, dashed placeholders
 * rather than invented company names or marks.
 */
export default function PartnerLogosPlaceholder() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-16 sm:py-20">
      <Container>
        <div data-reveal className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-display text-xl font-medium text-muted sm:text-2xl">Where partner &amp; OEM logos will appear</p>
          <span className="font-mono-tech rounded-full border border-dashed border-card-border px-3 py-1 text-[11px] text-muted">
            Placeholder — partner logos pending
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {slots.map((_, i) => (
            <div
              key={i}
              data-reveal
              className="flex h-16 items-center justify-center rounded-xl border border-dashed border-card-border text-muted/40"
            >
              <Building2 size={20} aria-hidden />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
