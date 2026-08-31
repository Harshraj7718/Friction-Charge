"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations/gsap";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    if (prefersReducedMotion()) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return children;
}
