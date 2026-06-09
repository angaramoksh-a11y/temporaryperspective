"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Credential } from "@/lib/work";
import MediaLightbox, {
  type LightboxItem,
  type LightboxLink,
  type LightboxMedia,
} from "./MediaLightbox";
import { CredChips } from "./testimonialBits";

const ease = [0.16, 1, 0.3, 1] as const;

export type PItem = {
  label: string;
  media?: LightboxMedia;
  href?: string;
  external?: boolean;
  placeholder?: boolean;
};
export type HandbookGroup = { heading?: string; items: PItem[] };
export type HandbookRow = {
  vimeoId: string;
  client: string;
  name: string;
  note?: string;
  role: string;
  quote: string;
  credentials: Credential[];
  caseStudy?: string;
  groups: HandbookGroup[];
  thumb: string;
};

// Check if the current connection can handle background video autoplay.
function hasGoodConnection(): boolean {
  if (typeof navigator === "undefined") return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conn = (navigator as any).connection;
  if (!conn) return true; // API unavailable — assume capable
  if (conn.saveData === true) return false;
  const slow = ["slow-2g", "2g"];
  return !slow.includes(conn.effectiveType);
}

// ── Video thumbnail with hover-shimmer + optional Vimeo background autoplay ──

function VideoThumb({
  vimeoId,
  thumb,
  name,
  reduce,
  onOpen,
}: {
  vimeoId: string;
  thumb: string;
  name: string;
  reduce: boolean;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [shimmerKey, setShimmerKey] = useState(0);
  // Delay poster fade-out until the iframe has had time to start rendering.
  const [videoReady, setVideoReady] = useState(false);
  const readyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const canAutoplay = hovered && !reduce && hasGoodConnection();

  useEffect(() => {
    if (canAutoplay) {
      readyTimer.current = setTimeout(() => setVideoReady(true), 900);
    } else {
      clearTimeout(readyTimer.current);
      setVideoReady(false);
    }
    return () => clearTimeout(readyTimer.current);
  }, [canAutoplay]);

  const handleEnter = () => {
    setHovered(true);
    if (!reduce) setShimmerKey((k) => k + 1);
  };

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-bg-sunken"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {/* poster — fades once video is ready */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={`${name} on Temporary Perspective`}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-0" : "brightness-[0.82]"
        }`}
      />

      {/* Vimeo background autoplay — unmounts on mouse-leave to pause */}
      {canAutoplay && (
        <iframe
          key={vimeoId}
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0`}
          className="pointer-events-none absolute inset-0 h-full w-full"
          allow="autoplay"
          title={`${name} preview`}
        />
      )}

      {/* shimmer — a single left-to-right gradient sweep on hover entry */}
      {!reduce && shimmerKey > 0 && (
        <motion.span
          key={shimmerKey}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10 w-3/5"
          initial={{ x: "-100%" }}
          animate={{ x: "250%" }}
          transition={{ duration: 0.65, ease }}
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, oklch(1 0 0 / 0.07) 50%, transparent 80%)",
          }}
        />
      )}

      {/* click target — always present, opens lightbox */}
      <button
        onClick={onOpen}
        aria-label={`Play ${name} testimonial`}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-bg/45 backdrop-blur transition-all duration-300 ease-[var(--ease-out-quart)] hover:scale-110 ${
            videoReady ? "opacity-40 hover:opacity-90" : "opacity-100"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 translate-x-px fill-text"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </div>
  );
}

// ── Individual card ──────────────────────────────────────────────────────────

