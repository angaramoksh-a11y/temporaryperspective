"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaseStudiesHero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
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
            "radial-gradient(58% 48% at 50% 42%, oklch(0.21 0.022 68 / 0.55), oklch(0.13 0.008 60 / 0.18) 56%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="font-thunder text-[clamp(3.25rem,13.5vw,11.5rem)] uppercase leading-[0.96] tracking-[-0.01em] text-text"
        >
          Case studies.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="mt-8 text-[clamp(1rem,2.2vw,1.5rem)] text-text-muted"
        >
          Told by the clients themselves.
        </motion.p>
      </div>
    </section>
  );
}
