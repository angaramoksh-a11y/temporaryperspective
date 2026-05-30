"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CAL_LINK } from "@/lib/work";
import Logo from "./Logo";
import { PrimaryButton } from "./ui";

const links = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile overlay whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Gradient scrim — a dark top fading to transparent, with the blur
          masked to dissolve at the bottom edge so the bar melts into the page
          instead of cutting it with a hard line. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[180%] transition-opacity duration-500 ease-[var(--ease-out-quart)]"
        style={{
          opacity: scrolled ? 1 : 0,
          background:
            "linear-gradient(to bottom, oklch(0.085 0.004 264 / 0.95) 0%, oklch(0.085 0.004 264 / 0.7) 45%, oklch(0.085 0.004 264 / 0) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 50%, transparent 92%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 50%, transparent 92%)",
        }}
      />
      <nav className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:h-[72px] lg:px-10">
        <Link
          href="/"
          aria-label="Temporary Perspective, home"
          className="group flex items-center gap-2.5 justify-self-start"
        >
          <Logo className="h-[1.15rem] w-auto text-text" />
          <span className="hidden font-medium tracking-tight text-text sm:inline">
            Temporary Perspective
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-1 justify-self-center sm:flex">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-[var(--radius-btn)] px-3.5 py-2 text-sm transition-colors ${
                  active ? "text-text" : "text-text-muted hover:text-text"
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 -bottom-px h-px origin-center bg-text transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <div className="hidden sm:block">
            <PrimaryButton href={CAL_LINK}>Book a call</PrimaryButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-btn)] text-text sm:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 origin-top bg-bg/95 backdrop-blur-xl transition-[opacity,transform] duration-300 ease-[var(--ease-out-quart)] sm:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-8">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between border-b border-line py-4 font-thunder text-3xl uppercase leading-none tracking-tight transition-colors ${
                  active ? "text-text" : "text-text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/newsletter"
            className="flex items-center border-b border-line py-4 font-thunder text-3xl uppercase leading-none tracking-tight text-text-muted transition-colors"
          >
            Newsletter
          </Link>
          <div className="mt-6">
            <PrimaryButton href={CAL_LINK} size="lg" className="w-full">
              Book a call
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}
