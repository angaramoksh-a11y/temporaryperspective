import type { MetadataRoute } from "next";
import { caseStudies, archiveItems, newsletterPosts } from "@/lib/work";

export const dynamic = "force-static";

const BASE = "https://temporaryperspective.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/portfolio/archive`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/virtual`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/newsletter`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE}/case-studies/${cs.client.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const archiveRoutes: MetadataRoute.Sitemap = archiveItems.map((item) => ({
    url: `${BASE}/portfolio/archive/${item.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const newsletterRoutes: MetadataRoute.Sitemap = newsletterPosts.map((post) => ({
    url: `${BASE}/newsletter/${post.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...archiveRoutes, ...newsletterRoutes];
}
