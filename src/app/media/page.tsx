import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import PageHero from "@/components/sections/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = buildMetadata({
  title: "Media Center",
  path: "/media",
  description: "News, guides and partner stories from Friction Charge — EV India, charging guides, partner stories and company news.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Media Center", path: "/media" },
]);

export default function MediaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        eyebrow="Media Center"
        title="News, guides and stories."
        description="Updates on India's EV charging landscape, guidance on the partner plans, and how a Friction Charge station runs."
        visual={{ src: "/images/future.webp", alt: "A Friction Charge station at dusk" }}
      />

      <section className="relative py-12 sm:py-16">
        <Container>
          <BlogGrid />
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
