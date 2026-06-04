import type { CSSProperties } from "react";

// Progressive bottom blur, restored at a whisper-faint intensity. A short stack
// of backdrop-filter layers, each masked to a narrow band, so blur ramps from
// zero at the top of the zone to a soft maximum at the bottom edge. Layered
// UNDER the radial Vignette — together they feather the page into the frame
// without a hard band. Fixed, full-width, pointer-events-none. z below the nav
// (z-50), mobile menu (z-40) and lightbox (z-100).
const CURVES = {
  linear: (p: number) => p,
  bezier: (p: number) => p * p * (3 - 2 * p),
} as const;

export default function BottomBlur({
  height = "7rem",
  strength = 0.55,
  divCount = 6,
  exponential = true,
  curve = "bezier",
  zIndex = 29,
}: {
  height?: string;
  strength?: number;
  divCount?: number;
  exponential?: boolean;
  curve?: keyof typeof CURVES;
  zIndex?: number;
}) {
  const increment = 100 / divCount;
  const curveFn = CURVES[curve] ?? CURVES.linear;

  const layers = Array.from({ length: divCount }, (_, idx) => {
    const i = idx + 1;
    const progress = curveFn(i / divCount);
    const blur = exponential
      ? Math.pow(2, progress * 4) * 0.0625 * strength
      : 0.0625 * (progress * divCount + 1) * strength;

    const p1 = Math.round((increment * i - increment) * 10) / 10;
    const p2 = Math.round(increment * i * 10) / 10;
    const p3 = Math.round((increment * i + increment) * 10) / 10;
    const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

    let stops = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) stops += `, black ${p3}%`;
    if (p4 <= 100) stops += `, transparent ${p4}%`;
    const mask = `linear-gradient(to bottom, ${stops})`;

    const radius = `blur(${blur.toFixed(3)}rem)`;
    const style: CSSProperties = {
      maskImage: mask,
      WebkitMaskImage: mask,
      backdropFilter: radius,
      WebkitBackdropFilter: radius,
    };
    return <div key={i} className="absolute inset-0" style={style} />;
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0"
      style={{ height, zIndex }}
    >
      {layers}
    </div>
  );
}
