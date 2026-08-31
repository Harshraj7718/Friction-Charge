import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalContent from "@/components/sections/LegalContent";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  path: "/legal/terms",
  description: "Terms of use for the Friction Charge website, and the relationship between this site and the partner agreement.",
});

export default function TermsPage() {
  return (
    <LegalContent title="Terms" updated="Working copy — pending final legal review">
      <p>
        These terms govern use of this website. They are published as company-provided working copy and will be
        finalized with full legal review.
      </p>
      <p>
        Content on this website — including descriptions of the FC-60 and FC-120 partner plans, payout figures, and
        the partnership model — is provided for general information only. It does not itself constitute the binding
        agreement between a partner and Friction Charge. The written partner agreement, executed separately, governs
        the actual terms of any partnership.
      </p>
      <p>
        This is an equipment ownership and operating partnership, not a financial product. Nothing on this website
        should be read as investment, financial or legal advice.
      </p>
    </LegalContent>
  );
}
