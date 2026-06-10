import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Portfolio — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "The shows we produce, episode by episode.",
      sub: "Long-form podcasts, event films, and testimonials for B2B India.",
      tag: "PORTFOLIO",
    }),
    { ...ogSize },
  );
}
