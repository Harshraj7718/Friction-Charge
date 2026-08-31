"use client";

import { useEffect, useRef, useState } from "react";
import { setupFrameSequence } from "@/lib/animations/frameSequence";
import { registerGsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

const FRAME_COUNT = 60;
const frameUrls = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/charge-frames/frame-${String(i + 1).padStart(3, "0")}.jpg`
);

// Roughly matched to what's on screen at each point in the source clip:
// both chargers on their own, then a car pulling in to plug into the FC-120,
// then the connector glowing green as it charges.
const overlays = [
  { eyebrow: "Two chargers.", heading: "One platform." },
  { eyebrow: "Plug in.", heading: "Power up." },
  { eyebrow: "Fast, reliable charging —", heading: "every time." },
];

// A short, snappy fade at each edge rather than a long gradual one — the
// sequence should feel like it appears right as you reach it and hands off
// to the plan cards quickly once it's done, not like a slow transition.
const FADE_ZONE = 0.01;
// Must stay comfortably above 100 — the sticky stage inside is a full
// viewport tall (h-screen), and `position: sticky` only has room to hold it
// in place for as long as this runway is taller than that. Drop this below
// ~110 and the sticky child overflows its own parent and bleeds into
// whatever comes after it. The *actual* scroll distance spent scrubbing
// through frames is (this − 100)vh, since the pin only "holds" for that
// excess — so this number, not a huge one, is what controls scrub speed.
const RUNWAY_HEIGHT_VH = 500;

function Overlays({ activeOverlay }: { activeOverlay: number }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

      {overlays.map((overlay, i) => (
        <div
          key={overlay.heading}
          className={cn(
            "absolute left-6 top-8 z-10 transition-opacity duration-500 sm:left-12 sm:top-12",
            activeOverlay === i ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-bright-green sm:text-sm">{overlay.eyebrow}</p>
          <p className="font-display mt-1 text-3xl font-medium text-white sm:text-5xl">{overlay.heading}</p>
        </div>
      ))}
    </>
  );
}

/**
 * The video's frames stepped through by scroll position, filling the
 * viewport directly — no framed/rounded card around it, so it reads as a
 * full-bleed video rather than an embedded clip. See frameSequence.ts for
 * the canvas-scrub mechanics.
 */
export default function ChargeFrameSequence() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastOverlayIndex = useRef(-1);
  const [activeOverlay, setActiveOverlay] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Motion preference can only be read client-side — a one-time sync
    // from browser state, not a render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!runwayRef.current || !canvasRef.current) return;
    registerGsap();

    return setupFrameSequence({
      runway: runwayRef.current,
      canvas: canvasRef.current,
      frameUrls,
      onProgress: (progress) => {
        // Continuous value — written straight to the DOM every scroll tick
        // rather than through React state, which would re-render at scroll
        // frame rate for what's just an opacity fade.
        if (stageRef.current) {
          const edgeFade = Math.min(progress / FADE_ZONE, 1, (1 - progress) / FADE_ZONE);
          stageRef.current.style.opacity = String(Math.max(0, edgeFade));
        }

        // A slow continuous zoom on the footage itself (not the overlay
        // text, which stays fixed) — the parallax-style depth cue that
        // makes the sequence read as "camera drifting" rather than a flat
        // slideshow of frames.
        if (canvasRef.current) {
          canvasRef.current.style.transform = `scale(${1 + progress * 0.12})`;
        }

        // Discrete value — only pushed into React state on an actual
        // change, so this costs at most two re-renders across the whole
        // scroll instead of one per tick.
        const index = progress < 0.32 ? 0 : progress < 0.66 ? 1 : 2;
        if (index !== lastOverlayIndex.current) {
          lastOverlayIndex.current = index;
          setActiveOverlay(index);
        }
      },
    });
  }, []);

  // Reduced-motion: the same markup (so the effect above still runs and
  // loads the frames), but with the tall scroll runway collapsed to a
  // fixed height — the whole point of the runway is scroll-driven motion,
  // which this preference asks us to skip rather than just visually
  // soften. `setupFrameSequence` itself checks the same preference and,
  // seeing it, draws only the final "connected and charging" frame and
  // skips the ScrollTrigger scrub entirely.
  return (
    <div ref={runwayRef} className="relative w-full" style={{ height: reduced ? "80vh" : `${RUNWAY_HEIGHT_VH}vh` }}>
      <div className={cn("overflow-hidden", reduced ? "h-[80vh]" : "sticky top-0 h-screen")}>
        <div ref={stageRef} className="relative h-full w-full" style={{ opacity: reduced ? 1 : 0 }}>
          <canvas ref={canvasRef} className="h-full w-full bg-white" />
          <Overlays activeOverlay={reduced ? overlays.length - 1 : activeOverlay} />
        </div>
      </div>
    </div>
  );
}
