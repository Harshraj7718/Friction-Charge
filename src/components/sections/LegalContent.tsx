import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

export default function LegalContent({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <section className="relative py-32 sm:py-40">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-medium sm:text-4xl">{title}</h1>
        {updated && <p className="font-mono-tech mt-3 text-xs text-muted">{updated}</p>}
        <div className="prose-content mt-10 flex flex-col gap-5 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
      </Container>
    </section>
  );
}
