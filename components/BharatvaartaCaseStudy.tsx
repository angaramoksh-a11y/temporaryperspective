import Nav from "./Nav";
import Footer from "./Footer";
import PageHeroWord from "./PageHeroWord";
import HeroFilm from "./HeroFilm";
import RemoteCompare from "./RemoteCompare";
import WorkMarquee from "./WorkMarquee";
import TweetEmbed from "./TweetEmbed";
import Thumb from "./Thumb";
import { CaseProse, RelatedCases } from "./caseParts";
import { EdgeDivider } from "./ui";
import { bharatvaartaContent as c } from "@/lib/work";

export default function BharatvaartaCaseStudy() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Header — mega metallic word, centred, matching the interior hero */}
        <PageHeroWord
          word="Bharatvaarta"
          eyebrow={c.eyebrow}
          sub={c.host}
          staticGlow
        />

        {/* 2. Testimonial — home-hero film + the pull-quote */}
        <section className="relative px-6 pb-20 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-[1000px]">
            <HeroFilm id={c.testimonialVimeoId} caption={c.testimonialName} />
            <blockquote className="mx-auto mt-10 max-w-[680px] text-center font-display text-[clamp(1.25rem,2.2vw,1.6rem)] font-light italic leading-[1.4] tracking-[-0.01em] text-text">
              “{c.quote}”
            </blockquote>
          </div>
        </section>

        {/* 3. About the show — text left, boxed channel embed right */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight text-text">
                About the show
              </h2>
              <div className="mt-6 space-y-6">
                {c.aboutShow.map((p, i) => (
                  <p
                    key={i}
                    className="text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.7] text-text"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <ChannelBox />
          </div>
        </section>

        {/* 4. Our role */}
        <CaseProse label="Our role" paragraphs={c.ourRole} />

        {/* 5. Before / after */}
        <section className="relative px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight text-text">
              {c.compare.label}
            </h2>
            <p className="mt-4 max-w-xl text-[clamp(1.0625rem,1.4vw,1.3125rem)] leading-relaxed text-text-muted">
              {c.compare.line}
            </p>
            <div className="mt-8">
              <RemoteCompare
                ariaLabel="Compare before and after"
                sides={[
                  {
                    key: "before",
                    label: "Before",
                    id: c.compare.before.id,
                    start: c.compare.before.start,
                    alt: "The same studio and host, before the regrade and relight",
                    lightboxTitle: "Before",
                    lightboxClient: "Bharatvaarta",
                  },
                  {
                    key: "after",
                    label: "After",
                    id: c.compare.after.id,
                    start: c.compare.after.start,
                    alt: "The same studio, regraded and relit, three angles",
                    lightboxTitle: "After",
                    lightboxClient: "Bharatvaarta",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 6. Work showcase — one continuous marquee */}
        <section className="relative py-20 lg:py-24">
          <EdgeDivider />
          <div className="mx-auto mb-10 max-w-[1200px] px-6 lg:px-10">
            <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight text-text">
              Over a hundred conversations.
            </h2>
          </div>
          <WorkMarquee tiles={c.marquee} ariaLabel="Bharatvaarta episodes" />
        </section>

        {/* 7. The tweet */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[640px]">
            <h2 className="mb-8 text-center font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight text-text">
              {c.tweet.line}
            </h2>
            <TweetEmbed url={c.tweet.url} />
          </div>
        </section>

        {/* 8. Other case studies (no closing CTA: the footer carries the page out) */}
        <RelatedCases related={c.related} />
      </main>
      <Footer />
    </>
  );
}

// A small boxed link to the show's YouTube channel: a recognizable still under
// the chromium card treatment, opening the channel in a new tab.
function ChannelBox() {
  return (
    <a
      href={c.channel.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Bharatvaarta on YouTube, ${c.channel.handle}`}
      className="chrome-card sweep group block self-start overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Thumb
          id={c.channel.posterId}
          alt="Bharatvaarta on YouTube"
          className="brightness-[0.42] saturate-[0.9] transition-[filter,transform] duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:brightness-[0.6]"
        />
        {/* sink the poster into the near-black palette: an even tint plus a
            darker bottom anchor so it never reads "YouTube-loud" */}
        <span aria-hidden className="absolute inset-0 bg-bg-sunken/55" />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-bg-sunken via-bg-sunken/45 to-transparent"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/55 px-2.5 py-1 text-xs text-text backdrop-blur">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            aria-hidden
            fill="currentColor"
          >
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z" />
          </svg>
          YouTube
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <span>
          <span className="block font-display text-lg font-medium tracking-tight text-text">
            Bharatvaarta
          </span>
          <span className="mt-0.5 block text-xs text-text-faint">
            {c.channel.handle}
          </span>
        </span>
        <span className="shrink-0 text-text-muted transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:text-text">
          ↗
        </span>
      </div>
    </a>
  );
}
