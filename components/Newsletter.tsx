import Link from "next/link";
import { newsletterPosts } from "@/lib/work";
import { ArrowLink } from "./ui";

export default function Newsletter() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight">
              Notes on running a podcast worth watching.
            </h2>
          </div>
          <ArrowLink href="/newsletter" className="text-sm">
            All posts
          </ArrowLink>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {newsletterPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/newsletter/${post.slug}`}
              className="sweep group flex flex-col bg-bg p-7 transition-colors hover:bg-bg-raised"
            >
              <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-faint">
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
      </div>
    </section>
  );
}
