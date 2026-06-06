"use client";

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ClosingCTA from "./ClosingCTA";
import PageHeroWord from "./PageHeroWord";
import RemoteCompare from "./RemoteCompare";
import WorkMarquee from "./WorkMarquee";
import TweetEmbed from "./TweetEmbed";
import Thumb from "./Thumb";
import { RelatedCases } from "./caseParts";
import { EdgeDivider } from "./ui";
import MediaLightbox, { type LightboxItem } from "./MediaLightbox";
import { CredIconSvg } from "./testimonialBits";
import { bharatvaartaContent as c } from "@/lib/work";

const ROSHAN_LINKEDIN = "https://www.linkedin.com/in/cariappack/";
const BV_INSTAGRAM = "https://www.instagram.com/bharatvaarta/";

const lbItem: LightboxItem = {
  title: c.testimonialName,
  client: "Bharatvaarta",
  media: { kind: "vimeo", h: { id: c.testimonialVimeoId } },
  links: [{ label: "Roshan on LinkedIn", href: ROSHAN_LINKEDIN, external: true }],
};

export default function BharatvaartaCaseStudy() {
  const [lbOpen, setLbOpen] = useState(false);

  return (
    <>
      <Nav />
      <main>
        {/* 1. Header — oversized metallic word */}
        <PageHeroWord word="Bharatvaarta" eyebrow={c.eyebrow} sub={c.host} />

        {/* 2. Testimonial video — poster → lightbox, pull quote caption below */}
        <section className="relative px-6 pb-16 pt-2 lg:px-10 lg:pb-24">
          <EdgeDivider />
          <div className="mx-auto mt-12 max-w-[1200px]">
            <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised/15">
              {/* video — poster with play button, opens lightbox */}
              <button
                onClick={() => setLbOpen(true)}
                aria-label={`Play ${c.testimonialName} testimonial`}
                className="group relative block aspect-video w-full overflow-hidden bg-bg-sunken"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://vumbnail.com/${c.testimonialVimeoId}.jpg`}
                  alt={c.testimonialName}
                  loading="eager"
                  className="h-full w-full object-cover brightness-[0.8] transition-[filter,transform] duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.015] group-hover:brightness-95"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-bg/45 backdrop-blur transition-all duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 translate-x-px fill-text"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>

              {/* speaker identity + LinkedIn */}
              <div className="flex items-start justify-between gap-4 px-6 py-4">
                <div>
                  <p className="text-[0.9375rem] font-medium text-text">
                    Roshan Cariappa
                  </p>
                  <p className="mt-0.5 text-sm text-text-faint">
                    Host, Bharatvaarta
                  </p>
                </div>
                <a
                  href={ROSHAN_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Roshan Cariappa on LinkedIn"
                  className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-strong bg-white/[0.03] text-text-faint transition-colors hover:border-white/30 hover:text-text"
                >
                  <CredIconSvg name="linkedin" className="h-[17px] w-[17px]" />
                </a>
              </div>

              {/* pull quote — italic caption */}
              <p className="border-t border-line px-6 pb-5 pt-4 text-[0.9375rem] italic leading-snug text-text-muted">
                {c.quote}
              </p>
            </div>
          </div>

          <MediaLightbox
            items={[lbItem]}
            index={lbOpen ? 0 : null}
            onClose={() => setLbOpen(false)}
          />
        </section>

        {/* 3. About the show — prose left, channel card right */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-20">
          <EdgeDivider />
          <div className="mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <h2 className="text-metal-static font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight">
                About the show
              </h2>
              <div className="mt-6 space-y-6">
                {c.aboutShow.map((p, i) => (
                  <p
                    key={i}
                    className="text-[clamp(1.0625rem,1.5vw,1.1875rem)] leading-[1.7] text-text"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <ChannelBox />
              {/* Instagram — a quiet second social link below the channel card */}
              <a
                href={BV_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Bharatvaarta on Instagram"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-line-strong bg-white/[0.02] px-3 py-2 text-sm text-text-faint transition-colors hover:border-white/25 hover:text-text"
              >
                <CredIconSvg name="instagram" className="h-[15px] w-[15px]" />
                @bharatvaarta
              </a>
            </div>
          </div>
        </section>

        {/* 4. Our role — chrome-card grounds the prose on the page */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-20">
          <EdgeDivider />
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-metal-static font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight">
              Our role
            </h2>
            <div className="chrome-card mt-6 space-y-5 px-6 py-7 lg:px-8 lg:py-8">
              {c.ourRole.map((p, i) => (
                <p
                  key={i}
                  className="text-[clamp(1.0625rem,1.5vw,1.1875rem)] leading-[1.7] text-text-muted"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Before / after — VirtualCallout layout exactly */}
        <section className="relative py-14 lg:py-28">
          <EdgeDivider />
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-6 lg:w-[86%] lg:grid-cols-2 lg:gap-12 lg:px-0">
            {/* left: kicker + H2 */}
            <div>
              <p className="text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-faint">
                {c.compare.label}
              </p>
              <h2 className="text-metal-static mt-4 text-balance font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                {c.compare.line}
              </h2>
            </div>
            {/* right: RemoteCompare — sides unchanged */}
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
        </section>

        {/* 6. Work showcase — one continuous marquee */}
        <section className="relative py-20 lg:py-24">
          <EdgeDivider />
          <div className="mx-auto mb-10 max-w-[1200px] px-6 lg:px-10">
            <h2 className="text-metal-static font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight">
              Over a hundred conversations.
            </h2>
          </div>
          <WorkMarquee tiles={c.marquee} ariaLabel="Bharatvaarta episodes" />
        </section>

        {/* 7. The tweet */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-20">
          <EdgeDivider />
          <div className="mx-auto max-w-[640px]">
            <h2 className="text-metal-static mb-8 text-center font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-tight">
              {c.tweet.line}
            </h2>
            <TweetEmbed url={c.tweet.url} />
          </div>
        </section>

        {/* 8. Other case studies */}
        <RelatedCases related={c.related} />

        {/* 9. Closing CTA — constant on every page */}
        <ClosingCTA subline="The work behind this show is the work we'd do for yours." />
      </main>
      <Footer />
    </>
  );
}

// YouTube channel card: a recognizable still under the chrome-card treatment.
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
