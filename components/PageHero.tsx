"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Thunder poster heading used to open most interior pages. The /case-studies
// hero is its own atmospheric variant; this is the quieter catalog/header form.
const scales = {
  lg: "text-[clamp(2.75rem,11vw,9rem)]",
  md: "text-[clamp(2.25rem,8vw,6rem)]",
  sm: "text-[clamp(2rem,6vw,4.25rem)]",
} as const;

const minHeights = {
  half: "min-h-[50vh]",
  tall: "min-h-[60vh]",
  short: "min-h-[34vh]",
  full: "min-h-[100svh]",
} as const;

export default function PageHero({
  title,
  subcopy,
  size = "lg",
  minH = "half",
  align = "center",
}: {
  title: string;
  subcopy?: string;
  size?: keyof typeof scales;
  minH?: keyof typeof minHeights;
  align?: "center" | "left";
}) {
  const left = align === "left";
  return (
    <section
      className={`relative flex flex-col justify-center px-6 py-24 lg:px-10 ${
        minHeights[minH]
      } ${left ? "items-start text-left" : "items-center text-center"}`}
    >
      <div
        className={`mx-auto w-full max-w-[1400px] ${
          left ? "" : "flex flex-col items-center"
        }`}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className={`font-thunder ${scales[size]} uppercase leading-[0.95] tracking-[-0.01em] text-text`}
        >
          {title}
        </motion.h1>
        {subcopy && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className={`mt-6 text-[clamp(1rem,1.6vw,1.25rem)] text-text-muted ${
              left ? "max-w-xl" : "max-w-xl"
            }`}
          >
            {subcopy}
          </motion.p>
        )}
      </div>
    </section>
  );
}
