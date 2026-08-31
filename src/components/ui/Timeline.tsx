"use client";

import { useRef } from "react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { pinTimeline } from "@/lib/animations/pinSection";

type TimelineStep = { number: string; title: string; description: string };

export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapContext<HTMLDivElement>(({ scope }) => {
    revealElements(scope);
    if (trackRef.current) {
      pinTimeline({ container: scope, track: trackRef.current });
    }
  }, []);

  return (
    <div ref={scopeRef} className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-card-border sm:left-[23px]">
        <div ref={trackRef} className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-lime to-bright-green" />
      </div>

      <ol className="flex flex-col gap-12">
        {steps.map((step) => (
          <li key={step.number} data-reveal className="relative flex gap-6 pl-0 sm:gap-8">
            <span className="font-mono-tech relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bright-green/50 bg-bg text-sm text-bright-green sm:h-12 sm:w-12">
              {step.number}
            </span>
            <div className="pt-1">
              <h3 className="font-display text-xl font-medium sm:text-2xl">{step.title}</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted sm:text-base">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
