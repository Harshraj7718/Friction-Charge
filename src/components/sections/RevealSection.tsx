"use client";

import type { ReactNode, HTMLAttributes } from "react";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements, imageReveal, drawLine } from "@/lib/animations/reveal";
import { splitTextReveal } from "@/lib/animations/textReveal";
import { cn } from "@/lib/utils/cn";

type RevealSectionProps = HTMLAttributes<HTMLElement> & { children: ReactNode };

/** Generic scroll-reveal wrapper for one-off page sections that don't warrant their own component. */
export default function RevealSection({ children, className, ...props }: RevealSectionProps) {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    splitTextReveal(scope);
    revealElements(scope);
    imageReveal(scope);
    drawLine(scope);
  }, []);

  return (
    <section ref={scopeRef} className={cn("relative", className)} {...props}>
      {children}
    </section>
  );
}
