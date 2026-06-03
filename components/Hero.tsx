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
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Hero-local stage. The global silk keeps framing the space above and
          below the centred row, but through the middle band we crush the
          backdrop toward near-black — that both deepens the lit-room look and
          calms the silk's noise behind the text so the H1 reads crisp full
          white. Faded top and bottom so the silk reappears at the seams. All
          pointer-events-none, GPU-only motion, killed under reduced-motion. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* near-black deepening band through the vertical centre */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, oklch(0.02 0.003 264 / 0.86) 26%, oklch(0.02 0.003 264 / 0.9) 50%, oklch(0.02 0.003 264 / 0.86) 74%, transparent 100%)",
          }}
        />
        {/* floor beam — long, heavily blurred streak raking the lower scene,
            a faint horizon so the dark reads as a lit surface, not a flat fill */}
        <div
          className="bg-floorbeam absolute bottom-[2%] left-1/2 h-[36vh] w-[155vw] rounded-[50%]"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.7 0.025 250 / 0.18), transparent 70%)",
            filter: "blur(64px)",
          }}
        />
        {/* corner vignette — keeps the lit centre dimensional */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(135% 100% at 50% 30%, transparent 40%, oklch(0.02 0.003 264 / 0.5) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.05fr_1.25fr] lg:gap-16 lg:px-10">
        {/* text column */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
          className="flex flex-col items-start text-left"
        >
          {/* proof line */}
          <motion.div variants={rise}>
            <Link
              href="/work"
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
              100+ episodes shipped
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={rise}
            className="mt-8 font-display text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.05] tracking-[-0.02em] text-text"
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
            className="mt-10 flex flex-wrap items-center justify-start gap-3"
          >
            <Magnetic>
              <PrimaryButton href="/contact" size="lg">
                Book a call
              </PrimaryButton>
            </Magnetic>
            <GhostButton href="/work" size="lg">
              See our work
            </GhostButton>
          </motion.div>
        </motion.div>

        {/* film */}
        <HeroFilm id="1197960218" caption="The studio, in 60 seconds." />
      </div>
    </section>
  );
}
