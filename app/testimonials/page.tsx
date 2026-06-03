import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import TestimonialsBoard from "@/components/TestimonialsBoard";
import ClosingCTA from "@/components/ClosingCTA";
import { siteTestimonials, vimeoPoster } from "@/lib/work";

export const metadata: Metadata = {
  title: "Testimonials — Temporary Perspective",
  description:
    "Words from the people we've worked with: podcasters, founders, content creators, and brands.",
};

export default async function TestimonialsPage() {
  const items = await Promise.all(
    siteTestimonials.map(async (t) => ({
      ...t,
      thumb: await vimeoPoster(t.vimeoId),
    })),
  );

  // Schema.org reviews (visible reviewBody = the on-page pull quote) for SEO/GEO.
  const ld = {
    "@context": "https://schema.org",
    "@graph": siteTestimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.transcript.join("\n\n"),
      itemReviewed: { "@type": "Organization", name: "Temporary Perspective" },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    })),
  };

  return (
    <>
      <Nav />
      <main>
        <PageHero
          title="Testimonials."
          subcopy="Words from the people we've worked with: the podcasters, the founders, the creators, the brands."
        />
        <TestimonialsBoard items={items} />
        <ClosingCTA subline="The work behind these words is the work we'd do for your show." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
