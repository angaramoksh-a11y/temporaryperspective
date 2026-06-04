"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  embed,
  watch,
  vimeoEmbed,
  vimeoLink,
  type ResolvedWorkItem,
  type VimeoClip,
} from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;

export default function WorkLightbox({
  items,
  active,
  onSelect,
  onClose,
}: {
  items: ResolvedWorkItem[];
  active: ResolvedWorkItem | null;
  onSelect: (it: ResolvedWorkItem) => void;
  onClose: () => void;
}) {
  // which cut is playing, for clips that ship both horizontal + vertical
  const [cut, setCut] = useState<"h" | "v">("h");

  useEffect(() => {
    setCut(active?.h ? "h" : "v");
  }, [active]);

  const index = active ? items.findIndex((i) => i.key === active.key) : -1;
  const go = useCallback(
    (dir: 1 | -1) => {
      if (index < 0 || items.length < 2) return;
      onSelect(items[(index + dir + items.length) % items.length]);
    },
    [index, items, onSelect],
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, onClose, go]);

  const hasBoth = !!(active?.h && active?.v);
  const clip: VimeoClip | undefined = active
    ? (cut === "v" ? active.v : active.h) ?? active.h ?? active.v
    : undefined;
  const vertical =
    cut === "v" && !!active?.v ? true : active?.orientation === "vertical";
  const src = active
    ? active.source === "vimeo" && clip
      ? vimeoEmbed(clip, { autoplay: true })
      : active.yt
        ? embed(active.yt, true)
        : ""
    : "";

  const title = active ? active.title ?? active.desc ?? active.client : "";
  const rest = items.filter((i) => active && i.key !== active.key);

  // shared bits ------------------------------------------------------------
  const meta = active && (
    <>
      {hasBoth && (
        <div className="mb-4 inline-flex gap-1 rounded-full border border-line bg-bg-sunken p-1 text-sm">
          {(["h", "v"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCut(c)}
              className={`rounded-full px-3.5 py-1 transition-colors ${
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
      <p className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
        {active.client} · {active.format}
      </p>
      <h2 className="mt-2 font-display text-xl font-medium leading-snug tracking-tight text-text">
        {title}
      </h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {active.source === "vimeo" && clip ? (
          <a
            href={vimeoLink(clip)}
            target="_blank"
            rel="noreferrer"
            className="sweep inline-flex h-10 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
          >
            Watch on Vimeo →
          </a>
        ) : active.yt ? (
          <a
            href={watch(active.yt)}
            target="_blank"
            rel="noreferrer"
            className="sweep inline-flex h-10 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
          >
            Watch on YouTube →
          </a>
        ) : null}
        {active.caseStudy && (
          <Link
            href={active.caseStudy}
            className="sweep inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-white/[0.04]"
          >
            Case study →
          </Link>
        )}
      </div>
    </>
  );

  const player = active && (
    <div className="relative flex items-center justify-center bg-black">
      <div
        className={
          vertical
            ? "mx-auto aspect-[9/16] h-[58vh] max-h-[560px] lg:h-[78vh] lg:max-h-[660px]"
            : "aspect-video w-full"
        }
      >
        {src && (
          <iframe
            key={src}
            src={src}
            title={`${active.client}, ${active.format}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        )}
      </div>
      {items.length > 1 && (
        <>
          <NavArrow side="left" onClick={() => go(-1)} />
          <NavArrow side="right" onClick={() => go(1)} />
        </>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {active && (
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
            className="fixed inset-0 cursor-default bg-bg-sunken/80 backdrop-blur-xl"
          />
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.client}, ${active.format}`}
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className={
                vertical
                  ? "chrome-card relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden lg:w-auto lg:max-w-[840px] lg:flex-row lg:items-stretch"
                  : "chrome-card relative z-10 flex max-h-[92vh] w-full max-w-[1060px] flex-col overflow-hidden"
              }
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg/60 text-text-muted backdrop-blur transition-colors hover:text-text"
              >
                ✕
              </button>

              {vertical ? (
                // vertical: tall player hugs the left, browse-more rail right
                <>
                  <div className="shrink-0 bg-black lg:flex lg:flex-none lg:items-stretch">
                    {player}
                  </div>
                  <div className="flex w-full min-w-0 flex-col lg:w-[340px] lg:shrink-0 lg:border-l lg:border-line">
                    <div className="p-5 lg:p-6">{meta}</div>
                    {rest.length > 0 && (
                      <BrowseMore
                        rest={rest}
                        onSelect={onSelect}
                        layout="rail"
                      />
                    )}
                  </div>
                </>
              ) : (
                // horizontal: wide player, then meta, then a browse-more strip
                <div className="flex min-h-0 flex-col overflow-y-auto">
                  {player}
                  <div className="p-5 lg:p-6">{meta}</div>
                  {rest.length > 0 && (
                    <BrowseMore rest={rest} onSelect={onSelect} layout="strip" />
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BrowseMore({
  rest,
  onSelect,
  layout,
}: {
  rest: ResolvedWorkItem[];
  onSelect: (it: ResolvedWorkItem) => void;
  layout: "rail" | "strip";
}) {
  const rail = layout === "rail";
  return (
    <div
      className={
        rail
          ? "flex min-h-0 flex-1 flex-col border-t border-line px-5 pb-5 pt-4 lg:px-6"
          : "border-t border-line px-5 pb-5 pt-4 lg:px-6"
      }
    >
      <p className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
        Browse more
      </p>
      <div
        className={
          rail
            ? "mt-3 flex min-h-0 flex-1 gap-3 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:pr-1"
            : "mt-3 flex gap-3 overflow-x-auto pb-1"
        }
      >
        {rest.map((it) => (
          <button
            key={it.key}
            onClick={() => onSelect(it)}
            aria-label={`Play ${it.client}, ${it.format}`}
            className={
              rail
                ? "group flex w-[220px] shrink-0 items-center gap-3 rounded-lg p-1.5 text-left transition-colors hover:bg-white/[0.04] lg:w-full"
                : "group w-[160px] shrink-0 text-left"
            }
          >
            <span
              className={`relative shrink-0 overflow-hidden rounded-md border border-line bg-bg-sunken ${
                rail
                  ? it.orientation === "vertical"
                    ? "aspect-[9/16] w-12"
                    : "aspect-video w-24"
                  : it.orientation === "vertical"
                    ? "block aspect-[9/16] w-[88px]"
                    : "block aspect-video w-full"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.thumb}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.8] transition-[filter] duration-300 group-hover:brightness-100"
              />
            </span>
            <span
              className={
                rail
                  ? "hidden min-w-0 flex-1 lg:block"
                  : "mt-2 block min-w-0"
              }
            >
              <span className="block truncate text-sm text-text">
                {it.title ?? it.desc ?? it.client}
              </span>
              <span className="block truncate text-xs text-text-faint">
                {it.client} · {it.format}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
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
      className={`absolute top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/55 text-lg text-text-muted backdrop-blur transition-colors hover:text-text sm:grid sm:h-10 sm:w-10 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
