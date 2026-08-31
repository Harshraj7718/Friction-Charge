import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { journeySteps } from "@/lib/data/company";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/sections/RevealSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/ui/Timeline";

export const metadata: Metadata = buildMetadata({
  title: "How It Works",
  path: "/how-it-works",
  description:
    "From enquiry and plan selection to installation, 24×7 operations and your monthly contractual payout — how a Friction Charge partnership works.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" },
]);

export default function HowItWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        eyebrow="How it works"
        title="One agreement. Zero day-to-day operations."
        description="Friction Charge procures, installs, operates and maintains your charger — you receive a fixed monthly payout under a written partner agreement."
      />

      <section className="relative py-24 sm:py-32">
        <Container className="max-w-3xl">
          <Timeline steps={journeySteps} />
        </Container>
      </section>

      <RevealSection className="bg-bg-elevated py-24 sm:py-32">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div data-reveal className="flex flex-col gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
              <ShieldCheck size={22} />
            </span>
            <SectionHeading eyebrow="Contract terms" title="What &ldquo;fixed&rdquo; means." className="mt-2" />
          </div>
          <div data-reveal className="glass technical-border rounded-3xl p-8 sm:p-10">
            <p className="text-base leading-relaxed text-text sm:text-lg">
              The monthly amount is written into the partner agreement. It does not change with charger
              utilisation, footfall, tariffs or seasons.
            </p>
            <p className="font-mono-tech mt-6 text-sm text-bright-green">FIXED CONTRACTUAL PAYOUT</p>
          </div>
        </Container>
      </RevealSection>

      <FinalCTA />
    </>
  );
}
