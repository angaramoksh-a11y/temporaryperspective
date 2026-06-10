import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Glossary — Temporary Perspective";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogCard({
      headline: "The vocabulary of cinema-grade podcast production.",
      sub: "17 terms. Every one links into the work it shows up in.",
      tag: "GLOSSARY",
    }),
    { ...ogSize },
  );
}
