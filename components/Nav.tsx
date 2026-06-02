"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import { Magnetic, PrimaryButton } from "./ui";

// Floating glass card-nav. The top bar is always visible (logo, a Menu toggle,
// and the persistent Book a call); toggling expands the bar into three cards.
// Adapted from the reactbits card-nav: our palette, glass surface, subtle inner
// tiles (no heavy nested cards), motion height reveal off under reduced-motion.
const groups = [
  {
    title: "On screen.",
    sub: "Every episode, every show.",
    links: [
      { label: "All episodes", href: "/work" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "The studio.",
    sub: "How we run a show, where we shoot, who runs it.",
    links: [
      { label: "Our process", href: "/process" },
      { label: "Shooting remote", href: "/virtual" },
      { label: "About us", href: "/about" },
      { label: "Common questions", href: "/faq" },
    ],
  },
  {
    title: "Writing.",
    sub: "Notes on running a podcast worth watching.",
    links: [{ label: "Newsletter", href: "/newsletter" }],
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const panelEase = { duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="glass edge-gradient mx-auto max-w-[1100px] overflow-hidden rounded-2xl">
        {/* top bar — always visible */}
        <div className="flex h-14 items-center justify-between gap-3 px-3 sm:h-[60px] sm:px-4">
          <Link
            href="/"
            aria-label="Temporary Perspective, home"
            className="flex items-center gap-2.5 pl-1"
          >
            <Logo className="h-5 w-auto text-text" />
            <span className="hidden font-medium tracking-tight text-text sm:inline">
              Temporary Perspective
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group inline-flex h-10 items-center gap-2.5 rounded-[var(--radius-btn)] px-3 text-sm text-text-muted transition-colors hover:text-text"
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 block h-px w-5 bg-current transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                    open ? "bottom-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
            <Magnetic>
              <PrimaryButton href="/contact">Book a call</PrimaryButton>
            </Magnetic>
          </div>
        </div>

        {/* expandable card panel */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={panelEase}
              className="bg-bg/95"
            >
              <div className="grid gap-3 border-t border-line px-3 py-3 sm:px-4 sm:py-4 md:grid-cols-3">
                {groups.map((g, i) => (
                  <motion.div
                    key={g.title}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: open ? i * 0.06 : 0, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-line bg-white/[0.02] p-5"
                  >
                    <h3 className="font-display text-lg font-medium tracking-tight">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-faint">
                      {g.sub}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="group inline-flex items-center gap-1.5 text-text-muted transition-colors hover:text-text"
                          >
                            {l.label}
                            <span className="text-text-faint transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:text-text">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
