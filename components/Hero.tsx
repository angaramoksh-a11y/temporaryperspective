"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { GhostButton, PrimaryButton } from "./ui";

// WebGL volumetric rays. Client-only (touches WebGL); skipped under SSR so the
// dark hero paints instantly and the rays fade in once mounted.
const LightRays = dynamic(() => import("./LightRays"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-bg">
      {/* The resend "3D room": one key light blooms behind the headline, a
          raking floor beam catches the surface beneath it, and a vignette
          crushes the corners so the lit centre reads dimensional. All
          pointer-events-none, GPU-only motion, killed under reduced-motion. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* key light — soft radial bloom, upper centre */}
        <div
          className="bg-keylight absolute left-1/2 top-[-22%] h-[100vh] w-[120vw]"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.82 0.025 264 / 0.32), oklch(0.42 0.02 264 / 0.10) 46%, transparent 72%)",
          }}
        />
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
        {/* volumetric god-rays raking down from the top key light */}
        <div
          className="absolute inset-0 opacity-60"
          style={{ mixBlendMode: "screen" }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.8}
            lightSpread={1}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.3}
            noiseAmount={0.1}
            distortion={0}
            pulsating
            fadeDistance={1.5}
            saturation={1}
          />
        </div>

        {/* vignette — offset up toward the key light, corners to near-black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 95% at 50% 26%, transparent 38%, oklch(0.05 0.004 264 / 0.55) 76%, oklch(0.04 0.004 264 / 0.9) 100%)",
          }}
        />
        {/* bottom blend — dissolves the hero into the page so there's no hard
            section seam where the next block begins */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-bg))",
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
                  "radial-gradient(closest-side, oklch(0.99 0.002 264 / 0.18), transparent)",
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
          className="mt-8 font-display text-[clamp(2.1rem,6.4vw,4.9rem)] font-medium leading-[1.04] tracking-[-0.02em]"
        >
          <span className="block">For podcast conversations</span>
          <span className="block">
            you only get to have{" "}
            <span className="font-normal italic text-text-muted">once.</span>
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
