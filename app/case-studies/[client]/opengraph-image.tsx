import { ImageResponse } from "next/og";
import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { caseStudies } from "@/lib/work";

export const alt = "Temporary Perspective — case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ client: c.href.split("/").pop()! }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ client: string }>;
}) {
  const { client } = await params;
  const cs = caseStudies.find((c) => c.href === `/case-studies/${client}`);
  if (!cs) {
    return new ImageResponse(
      ogCard({ headline: "Case study", tag: "CASE STUDY" }),
      { ...ogSize },
    );
  }
  return new ImageResponse(
    ogCard({ headline: cs.client, sub: cs.tag, tag: "CASE STUDY" }),
    { ...ogSize },
  );
}
