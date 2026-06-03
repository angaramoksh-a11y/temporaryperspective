"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { caseStudies } from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;

const bg = (id: string) =>
  `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&dnt=1`;
const full = (id: string) =>
  `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0`;

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const current = caseStudies[active];
  const pill = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };

  // switching client resets to the muted in-view preview
  useEffect(() => {
    setPlaying(false);
  }, [active]);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <h2 className="text-metal-static font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
          The people we make it for.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
          We&apos;d rather you hear it from them: real clients on what changed
          once the production stopped getting in the way of the conversation.
        </p>

        {/* one card: stacks on mobile, video + controls side-by-side on desktop.
            A low green ambient light travels around its rim. */}
        <div className="glass rim-glow mt-10 w-full rounded-2xl p-3 sm:p-4 lg:grid lg:grid-cols-[1.45fr_1fr] lg:gap-6 lg:p-5">
          {/* video — muted autoplay once in view, full sound on click */}
          <button
            ref={ref}
            onClick={() => setPlaying(true)}
            aria-label={`Play ${current.client} testimonial with sound`}
            className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-line bg-bg-sunken"
          >
            {(inView || playing) && (
              <iframe
                key={`${current.vimeoId}-${playing}`}
                src={playing ? full(current.vimeoId) : bg(current.vimeoId)}
                title={current.client}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className={`absolute inset-0 h-full w-full ${playing ? "" : "pointer-events-none"}`}
              />
            )}
            {!playing && (
              <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/60 px-3 py-1.5 text-xs text-text-muted backdrop-blur transition-colors group-hover:text-text">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 translate-x-px fill-text" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Tap for sound
              </span>
            )}
          </button>

          {/* controls — below the video on mobile, beside it on desktop */}
          <div className="mt-4 flex flex-col lg:mt-0 lg:justify-between">
            <div>
              {/* morphing segmented control, green active */}
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
                <p className="text-sm font-medium tracking-tight text-text-faint">
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
