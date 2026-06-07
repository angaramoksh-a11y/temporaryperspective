"use client";

import Link from "next/link";
import { useState } from "react";
import { type ResolvedTestimonial } from "@/lib/work";
import TestimonialLightbox from "./TestimonialLightbox";

/**
 * Compact social-proof preview for /about.
 *
 * `linkMode` (default false) — when true, each card links directly to that
 * person's section on /testimonials instead of opening an inline lightbox.
 * Used on the /about page so that visitors land on the full testimonials page.
 */
export default function Testimonials({
  items,
  linkMode = false,
}: {
  items: ResolvedTestimonial[];
  linkMode?: boolean;
}) {
  const [active, setActive] = useState<ResolvedTestimonial | null>(null);

  const CardInner = ({ t }: { t: ResolvedTestimonial }) => (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.thumb}
          alt={`${t.name} on Temporary Perspective`}
          loading="lazy"
          className="h-full w-full object-cover brightness-[0.82] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:brightness-100"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-bg/40 backdrop-blur transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px fill-text" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1.5 pb-1 pt-3.5">
        <div>
          <p className="font-medium leading-snug">{t.name}</p>
          <p className="mt-0.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-text-faint">
            {t.role}
          </p>
        </div>
        <p className="text-sm italic leading-relaxed text-text-muted">
          &ldquo;{t.quote.split(". ")[0]}.&rdquo;
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm text-text-faint transition-colors group-hover:text-text">
          {linkMode ? "Read more" : "Watch"}
          <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </>
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) =>
          linkMode ? (
            <Link
              key={t.vimeoId}
              href={`/testimonials#${t.vimeoId}`}
              aria-label={`${t.name} testimonial`}
              className="glass sweep group flex flex-col overflow-hidden rounded-2xl p-2.5 text-left"
            >
              <CardInner t={t} />
            </Link>
          ) : (
            <button
              key={t.vimeoId}
              onClick={() => setActive(t)}
              aria-label={`Watch ${t.name} testimonial`}
              className="glass sweep group flex flex-col overflow-hidden rounded-2xl p-2.5 text-left"
            >
              <CardInner t={t} />
            </button>
          ),
        )}
      </div>

      <div className="mt-10">
        <Link
          href="/testimonials"
          className="group inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
        >
          See all testimonials
          <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {!linkMode && <TestimonialLightbox item={active} onClose={() => setActive(null)} />}
    </>
  );
}
