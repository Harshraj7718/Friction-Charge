"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
  onClick?: () => void;
  external?: boolean;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  onClick,
  external = false,
}: CTAButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.4, duration: 0.4, ease: "power3.out" });
  }

  function handleMouseLeave() {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-colors duration-300 will-change-transform";
  const sizes = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
  const variants: Record<string, string> = {
    primary: "bg-gradient-to-r from-lime to-emerald text-[#050a0f] hover:shadow-[0_0_36px_rgba(69,245,140,0.45)]",
    secondary: "border border-card-border text-text hover:border-bright-green hover:text-bright-green glass",
    ghost: "text-text hover:text-bright-green",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const sharedProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className: cn(base, sizes, variants[variant], className),
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...sharedProps}>
      {content}
    </Link>
  );
}
