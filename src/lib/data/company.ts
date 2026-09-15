// Authoritative Friction Charge company data.
// Do not add statistics, counts, dates, or claims that are not explicitly
// provided in the project brief. Use placeholders where information is
// pending, and never present placeholder data as a real operational figure.

export const company = {
  name: "Friction Charge",
  tagline: "Charging the Future",
  secondaryTagline: "EV Charging Solutions",
  hq: "Noida, Uttar Pradesh, India",
  legalName: "Friction Charge",
} as const;

export const contact = {
  email: "Info@frictioncharge.in",
  phone: "+91 87964 42624",
  whatsapp: "+91 87964 42624",
  address: "Noida, Uttar Pradesh, India",
  isPlaceholder: false,
} as const;

export const socialLinks = [
  { label: "LinkedIn", href: "#", placeholder: true },
  { label: "Twitter / X", href: "#", placeholder: true },
  { label: "Instagram", href: "#", placeholder: true },
  { label: "YouTube", href: "#", placeholder: true },
] as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Our Network", href: "/network" },
  { label: "Technology", href: "/technology" },
  { label: "Media Center", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const footerNavLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Network", href: "/network" },
  { label: "Technology", href: "/technology" },
  { label: "Media Center", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

export type PartnerPlan = {
  id: "fc-60" | "fc-120";
  code: string;
  power: string;
  title: string;
  oneTimeAmount: number;
  oneTimeAmountLabel: string;
  monthlyPayout: number;
  monthlyPayoutLabel: string;
  annualPayout: number;
  annualPayoutLabel: string;
  positioning: string;
  badge?: string;
};

export const partnerPlans: PartnerPlan[] = [
  {
    id: "fc-60",
    code: "FC-60",
    power: "60 kW DC Fast Charger",
    title: "FC-60",
    oneTimeAmount: 1300000,
    oneTimeAmountLabel: "₹13,00,000",
    monthlyPayout: 45000,
    monthlyPayoutLabel: "₹45,000",
    annualPayout: 540000,
    annualPayoutLabel: "₹5,40,000",
    positioning: "Your entry point to owning EV charging infrastructure.",
  },
  {
    id: "fc-120",
    code: "FC-120",
    power: "120 kW DC Fast Charger",
    title: "FC-120",
    oneTimeAmount: 2200000,
    oneTimeAmountLabel: "₹22,00,000",
    monthlyPayout: 85000,
    monthlyPayoutLabel: "₹85,000",
    annualPayout: 1020000,
    annualPayoutLabel: "₹10,20,000",
    positioning: "Double the charging power, higher monthly payout.",
    badge: "FLAGSHIP",
  },
];

export const planInclusions = [
  "DC fast charger",
  "Installation & commissioning",
  "Charging management software",
  "24×7 operations",
  "Maintenance & servicing",
  "Monthly payout & reporting",
];

export const partnerRole = [
  "Choose plan",
  "Sign agreement",
  "Make one-time payment",
  "Provide required KYC/bank details",
  "Receive monthly payout",
];

export const companyRole = [
  "Charger procurement",
  "Site selection",
  "Electricity connection coordination",
  "Installation",
  "Commissioning",
  "Software",
  "Customers",
  "Billing",
  "Support",
  "Maintenance",
  "Repairs",
  "Uptime monitoring",
  "Payout processing",
  "Statements",
];

export const journeySteps = [
  { number: "01", title: "Enquiry & plan selection", description: "Talk to our team, pick FC-60 or FC-120, and understand the model." },
  { number: "02", title: "Partner agreement & payment", description: "Sign the written partner agreement and make the one-time payment." },
  { number: "03", title: "Procurement, installation & commissioning", description: "Friction Charge procures, installs and commissions your charger." },
  { number: "04", title: "24×7 operations", description: "We run the charger — software, customers, billing, support and maintenance." },
  { number: "05", title: "Monthly contractual payout", description: "You receive the fixed monthly payout set out in your agreement." },
];

export const howItWorksSteps = [
  { number: "01", title: "Choose your plan", description: "Compare FC-60 and FC-120 and select the charger that fits your investment." },
  { number: "02", title: "We procure & install", description: "Friction Charge handles procurement, site work and installation end to end." },
  { number: "03", title: "We operate & maintain", description: "Our team runs 24×7 operations, software, billing, support and maintenance." },
  { number: "04", title: "You receive your monthly contractual payout", description: "A fixed amount lands as set out in your partner agreement." },
];

export const businessModelSteps = [
  { label: "Partner", detail: "Signs the partner agreement" },
  { label: "Owns the charger", detail: "Holds ownership of the asset" },
  { label: "Friction Charge installs", detail: "Procurement, site work and commissioning" },
  { label: "Friction Charge operates", detail: "Runs day-to-day charging operations" },
  { label: "EV drivers charge", detail: "Sessions happen at the station" },
  { label: "Friction Charge manages operations", detail: "Monitoring, billing and support" },
  { label: "Partner receives fixed contractual payout", detail: "Paid out monthly under the agreement" },
];

export type NetworkFormat = {
  title: string;
  description: string;
  points: string[];
};

export const networkFormats: NetworkFormat[] = [
  {
    title: "Standalone Fast Chargers",
    description: "60 kW and 120 kW DC fast chargers at high-traffic locations.",
    points: ["60 kW DC fast charging", "120 kW DC fast charging", "High-traffic locations"],
  },
  {
    title: "Charging Hubs",
    description: "Larger stations with approximately 20–24 charging points.",
    points: ["Fleets", "Taxis", "Highway traffic", "High-volume charging"],
  },
];

export type RoadmapPhase = {
  phase: string;
  title: string;
  description: string;
  image: string;
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "PHASE 01",
    title: "Delhi NCR",
    description: "Initial network build-out across Delhi NCR.",
    image: "/images/dc-fast-charging.webp",
  },
  {
    phase: "PHASE 02",
    title: "North India Highway Corridors",
    description: "Extending fast-charging coverage along major North Indian highway corridors.",
    image: "/images/highway-infrastructure.webp",
  },
  {
    phase: "PHASE 03",
    title: "Pan-India",
    description: "Long-term expansion toward a pan-India charging network.",
    image: "/images/pan-india-expansion.webp",
  },
];

export type TechnologyFeature = {
  title: string;
  description: string;
  icon: "activity" | "credit-card" | "radio" | "bar-chart-3";
};

export const technologyFeatures: TechnologyFeature[] = [
  { title: "Live Monitoring", description: "Track charger status and uptime.", icon: "activity" },
  { title: "Billing & Payments", description: "Manage charging-session billing and digital payments.", icon: "credit-card" },
  { title: "Remote Management", description: "Enable remote charger diagnostics and management.", icon: "radio" },
  { title: "Usage Analytics", description: "Track utilization, energy delivered and station performance.", icon: "bar-chart-3" },
];

export type ServiceGroup = {
  title: string;
  audience: "EV Drivers" | "Partners" | "Network";
  items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "EV Drivers",
    audience: "EV Drivers",
    items: ["DC fast charging", "Digital charging payments", "Charging-session tracking", "Station access"],
  },
  {
    title: "Partners",
    audience: "Partners",
    items: [
      "Charger ownership plans",
      "Charger procurement",
      "Installation",
      "Station operations",
      "Maintenance",
      "Billing management",
      "Customer support",
      "Monthly payout processing",
      "Reporting",
    ],
  },
  {
    title: "Network",
    audience: "Network",
    items: ["Standalone charging stations", "Charging hubs", "Highway charging infrastructure", "Fleet charging infrastructure"],
  },
];

