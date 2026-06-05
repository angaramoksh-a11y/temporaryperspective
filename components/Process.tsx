"use client";

import Link from "next/link";
import { useState } from "react";
import { GhostButton } from "./ui";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";

const REPEAT = [
  { id: "guest-prep", title: "Guest Prep", body: "Briefs both sides. No cold starts." },
  { id: "production", title: "Production", body: "Multi-cam, lit, broadcast sound." },
  { id: "post", title: "Post", body: "Master edit, grade, and clips." },
  { id: "growth", title: "Growth", body: "Published, and grown." },
];

// Two brand books in the shared lightbox (prev/next), so the work doesn't read
// as a single-client, BV-only site. Served locally (the R2 bucket isn't
// CORS/frame-accessible, so it renders blank in an iframe).
const BRAND_BOOKS: LightboxItem[] = [
  {
    title: "Bharatvaarta — brand book",
    client: "Branding",
    desc: "Logo, palette, typography, and the show's full visual system.",
    media: { kind: "pdf", src: "/assets/bv-branding.pdf" },
  },
  {
    title: "Shut Up Beta — brand book",
    client: "Branding",
    desc: "A second identity system, built from the ground up for a different show.",
    media: { kind: "pdf", src: "/assets/shutup-beta-branding.pdf" },
  },
];

export default function Process() {
  const [pdf, setPdf] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
        <div className="max-w-2xl">
          <h2 className="text-metal font-display text-[clamp(2.5rem,4vw,3.8rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            The process.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            One foundation. Then an engine that repeats, every episode, in under
            a week.
          </p>
        </div>

        {/* timeline */}
        <div className="mt-12 flex flex-col gap-4 lg:mt-14 lg:flex-row lg:items-stretch">
          {/* Branding — the one-time Foundation node; opens the brand books */}
          <button
            onClick={() => setPdf(0)}
            className="group glass rim-glow relative flex flex-col rounded-2xl p-5 text-left transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 lg:w-[248px] lg:shrink-0"
          >
            <span className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-text">
              Once
            </span>
            <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-text">
              Branding
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
              Logo, palette, the show&apos;s whole identity.
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-text">
              View the brand books
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>

          {/* the repeating engine */}
          <div className="relative flex-1 rounded-2xl border border-line bg-bg-raised/20 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-faint">
                Every episode
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-text-faint">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                  <path d="M21 12a9 9 0 1 1-3-6.7" strokeLinecap="round" />
                  <path d="M21 3v4h-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                repeats
              </span>
            </div>
            <ol className="mt-4 grid gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {REPEAT.map((p, i) => (
                <li key={p.id}>
                  <Link href={`/process#${p.id}`} className="group/node block">
                    <span className="font-mono text-xs text-text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 font-display text-base font-medium tracking-tight text-text">
                      {p.title}
                      <span className="text-text-faint opacity-0 transition-opacity duration-200 group-hover/node:opacity-100">
                        →
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-text-muted">
                      {p.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            {/* Start → Day 7 meter; chromium, kept full (no progress animation) */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-text-faint">
                <span>Start</span>
                <span>Day 7</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-white/30 via-white/70 to-white shadow-[0_0_10px_-1px_oklch(0.99_0.002_264/0.55)]" />
              </div>
            </div>
          </div>

          {/* the stat */}
          <div className="glass flex flex-col justify-center rounded-2xl p-5 text-center lg:w-[172px] lg:shrink-0">
            <span className="text-metal-static font-display text-[clamp(1.9rem,3vw,2.5rem)] font-semibold tracking-tight">
              &lt; 7 days
            </span>
            <span className="mt-1.5 text-xs leading-snug text-text-muted">
              Shot to published, every episode.
            </span>
          </div>
        </div>

        <div className="mt-10">
          <GhostButton href="/process">See the full process →</GhostButton>
        </div>
      </div>

      <MediaLightbox
        items={BRAND_BOOKS}
        index={pdf}
        onClose={() => setPdf(null)}
        onIndex={setPdf}
      />
    </section>
  );
}
