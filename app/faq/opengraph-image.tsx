import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "FAQ — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "Before you book.",
      sub: "Common questions about production, timelines, and what we build.",
      tag: "QUESTIONS",
    }),
    { ...ogSize },
  );
}
