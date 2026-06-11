import MetallicLogo from "./MetallicLogo";
import { EdgeDivider, Magnetic, PrimaryButton } from "./ui";

export default function ClosingCTA({
  subline,
  divider = true,
}: {
  subline?: string;
  divider?: boolean;
}) {
  return (
    <section className="relative">
      {divider && <EdgeDivider />}
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 px-6 py-28 text-center lg:w-[86%] lg:px-0 lg:py-36">
        <div className="flex flex-col items-center gap-5">
          <MetallicLogo className="mb-2 w-40 md:w-44" />
          <h2 className="text-metal max-w-2xl font-display text-[clamp(2.5rem,4vw,3.8rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Let&apos;s talk about your show.
          </h2>
          {subline && (
            <p className="max-w-md text-lg leading-relaxed text-text-muted">
              {subline}
            </p>
          )}
        </div>
        <Magnetic>
          <PrimaryButton href="/contact" size="lg">
            Book a call
          </PrimaryButton>
        </Magnetic>
      </div>
    </section>
  );
}