export const horizontalBackboneCards = [
  { number: "01", title: "DC Fast Charging", image: "/images/dc-fast-charging.webp" },
  { number: "02", title: "Charging Hubs", image: "/images/charging-hubs.webp" },
  { number: "03", title: "Highway Infrastructure", image: "/images/highway-infrastructure.webp" },
  { number: "04", title: "Fleet Charging", image: "/images/fleet-charging.webp" },
  { number: "05", title: "Pan-India Expansion", image: "/images/pan-india-expansion.webp" },
];

export const values = [
  { title: "Transparency", description: "Clear numbers, written agreements and straightforward communication." },
  { title: "Reliability", description: "Focus on charger uptime, maintenance and dependable operations." },
  { title: "Partnership", description: "We grow the network by building long-term relationships with charger owners." },
];

export const whyChargingStages = [
  {
    number: "01",
    title: "Growing EV adoption",
    description: "More electric vehicles are entering Indian roads every year.",
    image: "/images/growing-ev-adoption.webp",
  },
  {
    number: "02",
    title: "The charging gap",
    description: "The charging ecosystem needs to scale alongside EV adoption.",
    image: "/images/the-charging-gap.webp",
  },
  {
    number: "03",
    title: "The infrastructure opportunity",
    description:
      "Friction Charge is building charging infrastructure where EV drivers, fleets and highway traffic need it.",
    image: "/images/the-infrastructure-opportunity.webp",
  },
];

export const disclaimerText =
  "Figures shown are fixed contractual payouts under the Friction Charge partner agreement, not market-linked returns. Please review the agreement for complete terms.";

export const analyticsEvents = [
  "become_partner_click",
  "franchise_plan_fc60",
  "franchise_plan_fc120",
  "contact_submit",
  "whatsapp_click",
  "call_click",
  "download_app_click",
  "network_cta",
  "technology_cta",
  "blog_open",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];
