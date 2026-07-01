"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import Thumb from "./Thumb";
import { team } from "@/lib/work";
import { Magnetic, PrimaryButton } from "./ui";

// Floating glass nav that morphs. Inspired by sarvam.ai (feel only): a detached
// rounded bar with flat, always-visible links; hovering a category smoothly
// expands the *same* bar into a megamenu, its height and corner radius animating
// together. A shared-layout pill slides between the top-level links (hover +
// active). The Work menu previews footage of whichever item is hovered. No
// desktop Menu toggle; mobile falls back to a hamburger accordion overlay.

type Item = { label: string; href: string; desc: string };
// Every top-level category is a real link (hard click navigates). Categories
// with `items` also expand a hover/focus megamenu; the label itself still
// navigates to its landing page on click.
type Category = { label: string; href: string; items?: Item[] };

const categories: Category[] = [
  {
    label: "Work",
    href: "/portfolio",
    items: [
      { label: "Portfolio", href: "/portfolio", desc: "The shows we produce, episode by episode." },
      { label: "Full archive", href: "/portfolio/archive", desc: "Every episode and clip. Filter by client or format." },
      { label: "Testimonials", href: "/testimonials", desc: "Clients on the shows we built with them." },
    ],
  },
  {
    label: "Studio",
    href: "/process",
    items: [
      { label: "Our process", href: "/process", desc: "How we run a show." },
      { label: "Remote production", href: "/virtual", desc: "When your guest's in another city." },
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
  // Full archive → three horizontal cuts across formats.
  "/portfolio/archive": [
    { posterSrc: "https://vumbnail.com/1172800968.jpg", href: "/portfolio/archive", title: "Read Reels", line: "Commercial" },
    { ytId: "f1hRTb6MIZ8", href: "/portfolio/archive", title: "Manish Sabharwal", line: "Long-form podcast" },
    { posterSrc: "https://vumbnail.com/1169858512.jpg", href: "/portfolio/archive", title: "ORMH", line: "Product film" },
  ],
  // Testimonials → the three case-study clients (entry points into each show's
  // long-form case study).
  "/testimonials": [
    { posterSrc: "https://vumbnail.com/1169858825.jpg", href: "/case-studies/bharatvaarta", title: "Bharatvaarta", line: "Politics · Policy · Culture" },
    { posterSrc: "https://vumbnail.com/1195342176.jpg", href: "/case-studies/bureau", title: "Bureau", line: "Fintech · Fraud Prevention" },
    { posterSrc: "https://vumbnail.com/1196195127.jpg", href: "/case-studies/qapita", title: "Qapita", line: "Founder stories" },
  ],
};
const WORK_DEFAULT = "default";

// Remote production preview: two recent remote podcast episodes.
const REMOTE_PREVIEWS: Preview[] = [
  {
    ytId: "ck7wQT4dPVs",
    href: "https://www.youtube.com/watch?v=ck7wQT4dPVs",
    title: "Cold War 2.0 Explained",
    line: "Velina Tchakarova · Remote production",
  },
  {
    ytId: "w-LissfW42g",
    href: "https://youtu.be/w-LissfW42g",
    title: "India's Hardest Choices 2026",
    line: "Roshan Cariappa · Remote production",
  },
];

// Studio menu — process steps (with deep-link hrefs for each phase).
const STUDIO_PROCESS = [
  { n: "01", label: "Guest Prep", body: "Briefs both sides.", href: "/process#guest-prep" },
  { n: "02", label: "Production", body: "Multi-cam, lit, sound.", href: "/process#production" },
  { n: "03", label: "Post", body: "Edit, grade, clips.", href: "/process#post" },
  { n: "04", label: "Growth", body: "Published, grown.", href: "/process#growth" },
];

// Two-letter initials for the team tiles (matches the /about fallback).
function monogram(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
}
// The recognizable name (the studio is known by "Moksh", not "Angara").
function shortName(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts[0] : name;
}

const under = (p: string, href: string) => p === href || p.startsWith(`${href}/`);
const isActive = (p: string, c: Category) =>
  c.items ? c.items.some((i) => under(p, i.href)) : under(p, c.href);

export default function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [hoveredTop, setHoveredTop] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const subHoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Mirror of openCat in a ref so timer callbacks always see the latest value
  // without introducing stale closures or extra deps.
  const menuIsOpen = useRef(false);

  useEffect(() => {
    setOpenCat(null);
    setMobileOpen(false);
  }, [pathname]);

  // Keep the ref in sync so timers see current state.
  useEffect(() => { menuIsOpen.current = openCat !== null; }, [openCat]);

  // reset the spotlight to its default when a different menu opens
  useEffect(() => {
    setHoveredSub(null);
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

  // Immediate open (for keyboard focus, logo hover, Newsletter hover).
  const open = (label: string | null) => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setOpenCat(label);
  };

  // Delayed open so accidental grazes don't flash the panel.
  // If a panel is already showing, switch category immediately (no delay feels
  // right when the user is actively browsing the nav).
  const scheduleOpen = (label: string) => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    if (menuIsOpen.current) {
      setOpenCat(label);
    } else {
      openTimer.current = setTimeout(() => setOpenCat(label), 250);
    }
  };

  // Close delay: 350 ms — comfortable for diagonal movement to the panel,
  // and noticeable enough that the menu doesn't feel like it vanishes.
  const scheduleClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpenCat(null), 350);
  };

  // Sub-item hover debounce — prevents the panel from flickering when the
  // cursor crosses a left-rail item on its way to the preview content.
  // 180 ms is long enough to filter accidental grazes, short enough that an
  // intentional hover still feels instant.
  const scheduleSubHover = (href: string) => {
    clearTimeout(subHoverTimer.current);
    subHoverTimer.current = setTimeout(() => setHoveredSub(href), 180);
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
  // Fix: when inside the panel (hoveredTop cleared by ul onMouseLeave),
  // fall back to openCat so the top pill stays on the open category.
  const pillLabel = hoveredTop ?? (openCat ?? activeLabel);

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
        className="glass relative z-50 mx-auto w-full max-w-[1400px] overflow-hidden lg:w-[88%]"
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
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex"
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
                        className={`relative z-10 block rounded-[var(--radius-btn)] px-5 py-1.5 text-[1.05rem] font-semibold transition-colors ${textCls}`}
                      >
                        {c.label}
                      </Link>
                    </div>
                  </li>
                );
              }

              // Work / Studio: click-only toggle, no hover open.
              const isThis = openCat === c.label;
              return (
                <li
                  key={c.label}
                  onMouseEnter={() => setHoveredTop(c.label)}
                >
                  <div className="relative">
                    {pill}
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isThis}
                      onClick={() => {
                        if (openCat === c.label) {
                          open(null);
                        } else {
                          open(c.label);
                          setHoveredTop(c.label);
                        }
                      }}
                      className={`relative z-10 inline-flex items-center gap-1 rounded-[var(--radius-btn)] px-5 py-1.5 text-[1.05rem] font-semibold transition-colors ${textCls}`}
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
                        preview={hoveredSub ?? WORK_DEFAULT}
                        onHover={setHoveredSub}
                        active={hoveredSub}
                        reduce={!!reduce}
                      />
                    ) : current!.label === "Studio" ? (
                      <StudioMenu
                        items={current!.items}
                        hovered={hoveredSub ?? ""}
                        onHover={scheduleSubHover}
                        active={hoveredSub}
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
  active,
  reduce,
}: {
  items: { label: string; href: string; desc: string }[];
  preview: string;
  onHover: (href: string) => void;
  active: string | null;
  reduce: boolean;
}) {
  const cards = WORK_PREVIEWS[preview] ?? WORK_PREVIEWS[WORK_DEFAULT];
  const verticals = cards.filter((c) => c.vertical);
  const horizontals = cards.filter((c) => !c.vertical);
  const mixed = verticals.length > 0;

  return (
    <div className="grid grid-cols-[220px_1fr] gap-10">
      <DestList items={items} onHover={onHover} active={active} subPillId="work-sub-pill" />

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
  const isExternal = c.href.startsWith("http");
  const content = (
    <>
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
    </>
  );

  const cls =
    "group/card flex flex-col overflow-hidden rounded-xl border border-line transition-colors hover:border-accent/40";

  if (isExternal) {
    return (
      <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={c.href} className={cls}>
      {content}
    </Link>
  );
}

// Shared left rail of stacked destinations (Work + Studio menus).
// `active` is the currently previewed href; a shared-layout pill tracks it.
function DestList({
  items,
  onHover,
  active,
  subPillId,
}: {
  items: Item[];
  onHover: (href: string) => void;
  active: string | null;
  subPillId: string;
}) {
  return (
    <div className="flex flex-col gap-1 self-start">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          onMouseEnter={() => onHover(it.href)}
          onFocus={() => onHover(it.href)}
          className="group/item relative flex flex-col gap-1 rounded-lg px-4 py-3 transition-colors hover:bg-white/[0.03]"
        >
          {/* morphing active-pill inside the sub-menu */}
          {active === it.href && (
            <motion.span
              layoutId={subPillId}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="absolute inset-0 rounded-lg border border-line-strong bg-white/[0.06]"
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 text-base font-medium text-text">
            {it.label}
            <span className="-translate-x-1 text-text-faint opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
              →
            </span>
          </span>
          <span className="relative z-10 text-sm text-text-faint">{it.desc}</span>
        </Link>
      ))}
    </div>
  );
}

function StudioMenu({
  items,
  hovered,
  onHover,
  active,
  reduce,
}: {
  items: Item[];
  hovered: string;
  onHover: (href: string) => void;
  active: string | null;
  reduce: boolean;
}) {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-10">
      <DestList items={items} onHover={onHover} active={active} subPillId="studio-sub-pill" />
      {/* stage: no fixed height so previews can breathe; panel-level min-h handles the floor */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <StudioPreview href={hovered} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StudioPreview({ href }: { href: string }) {
  if (!href) return null;
  if (href === "/virtual") return <RemotePreview />;
  if (href === "/about") return <AboutPreview />;
  return <ProcessPreview />;
}

// The Process section: every-episode phases (each deep-linked) +
// a horizontal Branding strip for the foundational one-time step.
function ProcessPreview() {
  return (
    <div className="flex flex-col justify-center rounded-xl border border-line bg-bg-raised/20 p-5 transition-colors hover:border-line-strong">
      <div className="flex items-center justify-between">
        <span className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-text-faint">
          Every episode
        </span>
        <span className="text-[0.8125rem] text-text-faint">in under a week</span>
      </div>
      <ol className="mt-5 grid grid-cols-4 gap-x-4">
        {STUDIO_PROCESS.map((p) => (
          <li key={p.n}>
            <Link
              href={p.href}
              className="group/phase -mx-1 block rounded-lg px-1 py-1 transition-colors hover:bg-white/[0.06]"
            >
              <span className="font-mono text-xs text-text-faint">{p.n}</span>
              <span className="mt-1 block font-display text-[0.95rem] font-medium tracking-tight text-text">
                {p.label}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-snug text-text-muted">
                {p.body}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <div className="flex items-center justify-between text-[0.8125rem] text-text-faint">
          <span>Start</span>
          <span>Day 7</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-white/30 via-white/70 to-white shadow-[0_0_10px_-1px_oklch(0.99_0.002_264/0.55)]" />
        </div>
      </div>

      {/* Branding — the foundational one-time step, shown as a horizontal strip */}
      <Link
        href="/process#branding"
        className="group/brand mt-4 flex items-center justify-between rounded-lg border border-line bg-white/[0.03] px-4 py-2.5 transition-colors hover:border-line-strong hover:bg-white/[0.06]"
      >
        <div className="flex items-center gap-3">
          <span className="rounded-[3px] bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.6875rem] text-text-faint">
            00
          </span>
          <span className="font-display text-[0.9rem] font-medium tracking-tight text-text">
            Branding
          </span>
          <span className="hidden text-[0.8125rem] text-text-faint xl:block">
            Visual identity — built once, lives in every episode.
          </span>
        </div>
        <span className="-translate-x-1 text-text-faint opacity-0 transition-all duration-200 group-hover/brand:translate-x-0 group-hover/brand:opacity-100">
          →
        </span>
      </Link>
    </div>
  );
}

// Remote production: two recent remote-shot episodes as preview cards.
function RemotePreview() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="grid grid-cols-2 gap-4">
        {REMOTE_PREVIEWS.map((c) => (
          <PreviewCard key={c.title} c={c} aspect="aspect-video" />
        ))}
      </div>
      <p className="mt-3 text-sm text-text-faint">
        Same online format, shot like a studio. When your guest&apos;s in another city.
      </p>
    </div>
  );
}

// The whole team, every face treated identically. Shows headshot where
// available, monogram initials otherwise.
function AboutPreview() {
  return (
    <div className="flex flex-col justify-center py-1">
      <div className="grid grid-cols-5 gap-3">
        {team.map((m) => (
          <Link
            key={m.name}
            href="/about"
            className="group/face flex flex-col items-center gap-2 text-center"
          >
            <span className="sweep relative grid aspect-square w-full place-items-center overflow-hidden rounded-xl border border-line-strong bg-bg-raised/50 transition-colors duration-300">
              {m.headshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.headshot}
                  alt={m.name}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover/face:grayscale-0"
                />
              ) : (
                <span className="font-thunder text-[clamp(1.1rem,2vw,1.6rem)] uppercase leading-none text-text-faint transition-colors duration-300 group-hover/face:text-text">
                  {monogram(m.name)}
                </span>
              )}
            </span>
            <span className="text-[0.8125rem] leading-tight text-text">{shortName(m.name)}</span>
            <span className="text-xs leading-tight text-text-faint">{m.role}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
