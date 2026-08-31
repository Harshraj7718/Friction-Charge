"use client";

import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { blogPosts } from "@/lib/data/blog";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import BlogCard from "@/components/blog/BlogCard";

export default function MediaTeaser() {
  const scopeRef = useGsapContext<HTMLElement>(({ scope }) => {
    revealElements(scope);
  }, []);

  const posts = blogPosts.slice(0, 3);

  return (
    <section ref={scopeRef} className="relative py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Media Center" title="From the media center." />
          <CTAButton href="/media" variant="secondary" className="shrink-0">
            Visit Media Center
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
