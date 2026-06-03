// The one divider in the system: a short centred hairline with a small green
// node + glow at its centre. Static (no motion). Decorative, so aria-hidden.
export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full justify-center ${className}`} aria-hidden>
      <span className="divider-node" />
    </div>
  );
}
