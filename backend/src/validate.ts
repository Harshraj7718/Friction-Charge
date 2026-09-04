import type { EnquiryInput, PlanValue } from "./types.js";

const PLAN_VALUES: PlanValue[] = ["FC-60", "FC-120", "Not sure"];

type ValidationResult = { ok: true; value: EnquiryInput } | { ok: false; errors: Record<string, string> };

/** Mirrors the client-side validation in src/components/forms/ContactForm.tsx exactly. */
export function validateEnquiry(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const b = (body ?? {}) as Record<string, unknown>;

  const fullName = typeof b.fullName === "string" ? b.fullName.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const city = typeof b.city === "string" ? b.city.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const plan: PlanValue = PLAN_VALUES.includes(b.plan as PlanValue) ? (b.plan as PlanValue) : "Not sure";

  if (!fullName) errors.fullName = "Full name is required.";
  if (!phone) errors.phone = "Phone number is required.";
  else if (!/^[+0-9\s-]{7,15}$/.test(phone)) errors.phone = "Enter a valid phone number.";
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { fullName, phone, email, city, plan, message } };
}
