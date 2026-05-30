import Link from "next/link";
import { EdgeDivider, SectionLabel } from "./ui";

export function CaseBackLink() {
  return (
    <Link
      href="/case-studies"
      className="text-sm text-text-faint transition-colors hover:text-text"
    >
      ← All case studies
    </Link>
  );
}

export function CaseProse({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: string[];
}) {
  return (
    <section className="relative px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[720px]">
        <SectionLabel>{label}</SectionLabel>
        <div className="mt-6 space-y-6">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.7] text-text"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedCases({
  related,
  label = "Other case studies",
}: {
  related: { client: string; tag: string; href: string }[];
  label?: string;
}) {
  return (
    <section className="relative py-20 lg:py-24">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel>{label}</SectionLabel>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="sweep group flex items-center justify-between rounded-2xl border border-line bg-bg-raised/30 p-8 transition-[transform,border-color] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:border-white/20"
            >
              <span>
                <span className="block font-display text-[clamp(1.5rem,2.4vw,2rem)] font-normal tracking-tight">
                  {r.client}
                </span>
                <span className="mt-1 block text-sm text-text-faint">{r.tag}</span>
              </span>
              <span className="shrink-0 text-text-muted transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:text-text">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
