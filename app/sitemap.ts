import type { MetadataRoute } from "next";
import { caseStudies, archiveItems, newsletterPosts } from "@/lib/work";

export const dynamic = "force-static";

const BASE = "https://temporaryperspective.com";

// Real dates — update the relevant entry whenever that page's content changes.
const DATES = {
  home:         new Date("2026-07-06"),
  portfolio:    new Date("2026-07-06"),
  archive:      new Date("2026-07-06"),
  process:      new Date("2026-07-06"),
  virtual:      new Date("2026-07-06"),
  testimonials: new Date("2026-06-01"),
  about:        new Date("2026-07-06"),
  newsletter:   new Date("2026-07-06"),
  faq:          new Date("2026-06-01"),
  glossary:     new Date("2026-06-01"),
  report:       new Date("2026-05-01"),
  contact:      new Date("2026-04-01"),
  legal:        new Date("2026-01-01"),
  caseStudies:  new Date("2026-06-01"),
  archiveItems: new Date("2026-06-17"),
  newsletter_posts: new Date("2026-07-06"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                    lastModified: DATES.home,         changeFrequency: "weekly",   priority: 1.0 },
    { url: `${BASE}/portfolio`,                     lastModified: DATES.portfolio,    changeFrequency: "weekly",   priority: 0.9 },
    { url: `${BASE}/process`,                       lastModified: DATES.process,      changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/state-of-b2b-podcasts-2026`,   lastModified: DATES.report,       changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/virtual`,                       lastModified: DATES.virtual,      changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE}/testimonials`,                  lastModified: DATES.testimonials, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE}/portfolio/archive`,             lastModified: DATES.archive,      changeFrequency: "weekly",   priority: 0.7 },
    { url: `${BASE}/about`,                         lastModified: DATES.about,        changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE}/newsletter`,                    lastModified: DATES.newsletter,   changeFrequency: "weekly",   priority: 0.7 },
    { url: `${BASE}/faq`,                           lastModified: DATES.faq,          changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE}/glossary`,                      lastModified: DATES.glossary,     changeFrequency: "monthly",  priority: 0.6 },
    { url: `${BASE}/contact`,                       lastModified: DATES.contact,      changeFrequency: "yearly",   priority: 0.6 },
    { url: `${BASE}/privacy`,                       lastModified: DATES.legal,        changeFrequency: "yearly",   priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`,          lastModified: DATES.legal,        changeFrequency: "yearly",   priority: 0.3 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE}/case-studies/${cs.client.toLowerCase()}`,
    lastModified: DATES.caseStudies,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Archive items are thin (video embeds) — low priority to preserve crawl budget
  const archiveRoutes: MetadataRoute.Sitemap = archiveItems.map((item) => ({
    url: `${BASE}/portfolio/archive/${item.slug}`,
    lastModified: DATES.archiveItems,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const newsletterRoutes: MetadataRoute.Sitemap = newsletterPosts.map((post) => ({
    url: `${BASE}/newsletter/${post.slug}`,
    lastModified: DATES.newsletter_posts,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...archiveRoutes, ...newsletterRoutes];
}
