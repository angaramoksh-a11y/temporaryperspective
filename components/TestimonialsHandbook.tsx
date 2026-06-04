"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Credential } from "@/lib/work";
import MediaLightbox, {
  type LightboxItem,
  type LightboxMedia,
} from "./MediaLightbox";
import { CredChips } from "./testimonialBits";

const ease = [0.16, 1, 0.3, 1] as const;

export type PItem = {
  label: string;
  media?: LightboxMedia;
  href?: string;
  external?: boolean;
  placeholder?: boolean;
};
export type HandbookGroup = { heading?: string; items: PItem[] };
export type HandbookRow = {
  vimeoId: string;
  client: string;
  name: string;
  note?: string;
  role: string;
  quote: string;
  credentials: Credential[];
  caseStudy?: string;
  groups: HandbookGroup[];
  thumb: string;
};

export default function TestimonialsHandbook({ rows }: { rows: HandbookRow[] }) {
  const reduce = useReducedMotion();
  const [lb, setLb] = useState<{ items: LightboxItem[]; index: number } | null>(
    null,
  );

  const openCover = (row: HandbookRow) =>
    setLb({
      items: [
        {
          title: row.name,
          client: row.client,
          media: { kind: "vimeo", h: { id: row.vimeoId } },
        },
      ],
      index: 0,
    });

  const openProject = (row: HandbookRow, item: PItem) => {
    const media = row.groups.flatMap((g) => g.items).filter((i) => i.media);
    const items: LightboxItem[] = media.map((i) => ({
      title: i.label,
      client: row.client,
      media: i.media!,
    }));
    const index = Math.max(
      0,
      media.findIndex((i) => i === item),
    );
    setLb({ items, index });
  };

  return (
    <section className="relative pb-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 lg:gap-8 lg:px-10">
        {rows.map((row, i) => (
          <motion.article
            key={row.vimeoId}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease, delay: Math.min(i, 2) * 0.04 }}
            className="glass sweep group rounded-2xl p-3 sm:p-4 lg:grid lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:p-5"
          >
            {/* cover video */}
            <button
              onClick={() => openCover(row)}
              aria-label={`Play ${row.name} testimonial`}
              className="relative block aspect-video w-full overflow-hidden rounded-xl border border-line bg-bg-sunken"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={row.thumb}
                alt={`${row.name} on Temporary Perspective`}
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.82] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:brightness-100"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-bg/40 backdrop-blur transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-px fill-text" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>

            {/* content */}
            <div className="mt-4 flex flex-col lg:mt-0 lg:justify-center">
              <h2 className="font-display text-xl font-medium tracking-tight text-text">
                {row.name}
                {row.note && (
                  <span className="ml-2 text-sm font-normal text-text-faint">
                    {row.note}
                  </span>
                )}
              </h2>
              <p className="mt-1 text-sm text-text-faint">{row.role}</p>

              {row.credentials.length > 0 && (
                <div className="mt-3">
                  <CredChips items={row.credentials} />
                </div>
              )}

              <p className="mt-4 text-[0.95rem] italic leading-relaxed text-text-muted">
                “{row.quote}”
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {row.caseStudy && (
                  <Link
                    href={row.caseStudy}
                    className="sweep inline-flex h-9 w-fit items-center rounded-[var(--radius-btn)] border border-line-strong px-3.5 text-sm font-medium transition-colors hover:bg-white/[0.04]"
                  >
                    View case study →
                  </Link>
                )}

                {row.groups.map((g, gi) => (
                  <div key={gi}>
                    {g.heading && (
                      <p className="mb-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-text-faint">
                        {g.heading}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((it) => {
                        const cls = `inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs transition-colors hover:border-white/30 hover:text-text ${
                          it.placeholder ? "text-text-faint" : "text-text-muted"
                        }`;
                        if (it.media) {
                          return (
                            <button
                              key={it.label}
                              onClick={() => openProject(row, it)}
                              title={it.placeholder ? "Placeholder, to be updated" : undefined}
                              className={cls}
                            >
                              {it.label}
                            </button>
                          );
                        }
                        return it.external ? (
                          <a
                            key={it.label}
                            href={it.href}
                            target="_blank"
                            rel="noreferrer"
                            className={cls}
                          >
                            {it.label} ↗
                          </a>
                        ) : (
                          <Link key={it.label} href={it.href ?? "#"} className={cls}>
                            {it.label} →
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <MediaLightbox
        items={lb?.items ?? []}
        index={lb ? lb.index : null}
        onClose={() => setLb(null)}
        onIndex={(i) => setLb((l) => (l ? { ...l, index: i } : l))}
      />
    </section>
  );
}
