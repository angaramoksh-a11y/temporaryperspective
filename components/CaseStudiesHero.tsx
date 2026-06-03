"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaseStudiesHero() {
  return (
    <section
      className="relative flex min-h-[62vh] flex-col justify-center overflow-hidden px-6 pb-20 pt-36 lg:px-10 lg:pt-44"
      style={{ background: "#0b0a09" }}
    >
      {/* atmospheric warm radial, static (fades in first on load) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 30% 45%, oklch(0.21 0.022 68 / 0.5), oklch(0.13 0.008 60 / 0.16) 56%, transparent 82%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[1.02] tracking-tight text-text"
        >
          Case studies.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-6 max-w-xl text-[clamp(1.0625rem,1.6vw,1.35rem)] leading-relaxed text-text-muted"
        >
          Told by the clients themselves.
        </motion.p>
      </div>
    </section>
  );
}
