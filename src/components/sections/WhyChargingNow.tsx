"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Zap, TrendingUp, MapPinned } from "lucide-react";
import { prefersReducedMotion } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { pinStages } from "@/lib/animations/pinSection";
import { whyChargingStages } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

const icons = [TrendingUp, Zap, MapPinned];

export default function WhyChargingNow() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    // Reduced-motion users get the final stage immediately, independent of
    // the (skipped) pin animation set up in useGsapContext below.
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveStage(whyChargingStages.length - 1);
    }
  }, []);

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    if (prefersReducedMotion()) return;
    pinStages({
      container: scope,
      stageCount: whyChargingStages.length,
      onStageChange: setActiveStage,
      endMultiplier: 1.4,
    });
  }, []);

  return (
    <section ref={scopeRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg-elevated py-24">
      {whyChargingStages.map((stage, i) => (
        <div
          key={stage.number}
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            activeStage === i ? "opacity-100" : "opacity-0"
          )}
        >
          <Image src={stage.image} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 bg-bg-elevated/80" />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #45f58c, transparent 70%)" }}
          />
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="100" cy="100" r="88" fill="none" stroke="#22303f" strokeWidth="2" />
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="#45f58c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - (activeStage + 1) / whyChargingStages.length)}
              className="transition-[stroke-dashoffset] duration-700 ease-out"
            />
          </svg>
          <div className="glass technical-border flex h-48 w-48 flex-col items-center justify-center rounded-full text-center sm:h-56 sm:w-56">
            {icons.map((Icon, i) => (
              <Icon
                key={i}
                size={40}
                className={cn(
                  "absolute text-bright-green transition-all duration-500",
                  activeStage === i ? "scale-100 opacity-100" : "scale-75 opacity-0"
                )}
              />
            ))}
            <span className="font-mono-tech mt-24 text-xs tracking-widest text-muted">
              STAGE {String(activeStage + 1).padStart(2, "0")} / {String(whyChargingStages.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative min-h-[220px]">
          {whyChargingStages.map((stage, i) => (
            <div
              key={stage.number}
              className={cn(
                "absolute inset-0 flex flex-col justify-center gap-4 transition-all duration-700 ease-out",
                activeStage === i ? "translate-y-0 opacity-100" : i < activeStage ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
              )}
              aria-hidden={activeStage !== i}
            >
              <span className="font-mono-tech text-sm text-bright-green">{stage.number}</span>
              <h3 className="font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">{stage.title}</h3>
              <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">{stage.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
