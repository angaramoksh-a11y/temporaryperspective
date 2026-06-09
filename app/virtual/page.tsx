import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ClosingCTA from "@/components/ClosingCTA";
import RemoteCompare, { REMOTE_SIDES } from "@/components/RemoteCompare";
import { SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Remote production — Temporary Perspective",
  description:
    "When your guest can't be in the room, we make it look like they were. A crew at both ends, recorded properly, cut as one conversation.",
  openGraph: {
    title: "Remote production — Temporary Perspective",
    description: "When your guest can't be in the room, we make it look like they were. A crew at both ends, recorded properly, cut as one conversation.",
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

export default function VirtualPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          title="Remote production."
          subcopy="When your guest can't be in the room, we make it look like they were."
          size="lg"
          minH="tall"
        />

        {/* the with / without comparison */}
        <section className="relative px-6 pb-6 lg:px-10">
          <div className="mx-auto max-w-[1080px]">
            <RemoteCompare
              ariaLabel="Compare remote production"
              sides={REMOTE_SIDES}
            />
          </div>
        </section>

        {/* how it works */}
        <section className="relative py-24 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.12] tracking-tight">
              Two rooms, one conversation.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="flex flex-col bg-bg p-7 lg:p-8">
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-text-faint">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-normal tracking-tight text-text">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-text-muted">
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
    </>
  );
}
