"use client";

import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

const mediaItems = [
  {
    id: 1,
    type: "video",
    title: "Plug In. Power Up.",
    desc: "FC-120 charging an EV, connector glowing green.",
    url: "/videos/charge.mp4",
    poster: "/images/gallery/charge-poster.jpg",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 2,
    type: "video",
    title: "Two Chargers. One Station.",
    desc: "FC-60 and FC-120 charging side by side at a Friction Charge station.",
    url: "/videos/G1.mp4",
    poster: "/images/gallery/g1-poster.jpg",
    span: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  },
  {
    id: 3,
    type: "video",
    title: "The Charging Bay",
    desc: "A row of Friction Charge stations, lit up at night.",
    url: "/videos/G3.mp4",
    poster: "/images/gallery/g3-poster.jpg",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "video",
    title: "Ready to Plug In",
    desc: "A closer look at the Friction Charge connector.",
    url: "/videos/G2.mp4",
    poster: "/images/gallery/g2-poster.jpg",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "video",
    title: "Connected & Charging",
    desc: "Connector detail, glowing green mid-charge.",
    url: "/videos/G4.mp4",
    poster: "/images/gallery/g4-poster.jpg",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "video",
    title: "Charging the Future",
    desc: "A look at the Friction Charge experience.",
    url: "/videos/G5.mp4",
    poster: "/images/gallery/g5-poster.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

export default function Gallery() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    revealElements(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative py-16 sm:py-20">
      <div data-reveal>
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="Inside the network."
          description="Drag, click and explore the chargers, hubs and software behind Friction Charge."
        />
      </div>
    </section>
  );
}
