"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ClosingCTA from "./ClosingCTA";
import PageHeroWord from "./PageHeroWord";
import Thumb from "./Thumb";
import { RelatedCases } from "./caseParts";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";
import { CredIconSvg } from "./testimonialBits";
import { bureauContent as c, siteTestimonials } from "@/lib/work";
import { videoObjectSchema } from "@/lib/schema";
import ShareBar from "./ShareBar";

const rahiTranscript =
  siteTestimonials.find((t) => t.vimeoId === c.testimonialVimeoId)?.transcript ?? [];

const bureauLd = {
  "@context": "https://schema.org",
  "@graph": [
    videoObjectSchema({
      name: `${c.testimonialName} on Temporary Perspective`,
      description: rahiTranscript[0] ?? c.quote.text,
      source: "vimeo",
      embedId: c.testimonialVimeoId,
      uploadDate: "2025-01-01",
    }),
    ...c.formats.flatMap((f) =>
      f.tiles.map((t) =>
        videoObjectSchema({
          name: t.guest ? `${f.heading} — ${t.guest}` : f.heading,
          description: `${f.body} Produced for Bureau by Temporary Perspective.`,
          source: "youtube",
          embedId: t.id,
          publisherName: "Bureau",
          publisherUrl: "https://www.linkedin.com/company/bureauidentity/",
        }),
      ),
    ),
  ],
};

const RAHI_LINKEDIN =
  "https://www.linkedin.com/company/bureauidentity/";

const lbItem: LightboxItem = {
  title: c.testimonialName,
  client: "Bureau",
  media: { kind: "vimeo", h: { id: c.testimonialVimeoId } },
  links: [
    { label: "Bureau on LinkedIn", href: RAHI_LINKEDIN, external: true },
  ],
};

const DELIVERABLES = [
  "Event coverage & sizzle reels",
  "Talking-head interviews",
  "Podcast series production",
  "Client testimonial films",
];

function ScrollArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 1 | -1;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Scroll right" : "Scroll left"}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-text-muted transition-[color,border-color,opacity] duration-300 ease-[var(--ease-out-quart)] hover:border-line-strong hover:text-text disabled:pointer-events-none disabled:opacity-30"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
        style={{ transform: dir === 1 ? "none" : "scaleX(-1)" }}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

