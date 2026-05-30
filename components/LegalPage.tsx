import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SectionLabel } from "@/components/ui";

export type LegalSection = {
  heading: string;
  paras?: string[];
  bullets?: string[];
};

export default function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-16 pt-36 lg:px-10 lg:pt-44">
          <div className="mx-auto max-w-[760px]">
            <SectionLabel>Last updated {lastUpdated}</SectionLabel>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-light leading-[1.05] tracking-tight">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-text-muted">
                {intro}
              </p>
            )}
          </div>
        </section>

        <section className="px-6 pb-28 lg:px-10">
          <div className="mx-auto max-w-[760px]">
            <ol className="space-y-12">
              {sections.map((s, i) => (
                <li key={s.heading} className="grid gap-3">
                  <h2 className="flex items-baseline gap-3 font-display text-[1.4rem] font-medium tracking-tight">
                    <span className="font-mono text-xs text-text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  {s.paras?.map((p, j) => (
                    <p
                      key={j}
                      className="text-[1rem] leading-relaxed text-text-muted"
                    >
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-1 space-y-2">
                      {s.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-[1rem] leading-relaxed text-text-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-text-faint"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
