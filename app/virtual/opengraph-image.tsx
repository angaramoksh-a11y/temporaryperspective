import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Remote production — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "When your guest's in another city, it shouldn't look like it.",
      sub: "Crew at both ends. Recorded properly. Cut as one conversation.",
      tag: "REMOTE",
    }),
    { ...ogSize },
  );
}
