"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { type ShowcaseTile } from "@/lib/work";
import Thumb from "./Thumb";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";

// A horizontal logo-slider of work tiles: a continuous, seamless loop that slows
// on hover, with soft gradient fades at both edges. Conveys quantity without
// overwhelming. Clicking a tile opens it in the shared lightbox. Under
// reduced-motion it falls back to a plain, static, scrollable row.
export default function WorkMarquee({
  tiles,
  ariaLabel = "Work showcase",
}: {
  tiles: ShowcaseTile[];
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState<number | null>(null);

  const items: LightboxItem[] = tiles.map((t) => ({
    title: t.title,
    client: t.guest,
    media: { kind: "youtube", id: t.id },
  }));

  function Tile({ t, i }: { t: ShowcaseTile; i: number }) {
    const alt = t.guest ? `${t.title}, ${t.guest}` : t.title;
    return (
      <figure className="w-[78vw] sm:w-[300px] lg:w-[340px]">
        <button
          onClick={() => setIndex(i % tiles.length)}
          aria-label={alt}
          className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-line"
        >
          <Thumb
            id={t.id}
            alt={alt}
            className="opacity-90 brightness-[0.8] transition-[filter,opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:opacity-100 group-hover:brightness-100"
          />
        </button>
        <figcaption className="mt-3 px-0.5">
          <p className="text-sm font-medium leading-snug text-text">{t.title}</p>
          {t.guest && (
            <p className="mt-0.5 text-xs text-text-faint">{t.guest}</p>
          )}
        </figcaption>
      </figure>
    );
  }

  const lightbox = (
    <MediaLightbox
      items={items}
      index={index}
      onClose={() => setIndex(null)}
      onIndex={setIndex}
    />
  );

  if (reduce) {
    return (
      <>
        <div
          aria-label={ariaLabel}
          className="scroll-row fade-x flex gap-4 overflow-x-auto px-6 pb-2 lg:px-10"
        >
          {tiles.map((t, i) => (
            <div key={t.id} className="shrink-0">
              <Tile t={t} i={i} />
            </div>
          ))}
        </div>
        {lightbox}
      </>
    );
  }

  // Two copies for a seamless -50% loop. Each item carries a trailing margin so
  // the seam gap matches the inter-tile gap exactly.
  const loop = [...tiles, ...tiles];
  return (
    <>
      <div className="marquee-viewport fade-x" aria-label={ariaLabel}>
        <ul className="marquee-track pb-2">
          {loop.map((t, i) => (
            <li key={i} className="shrink-0 pr-4">
              <Tile t={t} i={i} />
            </li>
          ))}
        </ul>
      </div>
      {lightbox}
    </>
  );
}
