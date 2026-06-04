import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import ClosingCTA from "@/components/ClosingCTA";
import TestimonialsHandbook, {
  type HandbookRow,
} from "@/components/TestimonialsHandbook";
import { siteTestimonials, vimeoPoster } from "@/lib/work";

export const metadata: Metadata = {
  title: "Testimonials — Temporary Perspective",
  description:
    "In their own words: podcasters, founders, and creators on working with Temporary Perspective.",
};

// Page order, by testimonial video id.
const ORDER = [
  "1169858825", // Bharatvaarta · Roshan
  "1196195127", // Qapita · Brendan
  "1195342176", // Bureau · Rahi
  "1169859676", // Tarini
  "1197937165", // Ishpreet
  "1197937167", // Khushbu
  "1169859867", // Ettara · Meet
];

const v = (id: string, hash?: string) =>
  ({ kind: "vimeo", h: hash ? { id, hash } : { id } }) as const;
const vh = (h: [string, string], vert: [string, string]) =>
  ({
    kind: "vimeo",
    h: { id: h[0], hash: h[1] },
    v: { id: vert[0], hash: vert[1] },
  }) as const;

// Grouped, clickable project links per client (keyed by testimonial video id).
const CONFIG: Record<
  string,
  { client: string; caseStudy?: string; groups: HandbookRow["groups"] }
> = {
  "1169858825": {
    client: "Bharatvaarta",
    caseStudy: "/case-studies/bharatvaarta",
    groups: [
      {
        items: [
          {
            label: "Bharatvaarta (the podcast)",
            href: "https://www.youtube.com/@Bharatvaarta",
            external: true,
          },
        ],
      },
    ],
  },
  "1196195127": {
    client: "Qapita",
    caseStudy: "/case-studies/qapita",
    groups: [
      {
        items: [
          { label: "The Catapult Code (in production)", href: "/case-studies/qapita" },
        ],
      },
    ],
  },
  "1195342176": {
    client: "Bureau",
    caseStudy: "/case-studies/bureau",
    groups: [
      {
        heading: "Bureau Fraud Forum",
        items: [
          { label: "Sizzle reel", media: v("1195301877", "843cb7b206") },
          { label: "Sandesh", media: vh(["1195303497", "5a1aae3ea4"], ["1195303501", "c81e8c9d92"]) },
          { label: "Ranjan Reddy", media: vh(["1195301878", "78a173b6ee"], ["1195303110", "325b0b4083"]) },
          { label: "Deepak Sharma", media: vh(["1195301876", "c6150cd478"], ["1195301875", "482906e52d"]) },
        ],
      },
      {
        heading: "More",
        items: [
          { label: "Bureau Backyard Podcast", media: v("1172800968"), placeholder: true },
          { label: "IndMoney Testimonial", media: v("1172800968"), placeholder: true },
        ],
      },
    ],
  },
  "1169859676": {
    client: "Tarini Shah",
    groups: [
      {
        heading: "How I Met You (Series)",
        items: [
          { label: "Episode 1", media: v("1197942565") },
          { label: "Episode 2", media: v("1197942386") },
        ],
      },
      {
        heading: "Advertisements",
        items: [
          { label: "L'Oréal", media: v("1197941354") },
          { label: "Google Pixel", media: v("1197941353") },
        ],
      },
    ],
  },
  "1197937165": {
    client: "Ishpreet Balbir",
    groups: [
      {
        heading: "Ishi Ki Khushi (Series)",
        items: [
          { label: "Ep 5", media: v("1197942739") },
          { label: "Ep 6", media: v("1197942848") },
          { label: "Ep 7", media: v("1197947961") },
          { label: "Ep 8", media: v("1197947863") },
        ],
      },
      {
        heading: "How I Met You (Series)",
        items: [
          { label: "Episode 1", media: v("1197942565") },
          { label: "Episode 2", media: v("1197942386") },
        ],
      },
      { items: [{ label: "Good Things Take Time", media: v("1197949652") }] },
    ],
  },
  "1197937167": {
    client: "Khushbu Chandarana",
    groups: [
      {
        heading: "Ishi Ki Khushi (Series)",
        items: [
          { label: "Ep 5", media: v("1197942739") },
          { label: "Ep 6", media: v("1197942848") },
          { label: "Ep 7", media: v("1197947961") },
          { label: "Ep 8", media: v("1197947863") },
        ],
      },
    ],
  },
  "1169859867": {
    client: "Ettara",
    groups: [
      {
        items: [
          { label: "Catalogue shoot", media: v("1172801163") },
          {
            label: "BTS reel",
            href: "https://www.instagram.com/reel/DNBFk15yCSM/",
            external: true,
          },
          { label: "ettara.co", href: "https://ettara.co/", external: true },
        ],
      },
    ],
  },
};

export default async function TestimonialsPage() {
  const byId = new Map(siteTestimonials.map((t) => [t.vimeoId, t]));
  const ordered = ORDER.map((id) => byId.get(id)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );

  const rows: HandbookRow[] = await Promise.all(
    ordered.map(async (t) => {
      const cfg = CONFIG[t.vimeoId];
      return {
        vimeoId: t.vimeoId,
        client: cfg?.client ?? t.name,
        name: t.name,
        note: t.note,
        role: t.role,
        quote: t.quote,
        credentials: t.credentials,
        caseStudy: cfg?.caseStudy,
        groups: cfg?.groups ?? [],
        thumb: await vimeoPoster(t.vimeoId),
      };
    }),
  );

  // Review + VideoObject schema (transcripts live here only, for SEO/GEO).
  const ld = {
    "@context": "https://schema.org",
    "@graph": ordered.flatMap((t) => [
      {
        "@type": "Review",
        author: { "@type": "Person", name: t.name, jobTitle: t.role },
        reviewBody: t.transcript.join("\n\n"),
        itemReviewed: { "@type": "Organization", name: "Temporary Perspective" },
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      },
      {
        "@type": "VideoObject",
        name: `${t.name} on Temporary Perspective`,
        description: t.quote,
        embedUrl: `https://player.vimeo.com/video/${t.vimeoId}`,
        thumbnailUrl: `https://vumbnail.com/${t.vimeoId}.jpg`,
        uploadDate: "2025-01-01",
      },
    ]),
  };

  return (
    <>
      <Nav />
      <main>
        <PageHeroWord word="Testimonials" eyebrow="In their own words" />
        <TestimonialsHandbook rows={rows} />
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
