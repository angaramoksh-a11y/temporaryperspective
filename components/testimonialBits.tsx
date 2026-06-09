import Link from "next/link";
import type { Credential, CredIcon, TestimonialProject } from "@/lib/work";

export function CredIconSvg({
  name,
  className = "h-3.5 w-3.5",
}: {
  name: CredIcon;
  className?: string;
}) {
  const c = className;
  if (name === "linkedin")
    return (
      <svg viewBox="0 0 24 24" className={c} fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z" />
      </svg>
    );
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "instagram")
    return (
      <svg viewBox="0 0 24 24" className={c} {...stroke} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "youtube")
    return (
      <svg viewBox="0 0 24 24" className={c} {...stroke} aria-hidden>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10.5 9.2l4.3 2.8-4.3 2.8z" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={c} {...stroke} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
    </svg>
  );
}

// Square chrome chip with icon + destination label. The label spells out where
// the link leads (e.g. "@Bharatvaarta on YouTube", "Roshan on LinkedIn") so the
// user always knows the destination without guessing from the icon alone.
export function CredChips({ items }: { items: Credential[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((c) => (
        <a
          key={c.href}
          href={c.href}
          target="_blank"
          rel="noreferrer"
          title={c.label}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-line-strong bg-white/[0.03] px-3 text-[0.8125rem] font-medium text-text-muted transition-colors hover:border-white/40 hover:bg-white/[0.07] hover:text-text"
        >
          <CredIconSvg name={c.icon} className="h-4 w-4 shrink-0 text-text-faint" />
          <span>{c.label}</span>
        </a>
      ))}
    </div>
  );
}

export function ProjectLinks({ items }: { items: TestimonialProject[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-text-faint">
      {items.map((p, i) => (
        <span key={p.label} className="inline-flex items-center gap-2">
          {i > 0 && <span aria-hidden>·</span>}
          {p.href ? (
            p.href.startsWith("http") ? (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-text"
              >
                {p.label}
              </a>
            ) : (
              <Link href={p.href} className="transition-colors hover:text-text">
                {p.label}
              </Link>
            )
          ) : (
            <span>{p.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
