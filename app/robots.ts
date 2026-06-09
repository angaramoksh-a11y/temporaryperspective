import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "GPTBot",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Applebot-Extended",
          "CCBot",
          "Google-Extended",
        ],
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: "https://temporaryperspective.com/sitemap.xml",
  };
}
