import type { Metadata } from "next";
import { Wifi } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/sections/RevealSection";
import TechnologyFeatures from "@/components/sections/TechnologyFeatures";
import TechnologyDashboard from "@/components/sections/TechnologyDashboard";
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

          <div data-image-reveal>
            <TechnologyDashboard />
          </div>
        </Container>
      </RevealSection>

      <TechnologyFeatures />
      <FinalCTA />
    </>
  );
}
