import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { contact } from "@/lib/data/company";
import LegalContent from "@/components/sections/LegalContent";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  path: "/legal/privacy-policy",
  description: "How Friction Charge collects, uses and protects information submitted through this website.",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalContent title="Privacy Policy" updated="Working copy — pending final legal review">
      <p>
        This Privacy Policy explains how Friction Charge handles information submitted through this website,
        including enquiry forms and contact requests. It is published as company-provided working copy and will be
        finalized with full legal review.
      </p>
      <p>
        We collect the details you voluntarily submit through our enquiry form — such as your name, phone number,
        email address and message — to respond to your enquiry about our charging network and partner plans. We do
        not sell this information to third parties.
      </p>
      <p>
        For questions about this policy or to request that your information be removed, contact us at{" "}
        <a href={`mailto:${contact.email}`} className="text-bright-green">
          {contact.email}
        </a>
        .
      </p>
    </LegalContent>
  );
}
