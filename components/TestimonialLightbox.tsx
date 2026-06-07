"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { vimeoEmbed, type ResolvedTestimonial } from "@/lib/work";
import { CredChips, ProjectLinks } from "./testimonialBits";

const ease = [0.16, 1, 0.3, 1] as const;

export default function TestimonialLightbox({
  item,
  onClose,
}: {
  item: ResolvedTestimonial | null;
  onClose: () => void;
}) {
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
          {/* Close — viewport top-right, clear of player controls */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-bg/80 text-text-muted backdrop-blur-md transition-colors hover:border-white/30 hover:text-text"
          >
            ✕
          </button>

          <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className="chrome-card relative z-10 w-full max-w-[1000px]"
            >

              {/* testimonials are meant to be heard: autoplay, not muted */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  key={item.vimeoId}
                  src={vimeoEmbed({ id: item.vimeoId }, { autoplay: true, muted: false })}
                  title={`${item.name}, ${item.role}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              <div className="p-6 lg:p-8">
                <h2 className="font-display text-2xl font-medium tracking-tight">
                  {item.name}
                  {item.note && (
                    <span className="ml-2 text-base font-normal text-text-faint">
                      {item.note}
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                  {item.role}
                </p>
                <p className="mt-5 max-w-2xl font-display text-lg italic leading-relaxed text-text">
                  “{item.quote}”
                </p>
                <div className="mt-5 flex flex-col gap-4">
                  <CredChips items={item.credentials} />
                  <ProjectLinks items={item.projects} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
