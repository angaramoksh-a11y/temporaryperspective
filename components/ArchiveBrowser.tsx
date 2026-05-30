"use client";

import { useMemo, useRef, useState } from "react";
import { embed, workLibrary, type Episode } from "@/lib/work";
import Thumb from "./Thumb";
import Lightbox from "./Lightbox";

const PER_PAGE = 24;

export default function ArchiveBrowser() {
  const clients = useMemo(
    () => [...new Set(workLibrary.map((e) => e.client))].sort(),
    [],
  );

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState<Episode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workLibrary.filter((e) => {
      const matchesQuery =
        !q ||
        e.guest.toLowerCase().includes(q) ||
        e.client.toLowerCase().includes(q);
      const matchesClient = selected.length === 0 || selected.includes(e.client);
      return matchesQuery && matchesClient;
    });
  }, [query, selected]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount - 1);
  const shown = filtered.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  const toggleClient = (c: string) => {
    setPage(0);
    setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  };

  return (
    <section className="relative">
      {/* search + filter bar */}
      <div className="sticky top-16 z-30 border-y border-line bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-6 py-3 lg:px-10">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => {
                setPage(0);
                setQuery(e.target.value);
              }}
              placeholder="Search by title or client…"
              className="h-11 w-full rounded-[var(--radius-btn)] border border-line bg-bg-sunken/60 px-4 text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-white/25"
            />
          </div>

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              className="flex h-11 items-center gap-2 rounded-[var(--radius-btn)] border border-line bg-bg-sunken/60 px-4 text-sm text-text-muted transition-colors hover:text-text"
            >
              Filter by client
              {selected.length > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-text px-1.5 text-xs font-medium text-bg">
                  {selected.length}
                </span>
              )}
              <span className={`text-xs transition-transform ${menuOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            {menuOpen && (
              <>
                <button
                  aria-hidden
                  tabIndex={-1}
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right animate-[fadein_.2s_ease] overflow-hidden rounded-xl border border-line bg-bg-raised p-1.5 shadow-xl shadow-black/40">
                  {clients.map((c) => {
                    const on = selected.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleClient(c)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
                      >
                        <span
                          className={`grid h-4 w-4 place-items-center rounded border text-[10px] ${
                            on ? "border-text bg-text text-bg" : "border-line-strong"
                          }`}
                        >
                          {on ? "✓" : ""}
                        </span>
                        {c}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mx-auto flex max-w-[1400px] flex-wrap gap-2 px-6 pb-3 lg:px-10">
            {selected.map((c) => (
              <button
                key={c}
                onClick={() => toggleClient(c)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs text-text-muted transition-colors hover:text-text"
              >
                {c}
                <span className="text-text-faint">✕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16">
        {shown.length === 0 ? (
          <p className="py-20 text-center text-text-faint">
            Nothing matches that search yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {shown.map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setActive(ep);
                  setHovered(null);
                }}
                onMouseEnter={() => setHovered(ep.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${ep.guest}, ${ep.client}`}
                className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-line text-left"
              >
                <Thumb
                  id={ep.id}
                  alt={`${ep.guest} on ${ep.client}`}
                  className="opacity-90 brightness-[0.8] transition-[filter,opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:opacity-100 group-hover:brightness-100"
                />
                {hovered === ep.id && (
                  <iframe
                    src={embed(ep.id, true, true)}
                    title={ep.guest}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  />
                )}
                {/* title fades in on hover instead of a permanent caption */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="block truncate text-sm font-medium text-text">
                    {ep.guest}
                  </span>
                  <span className="block text-xs text-text-faint">{ep.client}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
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

      <Lightbox
        episode={active}
        episodes={filtered.length ? filtered : workLibrary}
        onClose={() => setActive(null)}
        onSelect={(e) => setActive(e)}
      />
    </section>
  );
}
