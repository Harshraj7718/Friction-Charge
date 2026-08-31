"use client";

import { useRef } from "react";
import { Check, Car, Handshake, Network } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { setupHorizontalScroll } from "@/lib/animations/horizontalScroll";
import { serviceGroups } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [Car, Handshake, Network];

export default function ServicesHorizontal() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    if (trackRef.current) {
      setupHorizontalScroll(scope, trackRef.current);
    }
  }, []);

  return (
    <section ref={scopeRef} className="relative overflow-hidden py-24 sm:py-32">
      <Container className="mb-14">
        <SectionHeading eyebrow="What we do" title="Built for drivers, partners and the network." />
      </Container>

      <div ref={trackRef} className="flex w-max gap-6 pl-6 sm:pl-10 lg:pl-[max(4rem,calc((100vw-1440px)/2+4rem))]">
        {serviceGroups.map((group, i) => {
          const Icon = icons[i];
          return (
            <div
              key={group.title}
              data-reveal
              className="group relative flex h-auto w-[300px] shrink-0 flex-col gap-5 overflow-hidden rounded-3xl border border-card-border bg-bg-elevated p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-bright-green/40 hover:shadow-[0_0_40px_rgba(69,245,140,0.12)] sm:w-[380px]"
            >
              <span
                aria-hidden
                className="absolute -right-6 -top-10 font-display text-[7rem] font-medium leading-none text-card-border/30 transition-colors duration-300 group-hover:text-bright-green/10"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-bright-green/10 text-bright-green transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} />
              </span>

              <div className="relative z-10">
                <p className="font-mono-tech text-xs uppercase tracking-widest text-bright-green">{group.audience}</p>
                <h3 className="font-display mt-1 text-2xl font-medium">{group.title}</h3>
              </div>

              <ul className="relative z-10 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-bright-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
