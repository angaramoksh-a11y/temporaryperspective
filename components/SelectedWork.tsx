"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { embed, selectedWork, type Episode } from "@/lib/work";
import { EdgeDivider } from "./ui";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";

export default function SelectedWork() {
  const [active, setActive] = useState<Episode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // drag-to-scroll
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: 0 });

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
    <section className="relative py-24 lg:py-28">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light tracking-tight">
            Some of our work
          </h2>
        </div>
      </div>

      <div
        ref={rowRef}
        onPointerDown={onDown}
        onPointerMove={onMoveDrag}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="scroll-row fade-x flex cursor-grab gap-4 overflow-x-auto px-6 pb-2 active:cursor-grabbing lg:px-10"
      >
        {selectedWork.map((ep) => (
          <figure
            key={ep.id}
            className="group w-[78vw] shrink-0 sm:w-[420px] lg:w-[480px]"
            onMouseEnter={() => enter(ep.id)}
            onMouseLeave={leave}
          >
            <button
              onClick={() => open(ep)}
              aria-label={`${ep.guest}, ${ep.client}`}
              className="relative block aspect-video w-full overflow-hidden rounded-xl border border-line"
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
            <figcaption className="mt-4 px-0.5">
              <p className="font-medium leading-snug">{ep.guest}</p>
              <p className="mt-1 text-sm text-text-faint">{ep.client}</p>
            </figcaption>
          </figure>
        ))}

        {/* CTA tile */}
        <Link
          href="/work"
          className="sweep group flex w-[78vw] shrink-0 flex-col items-center justify-center gap-3 rounded-xl border border-line-strong bg-bg-raised/40 sm:w-[420px] lg:w-[480px]"
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

      <Lightbox
        episode={active}
        episodes={selectedWork}
        onClose={() => setActive(null)}
        onSelect={(e) => setActive(e)}
      />
    </section>
  );
}
