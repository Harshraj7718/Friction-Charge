"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Send, User, Phone, Mail, MapPin, MessageSquare, AlertCircle, ArrowRight } from "lucide-react";
import { partnerPlans } from "@/lib/data/company";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils/cn";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  plan: "FC-60" | "FC-120" | "Not sure";
  message: string;
};

const initialState: FormState = { fullName: "", phone: "", email: "", city: "", plan: "Not sure", message: "" };

const inputClasses =
  "w-full rounded-xl border border-card-border bg-bg-elevated/70 py-3 pl-11 pr-4 text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-bright-green focus:bg-card";

const planOptions = [
  ...partnerPlans.map((plan) => ({ value: plan.code as FormState["plan"], label: plan.code, detail: plan.power })),
  { value: "Not sure" as const, label: "Not sure", detail: "Help me choose" },
];

function Field({
  id,
  label,
  required,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
        {label} {required && <span className="text-bright-green">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">{icon}</span>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!/^[+0-9\s-]{7,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    trackEvent("contact_submit", { plan: form.plan, city: form.city || undefined });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass technical-border flex flex-col items-center gap-4 rounded-3xl p-10 text-center sm:p-14">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
          <CheckCircle2 size={32} />
        </span>
        <h3 className="font-display text-2xl font-medium">Enquiry received.</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thanks, {form.fullName.split(" ")[0] || "there"}. The Friction Charge team will reach out to discuss the
          model and answer your questions.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass technical-border relative overflow-hidden rounded-3xl p-6 sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #45f58c, transparent 70%)" }}
      />

      <div className="relative mb-8 flex items-start gap-4 border-b border-card-border pb-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
          <Send size={20} />
        </span>
        <div>
          <h3 className="font-display text-xl font-medium sm:text-2xl">Send an enquiry</h3>
          <p className="mt-1 text-sm text-muted">Share a few details and our team will get back within 24 hours.</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full Name" required icon={<User size={16} />} error={errors.fullName}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Your name"
              className={cn(inputClasses, errors.fullName && "border-red-500/70")}
            />
          </Field>

          <Field id="phone" label="Phone" required icon={<Phone size={16} />} error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 00000 00000"
              className={cn(inputClasses, errors.phone && "border-red-500/70")}
            />
          </Field>

          <Field id="email" label="Email" icon={<Mail size={16} />} error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className={cn(inputClasses, errors.email && "border-red-500/70")}
            />
          </Field>

          <Field id="city" label="City" icon={<MapPin size={16} />}>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Noida"
              className={inputClasses}
            />
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-text">Interested Plan</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {planOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-xl border px-4 py-3 transition-colors",
                  form.plan === option.value
                    ? "border-bright-green bg-bright-green/10"
                    : "border-card-border bg-bg-elevated/50 hover:border-bright-green/40"
                )}
              >
                <input
                  type="radio"
                  name="plan"
                  value={option.value}
                  checked={form.plan === option.value}
                  onChange={() => update("plan", option.value)}
                  className="sr-only"
                />
                <p className={cn("font-mono-tech text-sm font-medium", form.plan === option.value ? "text-bright-green" : "text-text")}>
                  {option.label}
                </p>
                <p className="mt-0.5 text-xs text-muted">{option.detail}</p>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
            Message
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-3.5 text-muted">
              <MessageSquare size={16} />
            </span>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Tell us a bit about what you're looking for (optional)"
              className={cn(inputClasses, "resize-none pt-3")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime to-emerald px-6 py-3.5 text-sm font-medium text-[#050a0f] transition-shadow hover:shadow-[0_0_36px_rgba(69,245,140,0.45)]"
        >
          Submit Enquiry
          <ArrowRight size={16} />
        </button>

        <p className="text-center text-xs text-muted">By submitting, you agree to be contacted by our team. No spam, ever.</p>
      </div>
    </form>
  );
}
