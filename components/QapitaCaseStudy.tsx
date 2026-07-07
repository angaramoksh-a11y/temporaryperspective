"use client";

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ClosingCTA from "./ClosingCTA";
import PageHeroWord from "./PageHeroWord";
import { RelatedCases } from "./caseParts";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";
import { CredIconSvg } from "./testimonialBits";
import { qapitaContent as c, siteTestimonials } from "@/lib/work";
import { videoObjectSchema } from "@/lib/schema";
import ShareBar from "./ShareBar";

const brendanTranscript =
  siteTestimonials.find((t) => t.vimeoId === c.testimonialVimeoId)?.transcript ?? [];

const qapitaLd = {
  "@context": "https://schema.org",
  ...videoObjectSchema({
    name: `${c.testimonialName} on Temporary Perspective`,
    description: brendanTranscript[0] ?? "Brendan Marshall on working with Temporary Perspective for The Catapult Code.",
    source: "vimeo",
    embedId: c.testimonialVimeoId,
    uploadDate: "2025-01-01",
  }),
};

const BRENDAN_LINKEDIN = "https://www.linkedin.com/in/brendantmarshall/";
const QAPITA_LINKEDIN =
  "https://www.linkedin.com/company/qapita/posts/?feedView=all";

const lbItem: LightboxItem = {
  title: c.testimonialName,
  client: "Qapita",
  media: { kind: "vimeo", h: { id: c.testimonialVimeoId } },
  links: [
    {
      label: "Brendan on LinkedIn",
      href: BRENDAN_LINKEDIN,
      external: true,
    },
  ],
};

const DELIVERABLES = [
  "End-to-end series production",
  "Multi-city shoot coordination",
  "US episode consulting & edit",
  "Full post-production ownership",
];

export default function QapitaCaseStudy() {
  const [lbOpen, setLbOpen] = useState(false);

  return (
    <>
      <Nav />
      <main>
        {/* 1. Header */}
        <PageHeroWord
          word={c.title}
          eyebrow={c.tagline}
          sub={c.producedWith}
        />

        {/* share strip */}
        <div className="mx-auto flex w-full max-w-[1400px] justify-end px-6 pb-2 lg:w-[86%] lg:px-0">
          <ShareBar title="The Catapult Code — Temporary Perspective" />
        </div>

        {/* 2. About + autoplay testimonial */}
        <section className="relative pb-16 pt-2 lg:pb-24">
          <div className="mx-auto mt-12 grid w-full max-w-[1400px] items-start gap-10 px-6 lg:w-[86%] lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:px-0">
            {/* Left: show info */}
            <div>
              <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                About the show
              </h2>
              <div className="mt-6 space-y-5">
                {c.aboutShow.map((p, i) => (
                  <p
                    key={i}
                    className="text-[clamp(1rem,1.5vw,1.125rem)] leading-[1.7] text-text"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.qapita.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Qapita website"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white/[0.02] px-3.5 py-2 text-sm text-text-faint transition-colors hover:border-white/25 hover:text-text"
                >
                  <CredIconSvg
                    name="website"
                    className="h-3.5 w-3.5 shrink-0"
                  />
                  qapita.com
                </a>
                <a
                  href={QAPITA_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Qapita on LinkedIn"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white/[0.02] px-3.5 py-2 text-sm text-text-faint transition-colors hover:border-white/25 hover:text-text"
                >
                  <CredIconSvg
                    name="linkedin"
                    className="h-[14px] w-[14px] shrink-0"
                  />
                  Qapita
                </a>
              </div>
            </div>

            {/* Right: testimonial video card */}
            <div className="flex flex-col">
              <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised/15">
                <button
                  type="button"
                  onClick={() => setLbOpen(true)}
                  aria-label="Play with sound"
                  className="group relative block aspect-video w-full overflow-hidden bg-bg-sunken"
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${c.testimonialVimeoId}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&controls=0`}
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    allow="autoplay"
                    title={c.testimonialName}
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-bg/65 px-3 py-1.5 text-[0.8125rem] text-text-muted backdrop-blur transition-colors group-hover:border-white/35 group-hover:text-text">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                    Play with sound
                  </span>
                </button>

                {/* Speaker identity */}
                <div className="flex items-start justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-[0.9375rem] font-medium text-text">
                      Brendan Marshall
                    </p>
                    <p className="mt-0.5 text-sm text-text-faint">
                      Host, The Catapult Code
                    </p>
                  </div>
                  <a
                    href={BRENDAN_LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Brendan Marshall on LinkedIn"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-line-strong bg-white/[0.03] px-3 py-2 text-sm text-text-faint transition-colors hover:border-white/30 hover:text-text"
                  >
                    <CredIconSvg
                      name="linkedin"
                      className="h-[14px] w-[14px] shrink-0"
                    />
                    Brendan Marshall
                  </a>
                </div>

                <p className="border-t border-line px-5 pb-5 pt-4 text-sm italic leading-snug text-text-muted">
                  &ldquo;Everyone on this team genuinely cares.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <MediaLightbox
            items={[lbItem]}
            index={lbOpen ? 0 : null}
            onClose={() => setLbOpen(false)}
          />
        </section>

        {/* 3. Our role — two-column with deliverables */}
        <section className="relative py-14 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1400px] items-start gap-10 px-6 lg:w-[86%] lg:grid-cols-2 lg:gap-16 lg:px-0">
            <div>
              <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                Our role
              </h2>
              <div className="mt-6 space-y-5">
                {c.ourRole.map((p, i) => (
                  <p
                    key={i}
                    className="max-w-[54ch] leading-relaxed text-text-muted"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <ul className="mt-7 flex flex-col gap-3">
                {DELIVERABLES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-text-muted"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-text-faint"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: status card */}
            <div className="glass sweep flex flex-col items-center justify-center rounded-2xl px-8 py-14 text-center">
              <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                <span className="chrome-breathe h-1.5 w-1.5 rounded-full bg-chrome" />
                Status
              </span>
              <p className="text-metal-static mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
                {c.status.label}
              </p>
              <p className="mt-3 text-sm text-text-muted">{c.status.sub}</p>
            </div>
          </div>
        </section>

        {/* 4. Related */}
        <RelatedCases related={c.related} />

        {/* 5. CTA */}
        <ClosingCTA subline="Want a show like The Catapult Code? Start with a call." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qapitaLd) }}
      />
    </>
  );
}
