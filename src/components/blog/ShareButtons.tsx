"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently no-op, the URL bar still has the link.
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono-tech text-xs uppercase tracking-widest text-muted">Share</span>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="glass technical-border rounded-full px-4 py-2 text-sm text-text transition-colors hover:text-bright-green"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="glass technical-border inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-text transition-colors hover:text-bright-green"
      >
        {copied ? <Check size={14} /> : <Link2 size={14} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
