import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog";
import { buildMetadata, breadcrumbJsonLd, blogPostingJsonLd } from "@/lib/seo/metadata";
import RevealSection from "@/components/sections/RevealSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import TechnicalLabel from "@/components/ui/TechnicalLabel";
import CTAButton from "@/components/ui/CTAButton";
import BlogCard from "@/components/blog/BlogCard";
import ShareButtons from "@/components/blog/ShareButtons";
import { siteUrl } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/media/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Article not found", path: `/media/${slug}` });

  return buildMetadata({ title: post.title, path: `/media/${post.slug}`, description: post.excerpt });
}

export default async function BlogDetailPage(props: PageProps<"/media/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Media Center", path: "/media" },
    { name: post.title, path: `/media/${post.slug}` },
  ]);
  const articleJsonLd = blogPostingJsonLd({ title: post.title, description: post.excerpt, path: `/media/${post.slug}` });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article>
        <div className="relative flex h-64 items-end overflow-hidden sm:h-80">
          <Image src={post.coverImage} alt="" fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <Container className="relative z-10 pb-8">
            <Link href="/media" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft size={16} />
              Media Center
            </Link>
          </Container>
        </div>

        <RevealSection className="py-16 sm:py-20">
          <Container className="max-w-3xl">
            <TechnicalLabel data-reveal className="w-fit">
              {post.category}
            </TechnicalLabel>
            <h1 data-reveal data-split-text className="font-display mt-5 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div data-reveal className="mt-4 flex items-center gap-3 text-sm text-muted">
              <span>{post.dateLabel}</span>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>

            <div data-reveal className="prose-content mt-10 flex flex-col gap-8">
              {post.content.map((block) => (
                <div key={block.heading}>
                  <h2 className="font-display text-xl font-medium sm:text-2xl">{block.heading}</h2>
                  {block.body.map((paragraph, i) => (
                    <p key={i} className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div data-reveal className="mt-12 flex flex-col gap-6 border-t border-card-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <ShareButtons title={post.title} url={`${siteUrl}/media/${post.slug}`} />
              <CTAButton href="/franchise">Become a Partner</CTAButton>
            </div>
          </Container>
        </RevealSection>

        {related.length > 0 && (
          <RevealSection className="bg-bg-elevated py-16 sm:py-20">
            <Container>
              <h2 className="font-display mb-8 text-2xl font-medium">Related articles</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </Container>
          </RevealSection>
        )}
      </article>

      <FinalCTA />
    </>
  );
}
