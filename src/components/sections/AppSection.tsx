"use client";

import Image from "next/image";
import { MapPin, Play, CreditCard, QrCode } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements, scaleReveal } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { trackEvent } from "@/lib/analytics";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";

const journey = [
  { icon: MapPin, label: "Find charging stations" },
  { icon: Play, label: "Start charging" },
  { icon: CreditCard, label: "Pay digitally" },
  { icon: QrCode, label: "Track via QR-based charging" },
];

export default function AppSection() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    scaleReveal(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden bg-bg-elevated py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Driver experience" title="One app. Your charging journey." />
            <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {journey.map(({ icon: Icon, label }) => (
                <li key={label} data-reveal className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                    <Icon size={18} />
                  </span>
                  <span className="text-base text-text">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="flex shrink-0 flex-row flex-wrap items-center gap-4 lg:flex-col lg:items-start">
            <CTAButton href="/contact" onClick={() => trackEvent("download_app_click", { source: "home_app" })}>
              Download App
            </CTAButton>
            <span className="font-mono-tech text-xs text-muted">App availability — coming soon</span>
          </div>
        </div>

        <div>
          <p data-reveal className="font-display mb-6 text-center text-2xl font-medium sm:text-3xl">
            The Friction Charge app is all you need.
          </p>
          <div data-scale-reveal>
            <Image
              src="/images/app-mockup.png"
              alt="Friction Charge app showing the charging-the-future splash screen and a station map with a nearby station's 60 kW / 120 kW options and Start Charging button"
              width={1774}
              height={887}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
