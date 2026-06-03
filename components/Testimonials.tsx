"use client";

import { useState } from "react";
import WorkLightbox from "./WorkLightbox";
import type { ResolvedWorkItem } from "@/lib/work";

// Social proof: short videos clients recorded about working with TP. Click to
// play in the shared work lightbox.
export default function Testimonials({ items }: { items: ResolvedWorkItem[] }) {
  const [active, setActive] = useState<ResolvedWorkItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t)}
            aria-label={`Play ${t.client} testimonial`}
            className="glass sweep group flex flex-col overflow-hidden rounded-2xl p-2.5 text-left"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.thumb}
                alt={`${t.client} on Temporary Perspective`}
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.8] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:brightness-100"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-bg/40 text-sm backdrop-blur transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
                  ▶
                </span>
              </span>
            </div>
            <div className="px-1.5 pb-1 pt-3.5">
              <p className="font-medium leading-snug">{t.client}</p>
              {t.desc && (
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  {t.desc}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      <WorkLightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}
