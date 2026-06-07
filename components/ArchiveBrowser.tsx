"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type ResolvedWorkItem } from "@/lib/work";
import WorkLightbox from "./WorkLightbox";

const PER_PAGE = 48;

// ─── icons ───────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-text-faint" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function GridH() {
  return (
    <svg viewBox="0 0 18 18" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <rect x="1" y="1" width="16" height="9" rx="1.5" />
      <rect x="1" y="12" width="7" height="5" rx="1" />
      <rect x="10" y="12" width="7" height="5" rx="1" />
    </svg>
  );
}

function GridV() {
  return (
    <svg viewBox="0 0 18 18" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <rect x="1" y="1" width="9" height="16" rx="1.5" />
      <rect x="12" y="1" width="5" height="7" rx="1" />
      <rect x="12" y="10" width="5" height="7" rx="1" />
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
  const [page, setPage] = useState(0);
  const [orient, setOrient] = useState<"h" | "v">("h");
  const [active, setActive] = useState<ResolvedWorkItem | null>(() =>
    initialSlug ? items.find((i) => i.slug === initialSlug) ?? null : null,
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const clients = useMemo(
    () => [...new Set(items.map((i) => i.client))].sort(),
    [items],
  );
  const formats = useMemo(
    () => [...new Set(items.map((i) => i.format))],
    [items],
  );

  const filtered = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((it) => {
      const hay = `${it.client} ${it.format} ${(it.tags ?? []).join(" ")} ${
        it.desc ?? ""
      } ${it.title ?? ""} ${it.slug}`.toLowerCase();
      const matchQ = tokens.every((t) => hay.includes(t));
      const matchClient = !selClients.length || selClients.includes(it.client);
      const matchFormat = !selFormats.length || selFormats.includes(it.format);
      // Orientation filter: H shows only horizontal/unspecified; V shows only vertical.
      const matchOrient =
        orient === "v"
          ? it.orientation === "vertical"
          : it.orientation !== "vertical";
      return matchQ && matchClient && matchFormat && matchOrient;
    });
  }, [items, query, selClients, selFormats, orient]);

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

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount - 1);
  const shown = filtered.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  const reset = () => setPage(0);
  const toggle = (set: typeof setSelClients) => (v: string) => {
    reset();
    set((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
  };
  const toggleClient = toggle(setSelClients);
  const toggleFormat = toggle(setSelFormats);

  const chips = [
    ...selClients.map((c) => ({ label: c, remove: () => toggleClient(c) })),
    ...selFormats.map((f) => ({ label: f, remove: () => toggleFormat(f) })),
  ];

  // Grid layout varies by orientation
  const gridCols =
    orient === "v"
      ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";
  const tileAspect = orient === "v" ? "aspect-[9/16]" : "aspect-video";

  return (
    <section className="relative">

      {/* ── sticky controls ─────────────────────────────────────────────────── */}
      <div className="sticky top-[80px] z-30 bg-bg/75 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] border-b border-line px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-3 py-4">

            {/* search pill */}
            <div className="relative flex min-w-0 flex-1 items-center sm:max-w-[300px]">
              <span className="pointer-events-none absolute left-3.5">
                <SearchIcon />
              </span>
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => { reset(); setQuery(e.target.value); }}
                placeholder="Search…"
                aria-label="Search the archive"
                className="h-9 w-full rounded-full border border-line bg-bg-sunken/70 pl-9 pr-3 text-sm text-text outline-none transition-[border-color] placeholder:text-text-faint focus:border-white/25"
              />
              {/* ⌘K badge — hidden on mobile, hidden when focused */}
              {!query && (
                <span className="pointer-events-none absolute right-3.5 hidden items-center gap-1 sm:flex" aria-hidden>
                  <kbd className="inline-flex h-5 items-center rounded border border-line px-1.5 font-mono text-[10px] text-text-faint">⌘K</kbd>
                </span>
              )}
            </div>

            {/* H / V orientation toggle */}
            <div
              role="group"
              aria-label="Grid orientation"
              className="inline-flex items-center gap-0.5 rounded-full border border-line bg-bg-sunken/70 p-1"
            >
              {(["h", "v"] as const).map((o) => {
                const on = orient === o;
                return (
                  <button
                    key={o}
                    onClick={() => setOrient(o)}
                    aria-pressed={on}
                    aria-label={o === "h" ? "Horizontal grid" : "Vertical grid"}
                    className={`grid h-7 w-7 place-items-center rounded-full transition-colors duration-200 ${
                      on ? "bg-text text-bg" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {o === "h" ? <GridH /> : <GridV />}
                  </button>
                );
              })}
            </div>

            {/* filter dropdowns — pushed right */}
            <div className="flex items-center gap-2 sm:ml-auto">
              <FilterMenu
                label="Client"
                options={clients}
                selected={selClients}
                onToggle={toggleClient}
                onClear={() => { reset(); setSelClients([]); }}
              />
              <FilterMenu
                label="Format"
                options={formats}
                selected={selFormats}
                onToggle={toggleFormat}
                onClear={() => { reset(); setSelFormats([]); }}
              />
            </div>
          </div>

          {/* active filter chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-3">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={chip.remove}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs text-text-muted transition-colors hover:text-text"
                >
                  {chip.label}
                  <span className="text-text-faint" aria-hidden>✕</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── grid ─────────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
        {shown.length === 0 ? (
          <p className="py-24 text-center text-text-faint">
            No work matches those filters. Try broader filters or clear them.
          </p>
        ) : (
          <>
            <p className="mb-6 text-sm text-text-faint">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>

            <div className={`grid ${gridCols} gap-x-4 gap-y-7 lg:gap-x-5`}>
              {shown.map((it) => {
                const title = it.title ?? it.desc ?? it.client;
                const sub = it.title || it.desc ? `${it.client} · ${it.format}` : it.format;
                return (
                  <button
                    key={it.key}
                    onClick={() => setActive(it)}
                    aria-label={`Play ${it.client}, ${it.format}`}
                    className="group block text-left"
                  >
                    <div className={`relative ${tileAspect} overflow-hidden rounded-xl border border-line bg-bg-sunken`}>
                      {/* Only same-orientation items appear in each mode — no blurred fill needed */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={it.thumb}
                        alt=""
                        loading="lazy"
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
          </>
        )}

        {pageCount > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-current={i === current}
                className={`h-9 min-w-9 rounded-lg px-3 text-sm transition-colors ${
                  i === current
                    ? "bg-text font-medium text-bg"
                    : "border border-line text-text-muted hover:text-text"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
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

// ─── FilterMenu ───────────────────────────────────────────────────────────────

function FilterMenu({
  label,
  options,
  selected,
  onToggle,
  onClear,
}: {
  label: string;
  options: string[];
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
        className="sweep flex h-9 items-center gap-2 rounded-full border border-line bg-bg-sunken/70 px-4 text-sm text-text-muted transition-colors hover:text-text"
      >
        {label}
        {selected.length > 0 && (
          <span className="grid h-4.5 min-w-4.5 place-items-center rounded-full bg-text px-1 text-[10px] font-medium text-bg leading-none py-0.5">
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
          <div className="absolute right-0 z-20 mt-2 max-h-[60vh] w-60 origin-top-right animate-[fadein_.15s_ease] overflow-y-auto rounded-2xl border border-line bg-bg-raised p-1.5 shadow-xl shadow-black/40"
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
              const on = selected.includes(o);
              return (
                <button
                  key={o}
                  onClick={() => onToggle(o)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
                >
                  <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px] ${on ? "border-text bg-text text-bg" : "border-line-strong"}`}>
                    {on && "✓"}
                  </span>
                  {o}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
