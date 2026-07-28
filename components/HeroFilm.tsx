"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// The hero's showreel. At rest it's a muted ambient loop framed in the same
// chromium card the rest of the site uses; clicking restarts it from the top
// WITH sound and native controls. Under reduced-motion we never autoplay — the
// viewer gets a paused frame with a native play control instead.
export default function HeroFilm({
  src,
  caption,
  poster,
}: {
  src: string;
  caption: string;
  poster?: string;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Kick off the muted ambient loop after mount. React doesn't emit the `muted`
  // attribute into the static export's HTML, so the browser blocks autoplay on
  // first paint; setting it in JS + calling play() makes the loop reliable.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce || playing) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduce, playing]);

  const activate = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.loop = false;
    v.controls = true;
    v.currentTime = 0;
    void v.play();
    setPlaying(true);
  };

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.35 }}
      className="w-full"
    >
      <div className="chrome-card group relative aspect-video w-full overflow-hidden shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)]">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          title={caption}
          playsInline
          preload="metadata"
          muted={!playing}
          loop={!playing}
          autoPlay={!reduce}
          controls={playing || !!reduce}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!playing && !reduce && (
          <button
            type="button"
            onClick={activate}
            aria-label="Play the studio showreel with sound"
            className="absolute inset-0 block"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-sunken/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 ease-[var(--ease-out-quart)] group-hover:opacity-90"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/55 px-3.5 py-1.5 text-sm text-text backdrop-blur">
              <span aria-hidden className="text-[0.85em]">
                ▶
              </span>
              Play with sound
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 text-sm text-text-faint">{caption}</figcaption>
    </motion.figure>
  );
}
