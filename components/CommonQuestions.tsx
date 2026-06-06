"use client";

import Accordion from "./Accordion";
import { GhostButton } from "./ui";
import { homeFaqs } from "@/lib/work";

export default function CommonQuestions() {
  return (
    <section className="relative py-14 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 lg:w-[86%] lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-metal font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Common questions.
          </h2>
          <p className="mt-5 max-w-sm text-text-muted">
            The things people ask before booking. Answered honestly.
          </p>
          <GhostButton href="/faq" className="mt-8">
            See all questions →
          </GhostButton>
        </div>
        <Accordion items={homeFaqs} />
      </div>
    </section>
  );
}
