import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Our process — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "Five phases. One foundational. Four per episode.",
      sub: "Strategy, production, post, distribution, and growth.",
      tag: "PROCESS",
    }),
    { ...ogSize },
  );
}
