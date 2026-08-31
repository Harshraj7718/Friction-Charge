"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/data/blog";
import { trackEvent } from "@/lib/analytics";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/media/${post.slug}`}
      onClick={() => trackEvent("blog_open", { slug: post.slug })}
      data-reveal
      className="glass technical-border group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-bright-green/40"
    >
      <div aria-hidden className="relative h-44 overflow-hidden">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="font-mono-tech absolute bottom-3 left-4 text-xs tracking-widest text-white/90">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="font-mono-tech text-bright-green">{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.dateLabel}</span>
        </div>
        <h3 className="font-display text-xl font-medium leading-tight">{post.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-sm">
          <span className="text-muted">{post.readingTime}</span>
          <span className="inline-flex items-center gap-1 font-medium text-bright-green">
            Read article
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
