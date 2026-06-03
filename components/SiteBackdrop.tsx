"use client";

import dynamic from "next/dynamic";

const Silk = dynamic(() => import("./Silk"), { ssr: false });

// The site-wide backdrop: a desaturated silver silk, "matte metal in a dark
// room", behind every page so the whole site reads as one lit studio at rest
// rather than a flat fill. Dim and vignetted so headline contrast holds. Fixed,
// pointer-events-none, content scrolls over it. Mounted once in the root layout.
export default function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.28]">
        <Silk
          speed={1.2}
          scale={0.6}
          color="#9aa0ac"
          noiseIntensity={1.8}
          rotation={0}
        />
      </div>
      {/* vignette: lets the silk sheen read across the page, then deepens toward
          the edges and bottom so body copy still sits on a calm, darker base. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 100% at 50% 22%, transparent 30%, oklch(0.085 0.004 264 / 0.45) 60%, oklch(0.085 0.004 264 / 0.82) 100%)",
        }}
      />
    </div>
  );
}
