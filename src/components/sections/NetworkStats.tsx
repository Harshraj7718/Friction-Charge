"use client";

import Image from "next/image";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// Illustrative scale targets for the roadmap — no live network exists yet,
// so these are directional figures (not a reported/audited count), kept
// honest via the small label rather than presented as a live statistic.
const stats = [
  { value: 500, suffix: "+", label: "Charging points planned" },
  { value: 30, suffix: "+", label: "Cities in the expansion roadmap" },
  { value: 40000, suffix: " kW+", label: "Planned charging capacity" },
];

export default function NetworkStats() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden border-y border-card-border bg-bg-elevated py-16 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/network-watermark.png"
          alt=""
          width={900}
          height={900}
          sizes="(min-width: 640px) 70vw, 140vw"
          className="w-[140%] max-w-none opacity-[0.06] sm:w-[70%]"
        />
      </div>

      <Container className="relative z-10">
        <div data-reveal className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <SectionHeading title="Building toward a pan-India network." className="max-w-xl" />
          <span className="font-mono-tech rounded-full border border-dashed border-card-border px-3 py-1 text-[11px] text-muted">
            Illustrative — roadmap targets, network build-out in progress
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} data-reveal className="glass technical-border rounded-2xl p-6 text-center">
              <p className="font-mono-tech text-4xl font-medium text-bright-green sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
