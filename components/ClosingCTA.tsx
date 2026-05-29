import { CAL_LINK } from "@/lib/work";
import { EdgeDivider, PrimaryButton } from "./ui";

export default function ClosingCTA() {
  return (
    <section className="relative">
      <EdgeDivider />
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 py-28 text-center lg:px-10 lg:py-36">
        <div
          aria-hidden
          className="led-breathe h-2 w-2 rounded-full bg-accent"
        />
        <h2 className="max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] tracking-tight">
          Let&apos;s talk about your show.
        </h2>
        <PrimaryButton href={CAL_LINK} size="lg">
          Book a call
        </PrimaryButton>
      </div>
    </section>
  );
}
