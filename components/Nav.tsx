"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import { Magnetic, PrimaryButton } from "./ui";

// Floating glass nav that morphs. Inspired by sarvam.ai (feel only): a detached
// rounded bar with flat, always-visible links; hovering a category smoothly
// expands the *same* bar into a megamenu (sub-items + a featured card), its
// height and corner radius animating together. No desktop Menu toggle; mobile
// falls back to a hamburger accordion overlay.

type Item = { label: string; href: string; desc: string };
type Featured = { title: string; copy: string; href: string; cta: string };
type Category =
  | { label: string; items: Item[]; featured: Featured; href?: never }
  | { label: string; href: string; items?: never; featured?: never };

const categories: Category[] = [
  {
    label: "Watch",
    items: [
      { label: "All episodes", href: "/work", desc: "Every episode, every show." },
      { label: "Case studies", href: "/case-studies", desc: "How the work came together." },
    ],
    featured: {
      title: "The work",
      copy: "100+ episodes for India's hardest-to-book guests.",
      href: "/work",
      cta: "See all work",
    },
  },
  {
    label: "Studio",
    items: [
      { label: "Our process", href: "/process", desc: "How we run a show." },
      { label: "Shooting remote", href: "/virtual", desc: "Record from anywhere." },
      { label: "About us", href: "/about", desc: "Who runs the studio." },
      { label: "Common questions", href: "/faq", desc: "Everything you might ask." },
    ],
    featured: {
      title: "Start with a call",
      copy: "Tell us about your show. We handle the rest.",
      href: "/contact",
      cta: "Book a call",
    },
  },
  { label: "Newsletter", href: "/newsletter" },
];

const under = (p: string, href: string) => p === href || p.startsWith(`${href}/`);
const isActive = (p: string, c: Category) =>
  c.items ? c.items.some((i) => under(p, i.href)) : under(p, c.href);

export default function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setOpenCat(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenCat(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const open = (label: string | null) => {
    clearTimeout(closeTimer.current);
    setOpenCat(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenCat(null), 180);
  };

  const current = categories.find((c) => c.label === openCat && c.items) as
    | Extract<Category, { items: Item[] }>
    | undefined;
  const isOpen = !!current;
  const smooth = { duration: reduce ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] as const };
  const fade = { duration: reduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <motion.div
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={scheduleClose}
        initial={{ borderRadius: 12 }}
        animate={{ borderRadius: isOpen ? 18 : 12 }}
        transition={smooth}
        className="glass edge-gradient relative mx-auto max-w-[1080px] overflow-hidden"
      >
        {/* darken the glass so the links stay legible over a bright backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-bg/55"
        />
        {/* top bar */}
        <div className="relative z-10 flex h-[58px] items-center justify-between gap-4 pl-5 pr-4">
          <Link
            href="/"
            aria-label="Temporary Perspective, home"
            onMouseEnter={() => open(null)}
            className="flex items-center"
          >
            <Logo className="h-7 w-auto text-text" />
          </Link>

          {/* desktop links — absolutely centered in the bar so they don't drift
              with the logo/CTA widths */}
          <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-9 lg:flex">
            {categories.map((c) => {
              const active = isActive(pathname, c);
              if (!c.items) {
                return (
                  <li key={c.label} onMouseEnter={() => open(null)}>
                    <Link
                      href={c.href}
                      className={`relative text-[0.95rem] font-medium transition-colors ${
                        active ? "text-text" : "text-text-muted hover:text-text"
                      }`}
                    >
                      {c.label}
                      {active && (
                        <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-chrome" />
                      )}
                    </Link>
                  </li>
                );
              }
              const isThis = openCat === c.label;
              return (
                <li key={c.label} onMouseEnter={() => open(c.label)}>
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isThis}
                    onFocus={() => open(c.label)}
                    className={`group relative inline-flex items-center gap-1 text-[0.95rem] font-medium transition-colors ${
                      active || isThis ? "text-text" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {c.label}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3 w-3 text-text-faint transition-transform duration-300 ${isThis ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    {active && (
                      <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-chrome" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block" onMouseEnter={() => open(null)}>
            <Magnetic>
              <PrimaryButton href="/contact">Book a call</PrimaryButton>
            </Magnetic>
          </div>

          {/* mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <PrimaryButton href="/contact" className="h-9 px-4 text-sm">
              Book a call
            </PrimaryButton>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="relative inline-flex h-9 w-9 items-center justify-center text-text"
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                    mobileOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-5 bg-current transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* morphing megamenu (desktop) */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={smooth}
              className="relative z-10 hidden lg:block"
            >
              <div className="border-t border-line px-5 py-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current!.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={fade}
                    className="grid min-h-[184px] grid-cols-[1fr_300px] gap-6"
                  >
                    <div>
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-faint">
                        {current!.label}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-1">
                        {current!.items.map((it) => (
                          <Link
                            key={it.href}
                            href={it.href}
                            className="group/item flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                          >
                            <span className="flex items-center gap-1.5 text-sm text-text">
                              {it.label}
                              <span className="-translate-x-1 text-text-faint opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                                →
                              </span>
                            </span>
                            <span className="text-xs text-text-faint">{it.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={current!.featured.href}
                      className="group/feat flex flex-col justify-between overflow-hidden rounded-xl border border-line-strong p-5"
                      style={{
                        backgroundImage:
                          "linear-gradient(150deg, oklch(0.18 0.006 264), oklch(0.1 0.004 264) 60%), linear-gradient(180deg, oklch(1 0 0 / 0.06), transparent 40%)",
                      }}
                    >
                      <div>
                        <p className="font-display text-lg font-medium tracking-tight text-text">
                          {current!.featured.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                          {current!.featured.copy}
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text">
                        {current!.featured.cta}
                        <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover/feat:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 origin-top bg-bg/95 backdrop-blur-xl transition-[opacity] duration-300 ease-[var(--ease-out-quart)] lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-svh flex-col overflow-y-auto px-6 pb-6 pt-24">
          <div className="flex flex-col">
            {categories.map((c) => {
              if (!c.items) {
                return (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="border-b border-line py-4 font-display text-2xl font-medium tracking-tight text-text"
                  >
                    {c.label}
                  </Link>
                );
              }
              const isExp = expanded === c.label;
              return (
                <div key={c.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setExpanded(isExp ? null : c.label)}
                    aria-expanded={isExp}
                    className="flex w-full items-center justify-between py-4 font-display text-2xl font-medium tracking-tight text-text"
                  >
                    {c.label}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 text-text-faint transition-transform duration-300 ${isExp ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExp && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pb-3">
                          {c.items.map((it) => (
                            <Link
                              key={it.href}
                              href={it.href}
                              className="flex flex-col gap-0.5 py-2.5 pl-1"
                            >
                              <span className="text-base text-text">{it.label}</span>
                              <span className="text-xs text-text-faint">{it.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className="mt-auto pt-6">
            <PrimaryButton href="/contact" size="lg" className="w-full">
              Book a call
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}
