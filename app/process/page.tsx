import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import ProcessTimeline from "@/components/ProcessTimeline";
import ClosingCTA from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "The process — Temporary Perspective",
  description:
    "How we run a podcast, end to end. Branding, guest prep, production, post, and growth, with Bharatvaarta as the running example.",
  openGraph: {
    title: "The process — Temporary Perspective",
    description: "How we run a podcast, end to end. Branding, guest prep, production, post, and growth, with Bharatvaarta as the running example.",
    url: "https://temporaryperspective.com/process",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeroWord word="Process" eyebrow="How we run a show" />
        <ProcessTimeline />
        <ClosingCTA subline="Tell us where your show is. We'll scope the rest." />
      </main>
      <Footer />
    </>
  );
}
