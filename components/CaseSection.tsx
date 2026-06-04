"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EdgeDivider, PrimaryButton } from "./ui";
import CaseVideo from "./CaseVideo";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaseSection({
  name,
  vimeoId,
  href,
  tag,
  result,
  videoSide,
  divider = false,
}: {
  name: string;
  vimeoId: string;
  href: string;
  tag: string;
  result: string;
  videoSide: "left" | "right";
  divider?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const videoRight = videoSide === "right";
  // Cinematic entry: video slides in from its own side, info from the other.
  const videoFromX = videoRight ? 30 : -30;
  const infoFromX = videoRight ? -30 : 30;

  const video = (
    <motion.div
      initial={{ opacity: 0, x: videoFromX }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.6, ease }}
      // mobile: always on top. desktop: follows videoSide.
      className={`order-1 ${videoRight ? "lg:order-2" : "lg:order-1"}`}
    >
      <CaseVideo vimeoId={vimeoId} href={href} label={name} />
    </motion.div>
  );

  const info = (
    <motion.div
      initial={{ opacity: 0, x: infoFromX }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.6, ease, delay: 0.08 }}
      className={`order-2 ${videoRight ? "lg:order-1" : "lg:order-2"}`}
    >
      <h2 className="font-thunder text-[clamp(2.5rem,7vw,8rem)] uppercase leading-[0.85] tracking-[-0.01em] text-text">
        {name}
      </h2>
      <p className="mt-4 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
        {tag}
      </p>
      <p className="mt-8 max-w-md text-[clamp(1.25rem,1.6vw,1.5rem)] leading-snug text-text">
        {result}
      </p>
      <PrimaryButton href={href} size="lg" className="mt-12">
        Read the case study
        <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
          →
        </span>
      </PrimaryButton>
    </motion.div>
  );

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center py-24">
      {divider && <EdgeDivider />}
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {video}
        {info}
      </div>
    </section>
  );
}
