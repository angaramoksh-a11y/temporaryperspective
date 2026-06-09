"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { embed } from "@/lib/work";
import Thumb from "./Thumb";
import RemoteCompare, { PRODUCTION_SIDES } from "./RemoteCompare";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";

/**
 * Per-phase right-column visuals for the /process timeline. One card per phase,
 * each with a single tasteful demo, in the studio's chrome/glass language. Real
 * Bharatvaarta assets where they exist; everything respects reduced motion.
 */
// Phases that render a right-column visual. Guest Prep is intentionally text-only —
// the brief is described in the copy; a mocked-up doc adds noise without proof.
export const PHASES_WITH_VISUAL = new Set([
  "branding",
  "production",
  "post",
  "growth",
]);

export default function PhaseVisual({ phaseId }: { phaseId: string }) {
  switch (phaseId) {
    case "branding":
      return <BrandBookVisual />;
    case "production":
      return (
        <RemoteCompare
          ariaLabel="Compare field and virtual production"
          sides={PRODUCTION_SIDES}
        />
      );
    case "post":
      return <PostVisual />;
    case "growth":
      return <GrowthVisual />;
    default:
      return null;
  }
}

/* ---------- shared segmented toggle (the RemoteCompare pill recipe) -------- */

function Segmented({
  options,
  value,
  onChange,
  ariaLabel,
  layoutId,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  layoutId: string;
}) {
  const reduce = useReducedMotion();
  const pillT = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex gap-1 rounded-[var(--radius-btn)] border border-line bg-bg-sunken p-1"
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className="relative rounded-[calc(var(--radius-btn)-2px)] px-3.5 py-1.5 text-center"
          >
            {on && (
              <motion.span
                layoutId={layoutId}
                transition={pillT}
                className="absolute inset-0 rounded-[calc(var(--radius-btn)-2px)] border border-line-strong bg-bg-raised shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08)]"
              />
            )}
            <span
              className={`relative z-10 whitespace-nowrap text-[0.8125rem] font-medium tracking-tight transition-colors duration-300 sm:text-sm ${
                on ? "text-text" : "text-text-muted"
              }`}
            >
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Branding — the brand book ------------------------------------- */

// The real branding artifacts, opened fullscreen in the shared lightbox
// (prev/next). Two brand books plus the Shut Up Beta logo animation, kept right
// below its book. The logo film is the same asset that lives in the archive.
type BrandDoc = {
  kind: "doc" | "film";
  label: string;
  meta: string;
  item: LightboxItem;
};

const BRAND_DOCS: BrandDoc[] = [
  {
    kind: "doc",
    label: "Bharatvaarta",
    meta: "Brand book · PDF",
    item: {
      title: "Bharatvaarta — brand book",
      client: "Branding",
      desc: "Logo, palette, typography, and the show's full visual system.",
      media: { kind: "pdf", src: "/assets/bv-branding.pdf" },
    },
  },
  {
    kind: "doc",
    label: "Shut Up Beta",
    meta: "Brand book · PDF",
    item: {
      title: "Shut Up Beta — brand book",
      client: "Branding",
      desc: "A second identity system, built from the ground up for a different show.",
      media: { kind: "pdf", src: "/assets/shutup-beta-branding.pdf" },
    },
  },
  {
    kind: "film",
    label: "Shut Up Beta",
    meta: "Logo animation · Motion",
    item: {
      title: "Shut Up Beta — logo animation",
      client: "Branding",
      desc: "The identity in motion. Also in the archive.",
      media: { kind: "vimeo", h: { id: "1172823675" } },
      links: [{ label: "See in the archive", href: "/portfolio/archive" }],
    },
  },
];

function DocGlyph({ film }: { film?: boolean }) {
  if (film)
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
        <rect x="3" y="4.5" width="18" height="15" rx="3" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3v5h5" />
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z" />
    </svg>
  );
}

