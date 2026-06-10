"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  embed,
  vimeoEmbed,
  vimeoLink,
  watch,
  type Orientation,
  type VimeoClip,
} from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;

export type LightboxLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type LightboxMedia =
  | { kind: "youtube"; id: string; start?: number }
  | { kind: "vimeo"; h?: VimeoClip; v?: VimeoClip }
  | { kind: "pdf"; src: string };

export type LightboxItem = {
  title: string;
  client?: string;
  desc?: string;
  orientation?: Orientation;
  media: LightboxMedia;
  links?: LightboxLink[];
};

/**
 * The one shared lightbox: video (YouTube/Vimeo, with an H/V toggle for
 * dual-cut clips) and PDF. Focus-trapped, Esc + backdrop close, arrow prev/next.
 * Orientation-aware so vertical clips show 9:16 and never stretch. `index` of
 * null = closed; pass `onIndex` to enable prev/next through `items`.
 */
export default function MediaLightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex?: (i: number) => void;
}) {
  const open = index !== null && index >= 0 && index < items.length;
  const item = open ? items[index] : null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const [cut, setCut] = useState<"h" | "v">("h");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [escHint, setEscHint] = useState(false);
  const [soundHint, setSoundHint] = useState(false);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    if (item?.media.kind === "vimeo") setCut(item.media.h ? "h" : "v");
  }, [item]);

  // ESC hint: show briefly on open, then fade
  useEffect(() => {
    if (!open || reduce) { setEscHint(false); return; }
    setEscHint(true);
    const t = setTimeout(() => setEscHint(false), 2000);
    return () => clearTimeout(t);
  }, [open, reduce]);

  // Sound hint: show for 4s when a video opens (not PDF)
  useEffect(() => {
    if (!item || item.media.kind === "pdf" || reduce) { setSoundHint(false); return; }
    setSoundHint(true);
    const t = setTimeout(() => setSoundHint(false), 4000);
    return () => clearTimeout(t);
  }, [item, reduce]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null || !onIndex || items.length < 2) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, onIndex, items.length],
  );

  // keyboard (esc / arrows / tab-trap), scroll lock, focus restore
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const f = root.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(
      () =>
        dialogRef.current
          ?.querySelector<HTMLElement>("button, a, [tabindex]")
          ?.focus(),
      40,
    );
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
      prevFocus?.focus?.();
    };
  }, [open, onClose, go]);

  let vertical = false;
  let isPdf = false;
  let src = "";
  let hasBoth = false;
  let watchUrl = "";
  let watchLabel = "";

  if (item) {
    const m = item.media;
    isPdf = m.kind === "pdf";
    if (m.kind === "youtube") {
      src = embed(m.id, true, false, m.start);
      vertical = item.orientation === "vertical";
      watchUrl = watch(m.id);
      watchLabel = "Watch on YouTube";
    } else if (m.kind === "vimeo") {
      hasBoth = !!m.h && !!m.v;
      const clip = (cut === "v" ? m.v : m.h) ?? m.h ?? m.v;
      src = clip ? vimeoEmbed(clip, { autoplay: true }) : "";
      vertical = cut === "v" && !!m.v ? true : item.orientation === "vertical";
      if (clip) {
        watchUrl = vimeoLink(clip);
        watchLabel = "Watch on Vimeo";
      }
    } else {
      src = m.src;
    }
  }

  // Reset iframe loaded state on src change
  useEffect(() => {
    setIframeLoaded(false);
  }, [src]);

  if (typeof document === "undefined") return null;

  const hasNav = items.length > 1 && !!onIndex;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — cursor-zoom-out signals "click to dismiss" */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="fixed inset-0 cursor-zoom-out bg-bg-sunken/85 backdrop-blur-xl"
          />

          {/* Centering — top-aligned with generous top padding so the floating
              close button always clears the top of the viewport */}
          <div
            className={`relative flex min-h-full justify-center ${
              isPdf
                ? "items-start px-[5vw] pb-[5vw] pt-20 sm:px-[8vw] sm:pb-[8vw]"
                : "items-start p-4 pt-20 sm:px-8 sm:pb-8"
            }`}
          >
            {/* Relative wrapper anchors the floating close button */}
            <div
              className={`relative w-full ${
                isPdf ? "max-w-[980px]" : "max-w-[1100px]"
              }`}
            >
              {/* ── Close button — floats above the top-right corner of the
                  card, clear of Vimeo's top-right share menu ── */}
              <div className="absolute right-0 top-0 z-30 -translate-y-full pb-3">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="relative grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-bg/85 text-text-muted backdrop-blur-md transition-colors hover:border-white/30 hover:text-text"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  {/* ESC hint — fades after 2s */}
                  <AnimatePresence>
                    {escHint && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 text-[0.625rem] uppercase tracking-[0.14em] text-text-faint"
                      >
                        esc
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={item.title}
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.35, ease }}
                className="chrome-card relative z-10 w-full"
              >

                {/* ── Media area ─────────────────────────────────────────── */}
                <div
                  className="relative flex w-full items-center justify-center bg-black"
                  onPointerDown={() => setSoundHint(false)}
                >
                  <div
                    className={
                      isPdf
                        ? "h-[78vh] w-full"
                        : vertical
                          ? "mx-auto aspect-[9/16] h-[58vh] max-h-[560px] lg:h-[78vh] lg:max-h-[680px]"
                          : "aspect-video w-full"
                    }
                  >
                    {/* Loading skeleton — fades out once iframe signals load */}
                    <AnimatePresence>
                      {!iframeLoaded && src && (
                        <motion.div
                          key="skeleton"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 z-10 flex items-center justify-center bg-black"
                        >
                          <p className="animate-pulse text-sm text-text-faint">
                            Loading…
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {src && (
                      <iframe
                        key={src}
                        src={src}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                        onLoad={() => setIframeLoaded(true)}
                        onFocus={() => setSoundHint(false)}
                      />
                    )}
                  </div>

                  {/* H/V cut toggle — floats inside the video, top-left corner,
                      away from Vimeo's top-right controls */}
                  {hasBoth && (
                    <div className="absolute left-4 top-4 z-20 inline-flex gap-1 rounded-[var(--radius-btn)] border border-line-strong bg-bg/75 p-1 text-sm backdrop-blur">
                      {(["h", "v"] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCut(c)}
                          className={`rounded-[calc(var(--radius-btn)-2px)] px-3.5 py-1 transition-colors ${
                            cut === c
                              ? "bg-bg-raised text-text"
                              : "text-text-muted hover:text-text"
                          }`}
                        >
                          {c === "h" ? "Horizontal" : "Vertical"}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Sound hint pill — pointer-events-none so clicks pass to iframe */}
                  {!isPdf && (
                    <AnimatePresence>
                      {soundHint && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.3, ease }}
                          className="pointer-events-none absolute bottom-12 left-1/2 z-20 -translate-x-1/2 rounded-full border border-line-strong bg-bg/75 px-3.5 py-1.5 text-xs text-text-muted backdrop-blur"
                        >
                          🔊 Tap for sound
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Side arrows + page counter */}
                  {hasNav && (
                    <>
                      <NavArrow side="left" onClick={() => go(-1)} />
                      <NavArrow side="right" onClick={() => go(1)} />
                      <span className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-line-strong bg-bg/70 px-3 py-1 text-xs font-medium tracking-[0.08em] text-text-muted backdrop-blur">
                        {(index ?? 0) + 1}
                        <span className="text-text-faint"> / {items.length}</span>
                      </span>
                    </>
                  )}
                </div>

                {/* ── Meta panel ─────────────────────────────────────────── */}
                <div className="p-5 lg:p-6">
                  {/* "Watch on …" — escape hatch to native player quality/captions */}
                  {watchUrl && (
                    <p className="mb-3">
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[0.8125rem] text-text-faint underline-offset-4 transition-colors hover:text-text hover:underline"
                      >
                        {watchLabel} ↗
                      </a>
                    </p>
                  )}

                  {item.client && (
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-faint">
                      {item.client}
                    </p>
                  )}
                  <h2 className="mt-1 font-display text-xl font-medium tracking-tight text-text">
                    {item.title}
                  </h2>
                  {item.desc && (
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
                      {item.desc}
                    </p>
                  )}
                  {item.links && item.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.links.map((l) =>
                        l.external ? (
                          <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line-strong px-3.5 text-sm text-text transition-colors hover:bg-white/[0.04]"
                          >
                            {l.label} ↗
                          </a>
                        ) : (
                          <Link
                            key={l.label}
                            href={l.href}
                            className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line-strong px-3.5 text-sm text-text transition-colors hover:bg-white/[0.04]"
                          >
                            {l.label} →
                          </Link>
                        ),
                      )}
                    </div>
                  )}

                  {/* PDF rescue links — download and new-tab fallback */}
                  {isPdf && (
                    <div className="mt-4 flex gap-5">
                      <a
                        href={src}
                        download
                        className="text-sm text-text-faint underline-offset-4 transition-colors hover:text-text hover:underline"
                      >
                        Download ↓
                      </a>
                      <a
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-text-faint underline-offset-4 transition-colors hover:text-text hover:underline"
                      >
                        Open in new tab ↗
                      </a>
                    </div>
                  )}

                  {/* Bottom prev/next — always-visible click path, works even
                      after iframe captures keyboard focus */}
                  {hasNav && (
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                      <button
                        onClick={() => go(-1)}
                        className="text-[0.8125rem] text-text-faint transition-colors hover:text-text"
                      >
                        ← Previous
                      </button>
                      <span className="text-[0.8125rem] tabular-nums text-text-faint">
                        {(index ?? 0) + 1} / {items.length}
                      </span>
                      <button
                        onClick={() => go(1)}
                        className="text-[0.8125rem] text-text-faint transition-colors hover:text-text"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg/70 text-2xl text-text shadow-[0_10px_30px_-14px_oklch(0_0_0/0.85)] backdrop-blur transition-[transform,background] duration-300 ease-[var(--ease-out-quart)] hover:scale-110 hover:bg-bg/90 sm:grid sm:h-11 sm:w-11 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
