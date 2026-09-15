import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/sections/RevealSection";
import Values from "@/components/sections/Values";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "About",
  path: "/about",
  description:
    "Friction Charge was founded in Noida to build DC fast-charging infrastructure across India, in partnership with charger owners.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        eyebrow="About Friction Charge"
        title="Charging the Future."
        description="An EV charging infrastructure company building the network India's electric vehicles need."
        backgroundLogo
        visual={{ src: "/images/logo.webp", alt: "Friction Charge" }}
      />

      <RevealSection className="py-24 sm:py-32">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Who we are" title="Building the network India needs." />
            <div className="flex flex-col gap-5 text-base leading-relaxed text-muted sm:text-lg">
              <p data-reveal>
                Friction Charge was founded in Noida with a simple belief: India&apos;s shift to electric vehicles is
                inevitable — and the country needs charging infrastructure faster than any one company can build
                alone.
              </p>
              <p data-reveal>
                Partners bring the capital. Friction Charge brings the machines, software and operations. Together,
                the network expands to put fast chargers where India needs them.
              </p>
            </div>
          </div>

          <div data-image-reveal className="technical-border overflow-hidden rounded-3xl">
            <Image
              src="/images/charge-station.webp"
              alt="A Friction Charge DC fast-charging station"
              width={1672}
              height={941}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="bg-bg-elevated py-24 sm:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div data-reveal className="glass technical-border rounded-3xl p-8 sm:p-10">
            <p className="font-mono-tech mb-4 text-xs uppercase tracking-[0.2em] text-bright-green">Our mission</p>
            <h2 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
              Reliable fast charging within reach of every EV driver in India.
            </h2>
          </div>
          <div data-reveal className="glass technical-border rounded-3xl p-8 sm:p-10">
            <p className="font-mono-tech mb-4 text-xs uppercase tracking-[0.2em] text-bright-green">Our vision</p>
            <h2 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
              A pan-India network of fast chargers and charging hubs — owned by partners, operated by Friction
              Charge.
            </h2>
          </div>
        </Container>
      </RevealSection>

      <Values />
      <FinalCTA />
    </>
  );
}
