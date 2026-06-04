"use client";

import { useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { embed } from "@/lib/work";
import Thumb from "./Thumb";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";

// One side of an A/B video comparison (home "with/without", case-study
// "before/after"). YouTube id + optional start second.
export type CompareSide = {
  key: string;
  label: string; // toggle label
  id: string; // youtube id
  start?: number; // start second
  alt: string;
  lightboxTitle: string;
  lightboxClient?: string;
};

// The studio's standing remote-production comparison (home + /virtual). Start
// seconds are picked for a fair face-to-face comparison.
export const REMOTE_SIDES: [CompareSide, CompareSide] = [
  {
    key: "with",
    label: "With remote production",
    id: "w-LissfW42g",
    start: 89,
    alt: "Recorded with a real camera, light and sound, on the guest and host",
    lightboxTitle: "With remote production",
    lightboxClient: "Bharatvaarta",
  },
  {
    key: "without",
    label: "Without remote production",
    id: "dHa-yEApqDE",
    start: 83,
    alt: "A typical remote episode recorded over a standard video call",
    lightboxTitle: "Without remote production",
  },
];

// Field vs Virtual production examples, for the /process Production phase. Field
// = a built set, shot on location; Virtual = two crews in two cities cut as one
// room. Reuses the same RemoteCompare toggle.
export const PRODUCTION_SIDES: [CompareSide, CompareSide] = [
  {
    key: "field",
    label: "Field",
    id: "W6odY9EG6Jk",
    start: 20,
    alt: "Saurabh Mukherjea on a built set in Mumbai — multi-camera, lit and graded",
    lightboxTitle: "Field production — Mumbai set",
    lightboxClient: "Saurabh Mukherjea",
  },
  {
    key: "virtual",
    label: "Virtual",
    id: "w-LissfW42g",
    start: 89,
    alt: "Abhijit Chavda and Roshan recorded in two cities, cut together as one conversation",
    lightboxTitle: "Virtual production — two cities",
    lightboxClient: "Abhijit Chavda × Roshan",
  },
];

// A two-state video toggle. The selected side plays as a muted, chromeless,
// looping ambient preview; clicking opens it fullscreen in the shared lightbox.
// No permanent center play button and no player captions (the toggle is the
// label). Under reduced-motion the preview is a static poster.
export default function RemoteCompare({
  sides,
  ariaLabel = "Compare",
}: {
  sides: [CompareSide, CompareSide];
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const active = sides[i];

  // Cursor-reactive green edge on the video card (border-only, follows the
  // cursor near the box, fades out on leave). Not a constant rotation.
  const gx = useMotionValue(-200);
  const gy = useMotionValue(-200);
  const edge = useMotionTemplate`radial-gradient(220px circle at ${gx}px ${gy}px, oklch(0.8 0.08 150 / 0.85), transparent 60%)`;
  const onCardMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };

  const pillT = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };

  const ambient = embed(active.id, true, true, active.start); // muted, chromeless, looping

  const items: LightboxItem[] = sides.map((s) => ({
    title: s.lightboxTitle,
    client: s.lightboxClient,
    media: { kind: "youtube", id: s.id, start: s.start },
  }));

  return (
    <div className="w-full">
      {/* toggle — boxy, the Book-a-call button's radius */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="inline-grid grid-cols-2 gap-1 rounded-[var(--radius-btn)] border border-line bg-white/[0.045] p-1"
      >
        {sides.map((s, idx) => {
          const on = idx === i;
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={on}
              onClick={() => setI(idx)}
              className="relative rounded-[calc(var(--radius-btn)-2px)] px-4 py-2 text-center"
            >
              {on && (
                <motion.span
                  layoutId={`compare-pill-${ariaLabel}`}
                  transition={pillT}
                  className="absolute inset-0 rounded-[calc(var(--radius-btn)-2px)] border border-line-strong bg-bg-raised shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08)]"
                />
              )}
              <span
                className={`relative z-10 whitespace-nowrap text-xs font-medium tracking-tight transition-colors duration-300 sm:text-sm ${
                  on ? "text-text" : "text-text-muted"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* video card — ambient preview at rest, opens the lightbox on click. A
          cursor-reactive green edge stands in for the old light sweep. */}
      <div
        onMouseMove={reduce ? undefined : onCardMove}
        className="glass group relative mt-5 w-full rounded-2xl p-2.5"
      >
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: edge,
              padding: "1px",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
            }}
          />
        )}
        <button
          onClick={() => setLightbox(i)}
          aria-label={`Play, ${active.label}`}
          className="relative block aspect-video w-full overflow-hidden rounded-xl bg-bg-sunken"
        >
          {reduce ? (
            <Thumb
              id={active.id}
              alt={active.alt}
              className="brightness-[0.85] transition-[filter] duration-300"
            />
          ) : (
            <iframe
              key={ambient}
              src={ambient}
              title={active.alt}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
          )}
        </button>
      </div>

      <MediaLightbox
        items={items}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={(n) => {
          setLightbox(n);
          setI(n);
        }}
      />
    </div>
  );
}
