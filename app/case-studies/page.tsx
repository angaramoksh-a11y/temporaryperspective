import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClosingCTA from "@/components/ClosingCTA";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import CaseSection from "@/components/CaseSection";
import { EdgeDivider } from "@/components/ui";

export const metadata: Metadata = {
  title: "Case studies — Temporary Perspective",
  description:
    "The shows behind the work, told by the clients themselves. Bharatvaarta, Bureau and Qapita on building with Temporary Perspective.",
};

const cases = [
  {
    name: "Bharatvaarta",
    vimeoId: "1169858825",
    href: "/case-studies/bharatvaarta",
    tag: "Politics · Policy · Culture",
    result:
      "Long-form Indian politics and policy, with guests like Vikram Sood, Saurabh Mukherjea, Manish Sabharwal.",
    videoSide: "left" as const,
    divider: true,
  },
  {
    name: "Bureau",
    vimeoId: "1195342176",
    href: "/case-studies/bureau",
    tag: "Fintech · Fraud Prevention",
    result:
      "Event coverage, podcast series, and testimonials for India's fraud-prevention fintech.",
    videoSide: "right" as const,
    divider: false,
  },
  {
    name: "Qapita",
    vimeoId: "1196195127",
    href: "/case-studies/qapita",
    tag: "Founder stories · In production",
    result:
      "A founder podcast for the messy middle, shot across Mumbai and the US.",
    videoSide: "left" as const,
    divider: false,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        <CaseStudiesHero />

        {cases.map((c) => (
          <CaseSection key={c.name} {...c} />
        ))}

        {/* browse all work — quiet aside */}
        <section className="relative flex min-h-[38vh] flex-col items-center justify-center px-6 py-20 text-center">
          <EdgeDivider />
          <p className="text-lg text-text-muted">
            Looking for everything else we&apos;ve shot?
          </p>
          <Link
            href="/portfolio"
            className="sweep group mt-4 inline-flex items-center gap-2 rounded-[var(--radius-btn)] px-3 py-1 text-[clamp(1.25rem,2.4vw,1.5rem)] text-text"
          >
            Browse all work
            <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>

        <ClosingCTA subline="Thirty minutes. No pitch. We'll know if we're the right fit." />
      </main>
      <Footer />
    </>
  );
}
