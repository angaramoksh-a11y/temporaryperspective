"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { embed, workLibrary, type Episode } from "@/lib/work";
import { EdgeDivider } from "./ui";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

function Tile({
  ep,
  col,
  hovered,
  onHover,
  onOpen,
}: {
  ep: Episode;
  col: number;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onOpen: (ep: Episode) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      // tiles in the same row cascade left-to-right; rows reveal as they scroll in
      transition={{ duration: 0.5, ease, delay: col * 0.05 }}
      className="group"
      onMouseEnter={() => onHover(ep.id)}
      onMouseLeave={() => onHover(null)}
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
            // scaled slightly past the frame so YouTube's residual title
            // strip is clipped — only the footage shows
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.2]"
          />
        )}
      </button>
      <figcaption className="mt-3 px-0.5">
        <p className="text-sm font-medium leading-snug">{ep.guest}</p>
        <p className="mt-0.5 text-xs text-text-faint">{ep.client}</p>
      </figcaption>
    </motion.figure>
  );
}

export default function WorkGrid() {
  const [active, setActive] = useState<Episode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative pb-24 pt-20 lg:pb-28 lg:pt-24">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {workLibrary.map((ep, i) => (
            <Tile
              key={ep.id}
              ep={ep}
              col={i % 4}
              hovered={hovered === ep.id}
              onHover={setHovered}
              onOpen={(e) => {
                setActive(e);
                setHovered(null);
              }}
            />
          ))}
        </div>
      </div>

      <Lightbox
        episode={active}
        episodes={workLibrary}
        onClose={() => setActive(null)}
        onSelect={(e) => setActive(e)}
      />
    </section>
  );
}
