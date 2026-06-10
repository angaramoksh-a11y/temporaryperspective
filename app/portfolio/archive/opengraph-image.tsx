import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Full archive — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "Every episode, every piece.",
      sub: "The full Temporary Perspective library.",
      tag: "ARCHIVE",
    }),
    { ...ogSize },
  );
}
