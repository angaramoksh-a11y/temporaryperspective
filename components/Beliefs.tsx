"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { beliefs } from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;

function BeliefCard({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease, delay: index * 0.07 }}
      className="glass rounded-2xl p-6 lg:p-8"
    >
      <span className="font-mono text-sm text-text-faint">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="mt-4 text-[clamp(1.125rem,1.8vw,1.4rem)] leading-[1.45] tracking-[-0.01em] text-text">
        {text}
      </p>
    </motion.div>
  );
}

export default function Beliefs() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
      {beliefs.map((b, i) => (
        <BeliefCard key={i} text={b} index={i} />
      ))}
    </div>
  );
}
