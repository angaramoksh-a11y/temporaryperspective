import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import WorkGrid from "@/components/WorkGrid";
import ClosingCTA from "@/components/ClosingCTA";
import { ArrowLink, EdgeDivider } from "@/components/ui";

export const metadata: Metadata = {
  title: "Portfolio — Temporary Perspective",
  description:
    "The shows we produce, episode by episode. Long-form podcasts and films for India's B2B founders, fintech, and policy guests.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeroWord word="Portfolio" />
        <WorkGrid />
        <section className="relative py-20 lg:py-24">
          <EdgeDivider />
          <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 text-center lg:px-10">
            <p className="text-text-muted">Looking for everything?</p>
            <ArrowLink href="/portfolio/archive" className="text-base text-text">
              Browse the full library
            </ArrowLink>
          </div>
        </section>
        <ClosingCTA subline="Want a show like these? Start with a call." />
      </main>
      <Footer />
    </>
  );
}
