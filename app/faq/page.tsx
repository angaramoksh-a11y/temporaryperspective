import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import Accordion from "@/components/Accordion";
import ClosingCTA from "@/components/ClosingCTA";
import { faqs } from "@/lib/work";

export const metadata: Metadata = {
  title: "Questions — Temporary Perspective",
  description:
    "Common questions about working with Temporary Perspective: scope, pricing, remote shoots, editing, timelines, and what we need from you.",
  openGraph: {
    title: "Questions — Temporary Perspective",
    description: "Common questions about working with Temporary Perspective: scope, pricing, remote shoots, editing, timelines, and what we need from you.",
    url: "https://temporaryperspective.com/faq",
    type: "website",
  },
  alternates: { canonical: "https://temporaryperspective.com/faq" },
  twitter: { card: "summary_large_image" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main>
        <PageHeroWord word="Questions" eyebrow="Before you book" />
        <section className="relative pb-24 lg:pb-28">
          <div className="mx-auto max-w-[820px] px-6 lg:px-10">
            <Accordion items={faqs} />
          </div>
        </section>
        <ClosingCTA subline="Still have a question? Ask it on the call." />
      </main>
      <Footer />
    </>
  );
}
