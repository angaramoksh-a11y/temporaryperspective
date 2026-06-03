"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// The hero's pitch film. At rest it's a muted ambient loop framed in the same
// chromium card the rest of the site uses; clicking swaps the iframe to a fresh
// player that autoplays from the top WITH sound. Under reduced-motion we never
// autoplay — we hand Vimeo's own poster + play button to the viewer instead.
export default function HeroFilm({
  id,
  caption,
}: {
  id: string;
  caption: string;
}) {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  // resting: muted ambient background loop (no chrome). reduced-motion: a static
  // poster frame with Vimeo's native play control, nothing moving on its own.
  const ambient = `https://player.vimeo.com/video/${id}?background=1&muted=1&loop=1&autoplay=1&playsinline=1&dnt=1`;
  const poster = `https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0`;
  // on click: from the start, full volume, with controls.
  const full = `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0`;

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.35 }}
      className="w-full"
    >
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label="Play the studio film with sound, 60 seconds"
        className="chrome-card group relative block aspect-video w-full overflow-hidden shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)]"
        disabled={playing}
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
            <iframe
              src={reduce ? poster : ambient}
              title={caption}
              allow="autoplay; picture-in-picture"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
            {/* hover veil so the affordance keeps contrast over a bright frame */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-sunken/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 ease-[var(--ease-out-quart)] group-hover:opacity-90"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/55 px-3.5 py-1.5 text-sm text-text backdrop-blur transition-colors">
              <span aria-hidden className="text-[0.85em]">
                ▶
              </span>
              Play with sound
              <span aria-hidden className="text-text-faint">
                ·
              </span>
              <span className="text-text-muted">60s</span>
            </span>
          </>
        )}
      </button>
      <figcaption className="mt-4 text-sm text-text-faint">{caption}</figcaption>
    </motion.figure>
  );
}
