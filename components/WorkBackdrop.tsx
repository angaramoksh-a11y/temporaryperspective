"use client";

import dynamic from "next/dynamic";

const Silk = dynamic(() => import("./Silk"), { ssr: false });

// Dimmed, downward-fading silk sheen behind the /work hero. Masked so it
// dissolves into the near-black page before the episode grid begins.
export default function WorkBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.22]"
      style={{
        maskImage:
          "linear-gradient(180deg, transparent 0%, #000 22%, #000 55%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0%, #000 22%, #000 55%, transparent 100%)",
      }}
    >
      <Silk speed={1.7} scale={0.7} color="#717271" noiseIntensity={2.3} rotation={0} />
    </div>
  );
}
