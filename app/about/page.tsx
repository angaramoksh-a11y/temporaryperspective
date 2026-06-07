import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Beliefs from "@/components/Beliefs";
import ClosingCTA from "@/components/ClosingCTA";
import Testimonials from "@/components/Testimonials";
import { EdgeDivider } from "@/components/ui";
import { siteTestimonials, team, vimeoPoster, caseStudies } from "@/lib/work";

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

        {/* 1. Hero */}
        <section className="relative px-6 pb-24 pt-36 lg:px-10 lg:pb-32 lg:pt-48">
          <div className="mx-auto w-full max-w-[1400px] lg:w-[86%] lg:px-0">
            <h1 className="text-metal font-display text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              The studio.
            </h1>
            <div className="mt-8 max-w-2xl space-y-5">
              <p className="text-[clamp(1.125rem,1.8vw,1.4rem)] leading-[1.55] text-text">
                Temporary Perspective is a podcast studio in Mumbai, built for B2B
                founders who want a show worth taking seriously.
              </p>
              <p className="text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-text-muted">
                100+ episodes shipped. Politics, fintech, and the kind of
                long-form conversation most studios don&apos;t attempt. We handle
                the whole thing: brand, shoot, edit, growth. So the founder can
                focus on the conversation, not the production behind it.
              </p>
            </div>

            {/* stat strip */}
            <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
              {[
                { n: "100+", label: "Episodes shipped" },
                { n: "< 7 days", label: "Shot to published" },
                { n: "3", label: "Active shows" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-metal-static font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight">
                    {s.n}
                  </p>
                  <p className="mt-1 text-sm text-text-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. The team */}
        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
            <h2 className="text-metal-static mb-14 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-tight">
              The people behind the shows.
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
              {team.map((m) => (
                <div key={m.name} className="group flex flex-col">
                  <div className="sweep relative aspect-square w-full overflow-hidden rounded-2xl border border-line-strong bg-bg-raised/50 transition-[transform] duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
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
                  <span className="mt-2 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-text-faint">
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

        {/* 3a. Case studies */}
        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
            <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-metal-static font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-tight">
                The shows.
              </h2>
              <p className="max-w-md text-text-muted sm:text-right">
                Three clients. Three very different formats.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.href}
                  href={cs.href}
                  className="glass sweep group flex flex-col overflow-hidden rounded-2xl p-2.5"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://vumbnail.com/${cs.vimeoId}.jpg`}
                      alt={cs.client}
                      loading="lazy"
                      className="h-full w-full object-cover brightness-[0.78] transition-[filter,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:brightness-100"
                    />
                    {cs.status && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/60 px-2.5 py-1 text-xs text-text-muted backdrop-blur">
                        <span className="chrome-breathe h-1.5 w-1.5 rounded-full bg-chrome" />
                        {cs.status}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-1.5 pb-1 pt-3.5">
                    <p className="font-display text-lg font-medium tracking-tight text-text">
                      {cs.client}
                    </p>
                    <p className="text-[0.8125rem] text-text-faint">{cs.tag}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                      {cs.result}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-text-faint transition-colors group-hover:text-text">
                      View case study
                      <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
              >
                See all case studies
                <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3b. Testimonials — link directly to /testimonials#<vimeoId> */}
        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
            <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-metal-static font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-tight">
                In their own words.
              </h2>
              <p className="max-w-md text-text-muted sm:text-right">
                Founders and creators on working with the studio.
              </p>
            </div>
            <Testimonials items={testimonials} linkMode />
          </div>
        </section>

        {/* 4. What we believe */}
        <section className="relative py-24 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
            <h2 className="text-metal-static mb-12 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-tight">
              What we believe.
            </h2>
            <Beliefs />
          </div>
        </section>

        {/* 5. Closing one-liner */}
        <section className="relative py-20 lg:py-24">
          <EdgeDivider />
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
            <p className="text-metal font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.3] tracking-[-0.02em]">
              The show belongs to you. The studio is ours to run.
            </p>
          </div>
        </section>

        <ClosingCTA subline="If that sounds like how you'd want your show made, let's talk." />
      </main>
      <Footer />
    </>
  );
}
