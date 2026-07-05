import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import WorkGrid from "@/components/WorkGrid";
import ClosingCTA from "@/components/ClosingCTA";
import { ArrowLink, EdgeDivider } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/schema";

const portfolioBreadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
]);

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "The shows we produce, episode by episode. Long-form podcasts and films for India's B2B founders, fintech, and policy guests.",
  openGraph: {
    title: "Portfolio — Temporary Perspective",
    description: "The shows we produce, episode by episode. Long-form podcasts and films for India's B2B founders, fintech, and policy guests.",
    url: "https://temporaryperspective.com/portfolio",
    type: "website",
  },
  alternates: { canonical: "https://temporaryperspective.com/portfolio" },
  twitter: { card: "summary_large_image" },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioBreadcrumb) }}
      />
    </>
  );
}
