export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

// Illustrative sample content — not verified customer reviews. Swap for
// real partner/driver testimonials once the network has them.
export const testimonials: Testimonial[] = [
  {
    name: "Rohan Mehta",
    role: "Charging Partner, Pune",
    quote: "Installation was smooth and the team handled every approval. Payouts have landed on time, every month.",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    role: "Charging Partner, Bengaluru",
    quote: "I don't have to think about the day-to-day — Friction Charge runs the station and I just get the report.",
    rating: 5,
  },
  {
    name: "Vikram Nair",
    role: "EV Driver",
    quote: "Found a station through the app in seconds and was charging within minutes. No wait, no fuss.",
    rating: 4,
  },
  {
    name: "Sanya Kapoor",
    role: "Charging Partner, Ahmedabad",
    quote: "Support picked up the one time I had an issue with the connector, and it was fixed the same day.",
    rating: 5,
  },
  {
    name: "Arjun Desai",
    role: "Fleet Manager, Surat",
    quote: "Reliable fast charging for our delivery fleet has cut our downtime noticeably.",
    rating: 4,
  },
  {
    name: "Meera Shah",
    role: "EV Driver",
    quote: "The live status in the app actually matches what I find at the station — that alone makes it my first choice.",
    rating: 5,
  },
];
