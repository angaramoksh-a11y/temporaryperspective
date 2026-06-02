"use client";

import dynamic from "next/dynamic";

const Silk = dynamic(() => import("./Silk"), { ssr: false });

// Desaturated silver silk behind the entire home page — the "matte metal in a
// dark room" base, so the page reads as a lit studio at rest rather than a flat
// fill. Dim and vignetted so headline contrast holds; the hero's own key light
// and floor beam layer over the top. Fixed, pointer-events-none, content scrolls
// over it. (Silver counterpart to the olive /work WorkBackdrop.)
export default function HomeBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.22]">
        <Silk
          speed={1.4}
          scale={0.6}
          color="#9aa0ac"
          noiseIntensity={1.8}
          rotation={0}
        />
      </div>
      {/* vignette: keep the edges deep and the lit centre readable. Tuned dark
          so the silk reads as a faint sheen, not a distracting backdrop. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 16%, transparent 16%, oklch(0.085 0.004 264 / 0.62) 58%, oklch(0.085 0.004 264 / 0.93) 100%)",
        }}
      />
    </div>
  );
}
