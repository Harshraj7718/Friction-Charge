"use client";

import { gsap, prefersReducedMotion } from "./gsap";

type PinStagesOptions = {
  container: HTMLElement;
  stageCount: number;
  onStageChange: (index: number) => void;
  pinSpacing?: boolean;
  endMultiplier?: number;
};

/**
 * Pins `container` for the duration of `stageCount` scroll-driven stages and
 * calls `onStageChange` whenever scroll progress crosses into a new stage.
 * Used for storytelling sequences like "Why EV Charging, Why Now" where the
 * visual stays fixed while surrounding copy changes.
 */
export function pinStages({ container, stageCount, onStageChange, pinSpacing = true, endMultiplier = 1 }: PinStagesOptions) {
  if (prefersReducedMotion()) {
    onStageChange(stageCount - 1);
    return;
  }

  let lastStage = -1;

  gsap.to(
    {},
    {
      scrollTrigger: {
        trigger: container,
        start: "top top",
        // Viewport height, not container.clientHeight: the container is the
        // pin target itself, and reading its own box size back inside this
        // callback races GSAP's pin measurement (it can read 0 mid-pass,
        // collapsing the pin-spacer). window.innerHeight is what "N
        // viewport-heights of scroll" actually means anyway.
        end: () => `+=${window.innerHeight * stageCount * endMultiplier}`,
        pin: true,
        pinSpacing,
        scrub: 0.4,
        onUpdate: (self) => {
          const stage = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
          if (stage !== lastStage) {
            lastStage = stage;
            onStageChange(stage);
          }
        },
      },
    }
  );
}

type PinTimelineOptions = {
  container: HTMLElement;
  track: HTMLElement;
  onProgress?: (progress: number) => void;
};

/** Pins a vertical timeline track and reports scroll progress along it (0–1). */
export function pinTimeline({ container, track, onProgress }: PinTimelineOptions) {
  if (prefersReducedMotion()) {
    onProgress?.(1);
    return;
  }

  gsap.fromTo(
    track,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      transformOrigin: "top center",
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => onProgress?.(self.progress),
      },
    }
  );
}
