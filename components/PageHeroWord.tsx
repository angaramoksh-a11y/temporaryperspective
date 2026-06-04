"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Global interior-page hero: one giant metallic word, centred, with a soft
 * silver glow behind it (resend.com/forward feel) and a blur-up entrance on
 * load. The glow drifts toward the cursor by default; pass `staticGlow` to rest
 * it at centre (used where the cursor-follow reads as distracting). Cursor-
 * tracking + entrance are also off under reduced-motion.
 */
export default function PageHeroWord({
  word,
  eyebrow,
  sub,
  staticGlow = false,
}: {
  word: string;
  eyebrow?: string;
  sub?: string;
  staticGlow?: boolean;
}) {
  const reduce = useReducedMotion();
  const interactive = !reduce && !staticGlow;
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(42);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });
  const glow = useMotionTemplate`radial-gradient(42% 56% at ${sx}% ${sy}%, oklch(0.86 0.02 250 / 0.16), transparent 72%)`;
  const restGlow =
    "radial-gradient(42% 56% at 50% 42%, oklch(0.86 0.02 250 / 0.16), transparent 72%)";

  function onMove(e: React.MouseEvent) {
    if (!interactive) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section
      ref={ref}
      onMouseMove={interactive ? onMove : undefined}
      className="relative flex min-h-[52vh] items-center justify-center overflow-hidden px-6 pb-16 pt-36 text-center lg:px-10 lg:pt-44"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: interactive ? glow : restGlow }}
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
