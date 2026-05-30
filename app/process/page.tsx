import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProcessTimeline from "@/components/ProcessTimeline";
import ClosingCTA from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "The process — Temporary Perspective",
  description:
    "How we run a podcast, end to end. Branding, guest prep, production, post, and growth, with Bharatvaarta as the running example.",
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          title="The process."
          subcopy="How we run a podcast, end to end. Bharatvaarta as the running example."
          size="lg"
          minH="tall"
        />
        <ProcessTimeline />
        <ClosingCTA subline="Tell us where your show is. We'll scope the rest." />
      </main>
      <Footer />
    </>
  );
}
