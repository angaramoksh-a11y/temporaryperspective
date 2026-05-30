import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClosingCTA from "@/components/ClosingCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import { newsletterPosts } from "@/lib/work";

export const metadata: Metadata = {
  title: "Notes from the studio — Temporary Perspective",
  description:
    "Notes on running a podcast that's actually worth watching. From the studio behind Bharatvaarta, Bureau, and Qapita.",
};

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Intro + signup */}
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 py-28 text-center lg:px-10">
          <h1 className="font-thunder text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-[-0.01em]">
            Notes from the studio.
          </h1>
          <p className="mt-6 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-text-muted">
            Notes on running a podcast that&apos;s actually worth watching. From
            the studio behind Bharatvaarta, Bureau, and Qapita.
          </p>
          <div className="mt-9 flex justify-center">
            <NewsletterSignup size="lg" />
          </div>
        </section>

        {/* 2. Post list */}
        <section className="relative px-6 pb-24 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-[1000px] border-t border-line">
            {newsletterPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/newsletter/${post.slug}`}
                className="sweep group grid grid-cols-1 items-center border-b border-line py-7 transition-[transform,background] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:bg-white/[0.015] sm:grid-cols-[176px_1fr] sm:gap-8"
              >
                <div className="relative hidden aspect-video w-44 shrink-0 items-end overflow-hidden rounded-lg border border-line bg-bg-raised/40 p-3 sm:flex">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.4) 50%, transparent)",
                    }}
                  />
                  <span className="pointer-events-none absolute right-3 top-2 font-thunder text-5xl leading-none text-line-strong">
                    {String(newsletterPosts.length - i).padStart(2, "0")}
                  </span>
                  <span className="relative font-mono text-[0.6rem] uppercase tracking-[0.18em] text-text-faint">
                    {post.date}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-[clamp(1.375rem,2.6vw,2rem)] font-normal leading-snug tracking-tight text-text">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-text-faint">
                    <span>{post.author}</span>
                    <span aria-hidden>·</span>
                    <span>{post.dateLong}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <ClosingCTA subline="Or skip the reading and tell us about your show." />
      </main>
      <Footer />
    </>
  );
}