export default function BureauCaseStudy() {
  const [lbOpen, setLbOpen] = useState(false);

  // Work scroll
  const allTiles = c.formats.flatMap((f) => f.tiles);
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: 0 });
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [workIndex, setWorkIndex] = useState<number | null>(null);

  const sync = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: "smooth" });
  };

  const onDown = (e: React.PointerEvent) => {
    const el = rowRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      scroll: el.scrollLeft,
      moved: 0,
    };
  };
  const onMove = (e: React.PointerEvent) => {
    const el = rowRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => {
    drag.current.down = false;
  };

  const workItems: LightboxItem[] = allTiles.map((t) => ({
    title: t.guest,
    client: "Bureau",
    media: { kind: "youtube", id: t.id },
  }));

  return (
    <>
      <Nav />
      <main>
        {/* 1. Header */}
        <PageHeroWord word="Bureau" eyebrow={c.tagline} />

        {/* share strip */}
        <div className="mx-auto flex w-full max-w-[1400px] justify-end px-6 pb-2 lg:w-[86%] lg:px-0">
          <ShareBar title="Bureau — Temporary Perspective" />
        </div>

        {/* 2. About + autoplay testimonial */}
        <section className="relative pb-16 pt-2 lg:pb-24">
          <div className="mx-auto mt-12 grid w-full max-w-[1400px] items-start gap-10 px-6 lg:w-[86%] lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:px-0">
            {/* Left: about + quote */}
            <div>
              <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                About the work
              </h2>
              <div className="mt-6 space-y-5">
                {c.about.map((p, i) => (
                  <p
                    key={i}
                    className="text-[clamp(1rem,1.5vw,1.125rem)] leading-[1.7] text-text"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Pull quote inline */}
              <figure className="mt-8 border-l border-line-strong pl-5">
                <blockquote className="text-[clamp(1.125rem,1.8vw,1.35rem)] font-light italic leading-[1.4] text-text">
                  &ldquo;{c.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-text-faint">
                  {c.quote.attribution}
                </figcaption>
              </figure>
            </div>

            {/* Right: testimonial video card */}
            <div className="flex flex-col">
              <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised/15">
                <div className="relative aspect-video overflow-hidden bg-bg-sunken">
                  <iframe
                    src={`https://player.vimeo.com/video/${c.testimonialVimeoId}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&controls=0`}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay"
                    title={c.testimonialName}
                  />
                  <button
                    onClick={() => setLbOpen(true)}
                    aria-label="Play with sound"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-bg/65 px-3 py-1.5 text-xs text-text-muted backdrop-blur transition-colors hover:border-white/35 hover:text-text"
                  >
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
                  </button>
                </div>

                {/* Speaker identity */}
                <div className="flex items-start justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-[0.9375rem] font-medium text-text">
                      Rahi Bhattacharjee
                    </p>
                    <p className="mt-0.5 text-sm text-text-faint">
                      Content Head, Bureau
                    </p>
                  </div>
                  <a
                    href={RAHI_LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Bureau on LinkedIn"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-line-strong bg-white/[0.03] px-3 py-2 text-sm text-text-faint transition-colors hover:border-white/30 hover:text-text"
                  >
                    <CredIconSvg
                      name="linkedin"
                      className="h-[14px] w-[14px] shrink-0"
                    />
                    Bureau
                  </a>
                </div>

                <p className="border-t border-line px-5 pb-5 pt-4 text-sm italic leading-snug text-text-muted">
                  &ldquo;{c.quote.text}&rdquo;
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
                What we produce
              </h2>
              <p className="mt-6 max-w-[54ch] leading-relaxed text-text-muted">
                We produce across Bureau&apos;s formats: the Forum, their
                podcast series, and their testimonial work. One team that knows
                the brand and the subject.
              </p>
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

            {/* Format breakdown — stacked cards */}
            <div className="flex flex-col gap-3">
              {c.formats.map((f) => (
                <div
                  key={f.heading}
                  className="glass sweep rounded-2xl px-5 py-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base font-medium tracking-tight text-text">
                      {f.heading}
                    </h3>
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-faint">
                      {f.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Work showcase — scroll row */}
        <section className="relative py-20 lg:py-24">
          <div className="mx-auto mb-10 max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                  The work.
                </h2>
                <p className="mt-4 max-w-lg text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-text-muted">
                  A few highlights across formats.
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <ScrollArrow
                  dir={-1}
                  disabled={!canLeft}
                  onClick={() => nudge(-1)}
                />
                <ScrollArrow
                  dir={1}
                  disabled={!canRight}
                  onClick={() => nudge(1)}
                />
              </div>
            </div>
          </div>

          <div
            ref={rowRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
            className="scroll-row fade-x flex cursor-grab gap-4 overflow-x-auto px-6 pb-6 active:cursor-grabbing lg:pl-[7%] lg:pr-10"
          >
            {allTiles.map((t, i) => (
              <figure
                key={t.id}
                className="w-[78vw] shrink-0 sm:w-[300px] lg:w-[340px]"
              >
                <button
                  onClick={() => {
                    if (drag.current.moved > 6) return;
                    setWorkIndex(i);
                  }}
                  aria-label={`${t.guest}, Bureau`}
                  className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-line"
                >
                  <Thumb
                    id={t.id}
                    alt={`${t.guest} on Bureau`}
                    className="opacity-90 brightness-[0.8] transition-[filter,opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:opacity-100 group-hover:brightness-100"
                  />
                </button>
                <figcaption className="mt-3 px-0.5">
                  <p className="text-sm font-medium leading-snug text-text">
                    {t.guest}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <MediaLightbox
            items={workItems}
            index={workIndex}
            onClose={() => setWorkIndex(null)}
            onIndex={setWorkIndex}
          />
        </section>

        {/* 5. Related */}
        <RelatedCases related={c.related} />

        {/* 6. CTA */}
        <ClosingCTA subline="Want a show like Bureau? Start with a call." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bureauLd) }}
      />
    </>
  );
}
