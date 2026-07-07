"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import Thumb from "./Thumb";
import { Magnetic, PrimaryButton } from "./ui";

// Floating glass nav, flattened. Every destination is a real link in the bar;
// only Work expands — on hover — into the footage megamenu, because it is the
// one menu that earns the space (a video studio's nav should show video). The
// panel opens pre-populated, never onto a void. The bar condenses as you
// scroll: narrower and a shade more opaque, an instrument panel rather than a
// slab. Mobile: hamburger-left / logo-centre / CTA-right, flat overlay.

type NavLink = { label: string; href: string; menu?: boolean };

const LINKS: NavLink[] = [
  { label: "Work", href: "/portfolio", menu: true },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Newsletter", href: "/newsletter" },
];

// The sections of the site each top link claims, for the active pill.
const OWNS: Record<string, string[]> = {
  Work: ["/portfolio", "/testimonials", "/case-studies"],
  Process: ["/process", "/virtual"],
  About: ["/about"],
  Newsletter: ["/newsletter"],
};

const WORK_ITEMS = [
  {
    label: "Portfolio",
    href: "/portfolio",
    desc: "The shows we produce, episode by episode.",
  },
  {
    label: "Full archive",
    href: "/portfolio/archive",
    desc: "Every episode and clip. Filter by client or format.",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    desc: "Clients on the shows we built with them.",
  },
];

// Hover-reactive preview cards, keyed by sub-item href. The portfolio row
// doubles as the panel's default so the menu never opens empty.
type Preview = {
  ytId?: string;
  posterSrc?: string;
  href: string;
  title: string;
  line: string;
};

const PORTFOLIO_PREVIEWS: Preview[] = [
  { ytId: "TomnFVq3Bt4", href: "/portfolio", title: "Vikram Sood", line: "Bharatvaarta" },
  { ytId: "Wd5h0gl5Cj0", href: "/portfolio", title: "Saurabh Mukherjea", line: "Bharatvaarta" },
  { ytId: "f1hRTb6MIZ8", href: "/portfolio", title: "Manish Sabharwal", line: "Bharatvaarta" },
];

const WORK_PREVIEWS: Record<string, Preview[]> = {
  "/portfolio": PORTFOLIO_PREVIEWS,
  "/portfolio/archive": [
    { posterSrc: "https://vumbnail.com/1172800968.jpg", href: "/portfolio/archive", title: "Read Reels", line: "Commercial" },
    { ytId: "f1hRTb6MIZ8", href: "/portfolio/archive", title: "Manish Sabharwal", line: "Long-form podcast" },
    { posterSrc: "https://vumbnail.com/1169858512.jpg", href: "/portfolio/archive", title: "ORMH", line: "Product film" },
  ],
  "/testimonials": [
    { posterSrc: "https://vumbnail.com/1169858825.jpg", href: "/case-studies/bharatvaarta", title: "Bharatvaarta", line: "Politics · Policy · Culture" },
    { posterSrc: "https://vumbnail.com/1195342176.jpg", href: "/case-studies/bureau", title: "Bureau", line: "Fintech · Fraud Prevention" },
    { posterSrc: "https://vumbnail.com/1196195127.jpg", href: "/case-studies/qapita", title: "Qapita", line: "Founder stories" },
  ],
};

// Mobile overlay: the four primary links in display type, then the rest of the
// site in a quiet two-column grid. No accordions — the IA is flat now.
const MORE = [
  { label: "Testimonials", href: "/testimonials" },
  { label: "Full archive", href: "/portfolio/archive" },
  { label: "Remote production", href: "/virtual" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "State of B2B Podcasts", href: "/state-of-b2b-podcasts-2026" },
];

const under = (p: string, href: string) => p === href || p.startsWith(`${href}/`);

