"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/animations/gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    registerGsap();

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (prefersReducedMotion() || !overlayRef.current || !lineRef.current) return;

    // The line sweep is a symmetric wipe (ease in-out reads correctly), but
    // the overlay retract is effectively the new page's entrance — that
    // gets ease-out so it decelerates into place rather than easing both ways.
    const tl = gsap.timeline();
    tl.set(overlayRef.current, { display: "block", scaleY: 1 })
      .set(lineRef.current, { scaleX: 0, opacity: 1 })
      .to(lineRef.current, { scaleX: 1, duration: 0.3, ease: "power2.inOut" })
      .to(overlayRef.current, { scaleY: 0, transformOrigin: "top", duration: 0.4, ease: "power3.out" }, "-=0.08")
      .set(overlayRef.current, { display: "none" });
  }, [pathname]);

  return (
    <>
      <div ref={overlayRef} className="fixed inset-0 z-[90] hidden bg-bg" aria-hidden>
        <div ref={lineRef} className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-gradient-to-r from-lime to-bright-green" />
      </div>
      {children}
    </>
  );
}
