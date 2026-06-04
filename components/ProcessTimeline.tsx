"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { phases, type Phase } from "@/lib/work";
import { EdgeDivider } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;
const foundational = (p: Phase) => p.label === "Foundational";

function Strip({ active }: { active: string }) {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-16 z-30 border-y border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-stretch px-3 lg:px-6">
        {phases.map((p, i) => {
          const on = active === p.id;
          const gold = foundational(p);
          return (
            <div key={p.id} className="flex flex-1 items-center">
              <button
                onClick={() => go(p.id)}
                aria-current={on ? "true" : undefined}
                className="group flex flex-1 flex-col gap-1 px-2 py-3.5 text-left lg:px-3 lg:py-4"
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                      on
                        ? gold
                          ? "bg-gold"
                          : "bg-chrome"
                        : "bg-line-strong"
                    }`}
                  />
                  <span
                    className={`truncate text-[0.7rem] font-medium tracking-tight transition-colors duration-300 sm:text-sm ${
                      on ? "text-text" : "text-text-faint group-hover:text-text-muted"
                    }`}
                  >
                    {p.title}
                  </span>
                </span>
                <span
                  className={`hidden text-[0.8125rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 sm:block ${
                    gold ? "text-gold/80" : "text-text-faint"
                  } ${on ? "opacity-100" : "opacity-60"}`}
                >
                  {p.label}
                </span>
              </button>
              {i < phases.length - 1 && (
                <span aria-hidden className="h-px w-3 shrink-0 bg-line lg:w-5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const gold = foundational(phase);

  return (
    <section
      id={phase.id}
      className="relative flex min-h-[70vh] scroll-mt-32 items-center px-6 py-20 lg:px-10 lg:py-28"
    >
      {index > 0 && <EdgeDivider />}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease }}
        className="mx-auto w-full max-w-[1100px]"
      >
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

        <h2 className="mt-5 font-thunder text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.9] tracking-[-0.01em]">
          {phase.title}
        </h2>

        <p className="mt-6 max-w-2xl text-[clamp(1.125rem,1.9vw,1.5rem)] leading-[1.5] text-text-muted">
          {phase.detail}
        </p>

        {phase.link && (
          <Link
            href={phase.link.href}
            className="group mt-8 inline-flex items-center gap-1.5 text-text transition-colors hover:text-white"
          >
            {phase.link.label}
            <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </motion.div>
    </section>
  );
}

export default function ProcessTimeline() {
  const [active, setActive] = useState(phases[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );
    phases.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Strip active={active} />
      <div>
        {phases.map((p, i) => (
          <PhaseSection key={p.id} phase={p} index={i} />
        ))}
      </div>
    </>
  );
}