function BrandBookVisual() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <div className="chrome-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
            Brand books
          </span>
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-faint">
            Full visual systems
          </span>
        </div>
        <ul>
          {BRAND_DOCS.map((d, i) => (
            <li key={d.item.title}>
              <button
                onClick={() => setIndex(i)}
                aria-label={`Open ${d.item.title}`}
                className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-line"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-bg-sunken text-text-muted transition-colors group-hover:text-text">
                  <DocGlyph film={d.kind === "film"} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base font-medium tracking-tight text-text">
                    {d.label}
                  </span>
                  <span className="block text-sm text-text-faint">{d.meta}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-text-faint transition-all duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:text-text">
                  Open
                  <span aria-hidden>↗</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <MediaLightbox
        items={BRAND_DOCS.map((d) => d.item)}
        index={index}
        onClose={() => setIndex(null)}
        onIndex={setIndex}
      />
    </>
  );
}

/* ---------- Post — edit styles ------------------------------------------- */

type Cut = {
  key: string;
  label: string;
  id: string;
  start: number;
  title: string;
  tag: string;
  alt: string;
  caption: string;
};

const EDIT_CUTS: Cut[] = [
  {
    key: "clean",
    label: "Clean",
    id: "LqzAvM4LSH4",
    start: 4,
    title: "Shut Up Beta — episode",
    tag: "Clean cut",
    alt: "A clean, conversation-first podcast edit",
    caption:
      "A clean, watchable cut. Audio mastered, colour graded — no cold open, no b-roll. The conversation breathes.",
  },
  {
    key: "hooked",
    label: "Hooked",
    id: "D1TArxkvUDk",
    start: 6,
    title: "The Sarcastic Show — Ep 1",
    tag: "Hook engineered",
    alt: "A hook-engineered edit with a cold open",
    caption:
      "A cold open and a retention-first structure — rearranged for the way people actually watch, past minute eight.",
  },
  {
    key: "broll",
    label: "+ B-roll",
    id: "560sRbXiyGA",
    start: 23,
    title: "When Marathas Almost Ruled India",
    tag: "Hooked + B-roll",
    alt: "A cinematic edit with archival b-roll and motion graphics",
    caption:
      "Every reference visualised — archival b-roll, motion graphics, lower thirds. The episode plays like a documentary.",
  },
];

function PostVisual() {
  const reduce = useReducedMotion();
  const [edit, setEdit] = useState("hooked");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const idx = Math.max(
    0,
    EDIT_CUTS.findIndex((c) => c.key === edit),
  );
  const active = EDIT_CUTS[idx];
  const ambient = embed(active.id, true, true, active.start);
  const items: LightboxItem[] = EDIT_CUTS.map((c) => ({
    title: c.title,
    client: c.tag,
    media: { kind: "youtube", id: c.id, start: c.start },
  }));

  return (
    <div className="w-full">
      <Segmented
        ariaLabel="Edit style"
        layoutId="post-edit"
        options={EDIT_CUTS.map((c) => ({ value: c.key, label: c.label }))}
        value={edit}
        onChange={setEdit}
      />

      <div className="glass sweep group mt-4 w-full rounded-2xl p-2.5">
        <button
          onClick={() => setLightbox(idx)}
          aria-label={`Play, ${active.title}`}
          className="relative block aspect-video w-full overflow-hidden rounded-xl bg-bg-sunken"
        >
          {reduce ? (
            <Thumb
              id={active.id}
              alt={active.alt}
              className="brightness-[0.85] transition-[filter] duration-300 group-hover:brightness-100"
            />
          ) : (
            <iframe
              key={ambient}
              src={ambient}
              title={active.alt}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
          )}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-sunken/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        {active.caption}
      </p>

      <MediaLightbox
        items={items}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={(n) => {
          setLightbox(n);
          setEdit(EDIT_CUTS[n].key);
        }}
      />
    </div>
  );
}

/* ---------- Growth — the analytics panel ---------------------------------- */

type Stat = { label: string; value: string; note: string; from?: string };

const GROWTH: Record<"launch" | "ab", { period: string; stats: Stat[] }> = {
  launch: {
    period: "First 24 hours · launch",
    stats: [
      { label: "Impressions", value: "84K", note: "launch" },
      { label: "CTR", value: "6.8%", note: "benchmark" },
      { label: "Avg view", value: "14:22", note: "retention" },
      { label: "Watch time", value: "1.2K hrs", note: "day 1" },
    ],
  },
  ab: {
    period: "Day 1 → Day 7 · A/B tested",
    stats: [
      { label: "Impressions", from: "84K", value: "412K", note: "↑ 4.9×" },
      { label: "CTR", from: "6.8%", value: "11.4%", note: "thumbnail B won" },
      { label: "Avg view", from: "14:22", value: "16:08", note: "title B won" },
      { label: "Watch time", from: "1.2K", value: "8.4K hrs", note: "↑ 7×" },
    ],
  },
};

function GrowthVisual() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"launch" | "ab">("ab");
  const data = GROWTH[mode];

  return (
    <div className="w-full">
      <Segmented
        ariaLabel="SEO and distribution mode"
        layoutId="growth-mode"
        options={[
          { value: "launch", label: "Setup once" },
          { value: "ab", label: "A/B tested" },
        ]}
        value={mode}
        onChange={(v) => setMode(v as "launch" | "ab")}
      />

      <div className="chrome-card mt-4 overflow-hidden">
        <div className="border-b border-line p-4">
          <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
            Sample episode
          </span>
          <span className="mt-1 block text-sm text-text">
            &ldquo;The Deep State Is Not A Myth&rdquo; · Vikram Sood
          </span>
        </div>
        <div className="px-4 pb-1 pt-3 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-text-faint">
          {data.period}
        </div>
        <motion.div
          key={mode}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4"
        >
          {data.stats.map((s) => (
            <div key={s.label} className="bg-bg p-4">
              <div className="text-[0.8125rem] uppercase tracking-[0.14em] text-text-faint">
                {s.label}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5 tabular-nums">
                {s.from && (
                  <span className="text-sm text-text-faint">{s.from} →</span>
                )}
                <span className="font-display text-xl font-semibold tracking-tight text-text">
                  {s.value}
                </span>
              </div>
              <div className="mt-1 text-[0.8125rem] text-text-muted">
                {s.note}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
