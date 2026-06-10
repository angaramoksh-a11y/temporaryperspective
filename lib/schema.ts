// Shared JSON-LD schema builders. All functions return plain objects (no
// @context) so callers can embed them inside a @graph or wrap with @context.

const TP_ORG = {
  "@type": "Organization",
  name: "Temporary Perspective",
  url: "https://temporaryperspective.com",
} as const;

export function videoObjectSchema({
  name,
  description,
  source,
  embedId,
  uploadDate = "2025-01-01",
  duration,
  publisherName,
  publisherUrl,
}: {
  name: string;
  description: string;
  source: "vimeo" | "youtube";
  embedId: string;
  uploadDate?: string;
  duration?: string;
  publisherName?: string;
  publisherUrl?: string;
}) {
  const thumbnailUrl =
    source === "youtube"
      ? `https://i.ytimg.com/vi/${embedId}/maxresdefault.jpg`
      : `https://vumbnail.com/${embedId}.jpg`;
  const embedUrl =
    source === "youtube"
      ? `https://www.youtube.com/embed/${embedId}`
      : `https://player.vimeo.com/video/${embedId}`;

  return {
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    embedUrl,
    uploadDate,
    ...(duration ? { duration } : {}),
    publisher: publisherName
      ? {
          "@type": "Organization",
          name: publisherName,
          ...(publisherUrl ? { url: publisherUrl } : {}),
        }
      : TP_ORG,
  };
}
