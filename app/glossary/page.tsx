import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import ClosingCTA from "@/components/ClosingCTA";
import { EdgeDivider } from "@/components/ui";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "How we talk about B2B podcasts: the vocabulary of cinema-grade podcast production, defined.",
  openGraph: {
    title: "Glossary — Temporary Perspective",
    description:
      "How we talk about B2B podcasts: the vocabulary of cinema-grade podcast production, defined.",
    url: "https://temporaryperspective.com/glossary",
    type: "website",
  },
  alternates: { canonical: "https://temporaryperspective.com/glossary" },
  twitter: { card: "summary_large_image" },
};

const BASE = "https://temporaryperspective.com";

const TERMS = [
  {
    id: "b2b-podcast",
    term: "B2B podcast",
    definition:
      "A podcast made for business decision-makers — founders, operators, investors — not a general audience. The metric isn't downloads; it's whether the right people watched it and acted. We build B2B shows around positioning, not vanity reach.",
    seeInHref: "/portfolio",
    seeInLabel: "Portfolio",
  },
  {
    id: "cinema-grade-podcast",
    term: "Cinema-grade podcast",
    definition:
      "A podcast shot with the same craft as a film: real cameras, proper lighting, broadcast audio, a colour grade tuned to the conversation. Most podcasts give away the production budget in the first ten seconds. Cinema-grade means yours doesn't.",
    seeInHref: "/process",
    seeInLabel: "The Process",
  },
  {
    id: "remote-production",
    term: "Remote production",
    definition:
      "A shoot where the host and guest are in different cities but the show looks like one room. A crew at both ends, real cameras at each location, broadcast audio locally, then cut as one conversation in post.",
    seeInHref: "/virtual",
    seeInLabel: "Remote Production",
  },
  {
    id: "multi-cam-production",
    term: "Multi-cam production",
    definition:
      "Recording with two or more cameras running simultaneously — typically wide, host, and guest. Lets the edit cut between angles so an hour-long conversation never feels like a static talking head.",
    seeInHref: "/process#production",
    seeInLabel: "Production",
  },
  {
    id: "master-edit",
    term: "Master edit",
    definition:
      "The finished long-form episode: pacing, hooks, b-roll, lower-thirds, music, colour grade — everything assembled into the broadcast-ready cut. The master is the show; everything else (clips, social) is derived from it.",
    seeInHref: "/process#post",
    seeInLabel: "Post-Production",
  },
  {
    id: "colour-grade",
    term: "Colour grade",
    definition:
      "The pass where every shot is tuned for tone, contrast, and consistency — so the show has a look, not just a recording. A grade can carry as much of a show's identity as its logo.",
    seeInHref: "/case-studies/bharatvaarta",
    seeInLabel: "Bharatvaarta case study",
  },
  {
    id: "audio-mix",
    term: "Audio mix",
    definition:
      "The pass where each mic is levelled, cleaned of room noise, EQ'd for clarity, and bedded under any music. If a listener notices the audio, the mix wasn't done right.",
    seeInHref: "/process#post",
    seeInLabel: "Post-Production",
  },
  {
    id: "lower-thirds",
    term: "Lower-thirds",
    definition:
      "The on-screen text that names a guest, marks a chapter, or quotes a line. Built once as part of the brand system, then dropped into every episode — so the show looks like itself wherever it travels.",
    seeInHref: "/process#branding",
    seeInLabel: "Branding",
  },
  {
    id: "b-roll",
    term: "B-roll",
    definition:
      "Supplementary footage cut over the main conversation — stills, motion graphics, archival, location shots. Used where the words alone don't carry the moment, or where the editor wants the eye to rest.",
    seeInHref: "/portfolio",
    seeInLabel: "Portfolio",
  },
  {
    id: "retention-hook",
    term: "Retention hook",
    definition:
      "The first 15–30 seconds of an episode, engineered to keep a viewer past the algorithm's first drop-off check. We A/B these on every episode; the hook decides whether the conversation gets heard at all.",
    seeInHref: "/process#post",
    seeInLabel: "Post-Production",
  },
  {
    id: "short-form-clips",
    term: "Short-form clips",
    definition:
      "Vertical 30–90 second cuts pulled from a long-form episode for Instagram, LinkedIn, X, and YouTube Shorts. The episode builds authority; the clips put it in front of the people who matter.",
    seeInHref: "/portfolio/archive",
    seeInLabel: "Work archive",
  },
  {
    id: "guest-prep",
    term: "Guest prep",
    definition:
      "The work before the camera turns on: a research dossier on the guest, a host questionnaire with angles worth pushing, and a guest-facing brief so they walk in knowing what to expect. The conversation should start, not warm up.",
    seeInHref: "/process#guest-prep",
    seeInLabel: "Guest Prep",
  },
  {
    id: "podcast-positioning",
    term: "Podcast positioning",
    definition:
      "The strategic choice of what the show is about and who it's for, made before any production decision. Format, length, guest list, and visual identity all follow from positioning — not the other way around.",
    seeInHref: "/process",
    seeInLabel: "The Process",
  },
  {
    id: "episode-cover",
    term: "Episode cover",
    definition:
      "The thumbnail and metadata that decide whether someone clicks an episode. We build a cover system in the branding phase so every episode looks like the same show — and then A/B the specifics per episode for click-through.",
    seeInHref: "/process#branding",
    seeInLabel: "Branding",
  },
  {
    id: "sizzle-reel",
    term: "Sizzle reel",
    definition:
      "A short, fast-cut montage that summarises an event, series, or studio capability. Used for sales, event recap, or as a hero asset on a landing page. We made one for Bureau's Fraud Forum and it now opens their event deck.",
    seeInHref: "/case-studies/bureau",
    seeInLabel: "Bureau case study",
  },
  {
    id: "talking-head",
    term: "Talking head",
    definition:
      "A clean single-person framing — usually a guest or speaker directly addressing the camera. The simplest format on the shoot day; the hardest to make feel cinematic. The lighting and lens choice do most of the work.",
    seeInHref: "/portfolio/archive",
    seeInLabel: "Work archive",
  },
  {
    id: "brand-book",
    term: "Brand book",
    definition:
      "The PDF that locks every visual decision before episode one — logo, palette, type, lower-thirds, title cards, thumbnails. Done once, then production never has to stop and ask what colour something is.",
    seeInHref: "/process#branding",
    seeInLabel: "Branding",
  },
] as const;

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTermSet",
      name: "B2B Podcast Production Glossary",
      description:
        "The vocabulary of cinema-grade podcast production, as defined by Temporary Perspective.",
      url: `${BASE}/glossary`,
      hasDefinedTerm: TERMS.map((t) => ({
        "@type": "DefinedTerm",
        name: t.term,
        description: t.definition,
        url: `${BASE}/glossary#${t.id}`,
        inDefinedTermSet: { "@type": "DefinedTermSet", url: `${BASE}/glossary` },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Glossary",
          item: `${BASE}/glossary`,
        },
      ],
    },
  ],
};

