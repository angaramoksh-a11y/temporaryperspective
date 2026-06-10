"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Nav from "./Nav";
import Footer from "./Footer";
import ClosingCTA from "./ClosingCTA";
import PageHeroWord from "./PageHeroWord";
import RemoteCompare from "./RemoteCompare";
import TweetEmbed from "./TweetEmbed";
import Thumb from "./Thumb";
import { RelatedCases } from "./caseParts";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";
import { CredIconSvg } from "./testimonialBits";
import { bharatvaartaContent as c, siteTestimonials } from "@/lib/work";
import { videoObjectSchema } from "@/lib/schema";
import ShareBar from "./ShareBar";

const roshanTranscript =
  siteTestimonials.find((t) => t.vimeoId === c.testimonialVimeoId)?.transcript ?? [];

const bvLd = {
  "@context": "https://schema.org",
  "@graph": [
    videoObjectSchema({
      name: `${c.testimonialName} on Temporary Perspective`,
      description: roshanTranscript[0] ?? c.quote,
      source: "vimeo",
      embedId: c.testimonialVimeoId,
      uploadDate: "2025-01-01",
    }),
    ...c.marquee.map((t) =>
      videoObjectSchema({
        name: t.guest ? `${t.title} — ${t.guest}` : t.title,
        description: t.guest
          ? `${t.title}, featuring ${t.guest}. A Bharatvaarta episode produced by Temporary Perspective.`
          : `${t.title} — a Bharatvaarta episode produced by Temporary Perspective.`,
        source: "youtube",
        embedId: t.id,
        publisherName: "Bharatvaarta",
        publisherUrl: "https://www.youtube.com/@Bharatvaarta",
      }),
    ),
  ],
};

const ROSHAN_LINKEDIN = "https://www.linkedin.com/in/cariappack/";
const BV_INSTAGRAM = "https://www.instagram.com/bharatvaarta/";

const lbItem: LightboxItem = {
  title: c.testimonialName,
  client: "Bharatvaarta",
  media: { kind: "vimeo", h: { id: c.testimonialVimeoId } },
  links: [{ label: "Roshan on LinkedIn", href: ROSHAN_LINKEDIN, external: true }],
};

const brandLbItem: LightboxItem = {
  title: "Bharatvaarta — brand book",
  client: "Branding",
  desc: "Logo, palette, typography, and the show's full visual system.",
  media: { kind: "pdf", src: "/assets/bv-branding.pdf" },
};

