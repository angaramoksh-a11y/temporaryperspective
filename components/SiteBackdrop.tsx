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
      <div className="absolute inset-0 opacity-[0.12]">
        <Silk
          speed={1.1}
          scale={0.6}
          color="#8f95a1"
          noiseIntensity={1.8}
          rotation={0}
        />
      </div>
      {/* vignette: a faint top sheen that falls off fast to near-black, so body
          copy on text-heavy pages always reads over a dark, calm surface. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 90% at 50% 12%, transparent 8%, oklch(0.085 0.004 264 / 0.72) 46%, oklch(0.085 0.004 264 / 0.96) 100%)",
        }}
      />
    </div>
  );
}
