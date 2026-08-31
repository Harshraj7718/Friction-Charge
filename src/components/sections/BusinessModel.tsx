"use client";

import { useRef, useState } from "react";
import { User, Zap, Wrench, Activity, Car, MonitorCog, IndianRupee } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { pinTimeline } from "@/lib/animations/pinSection";
import { businessModelSteps } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";

const icons = [User, Zap, Wrench, Activity, Car, MonitorCog, IndianRupee];

export default function BusinessModel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    if (trackRef.current) {
      pinTimeline({
        container: scope,
        track: trackRef.current,
        onProgress: (progress) => {
          setActiveStep(Math.min(businessModelSteps.length - 1, Math.floor(progress * businessModelSteps.length)));
        },
      });
    }
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="The partnership model"
          title="You own the charger. We run the business."
          className="mx-auto"
        />

        <div className="relative mx-auto mt-16 max-w-xl">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-card-border sm:left-7">
            <div ref={trackRef} className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-lime to-bright-green" />
          </div>

          <ol className="flex flex-col gap-8">
            {businessModelSteps.map((step, i) => {
              const Icon = icons[i];
              const isActive = activeStep === i;
              const isPast = activeStep > i;
              return (
                <li key={step.label} data-reveal className="relative flex items-start gap-5 sm:gap-6">
                  <span
                    className={cn(
                      "font-mono-tech relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-bg transition-all duration-500 sm:h-14 sm:w-14",
                      isActive
                        ? "scale-110 border-bright-green text-bright-green shadow-[0_0_24px_rgba(69,245,140,0.45)]"
                        : isPast
                          ? "border-bright-green/50 text-bright-green/70"
                          : "border-card-border text-muted"
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  <div
                    className={cn(
                      "glass technical-border flex-1 rounded-2xl px-5 py-4 transition-all duration-500",
                      isActive && "border-bright-green/40 shadow-[0_0_30px_rgba(69,245,140,0.1)]"
                    )}
                  >
                    <p
                      className={cn(
                        "font-body text-sm font-medium sm:text-base",
                        isActive || isPast ? "text-text" : "text-muted"
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="font-mono-tech mt-1 text-[11px] uppercase tracking-widest text-muted/70">{step.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p data-reveal className="mx-auto mt-10 max-w-lg text-center text-sm text-muted">
          Fixed contractual payout under the partner agreement — not a guaranteed return, investment scheme, or
          profit share.
        </p>
      </Container>
    </section>
  );
}
