import Link from "next/link";
import { newsletterPosts } from "@/lib/work";
import { ArrowLink } from "./ui";
import NewsletterSignup from "./NewsletterSignup";

export default function Newsletter() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:w-[86%] lg:px-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="text-metal font-display text-[clamp(2.5rem,4vw,3.8rem)] font-medium leading-[1.1] tracking-[-0.02em]">
              Newsletter
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-text-muted">
              Notes on running a podcast worth watching.
            </p>
          </div>
          {/* simple email capture on the right */}
          <div className="lg:justify-self-end">
            <NewsletterSignup size="lg" />
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {newsletterPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/newsletter/${post.slug}`}
              className="sweep group flex flex-col bg-bg p-7 transition-colors hover:bg-bg-raised"
            >
              <div className="flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-faint">
                <span>{post.date}</span>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h4 className="mt-4 font-display text-xl font-normal leading-snug tracking-tight text-text">
                {post.title}
              </h4>
              <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-text-faint transition-colors group-hover:text-text">
                Read
                <span className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <ArrowLink href="/newsletter" className="text-sm">
            All posts
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
