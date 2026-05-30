import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ArchiveBrowser from "@/components/ArchiveBrowser";
import ClosingCTA from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "The archive — Temporary Perspective",
  description: "Every episode, every piece. The full Temporary Perspective library.",
};

export default function ArchivePage() {
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
        <ArchiveBrowser />
        <ClosingCTA subline="Want a show like these? Start with a call." />
      </main>
      <Footer />
    </>
  );
}
