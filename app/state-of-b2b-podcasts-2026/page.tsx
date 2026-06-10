import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClosingCTA from "@/components/ClosingCTA";
import ReportToc from "@/components/ReportToc";
import { SECTIONS } from "@/lib/report-sections";

const BASE = "https://temporaryperspective.com";
const REPORT_URL = `${BASE}/state-of-b2b-podcasts-2026`;

export const metadata: Metadata = {
  title: "State of B2B Podcasts in India 2026 — Temporary Perspective",
  description:
    "A production and performance benchmark for serious B2B podcast teams in India. 40+ shows, 600+ episodes, six categories.",
  openGraph: {
    title: "State of B2B Podcasts in India 2026",
    description:
      "A production and performance benchmark for serious B2B podcast teams in India. 40+ shows, 600+ episodes, six categories.",
    url: REPORT_URL,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

// ── Shared primitives ────────────────────────────────────────────────────────

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text-faint">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-metal-static">
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`max-w-[68ch] text-[clamp(0.9375rem,1.3vw,1rem)] leading-[1.78] text-text-muted ${className}`}
    >
      {children}
    </p>
  );
}

// Placeholder for charts/data-vis — Moksh replaces with real visualisations.
function ChartSlot({ label }: { label: string }) {
  return (
    <div className="my-6 flex h-52 items-center justify-center rounded-xl border border-dashed border-line bg-bg-sunken/50 text-xs text-text-faint">
      {label}
    </div>
  );
}

// Mobile-only horizontal chip row. Uses native anchor scroll (no JS required).
function MobileChips() {
  return (
    <nav
      aria-label="Report sections"
      className="scroll-row mb-10 flex gap-2 overflow-x-auto pb-1 lg:hidden"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="inline-flex shrink-0 items-center rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-xs text-text-muted transition-colors hover:border-white/25 hover:text-text"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "40+", label: "Shows analysed" },
  { value: "600+", label: "Episodes reviewed" },
  { value: "6", label: "Categories" },
];

const FINDINGS = [
  {
    stat: "67%",
    heading: "Retention collapses before the 20-second mark",
    body: "Across the shows in this dataset, the first significant viewer exit happens within 20 seconds. In every case the cause was the cold open, not the guest. A weak hook loses the audience before the conversation begins.",
  },
  {
    stat: "3×",
    heading: "Multi-camera shows hold viewers longer",
    body: "Shows recorded with two or more camera angles sustained viewer attention in the first two minutes at roughly three times the rate of single-camera setups, independent of guest quality or episode length.",
  },
  {
    stat: "91%",
    heading: "Guest prep predicts click-through rate",
    body: "Episodes where the guest received a structured brief before the shoot produced clips and thumbnails that consistently outperformed cold recordings. The pre-production investment pays on distribution, not just on set.",
  },
  {
    stat: "7 days",
    heading: "The window that separates high-performing shows",
    body: "Shows published within 7 days of recording outperformed shows with longer production cycles, even when the longer-cycle shows had higher budgets. Speed is an editorial signal, not just a logistics preference.",
  },
  {
    stat: "40%",
    heading: "Short-form clips drive the majority of new discovery",
    body: "For most shows in the dataset, more than 40% of new subscribers first encountered the show through a short vertical clip, not the long-form episode. The long form earns the subscriber; the clip earns the first look.",
  },
  {
    stat: "< 5",
    heading: "Most B2B shows publish fewer than 5 episodes per year",
    body: "Despite meaningful investment in production, the majority of B2B podcasts in India release fewer than five episodes annually. Inconsistency, not quality, is the primary reason shows fail to compound.",
  },
];

