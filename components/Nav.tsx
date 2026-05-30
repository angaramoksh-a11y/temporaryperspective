"use client";

import Link from "next/link";
import { CAL_LINK } from "@/lib/work";
import { PrimaryButton } from "./ui";

const links = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Always-on fade-to-black with PROGRESSIVE blur (resend.com). Instead of
          one blurred layer (which leaves a visible blur cutoff), we stack layers
          whose blur radius increases downward while each is masked to a band.
          Result: blur ramps smoothly from 0 at the bottom edge to its full
          strength under the nav, with no hard line anywhere. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36"
      >
        {/* tonal fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg) 0%, oklch(0.115 0.005 264 / 0.86) 26%, oklch(0.115 0.005 264 / 0.52) 50%, oklch(0.115 0.005 264 / 0.2) 74%, transparent 100%)",
          }}
        />
        {/* progressive blur ramp */}
        {[
          { blur: 1, from: 0, to: 38 },
          { blur: 3, from: 14, to: 54 },
          { blur: 7, from: 34, to: 74 },
          { blur: 14, from: 56, to: 100 },
        ].map((l) => (
          <div
            key={l.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${l.blur}px)`,
              WebkitBackdropFilter: `blur(${l.blur}px)`,
              maskImage: `linear-gradient(to bottom, transparent ${l.from}%, #000 ${
                (l.from + l.to) / 2
              }%, transparent ${l.to}%)`,
              WebkitMaskImage: `linear-gradient(to bottom, transparent ${l.from}%, #000 ${
                (l.from + l.to) / 2
              }%, transparent ${l.to}%)`,
            }}
          />
        ))}
      </div>
      <nav className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10">
        <Link
          href="/"
          aria-label="Temporary Perspective, home"
          className="group flex items-center gap-2.5 justify-self-start"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-md border border-line-strong bg-bg-raised font-display text-sm leading-none text-text">
            TP
            <span className="led-breathe absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="hidden font-medium tracking-tight text-text sm:inline">
            Temporary Perspective
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-1 justify-self-center sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[var(--radius-btn)] px-3.5 py-2 text-sm text-text-muted transition-colors hover:text-text"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-self-end">
          <PrimaryButton href={CAL_LINK}>Book a call</PrimaryButton>
        </div>
      </nav>
    </header>
  );
}
