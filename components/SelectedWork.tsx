"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { embed, selectedWork, type Episode } from "@/lib/work";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";

export default function SelectedWork() {
  const [active, setActive] = useState<Episode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // drag-to-scroll
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: 0 });

  // arrow affordances: track whether there's more to scroll on each side
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

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
  const onMoveDrag = (e: React.PointerEvent) => {
    const el = rowRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => {
    drag.current.down = false;
  };

  // play the preview the moment the card is hovered, no hold on the still
  const enter = (id: string) => setHovered(id);
  const leave = () => setHovered(null);

  const open = (e: Episode) => {
    if (drag.current.moved > 6) return; // was a drag, not a click
    setActive(e);
    setHovered(null);
  };

  return (
    <section className="relative pt-14 pb-10 lg:pt-16 lg:pb-14">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-metal font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
              Some of our work
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Politics, fintech, and founder stories. Long-form conversations
              with the kind of guests who don&apos;t usually say yes, and the
              production behind them.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-2 pt-1 sm:flex">
            <ScrollArrow dir={-1} disabled={!canLeft} onClick={() => nudge(-1)} />
            <ScrollArrow dir={1} disabled={!canRight} onClick={() => nudge(1)} />
          </div>
        </div>
      </div>

      <div className="relative">
      <div
        ref={rowRef}
        onPointerDown={onDown}
        onPointerMove={onMoveDrag}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="scroll-row fade-x flex cursor-grab gap-4 overflow-x-auto px-6 pb-6 active:cursor-grabbing lg:pl-[7%] lg:pr-10"
      >
        {selectedWork.map((ep) => (
          <figure
            key={ep.id}
            className="glass sweep group w-[78vw] shrink-0 rounded-2xl p-2.5 sm:w-[420px] lg:w-[480px]"
            onMouseEnter={() => enter(ep.id)}
            onMouseLeave={leave}
          >
            <button
              onClick={() => open(ep)}
              aria-label={`${ep.guest}, ${ep.client}`}
              className="relative block aspect-video w-full overflow-hidden rounded-xl"
            >
              <Thumb
                id={ep.id}
                alt={`${ep.guest} on ${ep.client}`}
                className="opacity-90 brightness-[0.8] transition-[filter,opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:opacity-100 group-hover:brightness-100"
              />
              {hovered === ep.id && (
                <iframe
                  src={embed(ep.id, true, true)}
                  title={ep.guest}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                />
              )}
            </button>
            <figcaption className="px-1.5 pb-1 pt-3.5">
              <p className="font-medium leading-snug">{ep.guest}</p>
              <p className="mt-1 text-sm text-text-faint">{ep.client}</p>
            </figcaption>
          </figure>
        ))}

        {/* CTA tile — frosted glass with the light sweep */}
        <Link
          href="/portfolio"
          className="glass sweep group flex w-[78vw] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl sm:w-[420px] lg:w-[480px]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <span className="inline-flex items-center gap-2 font-display text-3xl font-light tracking-tight">
            Watch more work
            <span className="text-2xl transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </div>
      </div>{/* end relative wrapper */}

      <Lightbox
        episode={active}
        episodes={selectedWork}
        onClose={() => setActive(null)}
        onSelect={(e) => setActive(e)}
      />
    </section>
  );
}

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
      aria-label={dir === 1 ? "Scroll work right" : "Scroll work left"}
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