const DELIVERABLES = [
  "Brand & visual identity",
  "Multi-cam studio shoot",
  "Master edit & colour grade",
  "Clips & distribution",
  "Location & remote production",
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

export default function BharatvaartaCaseStudy() {
  const [lbOpen, setLbOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  // Work scroll row
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
    drag.current = { down: true, startX: e.clientX, scroll: el.scrollLeft, moved: 0 };
  };
  const onMove = (e: React.PointerEvent) => {
    const el = rowRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => { drag.current.down = false; };

  const workItems: LightboxItem[] = c.marquee.map((t) => ({
    title: t.title,
    client: t.guest ?? "Bharatvaarta",
    media: { kind: "youtube", id: t.id },
  }));

  return (
    <>
      <Nav />
      <main>
        {/* 1. Header */}
        <PageHeroWord word="Bharatvaarta" eyebrow={c.eyebrow} sub={c.host} />

        {/* share strip */}
        <div className="mx-auto flex w-full max-w-[1400px] justify-end px-6 pb-2 lg:w-[86%] lg:px-0">
          <ShareBar title="Bharatvaarta — Temporary Perspective" />
        </div>

        {/* 2. About + autoplay testimonial */}
        <section className="relative pb-16 pt-2 lg:pb-24">
          <div className="mx-auto mt-12 grid w-full max-w-[1400px] items-start gap-10 px-6 lg:w-[86%] lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:px-0">

            {/* Left: show info + socials */}
            <div>
              <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                About the show
              </h2>
              <div className="mt-6 space-y-5">
                {c.aboutShow.map((p, i) => (
                  <p key={i} className="text-[clamp(1rem,1.5vw,1.125rem)] leading-[1.7] text-text">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={c.channel.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Bharatvaarta on YouTube, ${c.channel.handle}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white/[0.02] px-3.5 py-2 text-sm text-text-faint transition-colors hover:border-white/25 hover:text-text"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z" />
                  </svg>
                  {c.channel.handle}
                </a>
                <a
                  href={BV_INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Bharatvaarta on Instagram"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white/[0.02] px-3.5 py-2 text-sm text-text-faint transition-colors hover:border-white/25 hover:text-text"
                >
                  <CredIconSvg name="instagram" className="h-[14px] w-[14px] shrink-0" />
                  @bharatvaarta
                </a>
              </div>
            </div>

            {/* Right: compact autoplay card */}
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
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                    Play with sound
                  </button>
                </div>

                {/* Speaker identity + LinkedIn */}
                <div className="flex items-start justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-[0.9375rem] font-medium text-text">Roshan Cariappa</p>
                    <p className="mt-0.5 text-sm text-text-faint">Host, Bharatvaarta</p>
                  </div>
                  <a
                    href={ROSHAN_LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Roshan Cariappa on LinkedIn"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-line-strong bg-white/[0.03] px-3 py-2 text-sm text-text-faint transition-colors hover:border-white/30 hover:text-text"
                  >
                    <CredIconSvg name="linkedin" className="h-[14px] w-[14px] shrink-0" />
                    Roshan Cariappa
                  </a>
                </div>

                <p className="border-t border-line px-5 pt-4 text-sm italic leading-snug text-text-muted">
                  {c.quote}
                </p>

                {roshanTranscript.length > 0 && (
                  <div className="px-5 pb-5 pt-3">
                    <button
                      onClick={() => setTranscriptOpen((o) => !o)}
                      className="text-[0.8125rem] text-text-faint transition-colors hover:text-text"
                    >
                      {transcriptOpen ? "Close transcript ↑" : "Read transcript ↓"}
                    </button>
                    <AnimatePresence initial={false}>
                      {transcriptOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="mt-3 border-t border-line pt-3">
                            <p className="mb-2 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-text-faint">
                              Transcript — Roshan Cariappa, recorded for Temporary Perspective.
                            </p>
                            <div className="space-y-3 text-[0.875rem] leading-[1.7] text-text-muted">
                              {roshanTranscript.map((para, i) => (
                                <p key={i}>{para}</p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>

          <MediaLightbox
            items={[lbItem]}
            index={lbOpen ? 0 : null}
            onClose={() => setLbOpen(false)}
          />
        </section>

        {/* 3. Our role — VirtualCallout-style two-column */}
        <section className="relative py-14 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1400px] items-start gap-10 px-6 lg:w-[86%] lg:grid-cols-2 lg:gap-16 lg:px-0">
            {/* Left: text + deliverables */}
            <div>
              <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                Our role
              </h2>
              <div className="mt-6 space-y-5">
                {c.ourRole.map((p, i) => (
                  <p key={i} className="max-w-[54ch] leading-relaxed text-text-muted">
                    {p}
                  </p>
                ))}
              </div>
              <ul className="mt-7 flex flex-col gap-3">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-text-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-text-faint" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-text-faint">
                Retention and production data from this show contributed to the{" "}
                <Link
                  href="/state-of-b2b-podcasts-2026"
                  className="text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
                >
                  State of B2B Podcasts in India 2026
                </Link>{" "}
                report.
              </p>
            </div>

            {/* Right: stacked deliverables — YouTube channel + brand book */}
            <div className="flex flex-col gap-4">
              <a
                href={c.channel.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Bharatvaarta on YouTube"
                className="glass sweep group block overflow-hidden rounded-2xl p-2.5"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Thumb
                    id={c.channel.posterId}
                    alt="Bharatvaarta on YouTube"
                    className="brightness-[0.7] transition-[filter] duration-300 group-hover:brightness-[0.85]"
                  />
                </div>
                <div className="flex items-center justify-between px-1.5 pb-1 pt-3.5">
                  <div>
                    <p className="font-medium leading-snug">Bharatvaarta</p>
                    <p className="mt-1 text-sm text-text-faint">{c.channel.handle} on YouTube</p>
                  </div>
                  <span className="text-text-faint transition-colors group-hover:text-text">↗</span>
                </div>
              </a>

              {/* Brand book — opens the PDF in the shared lightbox */}
              <button
                type="button"
                onClick={() => setBrandOpen(true)}
                aria-label="Open the Bharatvaarta brand book"
                className="glass sweep group flex items-start gap-3 rounded-2xl p-4 text-left transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-0.5 sm:gap-4"
              >
                <span
                  aria-hidden
                  className="chrome-card grid h-12 w-12 shrink-0 place-items-center rounded-xl text-text-muted transition-colors group-hover:text-text sm:h-14 sm:w-14"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 3v5h5" />
                    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                      Brand book
                    </span>
                    <span
                      aria-hidden
                      className="inline-flex items-center gap-1 text-sm font-medium text-text-faint transition-all duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:text-text"
                    >
                      Open ↗
                    </span>
                  </span>
                  <span className="mt-1 block font-display text-[1.05rem] font-medium leading-snug tracking-tight text-text sm:text-lg">
                    The full visual system
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-text-muted">
                    Logo, palette, typography. Built from scratch for the show.
                  </span>
                </span>
              </button>
            </div>
          </div>

          <MediaLightbox
            items={[brandLbItem]}
            index={brandOpen ? 0 : null}
            onClose={() => setBrandOpen(false)}
          />
        </section>

        {/* 4. Before / after */}
        <section className="relative py-14 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-6 lg:w-[86%] lg:grid-cols-2 lg:gap-12 lg:px-0">
            <div>
              <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                The production jump.
              </h2>
              <p className="mt-5 max-w-md text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-text-muted">
                {c.compare.line}
              </p>
            </div>
            <RemoteCompare
              ariaLabel="Compare before and after"
              sides={[
                {
                  key: "before",
                  label: "Before",
                  id: c.compare.before.id,
                  start: c.compare.before.start,
                  alt: "The same studio and host, before the regrade and relight",
                  lightboxTitle: "Before",
                  lightboxClient: "Bharatvaarta",
                },
                {
                  key: "after",
                  label: "After",
                  id: c.compare.after.id,
                  start: c.compare.after.start,
                  alt: "The same studio, regraded and relit, three angles",
                  lightboxTitle: "After",
                  lightboxClient: "Bharatvaarta",
                },
              ]}
            />
          </div>
        </section>

        {/* 5. Work showcase — simple drag-to-scroll row */}
        <section className="relative py-20 lg:py-24">
          <div className="mx-auto mb-10 max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                  Over a hundred conversations.
                </h2>
                <p className="mt-4 max-w-lg text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-text-muted">
                  Here are a few of them.
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <ScrollArrow dir={-1} disabled={!canLeft} onClick={() => nudge(-1)} />
                <ScrollArrow dir={1} disabled={!canRight} onClick={() => nudge(1)} />
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
            {c.marquee.map((t, i) => {
              const alt = t.guest ? `${t.title}, ${t.guest}` : t.title;
              return (
                <figure key={t.id} className="w-[78vw] shrink-0 sm:w-[300px] lg:w-[340px]">
                  <button
                    onClick={() => { if (drag.current.moved > 6) return; setWorkIndex(i); }}
                    aria-label={alt}
                    className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-line"
                  >
                    <Thumb
                      id={t.id}
                      alt={alt}
                      className="opacity-90 brightness-[0.8] transition-[filter,opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:opacity-100 group-hover:brightness-100"
                    />
                  </button>
                  <figcaption className="mt-3 px-0.5">
                    <p className="text-sm font-medium leading-snug text-text">{t.title}</p>
                    {t.guest && <p className="mt-0.5 text-xs text-text-faint">{t.guest}</p>}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <MediaLightbox
            items={workItems}
            index={workIndex}
            onClose={() => setWorkIndex(null)}
            onIndex={setWorkIndex}
          />
        </section>

        {/* 6. The tweet */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[640px]">
            <h2 className="text-metal-static mb-8 text-center font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight">
              {c.tweet.line}
            </h2>
            <TweetEmbed url={c.tweet.url} />
          </div>
        </section>

        {/* 7. Other case studies */}
        <RelatedCases related={c.related} />

        {/* 8. Closing CTA */}
        <ClosingCTA subline="The work behind this show is the work we'd do for yours." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bvLd) }}
      />
    </>
  );
}
