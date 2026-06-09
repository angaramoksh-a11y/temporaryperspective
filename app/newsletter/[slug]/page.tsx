import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Accordion from "@/components/Accordion";
import ClosingCTA from "@/components/ClosingCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import ShareBar from "@/components/ShareBar";
import { EdgeDivider } from "@/components/ui";
import { newsletterPosts, embed } from "@/lib/work";

export function generateStaticParams() {
  return newsletterPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = newsletterPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Notes — Temporary Perspective" };
  return {
    title: `${post.title} — Temporary Perspective`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Temporary Perspective`,
      description: post.excerpt,
      url: `https://temporaryperspective.com/newsletter/${slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = newsletterPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const post = newsletterPosts[idx];
  const related = newsletterPosts[(idx + 1) % newsletterPosts.length];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Temporary Perspective" },
    datePublished: post.dateLong,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Nav />
      <main>
        <article>
          {/* 1. Header — kicker, metallic H1, byline, share */}
          <section className="relative px-6 pb-12 pt-36 lg:px-10 lg:pb-16 lg:pt-44">
            {/* off-center silver key light behind the title */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] max-h-[760px]"
              style={{
                background:
                  "radial-gradient(48% 60% at 30% 38%, oklch(0.86 0.02 250 / 0.12), transparent 72%)",
              }}
            />
            <div className="mx-auto max-w-[1200px]">
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-1.5 text-sm text-text-faint transition-colors hover:text-text"
              >
                <span aria-hidden>←</span> All notes
              </Link>

              <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
                <div className="min-w-0">
                  <p className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                    From the studio · {post.dateLong}
                  </p>
                  <h1 className="text-metal mt-5 max-w-[18ch] text-balance font-display text-[clamp(2.5rem,5.4vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.025em]">
                    {post.title}
                  </h1>
                </div>
                <div className="shrink-0">
                  <ShareBar title={`${post.title} — Temporary Perspective`} />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                <span className="text-text-muted">{post.author}</span>
                <span aria-hidden className="text-text-faint">·</span>
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-faint">
                  {post.dateLong}
                </span>
                <span aria-hidden className="text-text-faint">·</span>
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-faint">
                  {post.readingTime}
                </span>
              </div>
            </div>
          </section>

          {/* 2. Optional video — sits above the body when present */}
          {post.videoId && (
            <section className="relative px-6 pb-4 lg:px-10">
              <div className="chrome-card relative mx-auto aspect-video w-full max-w-[960px] overflow-hidden">
                <iframe
                  src={embed(post.videoId)}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </section>
          )}

          {/* 3. Body — comfortable reading column */}
          <section className="relative px-6 pb-20 pt-6 lg:px-10 lg:pb-24 lg:pt-10">
            <EdgeDivider />
            <div className="mx-auto mt-12 max-w-[68ch]">
              {post.body.map((section, i) => (
                <div key={i} className={i === 0 ? "" : "mt-14"}>
                  {section.heading && (
                    <h2 className="mb-6 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.015em] text-text">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-6">
                    {section.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="text-[1.0625rem] leading-[1.75] text-text lg:text-[1.125rem]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. FAQ — promoted heading, same accordion */}
          {post.faqs.length > 0 && (
            <section className="relative px-6 py-16 lg:px-10 lg:py-24">
              <EdgeDivider />
              <div className="mx-auto max-w-[820px]">
                <p className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                  After you finish
                </p>
                <h2 className="text-metal-static mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.015em]">
                  Questions this raises.
                </h2>
                <div className="mt-8">
                  <Accordion items={post.faqs} />
                </div>
              </div>
            </section>
          )}
        </article>

        {/* 5. Read next + Subscribe — editorial side-by-side band */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-24">
          <EdgeDivider />
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
              {/* Read next — glass sweep card */}
              <div>
                <p className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                  Read next
                </p>
                <Link
                  href={`/newsletter/${related.slug}`}
                  className="glass sweep group mt-5 flex flex-col gap-5 rounded-2xl p-7 transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 lg:p-8"
                >
                  <div className="flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-faint">
                    <span>{related.date}</span>
                    <span aria-hidden>·</span>
                    <span>{related.readingTime}</span>
                  </div>
                  <h3 className="font-display text-[clamp(1.4rem,2.6vw,1.95rem)] font-medium leading-[1.15] tracking-[-0.015em] text-text">
                    {related.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-text-muted">
                    {related.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-text">
                    Read
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </div>

              {/* Subscribe — sat alongside, hairline divider on desktop */}
              <div className="lg:border-l lg:border-line lg:pl-12">
                <p className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                  Subscribe
                </p>
                <p className="mt-5 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.015em] text-text">
                  Get the next dispatch.
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
                  Short notes from the studio. No schedule, no spam.
                </p>
                <div className="mt-6">
                  <NewsletterSignup size="sm" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Closing CTA — the standard band, like every other page */}
        <ClosingCTA subline="Or skip the reading and tell us about your show." />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
