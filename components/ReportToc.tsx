"use client";

import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/lib/report-sections";

// Sidebar TOC — rendered only on lg+; invisible on mobile.
export default function ReportToc() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the top-most intersecting section to drive the active state.
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          setActive(intersecting[0].target.id as SectionId);
        }
      },
      { rootMargin: "-12% 0px -60% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Report table of contents" className="hidden lg:block">
      <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-faint">
        Contents
      </p>
      <ol className="flex flex-col gap-0.5">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => scrollTo(s.id)}
              className={`block w-full py-1.5 pl-3 text-left text-[0.8125rem] leading-snug transition-colors ${
                active === s.id
                  ? "border-l border-text text-text"
                  : "border-l border-transparent text-text-faint hover:text-text-muted"
              }`}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
