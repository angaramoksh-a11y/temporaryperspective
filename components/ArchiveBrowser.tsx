"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type ResolvedWorkItem } from "@/lib/work";
import WorkLightbox from "./WorkLightbox";

const PER_PAGE = 48;

type Orient = "h" | "v";

const orientOf = (it: ResolvedWorkItem): Orient =>
  it.orientation === "vertical" ? "v" : "h";

// ─── icons ───────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function ArchiveBrowser({
  items,
  initialSlug,
}: {
  items: ResolvedWorkItem[];
  initialSlug?: string;
}) {
  const [query, setQuery] = useState("");
  const [selClients, setSelClients] = useState<string[]>([]);
  const [selFormats, setSelFormats] = useState<string[]>([]);
  const [limit, setLimit] = useState(PER_PAGE);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [active, setActive] = useState<ResolvedWorkItem | null>(() =>
    initialSlug ? items.find((i) => i.slug === initialSlug) ?? null : null,
  );
  // Deep links into a vertical piece open the library in vertical mode.
  const [orient, setOrient] = useState<Orient>(() => {
    const it = initialSlug ? items.find((i) => i.slug === initialSlug) : null;
    return it ? orientOf(it) : "h";
  });
  const searchRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ── derived facets ────────────────────────────────────────────────────────
  const tokens = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query],
  );
  const matchesQuery = useCallback(
    (it: ResolvedWorkItem) => {
      if (!tokens.length) return true;
      const hay = `${it.client} ${it.format} ${(it.tags ?? []).join(" ")} ${
        it.desc ?? ""
      } ${it.title ?? ""} ${it.slug}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    },
    [tokens],
  );

  // Library size per orientation (query-aware, so the tabs answer "what's there")
  const tabCounts = useMemo(() => {
    const c: Record<Orient, number> = { h: 0, v: 0 };
    for (const it of items) if (matchesQuery(it)) c[orientOf(it)]++;
    return c;
  }, [items, matchesQuery]);

  // Which formats / clients exist per orientation (from the full catalog, so
  // switching modes can never strand a selection on an impossible facet).
  const formatsIn = useMemo(() => {
    const m: Record<Orient, string[]> = { h: [], v: [] };
    for (const it of items) {
      const o = orientOf(it);
      if (!m[o].includes(it.format)) m[o].push(it.format);
    }
    return m;
  }, [items]);
  const clientsIn = useMemo(() => {
    const m: Record<Orient, string[]> = { h: [], v: [] };
    for (const it of items) {
      const o = orientOf(it);
      if (!m[o].includes(it.client)) m[o].push(it.client);
    }
    m.h.sort();
    m.v.sort();
    return m;
  }, [items]);

  // Live counts per option, respecting every other active facet.
  const formatCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of items) {
      if (orientOf(it) !== orient || !matchesQuery(it)) continue;
      if (selClients.length && !selClients.includes(it.client)) continue;
      m.set(it.format, (m.get(it.format) ?? 0) + 1);
    }
    return m;
  }, [items, orient, matchesQuery, selClients]);
  const clientCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of items) {
      if (orientOf(it) !== orient || !matchesQuery(it)) continue;
      if (selFormats.length && !selFormats.includes(it.format)) continue;
      m.set(it.client, (m.get(it.client) ?? 0) + 1);
    }
    return m;
  }, [items, orient, matchesQuery, selFormats]);

  const filtered = useMemo(
    () =>
      items.filter(
        (it) =>
          orientOf(it) === orient &&
          matchesQuery(it) &&
          (!selClients.length || selClients.includes(it.client)) &&
          (!selFormats.length || selFormats.includes(it.format)),
      ),
    [items, orient, matchesQuery, selClients, selFormats],
  );
  const shown = filtered.slice(0, limit);
  const hasFilters = !!(query || selClients.length || selFormats.length);

  // ── actions ───────────────────────────────────────────────────────────────
  const switchOrient = (o: Orient) => {
    if (o === orient) return;
    setOrient(o);
    setSelFormats((s) => s.filter((f) => formatsIn[o].includes(f)));
    setSelClients((s) => s.filter((c) => clientsIn[o].includes(c)));
  };
  const toggleFormat = (f: string) =>
    setSelFormats((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));
  const toggleClient = (c: string) =>
    setSelClients((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const clearAll = () => {
    setQuery("");
    setSelClients([]);
    setSelFormats([]);
  };

  // ── effects ───────────────────────────────────────────────────────────────
  // Prefill from ?q=
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  // Keep URL in sync with open item
  useEffect(() => {
    const base = "/portfolio/archive";
    const want = active ? `${base}/${active.slug}` : base;
    if (window.location.pathname.replace(/\/$/, "") !== want) {
      window.history.pushState(null, "", want + window.location.search);
    }
  }, [active]);

  // Browser back/forward
  useEffect(() => {
    const onPop = () => {
      const m = window.location.pathname.match(/\/portfolio\/archive\/(.+?)\/?$/);
      const slug = m ? decodeURIComponent(m[1]) : null;
      setActive(slug ? items.find((i) => i.slug === slug) ?? null : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [items]);

  // ⌘K / Ctrl+K → focus search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Facet changes: re-arm the page size and, when the user is deep in the
  // grid, bring the top of the results back under the deck.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setLimit(PER_PAGE);
    const el = gridRef.current;
    if (el && el.getBoundingClientRect().top < 180) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [orient, selClients, selFormats]);
  useEffect(() => setLimit(PER_PAGE), [query]);

  // A search that only matches the other orientation must not dead-end: with no
  // chips narrowing things, hop to the side that has the results. Guarded so it
  // fires only when the query itself changes — never when the user explicitly
  // picks a tab.
  const lastAutoQuery = useRef("");
  useEffect(() => {
    if (query === lastAutoQuery.current) return;
    lastAutoQuery.current = query;
    if (!query.trim() || selFormats.length || selClients.length) return;
    const other: Orient = orient === "h" ? "v" : "h";
    if (tabCounts[orient] === 0 && tabCounts[other] > 0) switchOrient(other);
  });

  // ── layout ────────────────────────────────────────────────────────────────
  const gridCols =
    orient === "v"
      ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";
  const tileAspect = orient === "v" ? "aspect-[9/16]" : "aspect-video";
  const gridKey = `${orient}|${selFormats.join("+")}|${selClients.join("+")}`;

  return (
    <section className="relative">
      {/* ── control deck: a second glass slab, same width as the nav ───────── */}
      <div className="sticky top-[84px] z-40 px-3 sm:top-[88px] sm:px-4">
        <div className="glass mx-auto w-full max-w-[1400px] rounded-2xl lg:w-[88%]">

          {/* row 1: orientation tabs · client · search */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 sm:gap-2 sm:px-4">
            {/* mobile search takeover */}
            {mobileSearch && (
              <div className="flex flex-1 items-center gap-2 sm:hidden">
                <div className="relative flex flex-1 items-center text-text-faint">
                  <span className="pointer-events-none absolute left-3.5">
                    <SearchIcon />
                  </span>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the library"
                    aria-label="Search the archive"
                    className="h-9 w-full rounded-full border border-line bg-bg-sunken/70 pl-9 pr-3 text-sm text-text outline-none transition-[border-color] placeholder:text-text-faint focus:border-white/25"
                  />
                </div>
                <button
                  onClick={() => {
                    setQuery("");
                    setMobileSearch(false);
                  }}
                  aria-label="Close search"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-text-muted transition-colors hover:text-text"
                >
                  ✕
                </button>
              </div>
            )}

            <div
              className={`${
                mobileSearch ? "hidden sm:flex" : "flex"
              } flex-1 items-center gap-2`}
            >
              {/* orientation tabs — labeled, with live counts */}
              <div
                role="group"
                aria-label="Orientation"
                className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-line bg-bg-sunken/70 p-1"
              >
                {(["h", "v"] as const).map((o) => {
                  const on = orient === o;
                  return (
                    <button
                      key={o}
                      onClick={() => switchOrient(o)}
                      aria-pressed={on}
                      className={`flex h-8 items-center gap-2 rounded-full px-3 text-[0.8125rem] font-medium transition-colors duration-200 sm:px-4 ${
                        on ? "bg-text text-bg" : "text-text-muted hover:text-text"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`hidden rounded-[3px] border sm:inline-block ${
                          o === "h" ? "h-2.5 w-4" : "h-4 w-2.5"
                        } ${on ? "border-bg/70" : "border-current opacity-60"}`}
                      />
                      {o === "h" ? "Landscape" : "Vertical"}
                      <span
                        className={`hidden text-xs sm:inline ${
                          on ? "text-bg/60" : "text-text-faint"
                        }`}
                      >
                        {tabCounts[o]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="ml-auto flex items-center gap-2">
                {/* client menu */}
                <FilterMenu
                  label="Client"
                  options={clientsIn[orient].map((c) => ({
                    value: c,
                    count: clientCounts.get(c) ?? 0,
                  }))}
                  selected={selClients}
                  onToggle={toggleClient}
                  onClear={() => setSelClients([])}
                />

                {/* search — compact, desktop */}
                <div className="relative hidden items-center text-text-faint sm:flex">
                  <span className="pointer-events-none absolute left-3.5">
                    <SearchIcon />
                  </span>
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    aria-label="Search the archive"
                    className="h-9 w-44 rounded-full border border-line bg-bg-sunken/70 pl-9 pr-9 text-sm text-text outline-none transition-[border-color] placeholder:text-text-faint focus:border-white/25 lg:w-52"
                  />
                  {query ? (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-1.5 grid h-6 w-6 place-items-center rounded-full text-text-faint transition-colors hover:text-text"
                    >
                      ✕
                    </button>
                  ) : (
                    <kbd
                      aria-hidden
                      className="pointer-events-none absolute right-3 inline-flex h-5 items-center rounded border border-line px-1.5 font-mono text-[10px] text-text-faint"
                    >
                      ⌘K
                    </kbd>
                  )}
                </div>

                {/* search — icon trigger, mobile */}
                <button
                  onClick={() => setMobileSearch(true)}
                  aria-label="Search the archive"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-bg-sunken/70 text-text-muted transition-colors hover:text-text sm:hidden"
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>

          {/* row 2: format chips, scoped to the current orientation */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-t border-line px-3 py-2.5 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
            <Chip active={selFormats.length === 0} onClick={() => setSelFormats([])}>
              All
            </Chip>
            {formatsIn[orient].map((f) => {
              const n = formatCounts.get(f) ?? 0;
              const on = selFormats.includes(f);
              return (
                <Chip
                  key={f}
                  active={on}
                  disabled={!n && !on}
                  onClick={() => toggleFormat(f)}
                >
                  {f}
                  <span className={`text-xs ${on ? "text-text-muted" : "text-text-faint"}`}>
                    {n}
                  </span>
                </Chip>
              );
            })}
            {selClients.length > 0 && (
              <span aria-hidden className="mx-1 h-4 w-px shrink-0 bg-line" />
            )}
            {selClients.map((c) => (
              <Chip key={c} active removable onClick={() => toggleClient(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* ── results ──────────────────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        className="scroll-mt-[11.5rem] px-6 pb-12 pt-8 lg:px-4 lg:pb-16 lg:pt-10"
      >
        <div className="mx-auto w-full max-w-[1400px] lg:w-[88%]">
        <div className="mb-6 flex items-baseline gap-4">
          <p className="text-sm text-text-faint">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-sm text-text-faint underline decoration-line underline-offset-4 transition-colors hover:text-text"
            >
              Clear all
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          (() => {
            const other: Orient = orient === "h" ? "v" : "h";
            const otherCount = tokens.length ? tabCounts[other] : 0;
            const here = orient === "h" ? "landscape" : "vertical";
            const there = other === "h" ? "Landscape" : "Vertical";
            return (
              <div className="flex flex-col items-center py-20 text-center">
                <p className="text-text-muted">
                  {otherCount > 0
                    ? `No ${here} matches.`
                    : "Nothing in the library matches."}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {otherCount > 0 && (
                    <button
                      onClick={() => switchOrient(other)}
                      className="sweep inline-flex h-10 items-center rounded-full bg-text px-5 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                    >
                      {otherCount} {otherCount === 1 ? "match" : "matches"} in {there} →
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="sweep inline-flex h-10 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-text-muted transition-colors hover:text-text"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            );
          })()
        ) : (
          <div
            key={gridKey}
            className={`grid-rise grid ${gridCols} gap-x-4 gap-y-7 lg:gap-x-5`}
          >
            {shown.map((it) => {
              const title = it.title ?? it.desc ?? it.client;
              const sub =
                it.title || it.desc ? `${it.client} · ${it.format}` : it.format;
              return (
                <button
                  key={it.key}
                  onClick={() => setActive(it)}
                  aria-label={`Play ${it.client}, ${it.format}`}
                  className="group block text-left"
                >
                  <div
                    className={`relative ${tileAspect} overflow-hidden rounded-xl border border-line bg-bg-sunken transition-colors duration-300 group-hover:border-accent/30`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.thumb}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (it.yt && !el.dataset.fallback) {
                          el.dataset.fallback = "1";
                          el.src = `https://i.ytimg.com/vi/${it.yt}/hqdefault.jpg`;
                        }
                      }}
                      className="h-full w-full object-cover brightness-[0.8] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.03] group-hover:brightness-100"
                    />
                    <span className="absolute inset-0 z-20 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-bg/45 backdrop-blur">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px fill-text" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <p className="mt-2.5 truncate text-sm text-text transition-colors group-hover:text-white">
                    {title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-text-faint">{sub}</p>
                </button>
              );
            })}
          </div>
        )}

          {filtered.length > limit && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setLimit((l) => l + PER_PAGE)}
                className="sweep inline-flex h-11 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                Show {Math.min(PER_PAGE, filtered.length - limit)} more
              </button>
            </div>
          )}
        </div>
      </div>

      <WorkLightbox
        items={filtered}
        active={active}
        onSelect={setActive}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({
  active,
  disabled,
  removable,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  removable?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[0.8125rem] transition-colors duration-200 ${
        active
          ? "border-accent/40 bg-accent/10 text-text"
          : disabled
            ? "border-line text-text-faint opacity-40"
            : "border-line text-text-muted hover:border-line-strong hover:text-text"
      }`}
    >
      {children}
      {removable && (
        <span aria-hidden className="text-text-faint">
          ✕
        </span>
      )}
    </button>
  );
}

// ─── FilterMenu ───────────────────────────────────────────────────────────────

function FilterMenu({
  label,
  options,
  selected,
  onToggle,
  onClear,
}: {
  label: string;
  options: { value: string; count: number }[];
  selected: string[];
  onToggle: (v: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-9 items-center gap-2 rounded-full border border-line bg-bg-sunken/70 px-3.5 text-sm text-text-muted transition-colors hover:text-text sm:px-4"
      >
        {label}
        {selected.length > 0 && (
          <span className="grid h-4.5 min-w-4.5 place-items-center rounded-full bg-text px-1 py-0.5 text-[10px] font-medium leading-none text-bg">
            {selected.length}
          </span>
        )}
        <svg viewBox="0 0 24 24" className={`h-3 w-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div
            className="absolute right-0 z-20 mt-2 max-h-[60vh] w-64 origin-top-right animate-[fadein_.15s_ease] overflow-y-auto rounded-2xl border border-line bg-bg-raised p-1.5 shadow-xl shadow-black/40"
            style={{ backgroundImage: "linear-gradient(180deg, oklch(1 0 0 / 0.04), transparent 28%)" }}
          >
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                {label}
              </span>
              {selected.length > 0 && (
                <button onClick={onClear} className="text-xs text-text-faint transition-colors hover:text-text">
                  Clear
                </button>
              )}
            </div>
            {options.map((o) => {
              const on = selected.includes(o.value);
              const dead = !o.count && !on;
              return (
                <button
                  key={o.value}
                  onClick={() => onToggle(o.value)}
                  disabled={dead}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    dead
                      ? "text-text-faint opacity-40"
                      : "text-text-muted hover:bg-white/[0.04] hover:text-text"
                  }`}
                >
                  <span
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px] ${
                      on ? "border-text bg-text text-bg" : "border-line-strong"
                    }`}
                  >
                    {on && "✓"}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{o.value}</span>
                  <span className="text-xs text-text-faint">{o.count}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
