"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const circleRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // One-time hydration guard: next-themes can't know the persisted theme
    // until mount, so this intentionally re-renders once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isLight = mounted && theme === "light";

  useEffect(() => {
    // A small bouncy "pop" on the icon whenever the mode actually changes —
    // skipped on the hydration-triggered first render and under
    // reduced-motion, since it's a flourish, not a state indicator.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!circleRef.current || prefersReducedMotion()) return;

    gsap.fromTo(circleRef.current, { rotate: isLight ? -100 : 100, scale: 0.7 }, { rotate: 0, scale: 1, duration: 0.45, ease: "back.out(2.4)" });
  }, [isLight]);

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to night mode" : "Switch to day mode"}
      aria-pressed={isLight}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border border-card-border bg-card px-1 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-bright-green",
        className
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-lime to-emerald text-[#050a0f] transition-transform duration-300 ease-out",
          isLight ? "translate-x-[28px]" : "translate-x-0"
        )}
      >
        {/* Separate element from the slide above: GSAP owns this span's
            transform for the pop, the CSS transition above owns the other's. */}
        <span ref={circleRef} className="flex items-center justify-center">
          {mounted && isLight ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}
        </span>
      </span>
    </button>
  );
}
