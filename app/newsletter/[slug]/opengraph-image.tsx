import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { newsletterPosts } from "@/lib/work";

export const alt = "Temporary Perspective — newsletter";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return newsletterPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = newsletterPosts.find((p) => p.slug === slug);
  if (!post) {
    return new ImageResponse(
      ogCard({ headline: "Notes from the studio.", tag: "NEWSLETTER" }),
      { ...ogSize },
    );
  }
  return new ImageResponse(
    ogCard({
      headline: post.title,
      sub: `${post.dateLong} · ${post.readingTime}`,
      tag: "NEWSLETTER",
    }),
    { ...ogSize },
  );
}
