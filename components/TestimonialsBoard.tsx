"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  testimonialCategories,
  type ResolvedTestimonial,
  type TestimonialCategory,
} from "@/lib/work";
import { SectionLabel } from "./ui";
import { CredChips, ProjectLinks } from "./testimonialBits";
import TestimonialLightbox from "./TestimonialLightbox";

const ease = [0.16, 1, 0.3, 1] as const;

function PlayBadge() {
  return (
    <span className="absolute inset-0 grid place-items-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-bg/40 backdrop-blur transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-px fill-text" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}

function Poster({
  t,
  onOpen,
}: {
  t: ResolvedTestimonial;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      aria-label={`Play ${t.name} testimonial`}
      className="relative block aspect-video w-full overflow-hidden rounded-xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={t.thumb}
        alt={`${t.name} on Temporary Perspective`}
        loading="lazy"
        className="h-full w-full object-cover brightness-[0.82] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:brightness-100"
      />
      <PlayBadge />
    </button>
  );
}

function Meta({ t }: { t: ResolvedTestimonial }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium leading-[1.05] tracking-tight">
          {t.name}
          {t.note && (
            <span className="ml-2 align-middle text-base font-normal text-text-faint">
              {t.note}
            </span>
          )}
        </h3>
        <p className="mt-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
          {t.role}
        </p>
      </div>
      <CredChips items={t.credentials} />
      <p className="font-display text-[clamp(1.125rem,1.5vw,1.4rem)] italic leading-relaxed text-text">
        “{t.quote}”
      </p>
      <ProjectLinks items={t.projects} />

      {t.transcript.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="group/t inline-flex items-center gap-1.5 text-sm text-text-faint transition-colors hover:text-text"
          >
            {open ? "Hide transcript" : "Read full transcript"}
            <span
              className={`transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                open ? "rotate-90" : "group-hover/t:translate-x-1"
              }`}
            >
              →
            </span>
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-[400ms] ease-[var(--ease-out-quart)]"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="max-w-prose space-y-3 pt-4 text-sm leading-relaxed text-text-muted">
                {t.transcript.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function card(reduce: boolean) {
  return {
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease },
  } as const;
}

export default function TestimonialsBoard({
  items,
}: {
  items: ResolvedTestimonial[];
}) {
  const [active, setActive] = useState<ResolvedTestimonial | null>(null);
  const byCat = (c: TestimonialCategory) => items.filter((t) => t.category === c);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {testimonialCategories.map((cat) => {
          const group = byCat(cat);
          if (!group.length) return null;
          const split = cat !== "Creators";
          return (
            <div key={cat} className="pt-20 first:pt-12 lg:pt-28">
              <SectionLabel>{cat}</SectionLabel>
              {split ? (
                <div
                  className={`mt-8 flex flex-col gap-8 ${
                    cat === "Podcasters & B2B" ? "lg:max-w-[86%]" : ""
                  }`}
                >
                  {group.map((t) => (
                    <motion.article
                      key={t.vimeoId}
                      {...card(false)}
                      className="glass sweep group grid gap-1 overflow-hidden rounded-2xl p-2.5 transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 lg:grid-cols-2 lg:gap-6 lg:p-3"
                    >
                      <Poster t={t} onOpen={() => setActive(t)} />
                      <div className="flex flex-col justify-center gap-4 px-3 py-5 lg:px-4">
                        <Meta t={t} />
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {group.map((t) => (
                    <motion.article
                      key={t.vimeoId}
                      {...card(false)}
                      className="glass sweep group flex flex-col gap-1 overflow-hidden rounded-2xl p-2.5 transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1"
                    >
                      <Poster t={t} onOpen={() => setActive(t)} />
                      <div className="flex flex-1 flex-col gap-3.5 px-3 py-4">
                        <Meta t={t} />
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <TestimonialLightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
