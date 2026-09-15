"use client";

import Image from "next/image";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements, drawLine, imageReveal } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import Container from "@/components/ui/Container";

const segments = ["Electric two-wheelers", "Electric cars", "Commercial EVs", "Fleets", "Taxis", "Highway mobility"];

export default function IndiaGoingElectric() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    drawLine(scope);
    imageReveal(scope);
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <p data-reveal className="font-mono-tech text-xs uppercase tracking-[0.2em] text-bright-green">
            The shift
          </p>
          <h2 data-reveal data-split-text className="font-display text-4xl font-medium leading-[1.1] sm:text-5xl">
            India is going electric.
          </h2>
          <p data-reveal className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
            India&apos;s transition toward electric mobility is accelerating across electric two-wheelers, electric
            cars, commercial EVs, fleets, taxis and highway mobility.
          </p>

          <ul className="mt-2 grid grid-cols-2 gap-3">
            {segments.map((segment) => (
              <li
                key={segment}
                data-reveal
                className="glass technical-border rounded-xl px-4 py-3 text-sm text-muted"
              >
                {segment}
              </li>
            ))}
          </ul>

          <p data-reveal className="mt-4 max-w-md font-display text-xl font-medium leading-snug text-text">
            As more EVs reach Indian roads, charging infrastructure must grow with them.
          </p>
        </div>

        <div data-image-reveal className="order-1 mx-auto w-full max-w-md lg:order-2" data-parallax data-parallax-speed="0.2">
          <Image
            src="/images/india.webp"
            alt="Map of India with pins marking EV charging activity across states"
            width={1243}
            height={1265}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 448px, 90vw"
          />
        </div>
      </Container>
    </section>
  );
}
