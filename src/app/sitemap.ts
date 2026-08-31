import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/metadata";
import { blogPosts } from "@/lib/data/blog";

const staticRoutes = [
  "",
  "/about",
  "/franchise",
  "/how-it-works",
  "/network",
  "/technology",
  "/media",
  "/contact",
  "/legal/privacy-policy",
  "/legal/terms",
  "/legal/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/media/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
