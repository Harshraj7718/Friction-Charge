"use client";

import { useMemo, useState } from "react";
import { blogCategories, blogPosts, type BlogCategory } from "@/lib/data/blog";
import { useGsapContext } from "@/lib/animations/useGsapContext";
import { revealElements } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils/cn";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  const [active, setActive] = useState<BlogCategory | "All">("All");

  const posts = useMemo(() => (active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active)), [active]);

  const scopeRef = useGsapContext<HTMLDivElement>(
    ({ scope }) => {
      revealElements(scope);
    },
    [active]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {(["All", ...blogCategories] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "font-mono-tech rounded-full border px-4 py-2 text-xs tracking-wide transition-colors",
              active === category
                ? "border-bright-green bg-bright-green/10 text-bright-green"
                : "border-card-border text-muted hover:text-text"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div ref={scopeRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
