"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type ResolvedWorkItem } from "@/lib/work";
import WorkLightbox from "./WorkLightbox";

const PER_PAGE = 48;

export default function ArchiveBrowser({
  items,
  initialSlug,
}: {
  items: ResolvedWorkItem[];
  initialSlug?: string;
}) {
  // One calm, uniform 16:9 wall. Vertical clips are letterboxed (blurred fill)
  // so the grid stays even without butchering the reel; orientation plays
  // correctly inside the lightbox.
  const [query, setQuery] = useState("");
  const [selClients, setSelClients] = useState<string[]>([]);
  const [selFormats, setSelFormats] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState<ResolvedWorkItem | null>(() =>
    initialSlug ? items.find((i) => i.slug === initialSlug) ?? null : null,
  );

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
      return matchQ && matchClient && matchFormat;
    });
  }, [items, query, selClients, selFormats]);

  // Prefill the search from ?q= (deep-links from /testimonials).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  // Keep the URL in sync with the open item, so /portfolio/archive/<slug> is
  // shareable and opens the lightbox over the grid.
  useEffect(() => {
    const base = "/portfolio/archive";
    const want = active ? `${base}/${active.slug}` : base;
    if (window.location.pathname.replace(/\/$/, "") !== want) {
      window.history.pushState(null, "", want + window.location.search);
    }
  }, [active]);

  // Sync the open item with browser back/forward.
  useEffect(() => {
    const onPop = () => {
      const m = window.location.pathname.match(
        /\/portfolio\/archive\/(.+?)\/?$/,
      );
      const slug = m ? decodeURIComponent(m[1]) : null;
      setActive(slug ? items.find((i) => i.slug === slug) ?? null : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [items]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount - 1);
  const shown = filtered.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  const reset = () => setPage(0);
  const toggle =
    (set: typeof setSelClients) => (v: string) => {
      reset();
      set((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
    };
  const toggleClient = toggle(setSelClients);
  const toggleFormat = toggle(setSelFormats);

  const chips = [
    ...selClients.map((c) => ({ label: c, remove: () => toggleClient(c) })),
    ...selFormats.map((f) => ({ label: f, remove: () => toggleFormat(f) })),
  ];

  return (
    <section className="relative">
      {/* header */}
      <header className="mx-auto max-w-[1400px] px-6 pb-2 pt-28 lg:px-10 lg:pt-36">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-light leading-[1.03] tracking-tight text-text">
              The archive.
            </h1>
            <p className="mt-4 max-w-md text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-text-muted">
              Every episode, every piece. The full library.
            </p>
          </div>
        </div>
      </header>

      {/* sticky controls */}
      <div className="sticky top-[80px] z-30 mt-7 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(e) => {
                reset();
                setQuery(e.target.value);
              }}
              placeholder="Search by client, format, or topic…"
              className="h-11 w-full rounded-[var(--radius-btn)] border border-line bg-bg-sunken/60 px-4 text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-white/25 sm:max-w-[360px]"
            />
            <div className="flex items-center gap-2 sm:ml-auto">
              <FilterMenu
                label="Client"
                options={clients}
                selected={selClients}
                onToggle={toggleClient}
                onClear={() => {
                  reset();
                  setSelClients([]);
                }}
              />
              <FilterMenu
                label="Format"
                options={formats}
                selected={selFormats}
                onToggle={toggleFormat}
                onClear={() => {
                  reset();
                  setSelFormats([]);
                }}
              />
            </div>
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2 py-3">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={chip.remove}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs text-text-muted transition-colors hover:text-text"
                >
                  {chip.label}
                  <span className="text-text-faint">✕</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* the wall — tiles in their native aspect, caption below each */}
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 2xl:grid-cols-5">
              {shown.map((it) => {
                const title = it.title ?? it.desc ?? it.client;
                const sub =
                  it.title || it.desc ? `${it.client} · ${it.format}` : it.format;
                const isVertical = it.orientation === "vertical";
                return (
                  <button
                    key={it.key}
                    onClick={() => setActive(it)}
                    aria-label={`Play ${it.client}, ${it.format}`}
                    className="group block text-left"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-bg-sunken">
                      {isVertical ? (
                        <>
                          {/* blurred fill so the 9:16 reel isn't hard-cropped */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={it.thumb}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.4]"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={it.thumb}
                            alt=""
                            loading="lazy"
                            className="relative z-10 mx-auto h-full w-auto object-contain brightness-[0.85] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.03] group-hover:brightness-100"
                          />
                        </>
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={it.thumb}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover brightness-[0.8] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.03] group-hover:brightness-100"
                        />
                      )}
                      <span className="absolute inset-0 z-20 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-bg/45 backdrop-blur">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 translate-x-px fill-text"
                            aria-hidden
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <p className="mt-2.5 truncate text-sm text-text transition-colors group-hover:text-white">
                      {title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-text-faint">
                      {sub}
                    </p>
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="sweep flex h-11 items-center gap-2 rounded-[var(--radius-btn)] border border-line bg-bg-sunken/60 px-4 text-sm text-text-muted transition-colors hover:text-text"
      >
        {label}
        {selected.length > 0 && (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-text px-1.5 text-xs font-medium text-bg">
            {selected.length}
          </span>
        )}
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
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
            className="absolute right-0 z-20 mt-2 max-h-[60vh] w-60 origin-top-right animate-[fadein_.2s_ease] overflow-y-auto rounded-xl border border-line bg-bg-raised p-1.5 shadow-xl shadow-black/40"
            style={{
              backgroundImage:
                "linear-gradient(180deg, oklch(1 0 0 / 0.04), transparent 28%)",
            }}
          >
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-text-faint">
                {label}
              </span>
              {selected.length > 0 && (
                <button
                  onClick={onClear}
                  className="text-xs text-text-faint transition-colors hover:text-text"
                >
                  Clear all
                </button>
              )}
            </div>
            {options.map((o) => {
              const on = selected.includes(o);
              return (
                <button
                  key={o}
                  onClick={() => onToggle(o)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
                >
                  <span
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px] ${
                      on ? "border-text bg-text text-bg" : "border-line-strong"
                    }`}
                  >
                    {on ? "✓" : ""}
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
