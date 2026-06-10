import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Testimonials — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "In their own words.",
      sub: "Founders, hosts, and content leads on working with TP.",
      tag: "TESTIMONIALS",
    }),
    { ...ogSize },
  );
}
