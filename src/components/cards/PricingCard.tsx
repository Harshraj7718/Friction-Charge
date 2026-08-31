"use client";

import { Check, Zap } from "lucide-react";
import type { PartnerPlan } from "@/lib/data/company";
import { cn } from "@/lib/utils/cn";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CTAButton from "@/components/ui/CTAButton";
import { trackEvent } from "@/lib/analytics";

export default function PricingCard({ plan, inclusions }: { plan: PartnerPlan; inclusions: string[] }) {
  const isFlagship = Boolean(plan.badge);

  return (
    <div
      data-reveal
      className={cn(
        "group relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 sm:p-10",
        isFlagship
          ? // Always a dark card, regardless of site theme — both gradient stops
            // are hardcoded so the light text on it stays legible in day mode too.
            "border border-bright-green/40 bg-gradient-to-b from-[#0f2418] to-[#0c1822] hover:shadow-[0_0_60px_-15px_rgba(69,245,140,0.45)]"
          : "border border-card-border bg-card hover:border-bright-green/40 hover:shadow-[0_0_50px_-20px_rgba(69,245,140,0.3)]"
      )}
    >
      {plan.badge && (
        <span className="font-mono-tech absolute -top-3 left-8 rounded-full bg-gradient-to-r from-lime to-emerald px-3 py-1 text-[10px] font-semibold tracking-widest text-[#050a0f]">
          {plan.badge}
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-bright-green transition-transform duration-300 group-hover:scale-110">
          <Zap size={20} />
        </span>
        <div>
          <p className={cn("font-display text-2xl font-semibold", isFlagship && "text-white")}>{plan.code}</p>
          <p className={cn("font-mono-tech text-xs", isFlagship ? "text-white/60" : "text-muted")}>{plan.power}</p>
        </div>
      </div>

      <p className={cn("mt-5 text-sm leading-relaxed", isFlagship ? "text-white/70" : "text-muted")}>{plan.positioning}</p>

      <div className={cn("mt-8 border-t pt-6", isFlagship ? "border-white/10" : "border-card-border")}>
        <p className={cn("font-mono-tech text-[11px] tracking-widest", isFlagship ? "text-white/50" : "text-muted")}>
          ONE-TIME INVESTMENT
        </p>
        <p className={cn("font-mono-tech mt-1 text-3xl font-medium sm:text-4xl", isFlagship ? "text-white" : "text-text")}>
          ₹<AnimatedCounter value={plan.oneTimeAmount / 100000} formatter={(v) => v.toFixed(0)} />L
        </p>
      </div>

      <div className={cn("mt-4 flex items-baseline gap-2 rounded-2xl px-4 py-3", isFlagship ? "bg-black/25" : "bg-bg-elevated")}>
        <p className="font-mono-tech text-xl font-medium text-bright-green sm:text-2xl">
          ₹<AnimatedCounter value={plan.monthlyPayout} />
        </p>
        <p className={cn("text-xs", isFlagship ? "text-white/50" : "text-muted")}>fixed monthly payout</p>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {inclusions.map((item) => (
          <li key={item} className={cn("flex items-start gap-2 text-sm", isFlagship ? "text-white/70" : "text-muted")}>
            <Check size={15} className="mt-0.5 shrink-0 text-bright-green" />
            {item}
          </li>
        ))}
      </ul>

      <CTAButton
        href="/contact"
        variant={isFlagship ? "primary" : "secondary"}
        className="mt-8 w-full justify-center"
        onClick={() => trackEvent(plan.id === "fc-60" ? "franchise_plan_fc60" : "franchise_plan_fc120")}
      >
        Enquire about {plan.code}
      </CTAButton>
    </div>
  );
}
