import Link from "next/link";
import { Zap } from "lucide-react";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <section className="grid-pattern relative flex min-h-[80svh] items-center justify-center overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #45f58c, transparent 70%)" }}
      />
      <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-bright-green/10 text-bright-green">
          <Zap size={28} />
        </span>
        <p className="font-mono-tech text-sm tracking-widest text-bright-green">ERROR 404</p>
        <h1 className="font-display text-4xl font-medium sm:text-5xl">This route isn&apos;t charged yet.</h1>
        <p className="max-w-md text-base text-muted">
          The page you&apos;re looking for doesn&apos;t exist. Head back home or explore our charging network.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <CTAButton href="/">Back to home</CTAButton>
          <Link href="/network" className="inline-flex items-center px-6 py-3 text-sm text-muted hover:text-text">
            Explore Our Network
          </Link>
        </div>
      </Container>
    </section>
  );
}
