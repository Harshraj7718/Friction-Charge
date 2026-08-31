"use client";

import Image from "next/image";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { trackEvent } from "@/lib/analytics";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import SlotText from "@/components/ui/SlotText";

export default function FinalCTA() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden py-28 sm:py-36">
      <Image src="/images/future.png" alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-bg/85" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(circle, #45f58c, transparent 70%)" }}
      />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
        <SlotText
          as="h2"
          text="Ready to charge the future?"
          nowrap
          className="font-display max-w-full text-[clamp(1.1rem,5.5vw,4.5rem)] font-medium leading-[1.1] whitespace-nowrap"
        />
        <p data-reveal className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Talk to the Friction Charge team about EV charging infrastructure, partnership plans and network
          opportunities.
        </p>
        <div data-reveal className="mt-2 flex flex-wrap justify-center gap-4">
          <CTAButton href="/franchise" size="lg" onClick={() => trackEvent("become_partner_click", { source: "final_cta" })}>
            Become a Partner
          </CTAButton>
          <CTAButton href="/contact" variant="secondary" size="lg">
            Contact Us
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
