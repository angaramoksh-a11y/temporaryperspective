"use client";

import dynamic from "next/dynamic";

const Silk = dynamic(() => import("./Silk"), { ssr: false });

// Dimmed, downward-fading silk sheen behind the /work hero. Masked so it
// dissolves into the near-black page before the episode grid begins.
export default function WorkBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.85]"
      style={{
        maskImage:
          "linear-gradient(180deg, #000 0%, #000 45%, transparent 92%)",
        WebkitMaskImage:
          "linear-gradient(180deg, #000 0%, #000 45%, transparent 92%)",
      }}
    >
      <Silk speed={1.5} scale={0.7} color="#8b9276" noiseIntensity={2.3} rotation={0} />
    </div>
  );
}
