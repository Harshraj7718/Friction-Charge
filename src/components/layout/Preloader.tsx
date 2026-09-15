"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // This effect reads browser-only state (sessionStorage, matchMedia) that
    // isn't knowable during SSR, so the resulting setState calls below are a
    // one-time sync from that external state, not a render loop.
    /* eslint-disable react-hooks/set-state-in-effect */
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem("fc-preloaded");

    if (alreadyShown) {
      setDone(true);
      setHidden(true);
      return;
    }

    if (reduceMotion) {
      sessionStorage.setItem("fc-preloaded", "1");
      setProgress(100);
      setDone(true);
      const t = setTimeout(() => setHidden(true), 80);
      return () => clearTimeout(t);
    }
    /* eslint-enable react-hooks/set-state-in-effect */

    let raf: number;
    const start = performance.now();
    // Real content is already painted underneath well before this timer
    // finishes — this only exists as a branding flourish, so it's kept
    // short rather than a longer showcase duration that would just make
    // every first visit wait on a fake progress bar.
    const durationMs = 200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("fc-preloaded", "1");
        setDone(true);
        setTimeout(() => setHidden(true), 100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden={done}
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-opacity duration-100",
        done ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <Image src="/images/logo-icon.webp" alt="" width={908} height={589} priority sizes="90px" className="h-14 w-auto animate-pulse" />
        <p className="font-mono-tech text-xs tracking-[0.35em] text-muted">CHARGING THE FUTURE</p>
        <div className="relative h-px w-56 overflow-hidden bg-card-border">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime to-bright-green shadow-[0_0_12px_rgba(69,245,140,0.8)] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono-tech text-[11px] text-muted/70">{progress}%</p>
      </div>
    </div>
  );
}
