import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Beliefs from "@/components/Beliefs";
import ClosingCTA from "@/components/ClosingCTA";
import Testimonials from "@/components/Testimonials";
import { EdgeDivider } from "@/components/ui";
import { siteTestimonials, team, vimeoPoster } from "@/lib/work";

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

export default async function AboutPage() {
  const testimonials = await Promise.all(
    siteTestimonials
      .filter((t) => t.preview)
      .map(async (t) => ({ ...t, thumb: await vimeoPoster(t.vimeoId) })),
  );

  return (
    <>
      <Nav />
      <main>
        {/* 1. Studio statement */}
        <section className="relative px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-48">
          <div className="mx-auto max-w-[1400px]">
            <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[1.02] tracking-tight">
              The studio.
            </h1>
            <div className="mt-8 max-w-2xl space-y-5">
              <p className="text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.5] text-text">
                Temporary Perspective is a podcast studio in Mumbai, built for B2B
                founders who want a show worth taking seriously.
              </p>
              <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-text-muted">
                100+ episodes shipped. Politics, fintech, and the kind of
                long-form conversation most studios don&apos;t attempt. We handle
                the whole thing: brand, shoot, edit, growth. So the founder can
                focus on the conversation, not the production behind it.
              </p>
            </div>
          </div>
        </section>

        {/* 2. The team */}
        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="mb-12 flex flex-col gap-4">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light tracking-tight">
                The people behind the shows.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {team.map((m) => (
                <div key={m.name} className="group flex flex-col">
                  <div className="sweep relative aspect-square w-full overflow-hidden rounded-xl border border-line-strong bg-bg-raised/50 transition-[transform] duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5">
                    {m.headshot ? (
                      <Image
                        src={m.headshot}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover grayscale transition-[filter] duration-500 ease-[var(--ease-out-quart)] group-hover:grayscale-0"
                      />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center font-thunder text-[clamp(2.5rem,5vw,3.5rem)] uppercase leading-none text-text-faint transition-colors duration-300 group-hover:text-text-muted">
                        {monogram(m.name)}
                      </span>
                    )}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 z-10 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.45) 50%, transparent)",
                      }}
                    />
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

        {/* 2.5 What people say (testimonial preview) */}
        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="mb-12 flex flex-col gap-4">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light tracking-tight">
                What people say.
              </h2>
            </div>
            <Testimonials items={testimonials} />
          </div>
        </section>

        {/* 3. What we believe */}
        <section className="relative py-24 lg:py-32">
          <EdgeDivider />
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="mb-12 flex flex-col gap-4">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light tracking-tight">
                What we believe.
              </h2>
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
