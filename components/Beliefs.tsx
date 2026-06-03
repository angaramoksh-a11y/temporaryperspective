"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { beliefs } from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease }}
      className="flex gap-5 text-[clamp(1.25rem,2.4vw,1.75rem)] font-light leading-[1.4] tracking-[-0.01em] text-text"
    >
      <span className="mt-2 shrink-0 font-mono text-sm font-normal text-text-faint">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>{text}</span>
    </motion.p>
  );
}

export default function Beliefs() {
  return (
    <div className="flex max-w-[820px] flex-col gap-12 lg:gap-14">
      {beliefs.map((b, i) => (
        <Line key={i} text={b} index={i} />
      ))}
    </div>
  );
}
