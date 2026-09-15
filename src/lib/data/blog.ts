// Blog content source. Structured as plain data now so it can migrate to an
// MDX/CMS-backed source later (Sanity, Strapi, Contentful, WordPress) without
// changing consuming components — see BlogPost shape below.
//
// No publication dates, authors, or media coverage are fabricated: `date` is
// left as an editorial placeholder until the company confirms real dates.

export type BlogCategory = "EV India" | "Charging Guides" | "Partner Stories" | "Company News";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  readingTime: string;
  dateLabel: string; // placeholder editorial label, not a real publish date
  coverGradient: string;
  coverImage: string;
  content: { heading: string; body: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-indias-ev-boom-needs-more-fast-chargers",
    title: "Why India's EV boom needs more fast chargers",
    category: "EV India",
    excerpt:
      "As electric two-wheelers, cars, fleets and commercial vehicles multiply on Indian roads, the charging ecosystem has to scale alongside them.",
    readingTime: "5 min read",
    dateLabel: "Media Center",
    coverGradient: "linear-gradient(135deg, #0c1822, #1e9e4a)",
    coverImage: "/images/ev-boom.webp",
    content: [
      {
        heading: "The gap between vehicles and infrastructure",
        body: [
          "India's shift toward electric mobility is accelerating across electric two-wheelers, electric cars, commercial EVs, fleets, taxis and highway mobility.",
          "As more EVs reach Indian roads, charging infrastructure must grow with them — reliable DC fast charging in particular, since it is what makes longer trips and commercial usage practical.",
        ],
      },
      {
        heading: "Where Friction Charge fits",
        body: [
          "Friction Charge builds and operates DC fast-charging infrastructure designed to make reliable EV charging more accessible across India, through a network of standalone fast chargers and larger charging hubs.",
        ],
      },
    ],
  },
  {
    slug: "fc-60-vs-fc-120",
    title: "FC-60 vs FC-120",
    category: "Charging Guides",
    excerpt:
      "A side-by-side look at the two Friction Charge partner plans — charger power, one-time amount, and fixed monthly payout.",
    readingTime: "4 min read",
    dateLabel: "Media Center",
    coverGradient: "linear-gradient(135deg, #0c1822, #2ebd59)",
    coverImage: "/images/fc-60-vs-fc-120.webp",
    content: [
      {
        heading: "Two entry points into charging infrastructure",
        body: [
          "FC-60 is a 60 kW DC fast charger — the entry point to owning EV charging infrastructure, with a one-time amount of ₹13,00,000 and a fixed monthly payout of ₹45,000 (₹5,40,000 annually).",
          "FC-120 is a 120 kW DC fast charger — double the charging power, with a one-time amount of ₹22,00,000 and a fixed monthly payout of ₹85,000 (₹10,20,000 annually).",
        ],
      },
      {
        heading: "What's included either way",
        body: [
          "Both plans include the DC fast charger, installation & commissioning, charging management software, 24×7 operations, maintenance & servicing, and monthly payout & reporting.",
          "The monthly amount is written into the partner agreement — it does not change with charger utilisation, footfall, tariffs or seasons.",
        ],
      },
    ],
  },
  {
    slug: "inside-a-friction-charge-station",
    title: "Inside a Friction Charge station",
    category: "Partner Stories",
    excerpt:
      "A look at what actually runs a charging station day to day — the software, operations and maintenance behind the charger.",
    readingTime: "6 min read",
    dateLabel: "Media Center",
    coverGradient: "linear-gradient(135deg, #0c1822, #22303f)",
    coverImage: "/images/charge-station.webp",
    content: [
      {
        heading: "Software-run stations",
        body: [
          "Every Friction Charge station runs on our charging management platform, built on the open OCPP standard. It gives a centralized view of charging sessions, payments, charger health and uptime.",
        ],
      },
      {
        heading: "Operations behind the plug",
        body: [
          "Friction Charge handles site selection, electricity connection coordination, installation, commissioning, customer support, billing, maintenance, repairs and uptime monitoring — so partners do not have to manage day-to-day operations.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const blogCategories: BlogCategory[] = ["EV India", "Charging Guides", "Partner Stories", "Company News"];
