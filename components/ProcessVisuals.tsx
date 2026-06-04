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
export default function PhaseVisual({ phaseId }: { phaseId: string }) {
  switch (phaseId) {
    case "branding":
      return <BrandBookVisual />;
    case "guest-prep":
      return <GuestBriefVisual />;
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

const BRAND_BOOK: LightboxItem = {
  title: "Bharatvaarta — brand book",
  client: "Branding",
  desc: "Logo, palette, typography, and the show's full visual system.",
  media: { kind: "pdf", src: "/assets/bv-branding.pdf" },
};

// The Bharatvaarta palette, shown on the cover as the artifact's own colours
// (a client brand book legitimately carries colour the site chrome never does).
const BV_PALETTE = ["#7A1410", "#C9A23F", "#E9DCC2", "#0E0E0E"];

function BrandBookVisual() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open the Bharatvaarta brand book"
        className="chrome-card sweep group block w-full overflow-hidden text-left transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1"
      >
        <div className="relative flex aspect-[4/3] flex-col justify-between bg-bg-sunken p-6">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,oklch(1_0_0/0.06),transparent_60%)]"
          />
          <div className="relative flex items-center justify-between">
            <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
              Brand book
            </span>
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-faint">
              PDF
            </span>
          </div>
          <div className="relative">
            <div className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.05] tracking-tight text-text">
              Bharatvaarta
            </div>
            <div className="mt-1 text-sm text-text-muted">
              Identity system · type · logo
            </div>
            <div className="mt-4 flex gap-2" aria-hidden>
              {BV_PALETTE.map((c) => (
                <span
                  key={c}
                  className="h-5 w-5 rounded-full border border-line"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <span className="text-sm text-text-muted">Full visual system</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text">
            Open
            <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
              ↗
            </span>
          </span>
        </div>
      </button>

      <MediaLightbox
        items={[BRAND_BOOK]}
        index={open ? 0 : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/* ---------- Guest Prep — the researched brief ----------------------------- */

const HOOKS = [
  "What does the public misunderstand most about the deep state?",
  "If you rebuilt India's intelligence apparatus today, what changes?",
  "How is AI quietly rewriting the rules of statecraft?",
];

const ANTI = [
  "“Tell us about your career.”",
  "“What is intelligence?”",
  "Anything he's answered on three other shows.",
];

function BriefBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 border-t border-line pt-4">
      <span className="text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-text-faint">
        {label}
      </span>
      {children}
    </div>
  );
}

function GuestBriefVisual() {
  return (
    <div className="chrome-card p-5 lg:p-6">
      <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
        Guest brief · Bharatvaarta
      </span>
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">
        Vikram Sood
      </h3>
      <p className="mt-1 text-sm text-text-muted">
        Former Chief, R&amp;AW · author, The Unending Game
      </p>

      <BriefBlock label="Why this guest">
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          One of the few who can speak to intelligence as both insider and
          historian. The &ldquo;deep state&rdquo; framing is having a global
          moment — he&apos;s the most credible Indian voice on it.
        </p>
      </BriefBlock>

      <BriefBlock label="Hook angles">
        <ol className="mt-3 flex flex-col gap-2.5">
          {HOOKS.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="pt-0.5 font-mono text-[0.75rem] text-text-faint">
                Q{i + 1}
              </span>
              <span className="text-sm leading-snug text-text">{q}</span>
            </li>
          ))}
        </ol>
      </BriefBlock>

      <BriefBlock label="Don't ask">
        <ul className="mt-3 flex flex-col gap-2">
          {ANTI.map((a, i) => (
            <li
              key={i}
              className="flex items-baseline gap-2 text-sm text-text-faint"
            >
              <span aria-hidden>✕</span>
              <span className="line-through opacity-70">{a}</span>
            </li>
          ))}
        </ul>
      </BriefBlock>
    </div>
  );
}

/* ---------- Post — edit styles + clip count ------------------------------- */

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

function ClipCell() {
  return (
    <div className="relative aspect-[9/16] w-[72px] shrink-0 overflow-hidden rounded-md border border-line bg-bg-sunken">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent"
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 block h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-y-[5px] border-l-[8px] border-y-transparent border-l-white/60"
      />
      <span
        aria-hidden
        className="absolute inset-x-1.5 bottom-1.5 h-1 rounded-full bg-white/15"
      />
    </div>
  );
}

function PostVisual() {
  const reduce = useReducedMotion();
  const [edit, setEdit] = useState("hooked");
  const [clips, setClips] = useState("6");
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
  const count = Number(clips);

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

      <div className="mt-6 flex items-center gap-3">
        <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
          Clips
        </span>
        <Segmented
          ariaLabel="Clips per episode"
          layoutId="post-clips"
          options={[
            { value: "3", label: "3" },
            { value: "6", label: "6" },
            { value: "12", label: "12" },
          ]}
          value={clips}
          onChange={setClips}
        />
      </div>
      <div className="scroll-row fade-x mt-3 flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: count }).map((_, i) => (
          <ClipCell key={i} />
        ))}
      </div>
      <p className="mt-3 text-sm text-text-muted">
        {count} vertical cuts per episode — captioned, built to travel.
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
