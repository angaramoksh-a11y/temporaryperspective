import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Accordion from "@/components/Accordion";
import NewsletterSignup from "@/components/NewsletterSignup";
import { EdgeDivider, PrimaryButton, SectionLabel } from "@/components/ui";
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
        {/* 1. Header */}
        <article className="relative px-6 pt-32 lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-[820px]">
            <Link
              href="/newsletter"
              className="text-sm text-text-faint transition-colors hover:text-text"
            >
              ← All notes
            </Link>
            <h1 className="mt-8 font-thunder text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.92] tracking-[-0.01em]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-2 font-mono text-xs uppercase tracking-[0.15em] text-text-faint">
              <span>{post.dateLong}</span>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* 2. Video — pending real uploads; renders only once an id is set */}
          {post.videoId && (
            <div className="mx-auto mt-12 max-w-[960px]">
              <div className="chrome-card relative aspect-video w-full overflow-hidden">
                <iframe
                  src={embed(post.videoId)}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}

          {/* 3. Long-form body */}
          <div className="mx-auto mt-14 max-w-[720px]">
            {post.body.map((section, i) => (
              <section key={i} className={i === 0 ? "" : "mt-12"}>
                {section.heading && (
                  <h2 className="mb-5 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-normal leading-tight tracking-tight text-text">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-6">
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="text-[clamp(1.125rem,1.5vw,1.3125rem)] leading-[1.75] text-text"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 4. FAQ */}
          <div className="mx-auto mt-16 max-w-[720px]">
            <SectionLabel>Questions this raises</SectionLabel>
            <div className="mt-6">
              <Accordion items={post.faqs} />
            </div>
          </div>
        </article>

        {/* 5. Related post */}
        <section className="relative mt-24 py-20 lg:py-24">
          <EdgeDivider />
          <div className="mx-auto max-w-[820px] px-6 lg:px-10">
            <SectionLabel>Read next</SectionLabel>
            <Link
              href={`/newsletter/${related.slug}`}
              className="sweep group mt-6 flex items-center justify-between gap-6 rounded-2xl border border-line bg-bg-raised/30 p-8 transition-[transform,border-color] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:border-white/20"
            >
              <span>
                <span className="block font-mono text-xs uppercase tracking-[0.15em] text-text-faint">
                  {related.date} · {related.readingTime}
                </span>
                <span className="mt-2 block font-display text-[clamp(1.375rem,2.4vw,1.85rem)] font-normal leading-snug tracking-tight">
                  {related.title}
                </span>
              </span>
              <span className="shrink-0 text-text-muted transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:text-text">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* 6. Footer of post — secondary signup + book a call */}
        <section className="relative py-20 lg:py-24">
          <EdgeDivider />
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-8 px-6 text-center lg:px-10">
            <div className="flex flex-col items-center gap-4">
              <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light tracking-tight">
                Notes like this, now and then.
              </p>
              <NewsletterSignup size="sm" />
            </div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-line" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-faint">
                or
              </span>
              <span className="h-px w-8 bg-line" />
            </div>
            <PrimaryButton href="/contact" size="lg">
              Book a call
            </PrimaryButton>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