function TestimonialCard({
  row,
  reduce,
  onOpen,
  onOpenProject,
}: {
  row: HandbookRow;
  reduce: boolean;
  onOpen: () => void;
  onOpenProject: (item: PItem) => void;
}) {
  const clientCreds = row.credentials.filter((c) => c.side === "client");
  const speakerCreds = row.credentials.filter((c) => c.side === "speaker");

  return (
    <article
      id={row.vimeoId}
      className="rounded-2xl border border-line bg-bg-raised/15 p-6 lg:p-8"
    >
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-12">
        {/* ── Left: title card (client side) ───────────────────────────── */}
        <div className="flex flex-col">
          {/* primary identifier — show/brand name (client) as the big headline */}
          <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-text">
            {row.client}
          </h2>

          {/* person name + role beneath the brand */}
          <p className="mt-2 text-[0.9375rem] leading-snug text-text-faint">
            {row.client !== row.name ? (
              <><span className="text-text-muted">{row.name}</span> · {row.role}</>
            ) : (
              row.role
            )}
          </p>

          {/* client-side links (show / channel / company) */}
          {clientCreds.length > 0 && (
            <div className="mt-5">
              <CredChips items={clientCreds} />
            </div>
          )}

          {/* work links — grouped, clean text list */}
          {row.groups.length > 0 && (
            <div className="mt-6 flex flex-col gap-4">
              {row.groups.map((g, gi) => (
                <div key={gi} className="flex flex-col gap-1.5">
                  {g.heading && (
                    <p className="text-[0.8125rem] font-medium uppercase tracking-[0.15em] text-text-faint">
                      {g.heading}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    {g.items.map((it) => {
                      const cls =
                        "inline-flex items-center gap-1.5 text-sm text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline";
                      if (it.media) {
                        return (
                          <button
                            key={it.label}
                            onClick={() => onOpenProject(it)}
                            className={cls}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-2.5 w-2.5 fill-current opacity-60"
                              aria-hidden
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            {it.label}
                          </button>
                        );
                      }
                      return it.external ? (
                        <a
                          key={it.label}
                          href={it.href}
                          target="_blank"
                          rel="noreferrer"
                          className={cls}
                        >
                          {it.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={it.label}
                          href={it.href ?? "#"}
                          className={cls}
                        >
                          {it.label} →
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* case study — proper button, consistent with other CTAs */}
          {row.caseStudy && (
            <Link
              href={row.caseStudy}
              className="group/cs mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-[var(--radius-btn)] border border-line-strong px-4 text-sm font-medium text-text transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              View case study
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover/cs:translate-x-0.5">
                →
              </span>
            </Link>
          )}
        </div>

        {/* ── Right: video + speaker links + pull quote ────────────────── */}
        <div className="flex flex-col">
          <VideoThumb
            vimeoId={row.vimeoId}
            thumb={row.thumb}
            name={row.name}
            reduce={reduce}
            onOpen={onOpen}
          />

          {/* speaker-side links replace the name attribution. If the person has
              no LinkedIn/Instagram listed, fall back to plain text. */}
          {speakerCreds.length > 0 ? (
            <div className="mt-3">
              <CredChips items={speakerCreds} />
            </div>
          ) : (
            <p className="mt-2.5 text-sm font-medium text-text">{row.name}</p>
          )}

          {/* pull quote — caption style, italic, no quotation marks */}
          <p className="mt-3 text-[0.9375rem] italic leading-snug text-text-muted">
            {row.quote}
          </p>
        </div>
      </div>
    </article>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function TestimonialsHandbook({ rows }: { rows: HandbookRow[] }) {
  const reduce = !!useReducedMotion();
  const [lb, setLb] = useState<{ items: LightboxItem[]; index: number } | null>(
    null,
  );

  const openCover = (row: HandbookRow) => {
    // Build readable social links for the lightbox footer.
    // Build human-readable social links: use the credential label when it already
    // carries context (@handle, brand name); otherwise prefix with the person's name.
    const links: LightboxLink[] = row.credentials
      .filter((c) => c.icon === "linkedin" || c.icon === "instagram" || c.icon === "youtube")
      .map((c) => {
        const generic = ["LinkedIn", "Instagram", "YouTube"].includes(c.label);
        const iconName =
          c.icon === "linkedin" ? "LinkedIn" : c.icon === "instagram" ? "Instagram" : "YouTube";
        return {
          label: generic ? `${row.name} on ${iconName}` : c.label,
          href: c.href,
          external: true,
        };
      });

    setLb({
      items: [
        {
          title: row.name,
          client: row.role,
          media: { kind: "vimeo", h: { id: row.vimeoId } },
          links: links.length > 0 ? links : undefined,
        },
      ],
      index: 0,
    });
  };

  const openProject = (row: HandbookRow, item: PItem) => {
    const media = row.groups.flatMap((g) => g.items).filter((i) => i.media);
    const items: LightboxItem[] = media.map((i) => ({
      title: i.label,
      client: row.client,
      media: i.media!,
    }));
    const index = Math.max(
      0,
      media.findIndex((i) => i === item),
    );
    setLb({ items, index });
  };

  return (
    <section className="relative pb-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-6 lg:gap-6 lg:px-10">
        {rows.map((row, i) => (
          <motion.div
            key={row.vimeoId}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease, delay: Math.min(i, 2) * 0.05 }}
          >
            <TestimonialCard
              row={row}
              reduce={reduce}
              onOpen={() => openCover(row)}
              onOpenProject={(item) => openProject(row, item)}
            />
          </motion.div>
        ))}
      </div>

      <MediaLightbox
        items={lb?.items ?? []}
        index={lb ? lb.index : null}
        onClose={() => setLb(null)}
        onIndex={(i) => setLb((l) => (l ? { ...l, index: i } : l))}
      />
    </section>
  );
}
