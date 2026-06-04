"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import Thumb from "./Thumb";
import { Magnetic, PrimaryButton } from "./ui";

// Floating glass nav that morphs. Inspired by sarvam.ai (feel only): a detached
// rounded bar with flat, always-visible links; hovering a category smoothly
// expands the *same* bar into a megamenu, its height and corner radius animating
// together. A shared-layout pill slides between the top-level links (hover +
// active). The Work menu previews footage of whichever item is hovered. No
// desktop Menu toggle; mobile falls back to a hamburger accordion overlay.

type Item = { label: string; href: string; desc: string };
type Featured = { title: string; copy: string; href: string; cta: string };
type Category =
  | { label: string; items: Item[]; featured?: Featured; href?: never }
  | { label: string; href: string; items?: never; featured?: never };

const categories: Category[] = [
  {
    label: "Work",
    items: [
      { label: "The work", href: "/work", desc: "The shows we produce, episode by episode." },
      { label: "Full archive", href: "/work/archive", desc: "Every episode and clip. Filter by client or format." },
      { label: "Case studies", href: "/case-studies", desc: "The shows, told by the clients." },
    ],
  },
  {
    label: "Studio",
    items: [
      { label: "Our process", href: "/process", desc: "How we run a show." },
      { label: "Remote production", href: "/virtual", desc: "When your guest's in another city." },
      { label: "What clients say", href: "/testimonials", desc: "Proof, from the people we make it for." },
      { label: "About us", href: "/about", desc: "Who runs the studio." },
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

// Hover-reactive two-card preview for the Work menu, keyed by sub-item href.
type Preview = {
  ytId?: string;
  posterSrc?: string;
  href: string;
  title: string;
  line: string;
};
const WORK_PREVIEWS: Record<string, Preview[]> = {
  "/work": [
    { ytId: "TomnFVq3Bt4", href: "/work", title: "Vikram Sood", line: "Bharatvaarta" },
    { ytId: "Wd5h0gl5Cj0", href: "/work", title: "Saurabh Mukherjea", line: "Bharatvaarta" },
  ],
  "/work/archive": [
    { ytId: "f1hRTb6MIZ8", href: "/work/archive", title: "Manish Sabharwal", line: "Long-form podcast" },
    { ytId: "_RR2a1bh1T0", href: "/work/archive", title: "Bureau Podcast", line: "Bureau" },
  ],
  "/case-studies": [
    { posterSrc: "https://vumbnail.com/1169858825.jpg", href: "/case-studies/bharatvaarta", title: "Bharatvaarta", line: "100+ episodes" },
    { posterSrc: "https://vumbnail.com/1196195127.jpg", href: "/case-studies/qapita", title: "Qapita", line: "The Catapult Code" },
  ],
};
const WORK_DEFAULT = "/work";

const under = (p: string, href: string) => p === href || p.startsWith(`${href}/`);
const isActive = (p: string, c: Category) =>
  c.items ? c.items.some((i) => under(p, i.href)) : under(p, c.href);

export default function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [hoveredTop, setHoveredTop] = useState<string | null>(null);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setOpenCat(null);
    setMobileOpen(false);
  }, [pathname]);

  // reset the spotlight to its default when a different menu opens
  useEffect(() => {
    setHoveredWork(null);
  }, [openCat]);

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
  const pillT = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 38 };

  const activeLabel = categories.find((c) => isActive(pathname, c))?.label ?? null;
  const pillLabel = hoveredTop ?? activeLabel;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      {/* full-page backdrop blur + dim behind an open megamenu (desktop) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            onMouseEnter={scheduleClose}
            className="fixed inset-0 -z-10 hidden bg-bg/55 backdrop-blur-md lg:block"
          />
        )}
      </AnimatePresence>
      <motion.div
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={scheduleClose}
        initial={{ borderRadius: 12 }}
        animate={{ borderRadius: isOpen ? 16 : 12 }}
        transition={smooth}
        className="glass edge-gradient relative mx-auto max-w-[1080px] overflow-hidden"
      >
        {/* darken the glass so the links stay legible over a bright backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-bg/55" />

        {/* top bar */}
        <div className="relative z-10 flex h-[66px] items-center justify-between gap-4 pl-5 pr-4">
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
          <ul
            onMouseLeave={() => setHoveredTop(null)}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex"
          >
            {categories.map((c) => {
              const highlight = pillLabel === c.label;
              const textCls = highlight
                ? "text-text"
                : "text-text/85 hover:text-text";
              const pill = highlight && (
                <motion.span
                  layoutId="nav-pill"
                  transition={pillT}
                  className="absolute inset-0 rounded-[var(--radius-btn)] border border-line-strong bg-white/[0.07] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.14),0_0_16px_-6px_oklch(0.8_0.08_150/0.55)]"
                />
              );

              if (!c.items) {
                return (
                  <li
                    key={c.label}
                    onMouseEnter={() => {
                      open(null);
                      setHoveredTop(c.label);
                    }}
                  >
                    <div className="relative">
                      {pill}
                      <Link
                        href={c.href}
                        className={`relative z-10 block rounded-[var(--radius-btn)] px-3.5 py-1.5 text-[0.95rem] font-medium transition-colors ${textCls}`}
                      >
                        {c.label}
                      </Link>
                    </div>
                  </li>
                );
              }

              const isThis = openCat === c.label;
              return (
                <li
                  key={c.label}
                  onMouseEnter={() => {
                    open(c.label);
                    setHoveredTop(c.label);
                  }}
                >
                  <div className="relative">
                    {pill}
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isThis}
                      onFocus={() => {
                        open(c.label);
                        setHoveredTop(c.label);
                      }}
                      className={`relative z-10 inline-flex items-center gap-1 rounded-[var(--radius-btn)] px-3.5 py-1.5 text-[0.95rem] font-medium transition-colors ${textCls}`}
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
                    </button>
                  </div>
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
                    className="min-h-[184px]"
                  >
                    {current!.label === "Work" ? (
                      <WorkMenu
                        items={current!.items}
                        preview={hoveredWork ?? WORK_DEFAULT}
                        onHover={setHoveredWork}
                        reduce={!!reduce}
                      />
                    ) : (
                      <div className="grid grid-cols-[1fr_300px] gap-6">
                        <div className="grid grid-cols-2 gap-1 self-start">
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
                        {current!.featured && (
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
                        )}
                      </div>
                    )}
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

function WorkMenu({
  items,
  preview,
  onHover,
  reduce,
}: {
  items: { label: string; href: string; desc: string }[];
  preview: string;
  onHover: (href: string) => void;
  reduce: boolean;
}) {
  const cards = WORK_PREVIEWS[preview] ?? WORK_PREVIEWS[WORK_DEFAULT];
  return (
    <div>
      {/* the three destinations, in one row */}
      <div className="grid grid-cols-3 gap-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            onMouseEnter={() => onHover(it.href)}
            onFocus={() => onHover(it.href)}
            className="group/item flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
          >
            <span className="flex items-center gap-1.5 text-sm font-medium text-text">
              {it.label}
              <span className="-translate-x-1 text-text-faint opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                →
              </span>
            </span>
            <span className="text-xs text-text-faint">{it.desc}</span>
          </Link>
        ))}
      </div>

      {/* two-card preview; structure is constant across sets so the swap never
          shifts layout. Crossfade on hover, instant under reduced-motion. */}
      <div className="mt-4 border-t border-line pt-4">
        <motion.div
          key={preview}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid max-w-[760px] grid-cols-2 gap-4"
        >
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group/card flex flex-col overflow-hidden rounded-xl border border-line transition-colors hover:border-accent/30"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-bg-sunken">
                {c.ytId ? (
                  <Thumb
                    id={c.ytId}
                    alt={c.title}
                    className="brightness-[0.85] transition-[filter] duration-300 group-hover/card:brightness-100"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.posterSrc}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover brightness-[0.85] transition-[filter] duration-300 group-hover/card:brightness-100"
                  />
                )}
              </div>
              <div className="px-3 py-2.5">
                <p className="text-sm text-text">{c.title}</p>
                <p className="text-xs text-text-faint">{c.line}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
