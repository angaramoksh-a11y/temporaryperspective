import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Beliefs from "@/components/Beliefs";
import ClosingCTA from "@/components/ClosingCTA";
import { EdgeDivider, SectionLabel } from "@/components/ui";
import { team } from "@/lib/work";

export const metadata: Metadata = {
  title: "The studio — Temporary Perspective",
  description:
    "A B2B podcast production studio in Mumbai. We build the studio; the show stays yours.",
};

function monogram(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1
    ? parts[0][0] + parts[1][0]
    : name.slice(0, 2)
  ).toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Studio statement */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-28 text-center lg:px-10">
          <h1 className="font-thunder text-[clamp(3.5rem,15vw,12rem)] uppercase leading-[0.9] tracking-[-0.01em]">
            The studio.
          </h1>
          <div className="mx-auto mt-10 max-w-[720px] space-y-6">
            <p className="text-[clamp(1.125rem,1.7vw,1.4rem)] leading-[1.6] text-text">
              Temporary Perspective is a podcast studio in Mumbai, built for B2B
              founders who want a show worth taking seriously.
            </p>
            <p className="text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.7] text-text-muted">
              100+ episodes shipped. Politics, fintech, and the kind of long-form
              conversation most studios don&apos;t attempt. We handle the whole
              thing: brand, shoot, edit, growth. So the founder can focus on the
              conversation, not the production behind it.
            </p>
          </div>
        </section>

        {/* 2. The team */}
        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="mb-12 flex flex-col gap-4">
              <SectionLabel>The team</SectionLabel>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light tracking-tight">
                The people behind the shows.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {team.map((m) => (
                <div key={m.name} className="group flex flex-col">
                  <div className="sweep relative aspect-square w-full overflow-hidden rounded-xl border border-line-strong bg-bg-raised/50 transition-[transform] duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.45) 50%, transparent)",
                      }}
                    />
                    <span className="absolute inset-0 grid place-items-center font-thunder text-[clamp(2.5rem,5vw,3.5rem)] uppercase leading-none text-text-faint transition-colors duration-300 group-hover:text-text-muted">
                      {monogram(m.name)}
                    </span>
                  </div>
                  <h3 className="mt-5 font-thunder text-[clamp(1.5rem,2vw,1.875rem)] uppercase leading-none tracking-tight">
                    {m.name}
                  </h3>
                  <span className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-faint">
                    {m.role}
                  </span>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                    {m.line}
                  </p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-text-faint transition-colors hover:border-line-strong hover:text-text"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                        aria-hidden
                      >
                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. What we believe */}
        <section className="relative py-24 lg:py-32">
          <EdgeDivider />
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="mb-16 flex justify-center">
              <SectionLabel>What we believe</SectionLabel>
            </div>
            <Beliefs />
          </div>
        </section>

        <ClosingCTA subline="If that sounds like how you'd want your show made, let's talk." />
      </main>
      <Footer />
    </>
  );
}
