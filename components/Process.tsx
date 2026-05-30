"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { phases } from "@/lib/work";
import { GhostButton } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

function PhaseRow({
  phase,
  open,
  onToggle,
  index,
  first,
}: {
  phase: (typeof phases)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
  first: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      className={`sweep group/card relative ${
        first ? "" : "border-t border-line"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-7 py-6 text-left transition-colors duration-300 ease-[var(--ease-out-quart)] hover:bg-white/[0.025]"
      >
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-[clamp(1.375rem,2.2vw,1.9rem)] font-normal leading-[1.15] tracking-[-0.015em]">
            {phase.title}
          </h3>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-text-faint">
            {phase.label}
          </span>
        </span>
        <span
          className={`shrink-0 text-lg leading-none text-text-faint transition-transform duration-300 ease-[var(--ease-out-quart)] ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-quart)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-7 pb-7">
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-text-muted">
              {phase.body}
            </p>
            <Link
              href={`/process#${phase.id}`}
              className="group/link mt-4 inline-flex items-center gap-1.5 text-sm text-text-faint transition-colors hover:text-text"
            >
              More on this
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover/link:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const [openId, setOpenId] = useState<string | null>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, amount: 0.4 });

  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        {/* left — sticky framing */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light tracking-tight">
            The process.
          </h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-text-muted">
            Five phases. One foundational. Four per episode.
          </p>
          <GhostButton href="/process" className="mt-7">
            See the full process →
          </GhostButton>
        </motion.div>

        {/* right — connected accordion, all collapsed by default */}
        <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised/30">
          {phases.map((p, i) => (
            <PhaseRow
              key={p.id}
              phase={p}
              index={i}
              first={i === 0}
              open={openId === p.id}
              onToggle={() =>
                setOpenId((cur) => (cur === p.id ? null : p.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
