import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ClosingCTA from "@/components/ClosingCTA";
import { EdgeDivider, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "The studio — Temporary Perspective",
  description:
    "A B2B podcast production studio in Mumbai. We build the studio; the show stays yours.",
};

const beliefs = [
  {
    t: "The show is always yours.",
    b: "We build the studio behind it: the brand, the shoot, the edit, the growth. The guests, the questions, and the vision stay with you.",
  },
  {
    t: "A guest list is a ceiling.",
    b: "The format matters less than who agrees to sit down. We spend the time where it pays off, then make the production disappear.",
  },
  {
    t: "Finish the episode.",
    b: "A clip from a thin episode dies in a day. We work back from a conversation worth finishing, not a clip count.",
  },
  {
    t: "Calm is a feature.",
    b: "Multi-camera, properly lit, properly miked, shot in studio or across cities. The show looks the same wherever it happens.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          title="The studio."
          size="md"
          minH="short"
        />

        <section className="relative">
          <div className="mx-auto max-w-[820px] px-6 pb-8 lg:px-10">
            <p className="text-[clamp(1.25rem,2.4vw,1.6rem)] font-light leading-[1.5] tracking-tight text-text">
              Temporary Perspective is a B2B podcast production studio in Mumbai.
              We&apos;ve shipped 100+ episodes for India&apos;s
              hardest-to-book guests: founders, fintech operators, policy minds.
              We handle everything around the conversation so the host can focus
              on the conversation itself.
            </p>
            <p className="mt-7 text-lg leading-relaxed text-text-muted">
              We shoot in studio here, on location, and remotely across cities
              and countries. Some clients take the full pipeline from branding to
              growth; others come to us only for the edit. Either way, the show
              stays theirs.
            </p>
          </div>
        </section>

        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="mb-12 flex flex-col gap-4">
              <SectionLabel>What we believe</SectionLabel>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light tracking-tight">
                Four things we hold to.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {beliefs.map((x) => (
                <div key={x.t} className="bg-bg-raised/40 p-8 lg:p-10">
                  <h3 className="font-display text-[clamp(1.375rem,2.2vw,1.9rem)] font-normal leading-[1.15] tracking-[-0.015em]">
                    {x.t}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-text-muted">
                    {x.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClosingCTA subline="If that sounds like how you'd want your show made, let's talk." />
      </main>
      <Footer />
    </>
  );
}
