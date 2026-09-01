"use client";

import { ScrollTrigger, prefersReducedMotion } from "./gsap";

type FrameSequenceOptions = {
  /** The tall scroll "runway" — its height sets how much scroll the sequence spans. */
  runway: HTMLElement;
  canvas: HTMLCanvasElement;
  frameUrls: string[];
  onProgress?: (progress: number) => void;
};

/** Draws `img` into the canvas cropped to fill it edge-to-edge (CSS `object-fit: cover`), never stretched. */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvasW: number, canvasH: number) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let sx: number, sy: number, sw: number, sh: number;

  if (imgRatio > canvasRatio) {
    sh = img.naturalHeight;
    sw = sh * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / canvasRatio;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

/**
 * Scroll-scrubs a pre-rendered image sequence onto a full-viewport canvas —
 * converting a source video into frames and stepping through them by
 * scroll position, the technique behind Apple-style product reveals. Used
 * instead of a native <video> because <video>.currentTime scrubbing
 * doesn't track scroll position frame-accurately or consistently across
 * browsers.
 *
 * The canvas is sized to its own on-screen box (in device pixels, so it
 * stays sharp on high-DPI screens) rather than a fixed resolution, and
 * every frame is drawn "cover"-fit into that box — filling it edge-to-edge
 * like a full-bleed video background rather than sitting inside a
 * letterboxed or framed card.
 */
export function setupFrameSequence({ runway, canvas, frameUrls, onProgress }: FrameSequenceOptions) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !frameUrls.length) return;

  const images: HTMLImageElement[] = new Array(frameUrls.length);
  let currentFrame = -1;

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  };

  const drawFrame = (index: number, force = false) => {
    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    if (currentFrame === index && !force) return;
    currentFrame = index;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCover(ctx, img, canvas.width, canvas.height);
  };

  resizeCanvas();

  const onResize = () => {
    resizeCanvas();
    if (currentFrame >= 0) drawFrame(currentFrame, true);
  };
  window.addEventListener("resize", onResize);

  const lastIndex = frameUrls.length - 1;
  const reduced = prefersReducedMotion();

  const loadFrame = (i: number, onLoaded?: () => void) => {
    const img = new window.Image();
    images[i] = img;
    img.onload = () => onLoaded?.();
    img.src = frameUrls[i];
  };

  // Reduced-motion users only ever see the final "connected and charging"
  // frame as a static image — no need to fetch the other 59.
  if (reduced) {
    loadFrame(lastIndex, () => drawFrame(lastIndex));
    return () => window.removeEventListener("resize", onResize);
  }

  // The first frame loads immediately so there's something to draw the
  // instant the runway is reached. The rest load lazily, kicked off only
  // once the runway is actually approaching the viewport — loading all 60
  // frames up front (as this used to) fired 60 requests at page load
  // regardless of whether the user ever scrolls anywhere near this
  // section, which noticeably slowed initial page load.
  loadFrame(0, () => drawFrame(0));

  let remainingFramesRequested = false;
  const loadRemainingFrames = () => {
    if (remainingFramesRequested) return;
    remainingFramesRequested = true;
    frameUrls.forEach((_, i) => {
      if (i !== 0) loadFrame(i);
    });
  };

  const runwayObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadRemainingFrames();
        runwayObserver.disconnect();
      }
    },
    { rootMargin: "100% 0px" }
  );
  runwayObserver.observe(runway);

  const trigger = ScrollTrigger.create({
    trigger: runway,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.2,
    onUpdate: (self) => {
      drawFrame(Math.min(lastIndex, Math.floor(self.progress * frameUrls.length)));
      onProgress?.(self.progress);
    },
  });

  return () => {
    window.removeEventListener("resize", onResize);
    runwayObserver.disconnect();
    trigger.kill();
  };
}