export default function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredTop, setHoveredTop] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const subTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Mirror of menuOpen so timer callbacks never read a stale value.
  const isOpenRef = useRef(false);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    isOpenRef.current = menuOpen;
  }, [menuOpen]);

  // reset the preview spotlight whenever the panel opens fresh
  useEffect(() => {
    if (menuOpen) setHoveredSub(null);
  }, [menuOpen]);

  // condense the bar once the page is actually scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
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

  useEffect(
    () => () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
      clearTimeout(subTimer.current);
    },
    [],
  );

  // Immediate open (keyboard focus).
  const open = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };

  // Hover open with a short intent delay so accidental grazes don't flash the
  // panel; instant if it's already showing.
  const scheduleOpen = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    if (isOpenRef.current) return;
    openTimer.current = setTimeout(() => setMenuOpen(true), 120);
  };

  // Close delay: long enough for a diagonal run into the panel (300ms from the
  // bar edge), shorter when the cursor lands on a sibling link (160ms).
  const scheduleClose = (delay = 300) => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), delay);
  };

  // Sub-item hover debounce — stops the preview flickering while the cursor
  // crosses the rail on its way to the cards.
  const scheduleSubHover = (href: string) => {
    clearTimeout(subTimer.current);
    subTimer.current = setTimeout(() => setHoveredSub(href), 180);
  };

  const smooth = { duration: reduce ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] as const };
  const fade = { duration: reduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] as const };
  const pillT = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 38 };

  const activeLabel =
    LINKS.find((l) => OWNS[l.label]?.some((h) => under(pathname, h)))?.label ??
    null;
  // While the panel is open the pill holds on Work; hover always wins.
  const pillLabel = hoveredTop ?? (menuOpen ? "Work" : activeLabel);

  const previewKey = hoveredSub ?? "/portfolio";
  const cards = WORK_PREVIEWS[previewKey] ?? PORTFOLIO_PREVIEWS;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      {/* full-page backdrop blur + dim behind the open megamenu (desktop) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            onMouseEnter={() => scheduleClose(300)}
            className="fixed inset-0 -z-10 hidden bg-bg/55 backdrop-blur-md lg:block"
          />
        )}
      </AnimatePresence>
      <motion.div
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={() => scheduleClose(300)}
        initial={{ borderRadius: 12 }}
        animate={{ borderRadius: menuOpen ? 16 : 12 }}
        transition={smooth}
        className={`glass relative z-50 mx-auto w-full overflow-hidden transition-[max-width,width] duration-500 ease-[var(--ease-out-quart)] ${
          scrolled ? "max-w-[1120px] lg:w-[76%]" : "max-w-[1400px] lg:w-[88%]"
        }`}
      >
        {/* darken the glass so the links stay legible over a bright backdrop;
            deepens further once the bar floats over scrolling content */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${
            scrolled ? "bg-bg/80" : "bg-bg/55"
          }`}
        />

        {/* top bar */}
        <div
          className={`relative z-10 flex items-center justify-between gap-4 px-4 transition-[height] duration-500 ease-[var(--ease-out-quart)] lg:pl-5 lg:pr-4 ${
            scrolled ? "h-[58px]" : "h-[66px]"
          }`}
        >
          {/* left: hamburger on mobile, logo + wordmark on desktop */}
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
              onMouseEnter={() => scheduleClose(160)}
              className="hidden items-center gap-2.5 lg:flex"
            >
              <Logo className="h-7 w-auto text-text" />
              <span className="hidden whitespace-nowrap font-medium tracking-tight text-text xl:block">
                Temporary Perspective
              </span>
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
            {LINKS.map((l) => {
              const highlight = pillLabel === l.label;
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

              if (!l.menu) {
                return (
                  <li
                    key={l.label}
                    onMouseEnter={() => {
                      scheduleClose(160);
                      setHoveredTop(l.label);
                    }}
                  >
                    <div className="relative">
                      {pill}
                      <Link
                        href={l.href}
                        className={`relative z-10 block rounded-[var(--radius-btn)] px-5 py-1.5 text-[1.05rem] font-semibold transition-colors ${textCls}`}
                      >
                        {l.label}
                      </Link>
                    </div>
                  </li>
                );
              }

              // Work: a real link that also expands the footage panel on hover.
              return (
                <li
                  key={l.label}
                  onMouseEnter={() => {
                    setHoveredTop(l.label);
                    scheduleOpen();
                  }}
                >
                  <div className="relative">
                    {pill}
                    <Link
                      href={l.href}
                      aria-expanded={menuOpen}
                      aria-controls="work-menu"
                      onFocus={open}
                      className={`relative z-10 inline-flex items-center gap-1 rounded-[var(--radius-btn)] px-5 py-1.5 text-[1.05rem] font-semibold transition-colors ${textCls}`}
                    >
                      {l.label}
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-3 w-3 text-text-faint transition-transform duration-300 ${
                          menuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* right: Book a call (both breakpoints) */}
          <div className="flex items-center">
            <div
              className="hidden lg:block"
              onMouseEnter={() => scheduleClose(160)}
            >
              <Magnetic>
                <PrimaryButton href="/contact">Book a call</PrimaryButton>
              </Magnetic>
            </div>
            <PrimaryButton href="/contact" className="h-9 px-4 text-sm lg:hidden">
              Book a call
            </PrimaryButton>
          </div>
        </div>

        {/* the Work panel (desktop) */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="panel"
              id="work-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={smooth}
              className="relative z-10 hidden lg:block"
            >
              <div className="border-t border-line px-5 py-5">
                <div className="grid grid-cols-[220px_1fr] gap-10">
                  <DestList
                    items={WORK_ITEMS}
                    onHover={scheduleSubHover}
                    active={hoveredSub}
                    subPillId="work-sub-pill"
                  />
                  <div className="min-h-[200px]">
                    <motion.div
                      key={previewKey}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={fade}
                      className="grid grid-cols-3 gap-4"
                    >
                      {cards.map((c) => (
                        <PreviewCard key={c.title} c={c} />
                      ))}
                    </motion.div>
                  </div>
                </div>
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
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="border-b border-line py-4 font-display text-2xl font-medium tracking-tight text-text"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
            More
          </p>
          <div className="mt-2 grid grid-cols-2 gap-x-6">
            {MORE.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2.5 text-base text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
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

function PreviewCard({ c }: { c: Preview }) {
  return (
    <Link
      href={c.href}
      className="group/card flex flex-col overflow-hidden rounded-xl border border-line transition-colors hover:border-accent/40"
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
      <div className="px-3.5 py-3">
        <p className="text-[0.95rem] text-text">{c.title}</p>
        <p className="text-sm text-text-faint">{c.line}</p>
      </div>
    </Link>
  );
}

// Left rail of stacked destinations; a shared-layout pill tracks the one being
// previewed.
function DestList({
  items,
  onHover,
  active,
  subPillId,
}: {
  items: { label: string; href: string; desc: string }[];
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
