import type { CSSProperties } from "react";

// Progressive bottom blur. A short stack of backdrop-filter layers, each masked
// to a narrow horizontal band, so blur ramps from zero at the top of the zone
// to full at the bottom edge. Content dissolves into the frame instead of
// cutting off, which pulls the eye up and back into the page. Fixed, full-width,
// pointer-events-none. Sits above content but below the nav (z-50), the mobile
// menu (z-40) and the lightbox (z-100), so it never blurs chrome or modals.
//
// GPU-only (backdrop-filter), no deps. Adapted from the reactbits GradualBlur
// pattern, stripped of presets / responsive / hover machinery and retuned for
// our near-OLED canvas: pure blur, no dark fill, subtle but clearly present.

const CURVES = {
  linear: (p: number) => p,
  bezier: (p: number) => p * p * (3 - 2 * p),
} as const;

export default function BottomBlur({
  height = "6.5rem",
  strength = 1.5,
  divCount = 6,
  exponential = true,
  curve = "bezier",
  zIndex = 30,
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

    // Each layer is masked to a band that marches down the zone, with a one-band
    // overlap so the blur radii blend instead of stepping.
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
