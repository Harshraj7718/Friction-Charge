"use client";

import { useState, type FormEvent } from "react";
import { MessageSquarePlus, X, Send, AlertCircle, CheckCircle2, User, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils/cn";

type FormState = { fullName: string; phone: string };
const initialState: FormState = { fullName: "", phone: "" };

const inputClasses =
  "w-full rounded-xl border border-card-border bg-bg-elevated/70 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-bright-green focus:bg-card";

/**
 * A minimal, always-available lead-capture widget for the home page only —
 * imported directly into app/page.tsx rather than the root layout, so it
 * doesn't need pathname checks to stay off every other route. Sits bottom-
 * left, mirroring FloatingContactButtons' bottom-right WhatsApp/Call
 * cluster; same z-30 so the mobile nav (z-40) and navbar (z-50) still layer
 * above it correctly.
 */
export default function QuickEnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Honeypot — real users never see or fill this; bots that auto-fill every
  // input on a page do. See ContactForm for the same pattern.
  const [honeypot, setHoneypot] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!/^[+0-9\s-]{7,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;
    if (submitting) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        return;
      }
      if (!res.ok) throw new Error("request_failed");

      trackEvent("contact_submit", { source: "quick_popup" });
      setForm(initialState);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function toggle() {
    setOpen((v) => !v);
  }

  return (
    // pointer-events-none on this wrapper, restored per-child below — the
    // panel keeps its full layout size even while closed (it's animated via
    // opacity/scale, not unmounted), so without this the wrapper's fixed
    // box would sit as an invisible click-blocker over whatever page
    // content happens to be underneath it.
    <div className="pointer-events-none fixed bottom-6 left-6 z-30 flex flex-col items-start gap-3">
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Quick enquiry"
        aria-hidden={!open}
        className={cn(
          "glass technical-border w-[300px] origin-bottom-left rounded-3xl shadow-xl transition-all duration-300 sm:w-[340px]",
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"
        )}
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <p className="font-display text-base font-medium">Enquiry received.</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Thank you. Our team will contact you shortly.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="relative overflow-hidden p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-base font-medium">Quick enquiry</p>
                <p className="mt-0.5 text-xs text-muted">We&apos;ll call you back within 24 hours.</p>
              </div>
              <button
                type="button"
                onClick={toggle}
                aria-label="Close enquiry form"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            {/* Honeypot field — invisible to real users, off-screen and unreachable by keyboard/screen reader. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
              <label htmlFor="quick-website">Website</label>
              <input
                type="text"
                id="quick-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <User size={15} />
                  </span>
                  <input
                    id="quick-fullName"
                    name="fullName"
                    type="text"
                    aria-label="Full name"
                    aria-invalid={Boolean(errors.fullName)}
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Your name"
                    className={cn(inputClasses, errors.fullName && "border-red-500/70")}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={11} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <Phone size={15} />
                  </span>
                  <input
                    id="quick-phone"
                    name="phone"
                    type="tel"
                    aria-label="Phone number"
                    aria-invalid={Boolean(errors.phone)}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 00000 00000"
                    className={cn(inputClasses, errors.phone && "border-red-500/70")}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={11} />
                    {errors.phone}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-red-500">
                  <AlertCircle size={12} />
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime to-emerald px-5 py-2.5 text-sm font-medium text-[#050a0f] transition-shadow hover:shadow-[0_0_28px_rgba(69,245,140,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Submit"}
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close enquiry form" : "Open quick enquiry form"}
        className="glass technical-border group pointer-events-auto flex h-14 items-center overflow-hidden rounded-full shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(69,245,140,0.4)]"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center text-bright-green">
          {open ? <X size={20} className="text-text" /> : <MessageSquarePlus size={20} />}
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-text transition-[max-width] duration-300 group-hover:max-w-[120px]">
          {open ? "Close" : "Quick Enquiry"}
        </span>
        <span className="w-0 group-hover:w-4" />
      </button>
    </div>
  );
}
