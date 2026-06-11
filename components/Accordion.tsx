"use client";

import { useId, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export type QA = { q: string; a: string };

function Row({
  item,
  open,
  onToggle,
  index,
  first,
}: {
  item: QA;
  open: boolean;
  onToggle: () => void;
  index: number;
  first: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const panelId = useId();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      className={`group/card relative ${first ? "" : "border-t border-line"}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start justify-between gap-5 px-6 py-5 text-left transition-colors duration-300 ease-[var(--ease-out-quart)] hover:bg-white/[0.025] lg:px-7"
      >
        <span className="text-[1.0625rem] font-medium leading-snug text-text">
          {item.q}
        </span>
        <span
          className={`mt-0.5 shrink-0 text-lg leading-none text-text-faint transition-transform duration-300 ease-[var(--ease-out-quart)] ${
            open ? "rotate-45 text-text" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,background-color] duration-300 ease-[var(--ease-out-quart)] ${open ? "bg-white/[0.022]" : ""}`}
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose px-6 pb-6 pt-1 text-[1rem] leading-relaxed text-text-muted lg:px-7">
            {item.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Accordion({ items }: { items: QA[] }) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised/30">
      {items.map((item, i) => (
        <Row
          key={item.q}
          item={item}
          index={i}
          first={i === 0}
          open={openSet.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
