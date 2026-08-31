import type { Metadata } from "next";
import { spaceGrotesk, outfit, jetbrainsMono } from "@/lib/fonts";
import { buildMetadata, organizationJsonLd } from "@/lib/seo/metadata";
import ThemeProvider from "@/components/layout/ThemeProvider";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import PageTransition from "@/components/layout/PageTransition";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/layout/FloatingContactButtons";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "Charging the Future",
  path: "/",
  description:
    "Friction Charge builds and operates DC fast-charging infrastructure designed to make reliable EV charging more accessible across India.",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-bg text-text noise-overlay">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <ThemeProvider>
          <SmoothScrollProvider>
            <Preloader />
            <ScrollProgress />
            <Navbar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
            <FloatingContactButtons />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
