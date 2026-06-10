import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { archiveItems } from "@/lib/work";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return archiveItems.map((i) => ({ slug: i.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = archiveItems.find((i) => i.slug === slug);
  if (!item) {
    return new ImageResponse(
      ogCard({ headline: "The archive", tag: "WORK" }),
      { ...ogSize },
    );
  }
  const headline = item.title ?? item.desc ?? item.client;
  return new ImageResponse(
    ogCard({ headline, sub: item.client, tag: "WORK" }),
    { ...ogSize },
  );
}
