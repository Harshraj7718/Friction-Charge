import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { disclaimerText } from "@/lib/data/company";
import LegalContent from "@/components/sections/LegalContent";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  path: "/legal/disclaimer",
  description: disclaimerText,
});

export default function DisclaimerPage() {
  return (
    <LegalContent title="Disclaimer" updated="Working copy — pending final legal review">
      <p className="text-text">{disclaimerText}</p>
      <p>
        The Friction Charge partner model is an equipment ownership and operating partnership: partners own DC fast
        charging equipment, and Friction Charge installs, operates and maintains it under a written agreement. It is
        not a guaranteed return, an assured return, an investment scheme, an interest-bearing product, or a
        profit-sharing arrangement.
      </p>
      <p>
        Station formats, network formats, and the expansion roadmap described on this website represent Friction
        Charge&apos;s planned build-out and should not be read as a list of currently operational locations unless
        explicitly stated otherwise.
      </p>
    </LegalContent>
  );
}
