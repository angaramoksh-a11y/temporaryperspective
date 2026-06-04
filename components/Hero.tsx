"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GhostButton, Magnetic, PrimaryButton } from "./ui";
import HeroFilm from "./HeroFilm";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pb-16 pt-28 sm:pt-32 lg:justify-center lg:px-10 lg:py-24">
      {/* Hero-local stage. A near-black veil crushes the backdrop behind the
          headline so the H1 reads crisp full white and the silk noise calms.
          The whole group is masked to dissolve into the global silk at the top
          and bottom edges, so the veil reaches exactly the site backdrop where
          the hero meets the next section: no horizontal seam, no light streak.
          pointer-events-none, no animation. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 16%, #000 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 16%, #000 82%, transparent 100%)",
        }}
      >
        {/* uniform near-black veil (edges handled by the group mask) */}
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.02 0.003 264 / 0.9)" }}
        />
        {/* soft key bloom so the lit centre reads dimensional, not a flat fill;
            radial, so it falls off on its own with no edge of its own */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(115% 80% at 50% 42%, oklch(0.62 0.02 250 / 0.05), transparent 55%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:gap-14">
        {/* text column */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
          className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
        >
          {/* proof line */}
          <motion.div variants={rise}>
            <Link
              href="/case-studies"
              className="glass edge-gradient sweep group relative inline-flex items-center gap-2 rounded-full py-1.5 pl-4 pr-3 text-sm text-text-muted transition-colors hover:text-text"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-3 -z-10 rounded-full opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-70"
                style={{
                  background:
                    "radial-gradient(closest-side, oklch(0.99 0.002 264 / 0.18), oklch(0.99 0.002 264 / 0))",
                }}
              />
              See case studies
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>

          {/* headline — metallic breathing chrome (the studio's display signature) */}
          <motion.h1
            variants={rise}
            className="text-metal mt-8 text-balance pb-2 font-display text-[clamp(2.5rem,4vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.02em]"
          >
            <span className="block">You&apos;ve built the conversation.</span>
            <span className="block">We build the stage.</span>
          </motion.h1>

          {/* sub-headline */}
          <motion.p
            variants={rise}
            className="mt-7 max-w-lg text-lg leading-relaxed text-text-muted"
          >
            Cinema-grade podcasts for India&apos;s hardest-to-book guests — shot,
            edited, and live in under a week.
          </motion.p>

          {/* buttons */}
          <motion.div
            variants={rise}
            className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
          >
            <Magnetic className="w-full sm:w-auto">
              <PrimaryButton href="/contact" size="lg" className="w-full sm:w-auto">
                Book a call
              </PrimaryButton>
            </Magnetic>
            <GhostButton href="/portfolio" size="lg" className="w-full sm:w-auto">
              See our work
            </GhostButton>
          </motion.div>
        </motion.div>

        {/* film — on top + centred on mobile (re-layout), beside the text at lg.
            Capped width on small screens so the 16:9 card never balloons. */}
        <div className="order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:mx-0 lg:max-w-none">
          <HeroFilm id="1197960218" caption="The studio, in 60 seconds." />
        </div>
      </div>
    </section>
  );
}
