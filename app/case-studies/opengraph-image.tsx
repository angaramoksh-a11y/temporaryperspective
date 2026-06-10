import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Case studies — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "The shows, told by the clients.",
      sub: "Bharatvaarta, Bureau, Qapita — in their own words.",
      tag: "CASE STUDIES",
    }),
    { ...ogSize },
  );
}
