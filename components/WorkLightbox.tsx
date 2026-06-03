"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  embed,
  watch,
  vimeoEmbed,
  vimeoLink,
  type ResolvedWorkItem,
  type VimeoClip,
} from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;

export default function WorkLightbox({
  item,
  onClose,
}: {
  item: ResolvedWorkItem | null;
  onClose: () => void;
}) {
  // which cut is playing, for clips that ship both horizontal + vertical
  const [cut, setCut] = useState<"h" | "v">("h");

  useEffect(() => {
    setCut(item?.h ? "h" : "v");
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const hasBoth = !!(item?.h && item?.v);
  const clip: VimeoClip | undefined = item
    ? (cut === "v" ? item.v : item.h) ?? item.h ?? item.v
    : undefined;
  const vertical = cut === "v" && !!item?.v ? true : item?.orientation === "vertical";
  const src = item
    ? item.source === "vimeo" && clip
      ? vimeoEmbed(clip, { autoplay: true })
      : item.yt
        ? embed(item.yt, true)
        : ""
    : "";

  return (
    <AnimatePresence>
      {item && (
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
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className={`chrome-card relative z-10 w-full ${vertical ? "max-w-[420px]" : "max-w-[1100px]"}`}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg/60 text-text-muted backdrop-blur transition-colors hover:text-text"
              >
                ✕
              </button>

              <div className={`w-full bg-black ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
                {src && (
                  <iframe
                    key={src}
                    src={src}
                    title={`${item.client}, ${item.format}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                )}
              </div>

              <div className="p-6 lg:p-8">
                {hasBoth && (
                  <div className="mb-5 inline-flex gap-1 rounded-full border border-line bg-bg-sunken p-1 text-sm">
                    {(["h", "v"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCut(c)}
                        className={`rounded-full px-3.5 py-1 transition-colors ${
                          cut === c ? "bg-bg-raised text-text" : "text-text-muted hover:text-text"
                        }`}
                      >
                        {c === "h" ? "Horizontal" : "Vertical"}
                      </button>
                    ))}
                  </div>
                )}

                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-faint">
                  {item.client} · {item.format}
                </p>
                {item.desc && (
                  <p className="mt-3 max-w-xl leading-relaxed text-text-muted">
                    {item.desc}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {item.source === "vimeo" && clip ? (
                    <a
                      href={vimeoLink(clip)}
                      target="_blank"
                      rel="noreferrer"
                      className="sweep inline-flex h-10 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                    >
                      Watch on Vimeo →
                    </a>
                  ) : item.yt ? (
                    <a
                      href={watch(item.yt)}
                      target="_blank"
                      rel="noreferrer"
                      className="sweep inline-flex h-10 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                    >
                      Watch on YouTube →
                    </a>
                  ) : null}
                  {item.caseStudy && (
                    <Link
                      href={item.caseStudy}
                      className="sweep inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-white/[0.04]"
                    >
                      View case study →
                    </Link>
                  )}
                  <button
                    onClick={onClose}
                    className="inline-flex h-10 items-center rounded-full px-4 text-sm text-text-muted transition-colors hover:text-text"
                  >
                    Browse more
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
