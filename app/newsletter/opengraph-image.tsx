import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Newsletter — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "Notes from the studio.",
      sub: "On podcasts, guests, and making shows that hold attention.",
      tag: "NEWSLETTER",
    }),
    { ...ogSize },
  );
}
