import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { company, contact, footerNavLinks, legalLinks, socialLinks } from "@/lib/data/company";
import Container from "@/components/ui/Container";
import Logo from "@/components/layout/Logo";
import LetterReveal from "@/components/ui/LetterReveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-card-border bg-bg-elevated">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <Image
        src="/images/logo-icon.webp"
        alt=""
        width={908}
        height={589}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:w-[70%]"
      />
      <Container className="relative z-10 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="full" className="mb-5" imgClassName="h-16 sm:h-20" priority />
            <p className="mt-1 text-sm text-muted">{company.tagline}</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Building DC fast-charging infrastructure designed to make reliable EV charging more accessible across India.
            </p>
          </div>

          <div>
            <p className="font-mono-tech mb-4 text-xs tracking-widest text-bright-green">NAVIGATION</p>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-tech mb-4 text-xs tracking-widest text-bright-green">CONTACT</p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-text">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-text">
                  {contact.phone}
                </a>
              </li>
            </ul>
            {contact.isPlaceholder && (
              <p className="mt-3 font-mono-tech text-[11px] text-muted/70">Contact details pending official confirmation.</p>
            )}
          </div>

          <div>
            <p className="font-mono-tech mb-4 text-xs tracking-widest text-bright-green">FOLLOW</p>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="text-sm text-muted transition-colors hover:text-text">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden border-t border-card-border pt-10">
          <LetterReveal
            text="Friction Charge"
            className="font-display -ml-1 select-none text-[15vw] font-medium leading-[0.85] tracking-tight text-text/90 sm:text-[11vw] lg:text-[8.5vw]"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-muted transition-colors hover:text-text">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
