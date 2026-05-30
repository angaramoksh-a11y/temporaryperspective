import Nav from "./Nav";
import Footer from "./Footer";
import TestimonialVimeo from "./TestimonialVimeo";
import ByFormat from "./ByFormat";
import ClosingCTA from "./ClosingCTA";
import { CaseBackLink, CaseProse, RelatedCases } from "./caseParts";
import { bureauContent as c } from "@/lib/work";

export default function BureauCaseStudy() {
  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <section className="relative px-6 pb-10 pt-32 lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-[1400px]">
            <CaseBackLink />
            <h1 className="mt-8 font-thunder text-[clamp(3.5rem,15vw,12rem)] uppercase leading-[0.9] tracking-[-0.01em]">
              Bureau
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

        {/* About the work */}
        <CaseProse label="About the work" paragraphs={c.about} />

        {/* Pull quote */}
        <section className="relative px-6 py-12 lg:px-10 lg:py-16">
          <figure className="mx-auto max-w-[760px] border-l border-line-strong pl-7 lg:pl-9">
            <blockquote className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light italic leading-[1.25] tracking-[-0.01em]">
              “{c.quote.text}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-text-muted">
              {c.quote.attribution}
            </figcaption>
          </figure>
        </section>

        {/* What we do, by format */}
        <ByFormat blocks={c.formats} />

        {/* Related work */}
        <RelatedCases related={c.related} />

        <ClosingCTA subline="Want a show like Bureau? Start with a call." />
      </main>
      <Footer />
    </>
  );
}
