"use client";

import { useState } from "react";
import { embed, type Episode, type FormatBlock } from "@/lib/work";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";
import { EdgeDivider, SectionLabel } from "./ui";

function Tile({
  ep,
  onOpen,
}: {
  ep: Episode;
  onOpen: (ep: Episode) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <figure
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => onOpen(ep)}
        aria-label={`${ep.guest}, ${ep.client}`}
        className="relative block aspect-video w-full overflow-hidden rounded-xl border border-line"
      >
        <Thumb
          id={ep.id}
          alt={`${ep.guest} on ${ep.client}`}
          className="opacity-90 brightness-[0.8] transition-[filter,opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:opacity-100 group-hover:brightness-100"
        />
        {hovered && (
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
  );
}

export default function ByFormat({ blocks }: { blocks: FormatBlock[] }) {
  const [active, setActive] = useState<Episode | null>(null);
  const all = blocks.flatMap((b) => b.tiles);

  return (
    <>
      <section className="relative py-20 lg:py-24">
        <EdgeDivider />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>What we do, by format</SectionLabel>
          <div className="mt-12 space-y-16 lg:space-y-20">
            {blocks.map((block) => (
              <div key={block.heading}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-normal tracking-tight">
                    {block.heading}
                  </h3>
                  <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                    {block.label}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-text-muted">
                  {block.body}
                </p>
                <div
                  className={`mt-7 grid gap-4 lg:gap-6 ${
                    block.tiles.length === 1
                      ? "max-w-[860px]"
                      : "sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {block.tiles.map((ep) => (
                    <Tile key={ep.id} ep={ep} onOpen={setActive} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        episode={active}
        episodes={all}
        onClose={() => setActive(null)}
        onSelect={(e) => setActive(e)}
      />
    </>
  );
}
