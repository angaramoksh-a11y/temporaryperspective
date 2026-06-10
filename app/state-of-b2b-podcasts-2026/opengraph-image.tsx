import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "State of B2B Podcasts in India 2026 — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "State of B2B Podcasts in India 2026",
      sub: "40+ shows. 600+ episodes. Six categories. What separates a show that compounds from one that stalls.",
      tag: "REPORT",
    }),
    { ...ogSize },
  );
}
