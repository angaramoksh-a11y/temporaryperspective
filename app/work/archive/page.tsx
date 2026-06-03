import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ArchiveBrowser from "@/components/ArchiveBrowser";
import ClosingCTA from "@/components/ClosingCTA";
import { archiveItems, resolveThumb, workItemKey } from "@/lib/work";

export const metadata: Metadata = {
  title: "The archive — Temporary Perspective",
  description: "Every episode, every piece. The full Temporary Perspective library.",
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
        <PageHero
          title="The archive."
          subcopy="Every episode, every piece. The full library."
          size="sm"
          minH="short"
        />
        <ArchiveBrowser items={items} />
        <ClosingCTA subline="Want a show like these? Start with a call." />
      </main>
      <Footer />
    </>
  );
}
