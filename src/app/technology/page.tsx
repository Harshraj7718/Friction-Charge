import type { Metadata } from "next";
import Image from "next/image";
import { Wifi } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/sections/RevealSection";
import TechnologyFeatures from "@/components/sections/TechnologyFeatures";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Technology",
  path: "/technology",
  description:
    "Friction Charge stations run on a centralized charging management platform built on the open OCPP standard — live monitoring, billing, diagnostics and uptime management.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Technology", path: "/technology" },
]);

export default function TechnologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        eyebrow="Technology"
        title="Software-run stations. Hardware-grade reliability."
        description="Every charger connects to a centralized platform that keeps the network monitored, billed and maintained."
        visual={{ src: "/images/mobile-app.png", alt: "Friction Charge app showing the splash screen and a station map" }}
      />

      <RevealSection className="py-12 sm:py-16">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
              <Wifi size={22} />
            </span>
            <SectionHeading eyebrow="Charging management system" title="One platform, every station." className="mt-2" />
            <p data-reveal className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Every Friction Charge station runs on our charging management platform. The platform provides a
              centralized view of charging sessions, payments, charger health and uptime.
            </p>
            <p data-reveal className="font-mono-tech text-sm text-bright-green">
              Built on OCPP — the open charging standard.
            </p>
          </div>

          <div data-image-reveal className="technical-border overflow-hidden rounded-3xl">
            <Image
              src="/images/software.png"
              alt="Friction Charge charging management platform showing network overview, live station map, and uptime dashboard"
              width={1254}
              height={1254}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="bg-bg-elevated py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="One workflow, every role."
            description="From a driver scanning a QR code to the operator on-site and the central team managing the network — every step runs through the same platform."
          />
          <div data-image-reveal className="technical-border mt-14 overflow-hidden rounded-3xl">
            <Image
              src="/images/tech-workflow.png"
              alt="Friction Charge platform workflow — customer app and no-app charging flows, station operator flow, central management flow, and cash payment flow"
              width={1254}
              height={1254}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="py-24 sm:py-32">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1" data-image-reveal>
            <Image
              src="/images/mobile-app.png"
              alt="Friction Charge app showing the splash screen and a station map with nearby chargers, plus payment, tracking and smart-charging features"
              width={1774}
              height={887}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          </div>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <SectionHeading eyebrow="Driver experience" title="The app that runs it." />
            <p data-reveal className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Drivers find a nearby charger, start a session and pay — all from the app, with a QR-based fallback for
              anyone without it installed.
            </p>
          </div>
        </Container>
      </RevealSection>

      <TechnologyFeatures />
      <FinalCTA />
    </>
  );
}
