"use client";

import dynamic from "next/dynamic";

const Silk = dynamic(() => import("./Silk"), { ssr: false });

// Dimmed olive silk sheen that sits fixed behind the entire /work page as its
// sole background texture (no grain over it). Content scrolls over the top.
export default function WorkBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-[0.85]"
    >
      <Silk speed={1.5} scale={0.7} color="#8b9276" noiseIntensity={2.3} rotation={0} />
    </div>
  );
}
