import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { networkFormats } from "@/lib/data/company";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/sections/RevealSection";
import RoadmapHorizontal from "@/components/sections/RoadmapHorizontal";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import NetworkVisual from "@/components/sections/NetworkVisual";

export const metadata: Metadata = buildMetadata({
  title: "Our Network",
  path: "/network",
  description:
    "Standalone DC fast chargers and larger charging hubs — the network formats Friction Charge is building across India.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Our Network", path: "/network" },
]);

export default function NetworkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        eyebrow="Our network"
        title="Building India's charging backbone."
        description="A growing network of standalone DC fast chargers and larger charging hubs, positioned for fleets, taxis, highway traffic and everyday drivers."
      />

      <RevealSection className="py-24 sm:py-32">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div data-image-reveal className="mx-auto w-full max-w-sm">
            <NetworkVisual className="h-auto w-full" />
          </div>

          <div className="flex flex-col gap-6">
            {networkFormats.map((format) => (
              <GlassCard key={format.title} data-reveal>
                <h3 className="font-display text-xl font-medium">{format.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{format.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {format.points.map((point) => (
                    <li key={point} className="font-mono-tech rounded-full bg-card px-3 py-1 text-xs text-bright-green">
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </Container>
      </RevealSection>

      <RoadmapHorizontal />
      <FinalCTA />
    </>
  );
}
