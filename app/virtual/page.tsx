import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import VirtualCallout from "@/components/VirtualCallout";
import ClosingCTA from "@/components/ClosingCTA";
import { EdgeDivider } from "@/components/ui";
import { videoObjectSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Remote Podcast Production — Shoot From Anywhere",
  description:
    "Professional remote podcast production for guests who can't travel to the studio. Crew at both ends, locally recorded, cut as one seamless conversation.",
  alternates: { canonical: "https://temporaryperspective.com/virtual" },
  openGraph: {
    title: "Remote Podcast Production — Shoot From Anywhere",
    description:
      "Professional remote podcast production for guests who can't travel to the studio. Crew at both ends, locally recorded, cut as one seamless conversation.",
    url: "https://temporaryperspective.com/virtual",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const STEPS = [
  {
    n: "01",
    title: "Crew at both ends",
    body: "We staff and light the host's room and the guest's room, wherever they are.",
  },
  {
    n: "02",
    title: "Recorded properly, locally",
    body: "Cinema cameras and proper sound at each location, not a compressed video call.",
  },
  {
    n: "03",
    title: "Cut as one conversation",
    body: "Edited and graded so the two rooms read as a single studio.",
  },
];

const remoteVideosLd = {
  "@context": "https://schema.org",
  "@graph": [
    videoObjectSchema({
      name: "Remote production — with a crew at both ends",
      description:
        "An online podcast recorded with a cinema camera, proper lighting, and clean sound at the guest's location — making a two-city shoot look like a single studio.",
      source: "youtube",
      embedId: "w-LissfW42g",
      uploadDate: "2026-01-01",
    }),
    videoObjectSchema({
      name: "Remote production — without a crew (laptop webcam)",
      description:
        "A typical online podcast recorded without a dedicated crew — showing the difference a properly staffed remote setup makes.",
      source: "youtube",
      embedId: "dHa-yEApqDE",
      uploadDate: "2026-01-01",
    }),
  ],
};

export default function VirtualPage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero */}
        <PageHeroWord
          word="Virtual"
          eyebrow="Remote production"
          sub="When your guest can't be in the room, we make it look like they were."
        />

        {/* 2. With/without comparison — two-column callout layout */}
        <VirtualCallout showLink={false} />

        {/* 3. How it works */}
        <section className="relative py-20 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto mt-16 max-w-[1200px] px-6 lg:px-10">
            <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Two rooms, one conversation.
            </h2>
            <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-text-muted">
              Every element of a studio shoot — cameras, lighting, sound — placed
              at both ends and synced in post.
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="flex flex-col bg-bg p-7 lg:p-8">
                  <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold leading-[1.2] tracking-tight text-text">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClosingCTA subline="Tell us where your guest is. We'll bring the studio to them." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(remoteVideosLd) }}
      />
    </>
  );
}
