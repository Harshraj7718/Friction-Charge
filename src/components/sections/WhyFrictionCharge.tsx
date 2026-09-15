"use client";

import Image from "next/image";
import { Activity, Smartphone, Cloud } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

// Reflects the same facts already established on the Technology and App
// sections — restated here as a short "why us" band, in Friction Charge's
// own words rather than a competitor's copy.
const pillars = [
  {
    icon: Activity,
    title: "Live Monitoring",
    description: "Real-time visibility into charger status and uptime across the network.",
    image: "/images/live-monitoring.webp",
  },
  {
    icon: Smartphone,
    title: "Smart App",
    description: "Find chargers, track sessions and pay digitally — all from the Friction Charge app.",
    image: "/images/smart-app.webp",
  },
  {
    icon: Cloud,
    title: "Charging Management Platform",
    description: "Centralized monitoring, billing and diagnostics for every station on the network.",
    image: "/images/charging-management-platform.webp",
  },
];

export default function WhyFrictionCharge() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Why Friction Charge"
          title={
            <>
              What makes Friction Charge <em className="text-bright-green not-italic">a cut above the rest?</em>
            </>
          }
          titleClassName="text-3xl sm:text-4xl lg:text-5xl"
          description="Built on our own charging management platform, so monitoring, billing and support work as one connected system — not bolted-on pieces."
          className="mx-auto max-w-2xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <GlassCard key={pillar.title} data-reveal className="group overflow-hidden p-0 text-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <div className="p-8">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                  <pillar.icon size={22} />
                </span>
                <h3 className="font-display text-xl font-medium">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
