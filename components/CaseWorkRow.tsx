"use client";

import { useRef, useState } from "react";
import { embed, type Episode } from "@/lib/work";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";

// Drag-to-scroll horizontal row of hover-preview tiles, same language as the
// home "Some of our work" rail. Click opens the shared lightbox.
export default function CaseWorkRow({ episodes }: { episodes: Episode[] }) {
  const [active, setActive] = useState<Episode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: 0 });

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
  const onUp = () => {
    drag.current.down = false;
  };

  const open = (ep: Episode) => {
    if (drag.current.moved > 6) return;
    setActive(ep);
    setHovered(null);
  };

  return (
    <>
      <div
        ref={rowRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="scroll-row fade-x flex cursor-grab gap-4 overflow-x-auto px-6 pb-2 active:cursor-grabbing lg:px-10"
      >
        {episodes.map((ep) => (
          <figure
            key={ep.id}
            className="group w-[72vw] shrink-0 sm:w-[360px] lg:w-[400px]"
            onMouseEnter={() => setHovered(ep.id)}
            onMouseLeave={() => setHovered(null)}
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
            <figcaption className="mt-3 px-0.5 text-sm font-medium leading-snug">
              {ep.guest}
            </figcaption>
          </figure>
        ))}
      </div>

      <Lightbox
        episode={active}
        episodes={episodes}
        onClose={() => setActive(null)}
        onSelect={(e) => setActive(e)}
      />
    </>
  );
}
