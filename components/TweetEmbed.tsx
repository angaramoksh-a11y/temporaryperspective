"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    twttr?: { widgets?: { load: (el?: HTMLElement) => void } };
  }
}

// A live X/Twitter embed, framed in the site's glass chrome so the busy widget
// sits inside calm surroundings. widgets.js renders the real post client-side;
// the blockquote link is the progressive-enhancement seed, and a persistent
// "View on X" link is the guaranteed escape hatch if the widget is blocked.
export default function TweetEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(() => {
    window.twttr?.widgets?.load(ref.current ?? undefined);
  }, []);

  // Re-render on mount too, in case the script was already loaded by a prior
  // client navigation (onLoad won't fire again).
  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="glass mx-auto w-full max-w-[560px] rounded-2xl p-3 sm:p-4">
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={load}
      />
      <div ref={ref} className="flex justify-center">
        <blockquote
          className="twitter-tweet"
          data-theme="light"
          data-dnt="true"
          data-conversation="none"
        >
          <a href={url}>A post on X</a>
        </blockquote>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 px-1 text-sm text-text-faint transition-colors hover:text-text"
      >
        View on X ↗
      </a>
    </div>
  );
}