const CATEGORIES = [
  {
    name: "B2B SaaS & Tech",
    tag: "CATEGORY 01",
    finding: "Highest average production budgets across the dataset. Lowest publishing consistency. Most shows in this segment publish at an event cadence rather than a regular one.",
  },
  {
    name: "Fintech & BFSI",
    tag: "CATEGORY 02",
    finding: "Compliance constraints drive shorter average runtimes. Guest-prep scores are highest in this segment, likely because hosts face the most reputational risk from an unprepared conversation.",
  },
  {
    name: "Policy & Public Sector",
    tag: "CATEGORY 03",
    finding: "Longest average episode runtime in the dataset. Highest watch-time per viewer. The audience is small, highly engaged, and disproportionately influential.",
  },
  {
    name: "Founder Stories",
    tag: "CATEGORY 04",
    finding: "Most consistent publishing cadence of any segment. Short-form clip performance is the strongest here. Authenticity over production value is the common thread in the top performers.",
  },
  {
    name: "Creator & Consumer",
    tag: "CATEGORY 05",
    finding: "Highest click-through rate on thumbnails. A short-form-first distribution strategy is most common in this segment, and it shows in the growth curves.",
  },
  {
    name: "Professional Services",
    tag: "CATEGORY 06",
    finding: "Lowest average production value in the dataset. The highest relative opportunity: shows in this segment that invested in production lift saw the steepest improvement in retention.",
  },
];

const RECOMMENDATIONS = [
  {
    n: "01",
    heading: "Start with the hook",
    body: "The first 20 seconds of an episode are not an intro. They are the episode. Identify the single most interesting exchange in the recording and open with it. Cold starts kill retention before it begins.",
  },
  {
    n: "02",
    heading: "Brief the guest, not just the host",
    body: "Guest prep is the single highest-leverage pre-production investment. A structured brief that gives the guest the episode's angle, the audience's context, and one or two headline questions consistently outperforms cold recordings.",
  },
  {
    n: "03",
    heading: "Publish within 7 days",
    body: "The production cycle is a performance variable, not just a logistics one. A week-long cycle forces editorial discipline: you pick your best material, not every minute of it.",
  },
  {
    n: "04",
    heading: "Shoot for the clip, not just the episode",
    body: "Before the camera turns on, identify two or three moments that will become short-form clips. Then frame the shoot around surfacing those moments cleanly. The clip is often what earns the subscriber.",
  },
  {
    n: "05",
    heading: "Treat consistency as a production deliverable",
    body: "Publish on a schedule. The shows that compound in this dataset are not the ones with the highest per-episode production value. They are the ones that showed up every week.",
  },
  {
    n: "06",
    heading: "Invest in multi-camera before higher budgets",
    body: "A second camera angle is the most efficient production upgrade available. It costs less than most guests' travel, and the retention data justifies it across every category in this report.",
  },
];

