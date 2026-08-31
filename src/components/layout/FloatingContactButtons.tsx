"use client";

import { MessageCircle, Phone } from "lucide-react";
import { contact } from "@/lib/data/company";
import { trackEvent } from "@/lib/analytics";

/**
 * Fixed bottom-right FABs, present on every page/section since they live in
 * the root layout rather than any individual section. z-30 so the
 * full-screen mobile nav overlay (z-40) and navbar (z-50) still sit above
 * them when open.
 */
export default function FloatingContactButtons() {
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      <a
        href={`tel:${contact.phone}`}
        onClick={() => trackEvent("call_click", { source: "floating_button" })}
        aria-label="Call Friction Charge"
        className="glass technical-border group flex h-14 items-center overflow-hidden rounded-full shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(69,245,140,0.4)]"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center text-text">
          <Phone size={20} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-text transition-[max-width] duration-300 group-hover:max-w-[100px]">
          Call Us
        </span>
        <span className="w-0 group-hover:w-4" />
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
        aria-label="Message Friction Charge on WhatsApp"
        className="group flex h-14 items-center overflow-hidden rounded-full bg-gradient-to-r from-lime to-emerald shadow-lg transition-shadow duration-300 hover:shadow-[0_0_36px_-4px_rgba(69,245,140,0.55)]"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center text-[#050a0f]">
          <MessageCircle size={20} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-[#050a0f] transition-[max-width] duration-300 group-hover:max-w-[130px]">
          WhatsApp Us
        </span>
        <span className="w-0 group-hover:w-4" />
      </a>
    </div>
  );
}
