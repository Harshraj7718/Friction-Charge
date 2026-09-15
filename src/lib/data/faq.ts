// FAQ content — every answer restates facts already established in
// lib/data/company.ts. No new claims, figures, or commitments are
// introduced here.

export type FaqItem = { question: string; answer: string };

export const homeFaqs: FaqItem[] = [
  {
    question: "What does Friction Charge do?",
    answer:
      "Friction Charge builds and operates DC fast-charging infrastructure across India, through a network of standalone fast chargers and larger charging hubs.",
  },
  {
    question: "How does the partner model work?",
    answer:
      "Partners own the charger. Friction Charge installs it, operates it and maintains it under a written partner agreement, and the partner receives a fixed monthly payout.",
  },
  {
    question: "What does “fixed” payout actually mean?",
    answer:
      "The monthly amount is written into the partner agreement. It does not change with charger utilisation, footfall, tariffs or seasons.",
  },
  {
    question: "Is this a guaranteed return or investment scheme?",
    answer:
      "No. This is an equipment ownership and operating partnership — not a guaranteed return, assured return, investment scheme, interest-bearing product, or profit-sharing arrangement. Please review the partner agreement for complete terms.",
  },
  {
    question: "What's the difference between FC-60 and FC-120?",
    answer:
      "FC-60 is a 60 kW DC fast charger: ₹15,00,000 one-time, with a fixed monthly payout of ₹43,000. FC-120 is our flagship 120 kW DC fast charger: ₹26,00,000 one-time, with a fixed monthly payout of ₹75,000.",
  },
  {
    question: "What's included in a partner plan?",
    answer:
      "The DC fast charger, installation & commissioning, charging management software, 24×7 operations, maintenance & servicing, and monthly payout & reporting.",
  },
  {
    question: "Who handles maintenance and day-to-day operations?",
    answer:
      "Friction Charge does — site selection, electricity connection coordination, installation, commissioning, software, customer support, billing, maintenance, repairs, uptime monitoring, and payout processing.",
  },
  {
    question: "How do I become a partner?",
    answer:
      "Start with an enquiry and plan selection, then sign the partner agreement and make the one-time payment. Friction Charge handles procurement, installation and commissioning, followed by 24×7 operations and your monthly contractual payout.",
  },
];

export const franchiseFaqs: FaqItem[] = [
  homeFaqs[1], // How does the partner model work?
  homeFaqs[2], // What does "fixed" payout mean?
  homeFaqs[3], // Guaranteed return / investment scheme?
  homeFaqs[4], // FC-60 vs FC-120
  homeFaqs[5], // What's included
  homeFaqs[6], // Who handles maintenance
  {
    question: "What do I need to provide as a partner?",
    answer: "A signed partner agreement, the one-time payment, and the KYC/bank details required to process your monthly payout.",
  },
];
