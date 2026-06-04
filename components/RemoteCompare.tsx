"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { embed } from "@/lib/work";
import Thumb from "./Thumb";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";

type Mode = "with" | "without";

const ORDER: Mode[] = ["with", "without"];
const LABELS: Record<Mode, string> = {
  with: "With remote production",
  without: "Without",
};
const CAPTION: Record<Mode, string> = {
  with: "With remote production · Bharatvaarta",
  without: "A typical remote setup",
};
const ALT: Record<Mode, string> = {
  with: "Recorded with a real camera, light and sound, on the guest and host",
  without: "A typical remote episode recorded over a standard video call",
};

// index 0 = with, 1 = without. WITH opens at the cinematic moment (0:59).
const ITEMS: LightboxItem[] = [
  {
    title: "With remote production",
    client: "Bharatvaarta",
    media: { kind: "youtube", id: "w-LissfW42g", start: 59 },
  },
  {
    title: "A typical remote setup",
    media: { kind: "youtube", id: "5dbG1viYRMM" },
  },
];

export default function RemoteCompare() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("with");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const pillT = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };

  const id = mode === "with" ? "w-LissfW42g" : "5dbG1viYRMM";
  const start = mode === "with" ? 59 : undefined;
  const ambient = embed(id, true, true, start); // muted, chromeless, looping

  return (
    <div className="w-full">
      {/* with / without toggle */}
      <div
        role="tablist"
        aria-label="Compare remote production"
        className="inline-grid grid-cols-2 gap-1 rounded-[var(--radius-btn)] border border-line bg-bg-sunken p-1"
      >
        {ORDER.map((m) => {
          const on = m === mode;
          return (
            <button
              key={m}
              role="tab"
              aria-selected={on}
              onClick={() => setMode(m)}
              className="relative rounded-[calc(var(--radius-btn)-2px)] px-4 py-2 text-center"
            >
              {on && (
                <motion.span
                  layoutId="remote-compare-pill"
                  transition={pillT}
                  className="absolute inset-0 rounded-[calc(var(--radius-btn)-2px)] border border-line-strong bg-bg-raised shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08)]"
                />
              )}
              <span
                className={`relative z-10 whitespace-nowrap text-xs font-medium tracking-tight transition-colors duration-300 sm:text-sm ${
                  on ? "text-text" : "text-text-muted"
                }`}
              >
                {LABELS[m]}
              </span>
            </button>
          );
        })}
      </div>

      {/* video card — ambient preview at rest, opens the lightbox on click */}
      <div className="glass sweep group mt-5 w-full rounded-2xl p-2.5">
        <button
          onClick={() => setLightbox(mode === "with" ? 0 : 1)}
          aria-label={`Play, ${CAPTION[mode]}`}
          className="relative block aspect-video w-full overflow-hidden rounded-xl bg-bg-sunken"
        >
          {reduce ? (
            <Thumb
              id={id}
              alt={ALT[mode]}
              className="brightness-[0.8] transition-[filter] duration-300 group-hover:brightness-100"
            />
          ) : (
            <iframe
              key={ambient}
              src={ambient}
              title={ALT[mode]}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
          )}
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-bg/40 text-lg backdrop-blur transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
              ▶
            </span>
          </span>
          <span className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-line-strong bg-bg/60 px-3 py-1 text-xs text-text-muted backdrop-blur">
            {CAPTION[mode]}
          </span>
        </button>
      </div>

      <MediaLightbox
        items={ITEMS}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={(i) => {
          setLightbox(i);
          setMode(i === 0 ? "with" : "without");
        }}
      />
    </div>
  );
}
