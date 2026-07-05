import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import ProcessTimeline from "@/components/ProcessTimeline";
import ClosingCTA from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "How We Produce a B2B Podcast — The Process",
  description:
    "How Temporary Perspective runs a B2B podcast from zero: brand identity, guest prep, studio shoot, video editing, and growth. Walkthrough using Bharatvaarta as the example.",
  alternates: { canonical: "https://temporaryperspective.com/process" },
  openGraph: {
    title: "How We Produce a B2B Podcast — The Process",
    description:
      "How Temporary Perspective runs a B2B podcast from zero: brand identity, guest prep, studio shoot, video editing, and growth. Walkthrough using Bharatvaarta as the example.",
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
        <div className="mx-auto max-w-[1200px] px-6 pb-4 lg:px-10">
          <p className="text-sm text-text-faint">
            Wondering how these numbers hold up across the industry?{" "}
            <Link
              href="/state-of-b2b-podcasts-2026"
              className="text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              Read the State of B2B Podcasts in India 2026 →
            </Link>
          </p>
        </div>
        <ClosingCTA subline="Tell us where your show is. We'll scope the rest." />
      </main>
      <Footer />
    </>
  );
}
