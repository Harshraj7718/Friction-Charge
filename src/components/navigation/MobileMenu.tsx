"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/data/company";
import { cn } from "@/lib/utils/cn";
import ThemeToggle from "@/components/layout/ThemeToggle";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-bg noise-overlay transition-opacity duration-300 md:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div className="grid-pattern absolute inset-0 opacity-40" aria-hidden />
      <nav className="relative z-10 mt-24 flex flex-1 flex-col justify-between px-6 pb-10">
        <ul className="flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={cn(
                "border-b border-card-border py-4 transition-all duration-[400ms] ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${i * 45 + 60}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                className="font-display flex items-center justify-between text-3xl font-medium text-text hover:text-bright-green"
              >
                {link.label}
                <ArrowUpRight size={22} className="text-muted" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6 pt-8">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs tracking-widest text-muted">DAY / NIGHT</span>
            <ThemeToggle />
          </div>
          <Link
            href="/franchise"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lime to-emerald px-6 py-4 text-center font-body font-medium text-[#050a0f]"
          >
            Become a Partner
          </Link>
        </div>
      </nav>
    </div>
  );
}
