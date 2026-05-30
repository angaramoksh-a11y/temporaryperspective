"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { embed } from "@/lib/work";
import Thumb from "./Thumb";

const ease = [0.16, 1, 0.3, 1] as const;

// Opens muted on autoplay once the frame scrolls into view, then loads the
// full controls-and-sound player on click. The chromium frame matches the
// home case-video treatment.
export default function TestimonialVideo({
  id,
  caption,
}: {
  id: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [playing, setPlaying] = useState(false);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease }}
      className="mx-auto max-w-[1000px]"
    >
      <button
        onClick={() => setPlaying(true)}
        aria-label="Play with sound"
        className="chrome-card group relative block aspect-video w-full overflow-hidden"
      >
        {playing ? (
          <iframe
            src={embed(id, true)}
            title={caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            {inView && (
              <iframe
                src={embed(id, true, true)}
                title={caption}
                allow="autoplay; encrypted-media; picture-in-picture"
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
            )}
            <Thumb
              id={id}
              alt={caption}
              className={`brightness-[0.85] transition-opacity duration-500 ${
                inView ? "opacity-0" : "opacity-100"
              }`}
            />
            <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/60 px-3 py-1.5 text-xs text-text-muted backdrop-blur transition-colors group-hover:text-text">
              <span className="led-breathe h-1.5 w-1.5 rounded-full bg-accent" />
              Tap for sound
            </span>
          </>
        )}
      </button>
      <figcaption className="mt-4 text-center text-sm text-text-faint">
        {caption}
      </figcaption>
    </motion.figure>
  );
}
