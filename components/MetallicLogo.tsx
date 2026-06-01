// Metallic logomark. A chrome gradient is clipped to the logo silhouette via a
// CSS mask (logo-white.svg — alpha-only, colour irrelevant) and a highlight
// rakes across the mark and back, so it reads as light burning over brushed
// metal. Adapted from the react-bits "metallic paint" feel without its WebGL
// image-edge shader — GPU-only background-position, frozen under reduced-motion.
// Decorative duplicate of the wordmark below it, so hidden from a11y.
export default function MetallicLogo({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`metallic-logo-wrap ${className}`}>
      <span className="metallic-logo-glow" />
      <span className="metallic-logo" />
    </div>
  );
}