export default function GlossaryPage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero */}
        <PageHeroWord
          word="Glossary"
          eyebrow="How we talk about it"
          sub="The vocabulary of how we build podcasts. Use it as a quick reference — every term links into the work it shows up in."
        />

        {/* 2. Index + definitions */}
        <section className="relative pb-24 lg:pb-32">
          <EdgeDivider />
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            {/* Mobile jump chips */}
            <div className="mb-10 flex flex-wrap gap-2 lg:hidden">
              {TERMS.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="inline-flex items-center rounded-full border border-line px-3 py-1 text-[0.8125rem] font-medium text-text-faint transition-colors hover:border-line-strong hover:text-text"
                >
                  {t.term}
                </a>
              ))}
            </div>

            <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
              {/* Left: sticky index (desktop only) */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="mb-4 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                    Terms
                  </p>
                  <nav className="flex flex-col gap-0.5">
                    {TERMS.map((t) => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        className="rounded-md px-2 py-1.5 text-sm text-text-faint transition-colors hover:bg-white/[0.04] hover:text-text"
                      >
                        {t.term}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Right: definitions */}
              <div>
                {TERMS.map((t, i) => (
                  <div
                    key={t.id}
                    id={t.id}
                    className={`scroll-mt-28 ${i !== 0 ? "border-t border-line pt-10 lg:pt-12" : "pt-4"} pb-10 lg:pb-12`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.8125rem] text-text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-metal-static font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                        {t.term}
                      </h2>
                    </div>
                    <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-text-muted">
                      {t.definition}
                    </p>
                    <Link
                      href={t.seeInHref}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm text-text-faint transition-colors hover:text-text"
                    >
                      See it in
                      <span className="font-medium text-text-muted transition-colors group-hover:text-text">
                        {t.seeInLabel}
                      </span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ClosingCTA subline="One call to see if we're the right studio for you." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
