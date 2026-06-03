"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Quiet interior-page header: a left-aligned display title over a clear lede,
// sitting clear of the floating nav. The /case-studies hero is its own
// atmospheric variant.
const scales = {
  lg: "text-[clamp(2.75rem,6.5vw,5rem)]",
  md: "text-[clamp(2.5rem,5.5vw,4rem)]",
  sm: "text-[clamp(2.25rem,4.5vw,3.25rem)]",
} as const;

export default function PageHero({
  title,
  subcopy,
  size = "lg",
  align = "left",
}: {
  title: string;
  subcopy?: string;
  size?: keyof typeof scales;
  /** kept for call-site compatibility; layout no longer depends on it */
  minH?: "half" | "tall" | "short" | "full";
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <section className="relative px-6 pb-14 pt-36 lg:px-10 lg:pb-16 lg:pt-44">
      <div className={`mx-auto w-full max-w-[1400px] ${center ? "text-center" : ""}`}>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className={`font-display ${scales[size]} font-light leading-[1.03] tracking-tight text-text`}
        >
          {title}
        </motion.h1>
        {subcopy && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className={`mt-5 text-[clamp(1.0625rem,1.6vw,1.35rem)] leading-relaxed text-text-muted ${
              center ? "mx-auto max-w-xl" : "max-w-xl"
            }`}
          >
            {subcopy}
          </motion.p>
        )}
      </div>
    </section>
  );
}
