import Nav from "./Nav";
import Footer from "./Footer";
import TestimonialVimeo from "./TestimonialVimeo";
import ClosingCTA from "./ClosingCTA";
import { CaseBackLink, CaseProse, RelatedCases } from "./caseParts";
import { EdgeDivider } from "./ui";
import { qapitaContent as c } from "@/lib/work";

export default function QapitaCaseStudy() {
  return (
    <>
      <Nav />
      <main>
        {/* Header — title is the show, not the client */}
        <section className="relative px-6 pb-10 pt-32 lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-[1400px]">
            <CaseBackLink />
            <h1 className="mt-8 font-thunder text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.92] tracking-[-0.01em]">
              {c.title}
            </h1>
            <p className="mt-4 text-[clamp(1.125rem,1.8vw,1.375rem)] text-text-muted">
              {c.producedWith}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
              {c.tagline}
            </p>
          </div>
        </section>

        {/* Testimonial */}
        <section className="relative px-6 pb-20 lg:px-10 lg:pb-28">
          <TestimonialVimeo id={c.testimonialVimeoId} caption={c.testimonialName} />
        </section>

        {/* About the show / TP's role */}
        <CaseProse label="About the show" paragraphs={c.aboutShow} />
        <CaseProse label="Our role" paragraphs={c.ourRole} />

        {/* Status — honest pre-launch label, chromium active pulse */}
        <section className="relative py-24 lg:py-32">
          <EdgeDivider />
          <div className="mx-auto flex max-w-[1400px] flex-col items-center px-6 text-center lg:px-10">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
              <span className="chrome-breathe h-1.5 w-1.5 rounded-full bg-chrome" />
              Status
            </span>
            <h2 className="mt-6 font-thunder text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.95] tracking-[-0.01em]">
              {c.status.label}
            </h2>
            <p className="mt-4 text-[clamp(1.125rem,1.8vw,1.375rem)] text-text-muted">
              {c.status.sub}
            </p>
          </div>
        </section>

        {/* Related work */}
        <RelatedCases related={c.related} />

        <ClosingCTA subline="Want a show like The Catapult Code? Start with a call." />
      </main>
      <Footer />
    </>
  );
}
