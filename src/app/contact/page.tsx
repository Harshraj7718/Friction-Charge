import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { contact } from "@/lib/data/company";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/sections/RevealSection";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import WhatsAppCallButtons from "@/components/forms/WhatsAppCallButtons";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description: "Talk to the Friction Charge team about EV charging infrastructure, partnership plans and network opportunities.",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        eyebrow="Get in touch"
        title="Let's talk about your charger."
        description="No obligation — talk to our team, understand the model and decide."
        visual={{ src: "/images/evcontact.png", alt: "An EV charging at a Friction Charge station" }}
      />

      <RevealSection className="py-12 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-2xl font-medium">Reach us directly</h2>
              <p className="mt-2 text-sm text-muted">
                {contact.isPlaceholder ? "Contact details below are placeholders pending official confirmation." : ""}
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-sm text-muted">Head office</p>
                  <p className="text-text">{contact.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-text hover:text-bright-green">
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-sm text-muted">Phone</p>
                  <a href={`tel:${contact.phone}`} className="text-text hover:text-bright-green">
                    {contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <p className="text-sm text-muted">WhatsApp</p>
                  <span className="text-text">{contact.whatsapp}</span>
                </div>
              </li>
            </ul>

            <WhatsAppCallButtons />
          </div>

          <ContactForm />
        </Container>
      </RevealSection>
    </>
  );
}
