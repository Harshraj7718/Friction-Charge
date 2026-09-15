"use client";

import { useCallback, useState } from "react";
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

const LEFT_LINKS = navLinks.slice(0, 4);
const RIGHT_LINKS = navLinks.slice(4);

// Two hairline strokes rather than one — a thin band of two closely-spaced
// lines reads as a deliberate technical/blueprint accent instead of a flat
// border, echoing the site's `grid-pattern` motif at the seams of the notch.
// `bottomOffset` is how far up from the slice's own bottom edge to draw them
// — the outer bars are 40px tall, the center pill is 64px, so the same
// visual "near the bottom" placement needs different absolute y values.
function HairlineStrokes({ bottomOffset }: { bottomOffset: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <line
        x1="0"
        y1={bottomOffset - 0.5}
        x2="100%"
        y2={bottomOffset - 0.5}
        stroke="currentColor"
        strokeOpacity={0.08}
        strokeWidth={0.5}
        className="text-text"
      />
      <line
        x1="0"
        y1={bottomOffset - 3.5}
        x2="100%"
        y2={bottomOffset - 3.5}
        stroke="currentColor"
        strokeOpacity={0.08}
        strokeWidth={0.5}
        className="text-text"
      />
    </svg>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative whitespace-nowrap font-body text-sm text-muted transition-colors hover:text-text",
        active && "text-text"
      )}
    >
      {label}
      {active && <span className="absolute inset-x-0 -bottom-1 h-px bg-bright-green" aria-hidden />}
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 px-0">
        {/* Left bar — flexes to keep the notch centered */}
        <div className="relative z-20 h-10 min-w-0 flex-1 bg-bg-elevated">
          <HairlineStrokes bottomOffset={40} />
        </div>

        {/* The notch: two corner slices around a flexible center pill */}
        <div className="relative z-10 -ml-px flex h-16 shrink-0">
          {/* Left corner */}
          <div className="relative h-full w-[50px] shrink-0">
            <div className="absolute inset-0 bg-bg-elevated" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 50 64">
              <path
                d="M0 39.5 C25 39.5 25 63.5 50 63.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeWidth={0.5}
                className="text-text"
              />
              <path
                d="M0 36.5 C25 36.5 25 60.5 50 60.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeWidth={0.5}
                className="text-text"
              />
            </svg>
          </div>

          {/* Center pill: nav links, logo, utilities */}
          <div className="relative -ml-px h-full min-w-0 flex-1">
            <div className="absolute inset-0 bg-bg-elevated">
              <HairlineStrokes bottomOffset={64} />
            </div>

            {/*
              A 3-column grid rather than flex+justify-between: the left and
              right nav groups are unequal widths ("How It Works" + "Our
              Network" vs. 3 shorter labels plus the theme toggle and CTA
              cluster), and justify-between would center the logo in the
              *leftover gap* between two unequal groups, not in the pill
              itself. Two `1fr` tracks are always equal-width to each other,
              so the logo's `auto` column between them is always the true
              center regardless of how lopsided the two sides' content is.
            */}
            <div className="relative grid h-full grid-cols-[1fr_auto_1fr] items-end gap-4 px-4 pb-2 md:px-6">
              {/*
                justify-end below xl, justify-start (the default) at xl+:
                the mobile hamburger is much narrower than the desktop nav
                row, so aligning both to the *same* edge left a bigger gap
                next to the logo on mobile than the (wider) theme-toggle
                side below produced — this pins the mobile control flush
                against the logo instead, and reverts to hugging the outer
                corner once the full nav row appears.
              */}
              <div className="flex min-w-0 items-center justify-end gap-5 xl:justify-start">
                <nav aria-label="Primary" className="hidden gap-5 xl:flex">
                  {LEFT_LINKS.map((link) => (
                    <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
                  ))}
                </nav>

                <button
                  type="button"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="p-1 text-muted transition-colors hover:text-text xl:hidden"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

              <div className="mx-2 flex shrink-0 justify-center md:mx-4">
                <Logo priority imgClassName="h-7 w-auto" />
              </div>

              {/*
                Mirrors the left column: justify-start below xl pins the
                mobile theme toggle flush against the logo (matching the
                hamburger on the other side) instead of out at the right
                corner, where its wider pill would leave a smaller gap next
                to the logo than the narrower hamburger did on the left.
              */}
              <div className="flex min-w-0 items-center justify-start gap-5 xl:justify-end">
                {/* One flex row, one gap value, for every item on this side
                    — links, theme toggle, and CTA all sit the same distance
                    apart instead of the nav links and the utility cluster
                    keeping their own separate rhythm. */}
                <nav aria-label="Secondary" className="hidden items-center gap-5 xl:flex">
                  {RIGHT_LINKS.map((link) => (
                    <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
                  ))}
                  <ThemeToggle />
                  <CTAButton
                    href="/franchise"
                    size="md"
                    icon={false}
                    className="px-3.5 py-2 text-sm"
                    onClick={() => trackEvent("become_partner_click", { source: "navbar" })}
                  >
                    Become a Partner
                  </CTAButton>
                </nav>

                <div className="flex shrink-0 items-center xl:hidden">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

          {/* Right corner */}
          <div className="relative -ml-px h-full w-[50px] shrink-0">
            <div className="absolute inset-0 bg-bg-elevated" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 50 64">
              <path
                d="M0 63.5 C25 63.5 25 39.5 50 39.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeWidth={0.5}
                className="text-text"
              />
              <path
                d="M0 60.5 C25 60.5 25 36.5 50 36.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeWidth={0.5}
                className="text-text"
              />
            </svg>
          </div>
        </div>

        {/* Right bar — flexes to keep the notch centered */}
        <div className="relative z-20 -ml-px h-10 min-w-0 flex-1 bg-bg-elevated">
          <HairlineStrokes bottomOffset={40} />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
