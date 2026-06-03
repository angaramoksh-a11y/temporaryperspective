"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { embed } from "@/lib/work";
import Thumb from "./Thumb";

const ease = [0.16, 1, 0.3, 1] as const;

type Mode = "with" | "without";

// Two real client episodes shown side by side. WITH opens on the cinematic
// moment (0:59); WITHOUT is a long livestream, so it stays on its poster until
// clicked. Wording stays neutral: it's a real show, not a strawman.
const VIDS: Record<
  Mode,
  { id: string; start?: number; caption: string; alt: string }
> = {
  with: {
    id: "w-LissfW42g",
    start: 59,
    caption: "With remote production · Bharatvaarta",
    alt: "Abhijit Chavda, recorded remotely for Bharatvaarta with a crew at both ends",
  },
  without: {
    id: "5dbG1viYRMM",
    caption: "A typical remote setup",
    alt: "A typical remote episode recorded over a standard video call",
  },
};

const ORDER: Mode[] = ["with", "without"];
const LABELS: Record<Mode, string> = {
  with: "With remote production",
  without: "Without",
};

export default function RemoteCompare() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("with");
  const [played, setPlayed] = useState(false); // reduced-motion: click to start
  const v = VIDS[mode];

  // Default: both clips autoplay muted as ambient, chromeless loops so you can
  // compare the look at a glance. Under reduced-motion we never autoplay — the
  // poster waits for a click.
  const autoplay = !reduce;
  const showFrame = autoplay || played;
  const src = autoplay
    ? embed(v.id, true, true, v.start) // muted, chromeless, looping
    : embed(v.id, true, false, v.start); // user-started playback, with controls

  const pill = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };
  const cross = { duration: reduce ? 0 : 0.4, ease };

  const select = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setPlayed(false);
  };

  return (
    <div className="w-full">
      {/* with / without toggle */}
      <div
        role="tablist"
        aria-label="Compare remote production"
        className="inline-grid grid-cols-2 gap-1 rounded-full border border-line bg-bg-sunken p-1"
      >
        {ORDER.map((m) => {
          const on = m === mode;
          return (
            <button
              key={m}
              role="tab"
              aria-selected={on}
              onClick={() => select(m)}
              className="relative rounded-full px-4 py-2 text-center"
            >
              {on && (
                <motion.span
                  layoutId="remote-compare-pill"
                  transition={pill}
                  className="absolute inset-0 rounded-full border border-line-strong bg-bg-raised shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08)]"
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

      {/* video */}
      <div className="glass sweep group mt-5 w-full rounded-2xl p-2.5">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-bg-sunken">
          <AnimatePresence mode="wait">
            {showFrame ? (
              <motion.iframe
                key={`frame-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={cross}
                src={src}
                title={v.alt}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={`absolute inset-0 h-full w-full ${autoplay ? "pointer-events-none" : ""}`}
              />
            ) : (
              <motion.button
                key={`poster-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={cross}
                onClick={() => setPlayed(true)}
                aria-label={`Play, ${v.caption}`}
                className="absolute inset-0 block h-full w-full"
              >
                <Thumb
                  id={v.id}
                  alt={v.alt}
                  className="brightness-[0.8] transition-[filter] duration-300 group-hover:brightness-100"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-bg/40 text-lg backdrop-blur transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
                    ▶
                  </span>
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* caption stays pinned over the ambient loop */}
          {autoplay && (
            <span className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-full border border-line-strong bg-bg/60 px-3 py-1 text-xs text-text-muted backdrop-blur">
              {v.caption}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
