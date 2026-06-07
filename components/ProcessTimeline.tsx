"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { phases, type Phase } from "@/lib/work";
import PhaseVisual from "./ProcessVisuals";

const ease = [0.16, 1, 0.3, 1] as const;
const foundational = (p: Phase) => p.label === "Foundational";

// Rail geometry — kept in one place so track, fill, and node offsets stay in sync.
const RAIL = {
  // Distance from the section's left edge to the left of the rail line.
  left: "left-[19px] lg:left-[27px]",
  // Rail width.
  width: "w-[2px]",
  // Card indent must clear the rail + a comfortable gap.
  indent: "pl-14 lg:pl-20",
  // Node's left offset centres it over the 2px rail (rail left + 1px − half node width).
  // node width = 14px (w-3.5), so: 19+1−7 = 13 → left-[13px]; lg: 27+1−7 = 21 → lg:left-[21px]
  nodeDot: "absolute left-[13px] top-2 lg:left-[21px]",
};

function TimelineNode({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const gold = foundational(phase);

  // Branding (foundational) is always considered in-view — it's the entry point.
  const scrollInView = useInView(ref, { once: true, amount: 0.3 });
  const inView = gold ? true : scrollInView;

  return (
    <div
      ref={ref}
      id={phase.id}
      className={`relative scroll-mt-28 ${RAIL.indent}`}
    >
      {/* node dot on the rail */}
      <span aria-hidden className={RAIL.nodeDot}>
        <motion.span
          initial={reduce || gold ? false : { scale: 0.4, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.5, ease }}
          className={`block h-3.5 w-3.5 rounded-full border-2 transition-colors duration-500 ${
            inView
              ? gold
                ? "border-gold bg-gold shadow-[0_0_20px_-1px_var(--color-gold,oklch(0.8_0.12_85))]"
                : "border-chrome bg-chrome shadow-[0_0_16px_-2px_oklch(0.85_0.03_240/0.8)]"
              : "border-line-strong bg-bg"
          }`}
        />
      </span>

      {/* card */}
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 36, scale: 0.985 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.7, ease }}
        className="glass sweep group overflow-hidden rounded-3xl p-6 lg:p-9"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* text */}
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] ${
                  gold ? "text-gold" : "text-text-faint"
                }`}
              >
                {gold && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                {phase.label}
              </span>
            </div>

            <h2 className="text-metal-static mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              {phase.title}
            </h2>

            <p className="mt-5 max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.55] text-text-muted">
              {phase.detail}
            </p>

            {phase.link && (
              <Link
                href={phase.link.href}
                className="group/link mt-7 inline-flex items-center gap-1.5 text-text transition-colors hover:text-white"
              >
                {phase.link.label}
                <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover/link:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </div>

          {/* visual */}
          <div className="min-w-0">
            <PhaseVisual phaseId={phase.id} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProcessTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div ref={trackRef} className="relative mx-auto max-w-[1100px]">
        {/* rail track (background) */}
        <span
          aria-hidden
          className={`absolute top-0 h-full ${RAIL.left} ${RAIL.width} bg-line`}
        />
        {/* rail fill — scroll-driven, starts from the top */}
        <motion.span
          aria-hidden
          style={reduce ? undefined : { scaleY: fillScale }}
          className={`absolute top-0 h-full origin-top ${RAIL.left} ${RAIL.width} bg-gradient-to-b from-white/70 via-chrome to-white/10`}
        />

        <div className="flex flex-col gap-16 lg:gap-24">
          {phases.map((p, i) => (
            <TimelineNode key={p.id} phase={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
