import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArchiveBrowser from "@/components/ArchiveBrowser";
import ClosingCTA from "@/components/ClosingCTA";
import { archiveItems, resolveThumb, workItemKey, primaryClip } from "@/lib/work";
import { videoObjectSchema } from "@/lib/schema";

// One static page per archive slug so /portfolio/archive/<slug> deep-links open
// the lightbox over the grid (and are shareable) under static export.
export function generateStaticParams() {
  return archiveItems.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const it = archiveItems.find((i) => i.slug === slug);
  const name = it?.title ?? it?.desc ?? it?.client ?? "The archive";
  return {
    title: `${name} — Temporary Perspective`,
    description: "Every episode, every piece. The full Temporary Perspective library.",
    openGraph: {
      title: `${name} — Temporary Perspective`,
      description: "Every episode, every piece. The full Temporary Perspective library.",
      url: `https://temporaryperspective.com/portfolio/archive/${slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArchiveSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await Promise.all(
    archiveItems.map(async (i) => ({
      ...i,
      thumb: await resolveThumb(i),
      key: workItemKey(i),
    })),
  );

  const it = archiveItems.find((i) => i.slug === slug);
  const videoLd = (() => {
    if (!it) return null;
    const clip = primaryClip(it);
    if (!clip && !it.yt) return null;
    const embedId = it.source === "youtube" ? it.yt! : clip!.id;
    return {
      "@context": "https://schema.org",
      ...videoObjectSchema({
        name: it.title ?? it.desc ?? `${it.client} — ${it.format}`,
        description: it.desc
          ? `${it.desc}${it.client ? ` (${it.client})` : ""}`
          : `${it.format} produced for ${it.client} by Temporary Perspective.`,
        source: it.source,
        embedId,
        uploadDate: "2025-01-01",
      }),
    };
  })();

  return (
    <>
      <Nav />
      <main>
        <ArchiveBrowser items={items} initialSlug={slug} />
        <ClosingCTA subline="Want a show like these? Start with a call." />
      </main>
      <Footer />
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
    </>
  );
}
