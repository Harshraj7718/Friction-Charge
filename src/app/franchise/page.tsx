import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { partnerPlans, planInclusions, journeySteps, disclaimerText } from "@/lib/data/company";
import { franchiseFaqs } from "@/lib/data/faq";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/sections/RevealSection";
import RoleSplit from "@/components/sections/RoleSplit";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/ui/Timeline";
import PricingCard from "@/components/cards/PricingCard";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Franchise",
  path: "/franchise",
  description:
    "Own an FC-60 or FC-120 DC fast charger. Friction Charge installs, operates and maintains it under a written partner agreement with a fixed monthly payout.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Franchise", path: "/franchise" },
]);

export default function FranchisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        eyebrow="Partner with Friction Charge"
        title="Own the charger. Let us run the business."
        description="Choose a plan, sign a written agreement, and Friction Charge handles procurement, installation, operations and maintenance."
      />

      <RevealSection className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Partner plans" title="FC-60 vs FC-120" />
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {partnerPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} inclusions={planInclusions} />
            ))}
          </div>
          <p data-reveal className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
            {disclaimerText}
          </p>
        </Container>
      </RevealSection>

      <RevealSection className="bg-bg-elevated py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="What's included" title="Everything it takes to run a station." />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {planInclusions.map((item, i) => (
              <div key={item} data-reveal className="glass technical-border flex items-center gap-4 rounded-2xl p-5">
                <span className="font-mono-tech flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bright-green/40 text-xs text-bright-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-text sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      <section className="relative py-24 sm:py-32">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="The complete journey" title="From enquiry to payout." className="mb-14" />
          <Timeline steps={journeySteps} />
        </Container>
      </section>

      <RoleSplit />
      <FAQ items={franchiseFaqs} eyebrow="Partner FAQ" title="Before you sign, know this." />

      <RevealSection className="bg-bg-elevated py-24 sm:py-32">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Ready to start?" title="Enquire about your charger." align="center" className="mb-14" />
          <ContactForm />
        </Container>
      </RevealSection>

      <FinalCTA />
    </>
  );
}
