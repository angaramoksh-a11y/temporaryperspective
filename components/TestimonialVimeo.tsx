"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Vimeo twin of TestimonialVideo: muted background autoplay once in view, then
// the full controls-and-sound player on click. Same chromium frame treatment.
export default function TestimonialVimeo({
  id,
  caption,
}: {
  id: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [playing, setPlaying] = useState(false);

  const background = `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&dnt=1`;
  const full = `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0`;

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
            src={full}
            title={caption}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            {inView && (
              <iframe
                src={background}
                title={caption}
                allow="autoplay; picture-in-picture"
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
            )}
            <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/60 px-3 py-1.5 text-xs text-text-muted backdrop-blur transition-colors group-hover:text-text">
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
