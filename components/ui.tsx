"use client";

import Link from "next/link";
import { type ComponentProps, type ReactNode, type PointerEvent, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function EdgeDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`edge-divider absolute inset-x-0 top-0 ${className}`}
      aria-hidden
    />
  );
}

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

export function PrimaryButton({
  children,
  className = "",
  size = "md",
  ...props
}: ComponentProps<typeof Link> & { size?: keyof typeof sizes }) {
  return (
    <Link
      {...props}
      className={`sweep group inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-text font-medium text-bg transition-[transform,background] duration-300 ease-[var(--ease-out-quart)] hover:scale-[1.02] hover:bg-white ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  children,
  className = "",
  size = "md",
  ...props
}: ComponentProps<typeof Link> & { size?: keyof typeof sizes }) {
  return (
    <Link
      {...props}
      className={`sweep group inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-line-strong font-medium text-text transition-colors duration-300 ease-[var(--ease-out-quart)] hover:border-white/30 hover:bg-white/[0.03] ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function ArrowLink({
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-1.5 text-text-muted transition-colors hover:text-text ${className}`}
    >
      {children}
      <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
      {children}
    </span>
  );
}

// Subtle magnetic pull: the wrapped element drifts a fraction of the cursor's
// offset from its centre and springs home on leave. The wrapper hugs the child
// (inline-block, no padding/background) so there's no compositing seam — motion
// manages will-change only while it's actually moving, so nothing lingers at
// rest. Capped travel keeps it "a little bit", never a slingshot. Off under
// reduced-motion.
export function Magnetic({
  children,
  strength = 0.25,
  max = 8,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.45 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const clamp = (v: number) => Math.max(-max, Math.min(max, v));

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
