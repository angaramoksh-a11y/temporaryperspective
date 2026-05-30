"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { embed, watch, type Episode } from "@/lib/work";
import Thumb from "./Thumb";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Lightbox({
  episode,
  episodes,
  onClose,
  onSelect,
}: {
  episode: Episode | null;
  episodes: Episode[];
  onClose: () => void;
  onSelect: (e: Episode) => void;
}) {
  useEffect(() => {
    if (!episode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [episode, onClose]);

  const others = episode
    ? episodes.filter((e) => e.id !== episode.id).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {episode && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-bg-sunken/80 backdrop-blur-xl"
          />
          <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease }}
            className="chrome-card relative z-10 w-[96vw] max-w-[1600px]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg/60 text-text-muted backdrop-blur transition-colors hover:text-text"
            >
              ✕
            </button>

            <div className="aspect-video w-full bg-black">
              <iframe
                key={episode.id}
                src={embed(episode.id, true)}
                title={episode.guest}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            <div className="p-6 lg:p-8">
              <h3 className="font-display text-2xl font-light tracking-tight">
                {episode.guest}
              </h3>
              <p className="mt-1 text-sm text-text-faint">{episode.client}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={watch(episode.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="sweep inline-flex h-10 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                >
                  Watch the episode
                </a>
                {episode.caseStudy && (
                  <Link
                    href={episode.caseStudy}
                    className="sweep inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-white/[0.04]"
                  >
                    View case study →
                  </Link>
                )}
              </div>

              {others.length > 0 && (
                <div className="mt-8 border-t border-line pt-6">
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                    Browse more
                  </p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {others.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => onSelect(o)}
                        className="group relative overflow-hidden rounded-lg border border-line text-left"
                        aria-label={o.guest}
                      >
                        <div className="aspect-video">
                          <Thumb
                            id={o.id}
                            alt={o.guest}
                            className="opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                          />
                        </div>
                        <span className="block truncate px-3 py-2.5 text-sm text-text-muted transition-colors group-hover:text-text">
                          {o.guest}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
