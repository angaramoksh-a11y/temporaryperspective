import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import ArchiveBrowser from "@/components/ArchiveBrowser";
import ClosingCTA from "@/components/ClosingCTA";
import { archiveItems, resolveThumb, workItemKey } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";

const archiveBreadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Archive", path: "/portfolio/archive" },
]);

export const metadata: Metadata = {
  title: "The Archive",
  description: "Every episode, every piece. The full Temporary Perspective library.",
  openGraph: {
    title: "The archive — Temporary Perspective",
    description: "Every episode, every piece. The full Temporary Perspective library.",
    url: "https://temporaryperspective.com/portfolio/archive",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default async function ArchivePage() {
  // resolve posters server-side (YouTube pattern / Vimeo oEmbed), then hand the
  // catalog to the client browser for filtering and playback.
  const items = await Promise.all(
    archiveItems.map(async (i) => ({
      ...i,
      thumb: await resolveThumb(i),
      key: workItemKey(i),
    })),
  );

  return (
    <>
      <Nav />
      <main>
        <PageHeroWord word="Archive" eyebrow="The complete library" compact />
        <ArchiveBrowser items={items} />
        <ClosingCTA subline="Want a show like these? Start with a call." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveBreadcrumb) }}
      />
    </>
  );
}
