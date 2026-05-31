"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { caseStudies, vimeo } from "@/lib/work";
import { EdgeDivider, SectionLabel } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const current = caseStudies[active];

  return (
    <section className="relative py-24 lg:min-h-[100svh] lg:py-32">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel>Testimonials</SectionLabel>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1400px] flex-col gap-12 px-6 lg:mt-10 lg:grid lg:grid-cols-[0.36fr_0.64fr] lg:items-start lg:gap-20 lg:px-10">
        {/* left — picker */}
        <div>
          <h2 className="max-w-sm font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.1] tracking-tight">
            What our clients say about us.
          </h2>

          {/* mobile: horizontal tabs / desktop: vertical rail */}
          <div className="mt-9 flex gap-2 overflow-x-auto pb-1 lg:mt-10 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {caseStudies.map((c, i) => {
              const selected = i === active;
              return (
                <button
                  key={c.client}
                  onClick={() => setActive(i)}
                  className="group relative shrink-0 text-left lg:py-3.5"
                >
                  {selected && (
                    <motion.span
                      layoutId="case-rail"
                      transition={{ duration: 0.4, ease }}
                      className="absolute -left-5 top-1/2 hidden h-7 w-[2px] -translate-y-1/2 rounded-full bg-chrome lg:block"
                      style={{
                        boxShadow: "0 0 10px 0 oklch(0.99 0.002 264 / 0.5)",
                      }}
                    />
                  )}
                  <span
                    className={`font-display text-2xl font-light tracking-tight transition-colors duration-300 lg:text-[1.9rem] ${
                      selected
                        ? "text-text"
                        : "text-text-faint group-hover:text-text-muted"
                    }`}
                  >
                    {c.client}
                  </span>
                  {c.status && (
                    <span className="ml-3 align-middle font-mono text-[0.6rem] uppercase tracking-[0.18em] text-text-faint">
                      {c.status}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* right — player + content */}
        <div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-bg-sunken">
            <motion.iframe
              key={current.vimeoId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              src={vimeo(current.vimeoId)}
              title={current.client}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <motion.div
            key={current.client}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mt-7"
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-faint">
              {current.tag}
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              {current.result}
            </p>
            <Link
              href={current.href}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm text-text transition-colors hover:text-text"
            >
              View full case study
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
