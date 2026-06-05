"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  embed,
  vimeoEmbed,
  type Orientation,
  type VimeoClip,
} from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;

export type LightboxLink = {
  label: string;
  href: string;
  external?: boolean; // open in a new tab
};

// A lightbox plays one of three media kinds.
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

  useEffect(() => {
    if (item?.media.kind === "vimeo") setCut(item.media.h ? "h" : "v");
  }, [item]);

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
  if (item) {
    const m = item.media;
    isPdf = m.kind === "pdf";
    if (m.kind === "youtube") {
      src = embed(m.id, true, false, m.start);
      vertical = item.orientation === "vertical";
    } else if (m.kind === "vimeo") {
      hasBoth = !!m.h && !!m.v;
      const clip = (cut === "v" ? m.v : m.h) ?? m.h ?? m.v;
      src = clip ? vimeoEmbed(clip, { autoplay: true }) : "";
      vertical = cut === "v" && !!m.v ? true : item.orientation === "vertical";
    } else {
      src = m.src;
    }
  }

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-[oklch(0.02_0.003_264/0.95)] backdrop-blur-xl"
          />
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={item.title}
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className={`chrome-card relative z-10 w-full ${
                isPdf ? "max-w-[900px]" : "max-w-[1100px]"
              }`}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg/60 text-text-muted backdrop-blur transition-colors hover:text-text"
              >
                ✕
              </button>

              {/* media */}
              <div className="relative flex w-full items-center justify-center bg-black">
                <div
                  className={
                    isPdf
                      ? "h-[82vh] w-full"
                      : vertical
                        ? "mx-auto aspect-[9/16] h-[58vh] max-h-[560px] lg:h-[78vh] lg:max-h-[680px]"
                        : "aspect-video w-full"
                  }
                >
                  {src && (
                    <iframe
                      key={src}
                      src={src}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  )}
                </div>
                {items.length > 1 && onIndex && (
                  <>
                    <NavArrow side="left" onClick={() => go(-1)} />
                    <NavArrow side="right" onClick={() => go(1)} />
                    {/* count so it's obvious there's more than one doc to page */}
                    <span className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-line-strong bg-bg/70 px-3 py-1 text-xs font-medium tracking-[0.08em] text-text-muted backdrop-blur">
                      {(index ?? 0) + 1}
                      <span className="text-text-faint"> / {items.length}</span>
                    </span>
                  </>
                )}
              </div>

              {/* meta */}
              <div className="p-5 lg:p-6">
                {hasBoth && (
                  <div className="mb-4 inline-flex gap-1 rounded-[var(--radius-btn)] border border-line bg-bg-sunken p-1 text-sm">
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
