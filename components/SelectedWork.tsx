"use client";

import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { embed, selectedWork, type Episode } from "@/lib/work";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";

// Bento spans, applied on both the 2-col (mobile) and 4-col (lg) grid. col-span-2
// is full-width on mobile / half on desktop, so one set of classes yields a
// coherent bento at both sizes: a 2x2 featured tile, two squares, three wides.
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-2 row-span-1",
  "col-span-2 row-span-1",
];

export default function SelectedWork() {
  const [active, setActive] = useState<Episode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const enter = (id: string) => setHovered(id);
  const leave = () => setHovered(null);
  const open = (e: Episode) => {
    setActive(e);
    setHovered(null);
  };

  // spotlight follows the cursor across the whole grid
  const onRowMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // per-tile: border-ring position (--cx/--cy) + a touch of magnetism (--tx/--ty)
  const onCardMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--cx", `${x}px`);
    el.style.setProperty("--cy", `${y}px`);
    if (reduce) return;
    const clamp = (v: number) => Math.max(-5, Math.min(5, v));
    el.style.setProperty("--tx", `${clamp((x - r.width / 2) * 0.06)}px`);
    el.style.setProperty("--ty", `${clamp((y - r.height / 2) * 0.06)}px`);
  };
  const onCardLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--tx", "0px");
    e.currentTarget.style.setProperty("--ty", "0px");
  };

  // chrome click pulse from the pointer-down point
  const onRipple = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const s = document.createElement("span");
    s.className = "bento-ripple";
    s.style.left = `${e.clientX - r.left}px`;
    s.style.top = `${e.clientY - r.top}px`;
    s.style.width = s.style.height = `${d}px`;
    el.appendChild(s);
    if (typeof s.animate !== "function") {
      s.remove();
      return;
    }
    const anim = s.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)", opacity: 0.4 },
        { transform: "translate(-50%, -50%) scale(2.4)", opacity: 0 },
      ],
      { duration: 600, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
    );
    anim.onfinish = () => s.remove();
  };

  return (
    <section className="relative pt-14 pb-16 lg:pt-16 lg:pb-20">
      {/* Continuation of the hero light: it spills across the seam and
          gradients out within this section instead of dying at the fold. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{
          background:
            "radial-gradient(125% 80% at 50% -12%, oklch(0.62 0.02 255 / 0.13), oklch(0.5 0.015 255 / 0.05) 38%, transparent 64%)",
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light tracking-tight">
            Some of our work
          </h2>
        </div>

        <div className="bento-row relative" onPointerMove={onRowMove}>
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[175px] lg:auto-rows-[200px] lg:grid-cols-4 lg:gap-4">
            {selectedWork.map((ep, i) => (
              <button
                key={ep.id}
                onClick={() => open(ep)}
                onPointerMove={onCardMove}
                onPointerLeave={onCardLeave}
                onPointerDown={onRipple}
                onMouseEnter={() => enter(ep.id)}
                onMouseLeave={leave}
                aria-label={`${ep.guest}, ${ep.client}`}
                className={`bento-card bento-magnet group relative overflow-hidden rounded-xl border border-line ${SPANS[i] ?? "col-span-2 row-span-1"}`}
              >
                <Thumb
                  id={ep.id}
                  alt={`${ep.guest} on ${ep.client}`}
                  className="brightness-[0.82] transition-[transform,filter] duration-500 ease-[var(--ease-out-quart)] group-hover:scale-105 group-hover:brightness-100"
                />
                {hovered === ep.id && (
                  <iframe
                    src={embed(ep.id, true, true)}
                    title={ep.guest}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
                  />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-bg/95 via-bg/40 to-transparent p-3 text-left sm:p-4">
                  <p className="font-medium leading-snug">{ep.guest}</p>
                  <p className="mt-0.5 text-xs text-text-faint sm:text-sm">
                    {ep.client}
                  </p>
                </div>
              </button>
            ))}

            {/* CTA tile — frosted glass, same bento treatment */}
            <Link
              href="/work"
              onPointerMove={onCardMove}
              onPointerLeave={onCardLeave}
              onPointerDown={onRipple}
              className="glass bento-card bento-magnet sweep group col-span-2 row-span-1 flex items-center justify-center gap-2 rounded-xl lg:col-span-4"
            >
              <span className="inline-flex items-center gap-2 font-display text-2xl font-light tracking-tight sm:text-3xl">
                Watch more work
                <span className="text-xl transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1 sm:text-2xl">
                  →
                </span>
              </span>
            </Link>
          </div>
          <div aria-hidden className="bento-spot" />
        </div>
      </div>

      <Lightbox
        episode={active}
        episodes={selectedWork}
        onClose={() => setActive(null)}
        onSelect={(e) => setActive(e)}
      />
    </section>
  );
}
