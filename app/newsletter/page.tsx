import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeroWord from "@/components/PageHeroWord";
import ClosingCTA from "@/components/ClosingCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import { EdgeDivider } from "@/components/ui";
import { newsletterPosts } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";

const newsletterBreadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Newsletter", path: "/newsletter" },
]);

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Short, occasional notes on running a podcast worth watching, from the studio behind Bharatvaarta, Bureau, and Qapita.",
  openGraph: {
    title: "Newsletter — Temporary Perspective",
    description: "Short, occasional notes on running a podcast worth watching, from the studio behind Bharatvaarta, Bureau, and Qapita.",
    url: "https://temporaryperspective.com/newsletter",
    type: "website",
  },
  alternates: { canonical: "https://temporaryperspective.com/newsletter" },
  twitter: { card: "summary_large_image" },
};

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeroWord word="Newsletter" eyebrow="From the studio" />

        {/* Signup, sat directly under the hero word */}
        <section className="relative px-6 pb-20 lg:px-10 lg:pb-24">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
            <p className="max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-text-muted">
              Short notes on the craft of running a podcast worth watching. The
              ones we&apos;d send a founder before their first shoot.
            </p>
            <div className="w-full max-w-md">
              <NewsletterSignup size="lg" />
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="relative px-6 py-20 lg:px-10 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-metal-static font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                  Recent dispatches
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                  No schedule, no thinkpieces. Just what the work has been
                  teaching us, written down.
                </p>
              </div>
              <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-text-faint md:block">
                {String(newsletterPosts.length).padStart(2, "0")} posts
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsletterPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/newsletter/${post.slug}`}
                  className="glass sweep group flex flex-col rounded-2xl p-7 transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-faint">
                    <span>{post.date}</span>
                    <span>
                      {String(newsletterPosts.length - i).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.35rem] font-medium leading-snug tracking-tight text-text">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-line pt-4 text-[0.8125rem] text-text-faint">
                    <span>
                      {post.author} · {post.readingTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-text">
                      Read
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ClosingCTA subline="Or skip the reading and tell us about your show." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsletterBreadcrumb) }}
      />
    </>
  );
}
