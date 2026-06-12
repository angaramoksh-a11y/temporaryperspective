"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Global interior-page hero: one giant metallic word, centred, with a soft
 * silver glow resting behind it (resend.com/forward feel) and a blur-up
 * entrance on load. The glow is static, it never tracks the cursor. Entrance
 * is off under reduced-motion.
 */
export default function PageHeroWord({
  word,
  eyebrow,
  sub,
  compact,
}: {
  word: string;
  eyebrow?: string;
  sub?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const glow =
    "radial-gradient(42% 56% at 50% 42%, oklch(0.86 0.02 250 / 0.16), transparent 72%)";

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden px-6 text-center lg:px-10 ${
        compact
          ? "min-h-[22vh] pb-8 pt-28 lg:pt-32"
          : "min-h-[52vh] pb-16 pt-36 lg:pt-44"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />
      <div className="relative z-10">
        {eyebrow && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-text-muted"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease, delay: eyebrow ? 0.08 : 0 }}
          className="text-metal font-display text-[clamp(3rem,11vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.03em]"
        >
          {word}
        </motion.h1>
        {sub && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.22 }}
            className="mt-5 text-[clamp(1rem,1.5vw,1.25rem)] text-text-muted"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
