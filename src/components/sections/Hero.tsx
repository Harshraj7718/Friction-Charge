"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { playHeroTimeline } from "@/lib/animations/heroTimeline";
import { playHeroVisualFX } from "@/lib/animations/heroVisualFX";
import { trackEvent } from "@/lib/analytics";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import TechnicalLabel from "@/components/ui/TechnicalLabel";
import TextPressure from "@/components/ui/TextPressure";
import DynamicFill from "@/components/ui/DynamicFill";

export default function Hero() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLSpanElement>(null);
  const dot2Ref = useRef<HTMLSpanElement>(null);

  // The hero plays a single authored entrance timeline on mount rather than
  // the site's generic scroll-reveal system — see heroTimeline.ts for why.
  const scopeRef = useGsapContext<HTMLElement>(() => {
    playHeroTimeline({
      eyebrow: eyebrowRef.current,
      heading: headingRef.current,
      subtext: subtextRef.current,
      ctas: ctasRef.current,
      visual: visualRef.current,
      scrollHint: scrollHintRef.current,
    });
    playHeroVisualFX({
      float: floatRef.current,
      glow: glowRef.current,
      ring: ringRef.current,
      dots: [dot1Ref.current, dot2Ref.current].filter((el): el is HTMLSpanElement => el !== null),
    });
  }, []);

  return (
    <section
      ref={scopeRef}
      className="grid-pattern relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" data-parallax data-parallax-speed="0.15">
        <div
          className="absolute right-[-10%] top-1/4 h-[500px] w-[500px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, #45f58c, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <TechnicalLabel ref={eyebrowRef} data-reveal className="w-fit">
            Charging the Future · EV Charging Solutions
          </TechnicalLabel>

          <h1
            ref={headingRef}
            data-reveal
            className="font-display max-w-xl text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-[4.5rem]"
          >
            Powering India&apos;s{" "}
            <DynamicFill>
              <TextPressure text="Electric Future." gradient="linear-gradient(120deg, #b4e863, #2ebd59)" />
            </DynamicFill>
          </h1>

          <p ref={subtextRef} data-reveal className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Friction Charge builds and operates DC fast-charging infrastructure designed to make reliable EV charging
            more accessible across India.
          </p>

          <div ref={ctasRef} data-reveal className="flex flex-wrap gap-4 pt-2">
            <CTAButton href="/franchise" size="lg" onClick={() => trackEvent("become_partner_click", { source: "hero" })}>
              Become a Partner
            </CTAButton>
            <CTAButton
              href="/network"
              variant="secondary"
              size="lg"
              onClick={() => trackEvent("network_cta", { source: "hero" })}
            >
              Explore Our Network
            </CTAButton>
          </div>
        </div>

        <div ref={visualRef} data-reveal className="relative h-[420px] sm:h-[520px] lg:h-[620px]">
          <div
            ref={glowRef}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[90px]"
            style={{ background: "radial-gradient(circle, #45f58c, transparent 70%)" }}
          />

          <div
            ref={ringRef}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-bright-green/25"
          />

          <span
            ref={dot1Ref}
            aria-hidden
            className="absolute right-[8%] top-[18%] h-2.5 w-2.5 rounded-full bg-bright-green opacity-60"
            style={{ boxShadow: "0 0 12px 2px rgba(69,245,140,0.7)" }}
          />
          <span
            ref={dot2Ref}
            aria-hidden
            className="absolute bottom-[16%] left-[10%] h-2 w-2 rounded-full bg-bright-green opacity-60"
            style={{ boxShadow: "0 0 12px 2px rgba(69,245,140,0.7)" }}
          />

          <div ref={floatRef} className="absolute inset-0">
            <Image
              src="/images/ev-charger.png"
              alt="Friction Charge DC fast chargers — 60 kW and 120 kW models"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 620px, 100vw"
              priority
            />
          </div>
        </div>
      </Container>

      <div
        ref={scrollHintRef}
        data-reveal
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono-tech text-[10px] tracking-[0.3em]">SCROLL</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
