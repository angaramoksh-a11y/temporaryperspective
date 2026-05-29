"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CAL_LINK } from "@/lib/work";
import { PrimaryButton } from "./ui";

const links = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* smooth fade-to-black + progressive blur, no hard line (resend.com) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg) 0%, oklch(0.115 0.005 264 / 0.82) 42%, transparent 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 46%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 46%, transparent 100%)",
        }}
      />
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
