import type { AnalyticsEvent } from "@/lib/data/company";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

/**
 * Fires a named product-analytics event. No-ops silently when no analytics
 * ID is configured, and never throws — analytics must never break UX.
 */
export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });

    if (ANALYTICS_ID && typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    }

    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics]", event, payload);
    }
  } catch {
    // Analytics failures must never affect the user experience.
  }
}
