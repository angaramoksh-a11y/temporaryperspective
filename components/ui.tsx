"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";

export function EdgeDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`edge-divider absolute inset-x-0 top-0 ${className}`}
      aria-hidden
    />
  );
}

const sizes = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

export function PrimaryButton({
  children,
  className = "",
  size = "md",
  ...props
}: ComponentProps<typeof Link> & { size?: keyof typeof sizes }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const REACH = 150; // how far "near" extends past the button edge
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const reach = REACH + Math.max(r.width, r.height) / 2;
        if (dist > reach) {
          glow.style.opacity = "0";
          return;
        }
        const t = 1 - dist / reach; // 0 (far) .. 1 (centered)
        glow.style.opacity = (0.18 + t * 0.82).toFixed(3);
        glow.style.setProperty("--gx", `${e.clientX - r.left}px`);
        glow.style.setProperty("--gy", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <span
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-full opacity-0 blur-2xl"
        style={{
          background:
            "radial-gradient(90px circle at var(--gx, 50%) var(--gy, 50%), oklch(0.92 0.04 236 / 0.6), oklch(0.85 0.05 236 / 0.18) 45%, transparent 72%)",
        }}
      />
      <Link
        {...props}
        className={`sweep group inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-text font-medium text-bg transition-[transform,background] duration-300 ease-[var(--ease-out-quart)] hover:scale-[1.02] hover:bg-white ${sizes[size]} ${className}`}
      >
        {children}
      </Link>
    </span>
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
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
      {children}
    </span>
  );
}
