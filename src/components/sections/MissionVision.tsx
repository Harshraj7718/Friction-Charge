import EditorialParallaxStory from "./EditorialParallaxStory";

const statements = [
  {
    eyebrow: "Our mission",
    heading: "Reliable fast charging within reach of every EV driver in India.",
  },
  {
    eyebrow: "Our vision",
    heading: "A pan-India network of fast chargers and charging hubs — owned by partners, operated by Friction Charge.",
  },
];

export default function MissionVision() {
  return <EditorialParallaxStory statements={statements} />;
}
