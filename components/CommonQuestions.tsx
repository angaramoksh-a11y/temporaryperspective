"use client";

import Accordion from "./Accordion";
import { GhostButton } from "./ui";
import { homeFaqs } from "@/lib/work";

export default function CommonQuestions() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
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
