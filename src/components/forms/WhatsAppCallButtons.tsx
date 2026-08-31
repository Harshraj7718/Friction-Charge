"use client";

import { MessageCircle, Phone } from "lucide-react";
import { contact } from "@/lib/data/company";
import { trackEvent } from "@/lib/analytics";

export default function WhatsAppCallButtons() {
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "contact_page" })}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lime to-emerald px-5 py-3 text-sm font-medium text-[#050a0f]"
      >
        <MessageCircle size={16} />
        WhatsApp Us
      </a>
      <a
        href={`tel:${contact.phone}`}
        onClick={() => trackEvent("call_click", { source: "contact_page" })}
        className="glass technical-border inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-text hover:text-bright-green"
      >
        <Phone size={16} />
        Call Us
      </a>
    </div>
  );
}
