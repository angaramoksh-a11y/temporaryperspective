"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Logo from "./Logo";

// A draggable "Guest Pass" badge on a lanyard. Reinterpretation of the reactbits
// lanyard (which needs three.js + rapier physics + fiber + meshline) using only
// motion: drag the card and it swings from the pin, then springs back. Pure 2D
// GPU transforms, no new deps. Static (no swing) under reduced-motion.
function Badge() {
  return (
    <div className="flex w-[210px] flex-col items-center rounded-2xl border border-line-strong bg-bg-raised/70 px-6 pb-6 pt-5 shadow-[0_24px_60px_-20px_oklch(0_0_0/0.7)] backdrop-blur-md">
      {/* punch hole / clip slot */}
      <span className="mb-5 h-2 w-12 rounded-full bg-bg-sunken ring-1 ring-line-strong" />
      <Logo className="h-9 w-auto text-text" />
      <p className="mt-5 font-display text-2xl font-medium tracking-tight">
        Guest Pass
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-faint">
        Temporary Perspective
      </p>
      <div className="mt-6 flex w-full items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
        <span>Mumbai</span>
        <span>All areas</span>
      </div>
    </div>
  );
}

export default function GuestPass({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-220, 220], [-24, 24]), {
    stiffness: 140,
    damping: 11,
    mass: 0.7,
  });

  const Strap = (
    <>
      {/* pin the lanyard hangs from */}
      <span className="h-3 w-3 rounded-full bg-text-faint ring-4 ring-bg-raised/60" />
      <span className="h-28 w-2.5 rounded-b-sm bg-gradient-to-b from-line-strong via-text-faint/40 to-line-strong" />
      {/* clip */}
      <span className="-mt-1 h-4 w-8 rounded-md border border-line-strong bg-bg-raised" />
    </>
  );

  if (reduce) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {Strap}
        <div className="-mt-1.5">
          <Badge />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="h-3 w-3 rounded-full bg-text-faint ring-4 ring-bg-raised/60" />
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.55}
        dragTransition={{ bounceStiffness: 140, bounceDamping: 11 }}
        whileDrag={{ cursor: "grabbing" }}
        style={{ x, rotate, transformOrigin: "50% 0%" }}
        className="flex cursor-grab touch-none select-none flex-col items-center active:cursor-grabbing"
      >
        <span className="h-28 w-2.5 rounded-b-sm bg-gradient-to-b from-line-strong via-text-faint/40 to-line-strong" />
        <span className="-mt-1 h-4 w-8 rounded-md border border-line-strong bg-bg-raised" />
        <div className="-mt-1.5">
          <Badge />
        </div>
      </motion.div>
    </div>
  );
}
