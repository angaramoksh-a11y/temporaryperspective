"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GhostButton, Magnetic, PrimaryButton } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* The resend "3D room": a key light blooms behind the headline and a
          vignette crushes the corners so the lit centre reads dimensional.
          Light rays removed — keeping the stage plain for now. Faded out at the
          bottom so the hero's own vignette/floor beam dissolve into the global
          silk instead of clipping into a hard seam at the section edge. All
          pointer-events-none, GPU-only motion, killed under reduced-motion. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, #000 66%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 66%, transparent 95%)",
        }}
      >
        {/* floor beam — long, heavily blurred streak raking the lower scene,
            a faint horizon so the dark reads as a lit surface, not a flat fill */}
        <div
          className="bg-floorbeam absolute bottom-[-12%] left-1/2 h-[40vh] w-[155vw] rounded-[50%]"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.7 0.025 250 / 0.26), transparent 68%)",
            filter: "blur(64px)",
          }}
        />

        {/* vignette — darkens the upper corners for the lit-room look, but
            stays soft toward the bottom so the floor beam keeps glowing into
            the seam instead of being crushed to black. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(135% 100% at 50% 22%, transparent 46%, oklch(0.05 0.004 264 / 0.34) 80%, oklch(0.045 0.004 264 / 0.6) 100%)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-start px-6 text-left lg:px-10"
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
                  "radial-gradient(closest-side, oklch(0.99 0.002 264 / 0.18), oklch(0.99 0.002 264 / 0))",
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
          className="mt-8 font-display text-[clamp(1.4rem,5.9vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.02em]"
        >
          <span className="block whitespace-nowrap">For podcast conversations</span>
          <span className="block whitespace-nowrap">
            you only get to have{" "}
            <span className="font-normal text-text-muted">once.</span>
          </span>
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
          className="mt-10 flex flex-wrap items-center justify-start gap-3"
        >
          <Magnetic>
            <PrimaryButton href="/contact" size="lg">
              Book a call
            </PrimaryButton>
          </Magnetic>
          <GhostButton href="/case-studies" size="lg">
            See our work
          </GhostButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
