"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { caseStudies, vimeo } from "@/lib/work";
import { EdgeDivider, SectionLabel } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = caseStudies[active];
  const pill = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };

  return (
    <section className="relative py-24 lg:py-32">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel>Testimonials</SectionLabel>
        <h2 className="mt-5 max-w-md font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.1] tracking-tight">
          What our clients say about us.
        </h2>

        {/* one card: stacks on mobile, video + controls side-by-side on desktop */}
        <div className="glass mt-10 w-full rounded-2xl p-3 sm:p-4 lg:grid lg:grid-cols-[1.45fr_1fr] lg:gap-6 lg:p-5">
          {/* video */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-bg-sunken">
            <motion.iframe
              key={current.vimeoId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.5, ease }}
              src={vimeo(current.vimeoId)}
              title={current.client}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* controls — below the video on mobile, beside it on desktop */}
          <div className="mt-4 flex flex-col lg:mt-0 lg:justify-between">
            <div>
              {/* morphing segmented control */}
              <div
                role="tablist"
                aria-label="Choose a client"
                className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-bg-sunken p-1"
              >
                {caseStudies.map((c, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={c.client}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActive(i)}
                      className="relative rounded-lg px-2 py-2.5 text-center"
                    >
                      {selected && (
                        <motion.span
                          layoutId="testimonial-pill"
                          transition={pill}
                          className="absolute inset-0 rounded-lg border border-line-strong bg-bg-raised shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08)]"
                        />
                      )}
                      <span
                        className={`relative z-10 text-xs font-medium tracking-tight transition-colors duration-300 sm:text-sm ${
                          selected ? "text-text" : "text-text-muted"
                        }`}
                      >
                        {c.client}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* result */}
              <motion.div
                key={current.client}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, ease }}
                className="px-1 pt-5 lg:pt-6"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-faint">
                  {current.tag}
                  {current.status ? ` · ${current.status}` : ""}
                </p>
                <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-text-muted lg:text-base">
                  {current.result}
                </p>
              </motion.div>
            </div>

            {/* constant button */}
            <Link
              href={current.href}
              className="sweep group mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-line-strong font-medium text-text transition-colors duration-300 ease-[var(--ease-out-quart)] hover:border-white/30 hover:bg-white/[0.03] lg:mt-0"
            >
              View full case study
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
