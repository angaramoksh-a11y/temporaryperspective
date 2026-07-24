"use client";

import { MotionConfig } from "motion/react";

// Site-wide reduced-motion gate for every motion/react animation. CSS media
// queries don't reach JS-driven springs and layout animations; this does —
// with `reducedMotion="user"` Motion disables transform/layout animation for
// users who set prefers-reduced-motion, while opacity fades stay intact.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
