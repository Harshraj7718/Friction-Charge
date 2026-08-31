import type { Metadata } from "next";
import { company } from "@/lib/data/company";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.frictioncharge.in";

const defaultDescription =
  "Friction Charge builds and operates DC fast-charging infrastructure designed to make reliable EV charging more accessible across India.";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path: string;
  image?: string;
};

export function buildMetadata({ title, description = defaultDescription, path, image = "/images/logo.png" }: BuildMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = path === "/" ? `${company.name} — ${company.tagline}` : `${title} · ${company.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.name,
      images: [{ url: image }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.secondaryTagline,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    slogan: company.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingJsonLd(input: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
    },
  };
}
