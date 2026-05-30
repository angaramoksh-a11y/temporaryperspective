"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GhostButton, PrimaryButton } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* moving texture: two faint blobs drift slowly so the dark stays alive.
          Whisper-subtle, GPU-only (transform), killed under reduced-motion. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="bg-drift-a absolute left-[14%] top-[16%] h-[72vh] w-[72vh] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.26 0.012 264 / 0.45), transparent 70%)",
            filter: "blur(64px)",
          }}
        />
        <div
          className="bg-drift-b absolute bottom-[8%] right-[10%] h-[62vh] w-[62vh] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.23 0.018 286 / 0.4), transparent 70%)",
            filter: "blur(72px)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center"
      >
        {/* pill */}
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
                  "radial-gradient(closest-side, oklch(0.82 0.18 158 / 0.22), transparent)",
              }}
            />
            See case studies
            <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>

        {/* headline */}
        <motion.h1
          variants={rise}
          className="mt-8 font-display text-[clamp(2rem,6.5vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
        >
          For podcast conversations you only get to have{" "}
          <span className="italic text-text-muted">once.</span>
        </motion.h1>

        {/* sub-headline */}
        <motion.p
          variants={rise}
          className="mt-7 max-w-md text-lg leading-relaxed text-text-muted"
        >
          Built for India&apos;s hardest-to-book guests.
        </motion.p>

        {/* buttons */}
        <motion.div
          variants={rise}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <PrimaryButton href="/contact" size="lg">
            Book a call
          </PrimaryButton>
          <GhostButton href="/case-studies" size="lg">
            See our work
          </GhostButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
