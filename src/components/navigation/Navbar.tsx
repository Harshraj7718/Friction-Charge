"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data/company";
import { cn } from "@/lib/utils/cn";
import { trackEvent } from "@/lib/analytics";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import CTAButton from "@/components/ui/CTAButton";
import MobileMenu from "@/components/navigation/MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || menuOpen ? "glass border-b border-card-border py-3" : "border-b border-transparent py-5"
        )}
      >
        <div className="container-fc flex items-center justify-between">
          <Logo priority />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 font-body text-sm text-muted transition-colors hover:text-text",
                    active && "text-text"
                  )}
                >
                  {link.label}
                  {active && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-bright-green" aria-hidden />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <CTAButton
              href="/franchise"
              size="md"
              className="hidden lg:inline-flex"
              onClick={() => trackEvent("become_partner_click", { source: "navbar" })}
            >
              Become a Partner
            </CTAButton>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="glass technical-border flex h-10 w-10 items-center justify-center rounded-full text-text lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
