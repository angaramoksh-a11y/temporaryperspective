"use client";

import { useState } from "react";
import { embed, selectedWork, type Episode } from "@/lib/work";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";

export default function WorkGrid() {
  const [active, setActive] = useState<Episode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative pb-24 lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {selectedWork.map((ep) => (
            <figure
              key={ep.id}
              className="group"
              onMouseEnter={() => setHovered(ep.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <button
                onClick={() => setActive(ep)}
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
                    className="pointer-events-none absolute inset-0 h-full w-full scale-[1.2]"
                  />
                )}
              </button>
              <figcaption className="mt-3 px-0.5">
                <p className="text-sm font-medium leading-snug">{ep.guest}</p>
                <p className="mt-0.5 text-xs text-text-faint">{ep.client}</p>
              </figcaption>
            </figure>
          ))}
        </div>
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
