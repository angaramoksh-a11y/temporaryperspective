"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { CAL_LINK } from "@/lib/work";
import { GhostButton, PrimaryButton } from "./ui";

const MicScene = dynamic(() => import("./Mic"), {
  ssr: false,
  loading: () => null,
});

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* key light: a single soft glow blooming behind the mic */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-18%] top-[42%] h-[120vh] w-[90vw] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.46 0.018 264 / 0.26), oklch(0.3 0.015 264 / 0.1) 52%, transparent 82%)",
          filter: "blur(44px)",
        }}
      />
      {/* floor beam: a long diffused light streak raking across the lower scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-12%] top-[64%] h-[44vh] -rotate-6"
        style={{
          background:
            "linear-gradient(100deg, transparent 8%, oklch(0.85 0.01 264 / 0.10) 44%, oklch(0.97 0.006 264 / 0.16) 52%, oklch(0.85 0.01 264 / 0.08) 60%, transparent 82%)",
          filter: "blur(30px)",
        }}
      />
      {/* vignette: crush the corners so the light reads as 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(135% 105% at 62% 34%, transparent 36%, oklch(0.05 0.004 264 / 0.92) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-stretch px-6 pt-28 lg:grid lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-10 lg:pt-16">
        {/* copy */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
          className="z-10 order-2 min-w-0 max-w-2xl lg:order-1 lg:pl-10 xl:pl-16"
        >
          <motion.div variants={rise}>
            <Link
              href="/case-studies"
              className="glass edge-gradient sweep group relative inline-flex items-center gap-2 rounded-full py-1.5 pl-4 pr-3 text-sm text-text-muted transition-colors hover:text-text"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-3 -z-10 rounded-full opacity-70 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(closest-side, oklch(0.82 0.18 158 / 0.4), transparent)",
                }}
              />
              See case studies
              <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-7 font-display text-[clamp(1.5rem,5.4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.025em]"
          >
            <span className="block whitespace-nowrap">
              For <span className="italic">Podcast</span> conversations
            </span>
            <span className="block whitespace-nowrap">you only get to have</span>
            <span className="block whitespace-nowrap italic text-text-muted">
              once.
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-md text-lg leading-relaxed text-text-muted"
          >
            Built for India&apos;s hardest-to-book guests.
          </motion.p>
          <motion.p
            variants={rise}
            className="mt-1 text-sm text-text-faint"
          >
            100+ episodes shipped.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <PrimaryButton href="/contact" size="lg">
              Book a call
            </PrimaryButton>
            <GhostButton href="/work" size="lg">
              See our work
            </GhostButton>
          </motion.div>
        </motion.div>

        {/* mic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="relative order-1 -mx-6 h-[44vh] min-w-0 select-none lg:order-2 lg:mx-0 lg:-mr-[8%] lg:h-[88vh]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <MicScene />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-0 right-0 hidden justify-center lg:flex"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-faint/70">
              drag to rotate
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
