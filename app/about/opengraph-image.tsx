import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "About — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "The studio behind the shows.",
      sub: "A small team in Mumbai that builds shows worth taking seriously.",
      tag: "ABOUT",
    }),
    { ...ogSize },
  );
}
