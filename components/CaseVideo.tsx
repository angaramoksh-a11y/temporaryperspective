"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Vimeo background embed: autoplays muted + looped with no native chrome.
 * An IntersectionObserver pauses it whenever it leaves the viewport, so only
 * the card currently on screen is ever playing (each card is a full viewport).
 * The whole frame is a link into the deep case study; sound lives there.
 */
export default function CaseVideo({
  vimeoId,
  href,
  label,
}: {
  vimeoId: string;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const post = (method: string) =>
      el.contentWindow?.postMessage(JSON.stringify({ method }), "*");
    const io = new IntersectionObserver(
      ([entry]) =>
        post(entry.isIntersecting && entry.intersectionRatio > 0.35 ? "play" : "pause"),
      { threshold: [0, 0.35, 0.7] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src = `https://player.vimeo.com/video/${vimeoId}?background=1&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1`;

  return (
    <Link
      href={href}
      aria-label={`${label}, read the case study`}
      className="group relative block w-full overflow-hidden rounded-lg border border-line bg-bg-sunken shadow-[0_30px_90px_-50px_rgba(0,0,0,0.95)]"
      style={{ aspectRatio: "16 / 9" }}
    >
      {/* chromium top edge */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.5) 50%, transparent)",
        }}
      />
      <iframe
        ref={ref}
        src={src}
        title={label}
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {/* hover veil + watch hint */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 flex items-end bg-gradient-to-t from-bg-sunken/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-[var(--ease-out-quart)] group-hover:opacity-100"
      >
        <span className="m-5 inline-flex items-center gap-1.5 text-sm font-medium text-text">
          Watch with sound
          <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
