"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Living film grain over the whole frame. A small noise tile is regenerated
// every few frames and stretched to the viewport with nearest-neighbour
// scaling, so it reads as fine animated grain rather than blocky static.
// Sits above content (pointer-events:none), pauses when the tab is hidden,
// and freezes to a single static frame under reduced-motion.
export default function GrainOverlay({
  alpha = 64,
  refreshInterval = 2,
  tile = 460,
}: {
  alpha?: number;
  refreshInterval?: number;
  tile?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  // The /work page uses the Silk shader as its sole background texture.
  const hidden = pathname?.startsWith("/portfolio") ?? false;

  useEffect(() => {
    if (hidden) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = tile;
    canvas.height = tile;

    const draw = () => {
      const image = ctx.createImageData(tile, tile);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = alpha;
      }
      ctx.putImageData(image, 0, 0);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw();
      return;
    }

    let frame = 0;
    let raf = 0;
    const loop = () => {
      if (frame % refreshInterval === 0) draw();
      frame++;
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.visibilityState === "visible") raf = requestAnimationFrame(loop);
    };

    document.addEventListener("visibilitychange", onVisibility);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [alpha, refreshInterval, tile, hidden]);

  if (hidden) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      style={{
        zIndex: -1,
        opacity: 0.15,
        imageRendering: "pixelated",
        mixBlendMode: "screen",
      }}
    />
  );
}
