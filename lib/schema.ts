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

const BASE = "https://temporaryperspective.com";

// BreadcrumbList ready to embed as its own <script>. Pass the trail
// Home → … → current page. Relative paths are resolved against the site origin.
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.path.startsWith("http") ? crumb.path : `${BASE}${crumb.path}`,
    })),
  };
}

// OfferCatalog of Services, ready to embed as its own <script>. Used on /process
// to make the studio authoritative for its full service list.
export function serviceCatalogSchema(
  services: { name: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Podcast Production Services",
    provider: { "@id": `${BASE}/#organization` },
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@id": `${BASE}/#organization` },
      },
    })),
  };
}
