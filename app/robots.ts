import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome the search + AI/answer crawlers we care about.
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot-Extended",
          "CCBot",
          "Google-Extended",
        ],
        allow: "/",
        disallow: ["/_next/"],
      },
      // Catch-all so no compliant crawler is left without a rule.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    sitemap: "https://temporaryperspective.com/sitemap.xml",
  };
}
