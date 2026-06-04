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
type Category =
  | { label: string; items: Item[]; href?: never }
  | { label: string; href: string; items?: never };

const categories: Category[] = [
  {
    label: "Work",
    items: [
      { label: "Portfolio", href: "/portfolio", desc: "The shows we produce, episode by episode." },
      { label: "Full archive", href: "/portfolio/archive", desc: "Every episode and clip. Filter by client or format." },
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
  },
  { label: "Newsletter", href: "/newsletter" },
];

// Hover-reactive preview cards for the Work menu, keyed by sub-item href.
type Preview = {
  ytId?: string;
  posterSrc?: string;
  href: string;
  title: string;
  line: string;
  vertical?: boolean;
};
const WORK_PREVIEWS: Record<string, Preview[]> = {
  // Work tab, nothing hovered: show nothing.
  default: [],
  // Portfolio → three works.
  "/portfolio": [
    { ytId: "TomnFVq3Bt4", href: "/portfolio", title: "Vikram Sood", line: "Bharatvaarta" },
    { ytId: "Wd5h0gl5Cj0", href: "/portfolio", title: "Saurabh Mukherjea", line: "Bharatvaarta" },
    { ytId: "f1hRTb6MIZ8", href: "/portfolio", title: "Manish Sabharwal", line: "Bharatvaarta" },
  ],
  // Full archive → a bento: one vertical reel + two horizontal cuts.
  "/portfolio/archive": [
    { posterSrc: "https://vumbnail.com/1197947260.jpg", href: "/portfolio/archive", title: "Mudrex", line: "Short-form reel", vertical: true },
    { posterSrc: "https://vumbnail.com/1172800968.jpg", href: "/portfolio/archive", title: "Read Reels", line: "Commercial" },
    { ytId: "f1hRTb6MIZ8", href: "/portfolio/archive", title: "Manish Sabharwal", line: "Long-form podcast" },
  ],
  // Case studies → all three.
  "/case-studies": [
    { posterSrc: "https://vumbnail.com/1196195127.jpg", href: "/case-studies/qapita", title: "Qapita", line: "The Catapult Code" },
    { ytId: "TomnFVq3Bt4", href: "/case-studies/bharatvaarta", title: "Bharatvaarta", line: "100+ episodes" },
    { posterSrc: "https://vumbnail.com/1195342176.jpg", href: "/case-studies/bureau", title: "Bureau", line: "Fraud Forum" },
  ],
};
const WORK_DEFAULT = "default";

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
        className="glass relative mx-auto w-full max-w-[1400px] overflow-hidden lg:w-[88%]"
      >
        {/* darken the glass so the links stay legible over a bright backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-bg/55" />

        {/* top bar */}
        <div className="relative z-10 flex h-[66px] items-center justify-between gap-4 px-4 lg:pl-5 lg:pr-4">
          {/* left: hamburger on mobile, logo on desktop */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="relative -ml-1 inline-flex h-11 w-11 items-center justify-center text-text lg:hidden"
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
            <Link
              href="/"
              aria-label="Temporary Perspective, home"
              onMouseEnter={() => open(null)}
              className="hidden items-center lg:flex"
            >
              <Logo className="h-7 w-auto text-text" />
            </Link>
          </div>

          {/* center logo — mobile only */}
          <Link
            href="/"
            aria-label="Temporary Perspective, home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden"
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
                        className={`relative z-10 block rounded-[var(--radius-btn)] px-4 py-1.5 text-[1.05rem] font-semibold transition-colors ${textCls}`}
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
                      className={`relative z-10 inline-flex items-center gap-1 rounded-[var(--radius-btn)] px-4 py-1.5 text-[1.05rem] font-semibold transition-colors ${textCls}`}
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

          {/* right: Book a call (both breakpoints) */}
          <div className="flex items-center">
            <div className="hidden lg:block" onMouseEnter={() => open(null)}>
              <Magnetic>
                <PrimaryButton href="/contact">Book a call</PrimaryButton>
              </Magnetic>
            </div>
            <PrimaryButton href="/contact" className="h-9 px-4 text-sm lg:hidden">
              Book a call
            </PrimaryButton>
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
                      <div className="grid max-w-[820px] auto-rows-fr grid-cols-2 gap-x-10 gap-y-2">
                        {current!.items.map((it) => (
                          <Link
                            key={it.href}
                            href={it.href}
                            className="group/item flex h-full flex-col justify-center gap-1 rounded-lg px-4 py-3 transition-colors hover:bg-white/[0.04]"
                          >
                            <span className="flex items-center gap-1.5 text-base font-medium text-text">
                              {it.label}
                              <span className="-translate-x-1 text-text-faint opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                                →
                              </span>
                            </span>
                            <span className="text-sm text-text-faint">{it.desc}</span>
                          </Link>
                        ))}
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
  const verticals = cards.filter((c) => c.vertical);
  const horizontals = cards.filter((c) => !c.vertical);
  const mixed = verticals.length > 0;

  return (
    <div className="grid grid-cols-[220px_1fr] gap-10">
      {/* stacked destinations */}
      <div className="flex flex-col gap-1 self-start">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            onMouseEnter={() => onHover(it.href)}
            onFocus={() => onHover(it.href)}
            className="group/item flex flex-col gap-1 rounded-lg px-4 py-3 transition-colors hover:bg-white/[0.05]"
          >
            <span className="flex items-center gap-1.5 text-base font-medium text-text">
              {it.label}
              <span className="-translate-x-1 text-text-faint opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                →
              </span>
            </span>
            <span className="text-sm text-text-faint">{it.desc}</span>
          </Link>
        ))}
      </div>

      {/* adaptive preview — empty on bare "Work"; a bento that fills the area on
          each sub-item hover (no huge empty space) */}
      <div className="min-h-[220px]">
        {cards.length > 0 && (
          <motion.div
            key={preview}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {mixed ? (
              <div className="grid grid-cols-[minmax(0,340px)_minmax(0,520px)] items-start justify-start gap-4">
                {verticals.map((c) => (
                  <PreviewCard key={c.title} c={c} aspect="aspect-[9/16]" />
                ))}
                <div className="flex flex-col gap-4">
                  {horizontals.map((c) => (
                    <PreviewCard key={c.title} c={c} aspect="aspect-video" />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${horizontals.length}, minmax(0, 1fr))`,
                }}
              >
                {horizontals.map((c) => (
                  <PreviewCard key={c.title} c={c} aspect="aspect-video" />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function PreviewCard({ c, aspect }: { c: Preview; aspect: string }) {
  return (
    <Link
      href={c.href}
      className="group/card flex flex-col overflow-hidden rounded-xl border border-line transition-colors hover:border-accent/40"
    >
      <div className={`relative w-full overflow-hidden bg-bg-sunken ${aspect}`}>
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
      <div className="px-3.5 py-3">
        <p className="text-[0.95rem] text-text">{c.title}</p>
        <p className="text-sm text-text-faint">{c.line}</p>
      </div>
    </Link>
  );
}