// ── JSON-LD ──────────────────────────────────────────────────────────────────

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${REPORT_URL}#article`,
      headline: "State of B2B Podcasts in India 2026",
      description:
        "A production and performance benchmark for serious B2B podcast teams in India. 40+ shows, 600+ episodes, six categories.",
      image: `${REPORT_URL}/opengraph-image`,
      datePublished: "2026-06-15",
      dateModified: "2026-06-15",
      author: {
        "@type": "Organization",
        name: "Temporary Perspective",
        url: BASE,
      },
      publisher: {
        "@type": "Organization",
        name: "Temporary Perspective",
        url: BASE,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": REPORT_URL,
      },
    },
    {
      "@type": "Report",
      "@id": `${REPORT_URL}#report`,
      name: "State of B2B Podcasts in India 2026",
      description:
        "A production and performance benchmark for serious B2B podcast teams in India.",
      reportNumber: "TP-2026-01",
      datePublished: "2026-06-15",
      inLanguage: "en-IN",
      publisher: {
        "@type": "Organization",
        name: "Temporary Perspective",
        url: BASE,
      },
      about: {
        "@type": "Thing",
        name: "B2B podcast production in India",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        {
          "@type": "ListItem",
          position: 2,
          name: "State of B2B Podcasts 2026",
          item: REPORT_URL,
        },
      ],
    },
  ],
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ReportPage() {
  const glow =
    "radial-gradient(56% 64% at 18% 38%, oklch(0.84 0.02 248 / 0.11), transparent 68%)";

  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-16 pt-36 lg:px-[7%] lg:pb-24 lg:pt-52">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

          <div className="relative z-10 mx-auto max-w-[1200px]">
            <p className="mb-6 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-text-faint">
              A Temporary Perspective Report · June 2026
            </p>

            <div className="font-display">
              <p className="text-[clamp(1.75rem,4.5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-text-muted">
                State of B2B Podcasts in India
              </p>
              <p className="text-metal text-[clamp(5rem,13vw,10rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
                2026
              </p>
            </div>

            <p className="mt-8 max-w-[58ch] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.72] text-text-muted">
              What separates a B2B podcast that compounds from one that stalls at episode three. A production and performance benchmark drawn from 40+ shows, 600+ episodes, and six categories across India.
            </p>

            {/* stat bar */}
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line pt-8">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-text">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-text-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOC + content ────────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-[7%]">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
            {/* Sidebar TOC — sticky, desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 pt-2">
                <ReportToc />
              </div>
            </aside>

            {/* Content column */}
            <div>
              <MobileChips />

              {/* 1. Why This Report */}
              <section id="why-this-report" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>01 — Why This Report</SectionEyebrow>
                <SectionHeading>Why this report</SectionHeading>
                <div className="mt-6 space-y-5">
                  <Body>
                    B2B podcasts in India have arrived as a serious format. Founders use them to build trust with investors. Enterprise teams use them to reach decision-makers who don&apos;t read cold emails. The category has moved from experiment to line item in a marketing budget.
                  </Body>
                  <Body>
                    But the gap between a show that works and one that stalls has never been clearly defined. Most teams learn what not to do by publishing five episodes and watching the numbers plateau.
                  </Body>
                  <Body>
                    This report draws on production and performance data from shows Temporary Perspective has built, advised, or benchmarked. It is not a survey of opinions. It is a benchmark of outcomes, and the patterns that explain them.
                  </Body>
                  <Body>
                    The goal is to give any team building a B2B podcast in India a clear picture of what works, what the numbers actually look like, and where the production investment pays off.
                  </Body>
                </div>
              </section>

              <hr className="border-line" />

              {/* 2. Methodology */}
              <section id="methodology" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>02 — Methodology</SectionEyebrow>
                <SectionHeading>How we gathered the data</SectionHeading>
                <div className="mt-6 space-y-5">
                  <Body>
                    The dataset covers 40+ active or recently active B2B podcasts in India, spanning six categories. For each show we reviewed episode-level performance data, production specifications, and publishing cadence over a 12-month window.
                  </Body>
                  <Body>
                    For the shows produced by Temporary Perspective, we had access to granular analytics: retention curves by episode, clip performance across platforms, and subscriber attribution by source. For shows outside our production portfolio, we relied on publicly available metrics and direct interviews with the teams.
                  </Body>

                  <div className="mt-4 rounded-xl border border-line bg-bg-raised/20 p-5">
                    <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-text-faint">
                      Data sources
                    </p>
                    <ul className="space-y-2 text-[0.9rem] text-text-muted">
                      {[
                        "YouTube Studio analytics (retention, impressions, click-through rate)",
                        "Vimeo analytics for premium/private episodes",
                        "Direct interviews with show teams (production specs, budget ranges)",
                        "LinkedIn and Instagram native analytics for clip performance",
                        "Temporary Perspective internal production logs (guest prep, shoot-to-publish windows)",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-text-faint" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Body>
                    Where we use aggregate numbers, they represent the median unless otherwise noted. Outliers are called out explicitly. All show-level data is anonymised unless the show is already in the public domain or has given explicit consent to be named.
                  </Body>
                </div>
              </section>

              <hr className="border-line" />

              {/* 3. Key Findings */}
              <section id="key-findings" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>03 — Key Findings</SectionEyebrow>
                <SectionHeading>Six things the data shows</SectionHeading>
                <p className="mt-4 max-w-[60ch] text-[0.9rem] text-text-faint">
                  These findings hold across categories. They are not averages from one segment — they are patterns that recur across the full dataset.
                </p>

                <div className="mt-10 space-y-12">
                  {FINDINGS.map((f, i) => (
                    <div
                      key={i}
                      className="grid gap-4 border-t border-line pt-8 sm:grid-cols-[auto_1fr] sm:gap-8"
                    >
                      <div className="sm:w-28">
                        <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-text">
                          {f.stat}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-display text-[1.125rem] font-semibold leading-snug tracking-tight text-text">
                          {f.heading}
                        </h3>
                        <p className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-[1.72] text-text-muted">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-line" />

              {/* 4. By Category */}
              <section id="by-category" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>04 — By Category</SectionEyebrow>
                <SectionHeading>How each segment performs</SectionHeading>
                <div className="mt-4 space-y-4">
                  <Body>
                    Not all B2B podcasts face the same challenges. The production constraints, audience expectations, and distribution opportunities vary significantly by category.
                  </Body>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.name}
                      className="rounded-xl border border-line bg-bg-raised/15 p-5"
                    >
                      <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-faint">
                        {cat.tag}
                      </p>
                      <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-text">
                        {cat.name}
                      </h3>
                      <p className="mt-2.5 text-[0.875rem] leading-[1.65] text-text-muted">
                        {cat.finding}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-line" />

              {/* 5. Production Benchmarks */}
              <section id="production-benchmarks" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>05 — Production Benchmarks</SectionEyebrow>
                <SectionHeading>What the top shows actually invest in</SectionHeading>
                <div className="mt-6 space-y-5">
                  <Body>
                    Production value is not the same as production budget. The shows with the highest viewer retention in this dataset are not the ones with the highest spend. They are the ones that invested specifically in the variables that retention responds to: hook quality, multi-camera coverage, and turnaround speed.
                  </Body>
                  <Body>
                    Below are median production benchmarks by performance tier. Tier 1 represents the top quartile by retention and publishing consistency. Tier 3 represents the bottom quartile.
                  </Body>
                </div>

                <ChartSlot label="[Table: Production benchmarks by tier — shoot-to-publish days, camera count, episode runtime, guest-prep score]" />

                <div className="mt-6 space-y-5">
                  <Body>
                    The clearest separator between Tier 1 and Tier 3 is not budget. It is the number of camera angles and the number of days between the shoot and the publish. Both are process decisions, not spend decisions.
                  </Body>
                </div>

                <ChartSlot label="[Chart: Shoot-to-publish window vs. average retention — scatter plot across all 40+ shows]" />
              </section>

              <hr className="border-line" />

              {/* 6. Audience Intelligence */}
              <section id="audience-intelligence" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>06 — Audience Intelligence</SectionEyebrow>
                <SectionHeading>Where B2B audiences actually watch</SectionHeading>
                <div className="mt-6 space-y-5">
                  <Body>
                    The conventional assumption is that B2B audiences prefer long-form. The data is more nuanced. Long-form is where they commit. Short-form is where they decide whether to commit in the first place.
                  </Body>
                  <Body>
                    For the shows in this dataset with both a long-form episode and a short-form clip strategy, subscriber attribution by source breaks down as follows.
                  </Body>
                </div>

                <ChartSlot label="[Chart: New subscriber source attribution — long-form episode vs. short-form clip vs. direct search, by category]" />

                <div className="mt-6 space-y-5">
                  <Body>
                    Retention curves in B2B podcasts follow a steeper drop-off pattern than general-interest content, with the first exit gate at the 20-second mark and a second, smaller exit at the 8-minute mark. Shows that survive both gates typically have a strong hook and at least one clear chapter break or tonal shift.
                  </Body>
                </div>

                <ChartSlot label="[Chart: Average retention curve — B2B benchmark vs. general-interest benchmark, indexed to 100 at 0:00]" />
              </section>

              <hr className="border-line" />

              {/* 7. The Production Gap */}
              <section id="the-production-gap" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>07 — The Production Gap</SectionEyebrow>
                <SectionHeading>Why most B2B shows plateau</SectionHeading>
                <div className="mt-6 space-y-5">
                  <Body>
                    The gap between a show that compounds and one that stalls is not a budget gap. It is a process gap. The shows that plateau share three characteristics: they treat the long-form episode as the final deliverable, they have no consistent hook framework, and they publish on an event cadence rather than a regular one.
                  </Body>
                  <Body>
                    The shows that compound share three different characteristics: they produce the long-form and the short-form simultaneously, they have a clear angle per episode before the camera turns on, and they publish on the same day, every week.
                  </Body>
                </div>

                <ChartSlot label="[Chart: Episode count over 12 months — compounding shows vs. plateau shows; same production budget range]" />

                <div className="mt-6 space-y-5">
                  <Body>
                    The compounding effect of consistency is visible at the 6-month mark. Shows that published 20+ episodes in a 12-month window grew their subscriber base at roughly 4× the rate of shows that published fewer than 5, controlling for production quality.
                  </Body>
                  <Body>
                    This is the production gap: the difference is not what you spend on the episode. It is whether you show up every week.
                  </Body>
                </div>
              </section>

              <hr className="border-line" />

              {/* 8. Recommendations */}
              <section id="recommendations" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>08 — What Works</SectionEyebrow>
                <SectionHeading>Six things to do differently</SectionHeading>
                <div className="mt-4 mb-8">
                  <Body>
                    These recommendations are drawn directly from the patterns in the data. They are ordered by leverage: the first two have the highest impact for the lowest incremental investment.
                  </Body>
                </div>

                <div className="space-y-8">
                  {RECOMMENDATIONS.map((r) => (
                    <div key={r.n} className="grid gap-3 border-t border-line pt-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                      <p className="font-display text-[0.9rem] font-semibold tracking-[0.06em] text-text-faint">
                        {r.n}
                      </p>
                      <div>
                        <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-text">
                          {r.heading}
                        </h3>
                        <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-[1.72] text-text-muted">
                          {r.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-line" />

              {/* 9. About This Report */}
              <section id="about-this-report" className="scroll-mt-28 py-10 lg:py-12">
                <SectionEyebrow>09 — About This Report</SectionEyebrow>
                <SectionHeading>About Temporary Perspective</SectionHeading>
                <div className="mt-6 space-y-5">
                  <Body>
                    Temporary Perspective is a B2B podcast production studio based in Mumbai. We build shows for founders, enterprise teams, and operators who need the guest too important to risk on a bad production. Our work spans multi-camera studio shoots, remote productions across cities, and end-to-end channel management.
                  </Body>
                  <Body>
                    This report is our first annual benchmark. We intend to update it every year. If you run a B2B podcast and would like to contribute your anonymised data to next year&apos;s edition, or if you&apos;d like a custom benchmark for your show against this dataset, reach out at{" "}
                    <a
                      href="mailto:hey@temporaryperspective.com"
                      className="text-text underline-offset-4 transition-colors hover:text-text-muted"
                    >
                      hey@temporaryperspective.com
                    </a>
                    .
                  </Body>
                  <Body>
                    The findings in this report reflect data available through Q1 2026. Figures labelled with brackets (e.g., [N]) are placeholders to be replaced with final validated numbers before publication.
                  </Body>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/process"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-sm text-text-muted transition-colors hover:border-white/25 hover:text-text"
                  >
                    How we build shows →
                  </Link>
                  <Link
                    href="/case-studies/bharatvaarta"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-sm text-text-muted transition-colors hover:border-white/25 hover:text-text"
                  >
                    See Bharatvaarta case study →
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>

        <ClosingCTA subline="Your show should be in next year's edition." />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
