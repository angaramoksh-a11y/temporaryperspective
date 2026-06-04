// A fixed, full-viewport radial vignette: clear and soft through the centre,
// deepening toward the edges and corners so the page reads as a lit object
// framed in a dark room. Replaces the old flat bottom-blur band. The bottom
// edge still darkens, so content dissolves into the frame instead of cutting.
// Pointer-events-none, above content but below the nav (z-50), the mobile menu
// (z-40) and the lightbox (z-100), so it never dims chrome or modals.
export default function Vignette({ zIndex = 30 }: { zIndex?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex,
        background:
          "radial-gradient(120% 130% at 50% 48%, transparent 56%, oklch(0.02 0.003 264 / 0.38) 84%, oklch(0.02 0.003 264 / 0.72) 100%)",
      }}
    />
  );
}
