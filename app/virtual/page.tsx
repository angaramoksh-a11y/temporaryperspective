import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import ClosingCTA from "@/components/ClosingCTA";
import RemoteCompare, { REMOTE_SIDES } from "@/components/RemoteCompare";
import { EdgeDivider } from "@/components/ui";

export const metadata: Metadata = {
  title: "Remote production — Temporary Perspective",
  description:
    "When your guest can't be in the room, we make it look like they were. A crew at both ends, recorded properly, cut as one conversation.",
  openGraph: {
    title: "Remote production — Temporary Perspective",
    description:
      "When your guest can't be in the room, we make it look like they were. A crew at both ends, recorded properly, cut as one conversation.",
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
        {/* 1. Hero */}
        <PageHeroWord
          word="Virtual"
          eyebrow="Remote production"
          sub="When your guest can't be in the room, we make it look like they were."
        />

        {/* 2. The with / without comparison */}
        <section className="relative px-6 pb-8 lg:px-10">
          <div className="mx-auto max-w-[1080px]">
            <RemoteCompare
              ariaLabel="Compare remote production"
              sides={REMOTE_SIDES}
            />
          </div>
        </section>

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
    </>
  );
}
