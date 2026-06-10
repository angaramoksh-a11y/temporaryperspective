import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Contact — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "Let's talk about your show.",
      sub: "Book a 30-min call and tell us what you're building.",
      tag: "CONTACT",
    }),
    { ...ogSize },
  );
}
