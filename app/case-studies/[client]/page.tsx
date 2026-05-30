import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseVideo from "@/components/CaseVideo";
import ClosingCTA from "@/components/ClosingCTA";
import { ArrowLink, SectionLabel } from "@/components/ui";
import { caseStudies, selectedWork, watch } from "@/lib/work";

function find(slug: string) {
  return caseStudies.find((c) => c.href === `/case-studies/${slug}`);
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ client: c.href.split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string }>;
}): Promise<Metadata> {
  const { client } = await params;
  const cs = find(client);
  if (!cs) return { title: "Case study — Temporary Perspective" };
  return {
    title: `${cs.client} — Temporary Perspective`,
    description: cs.result,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ client: string }>;
}) {
  const { client } = await params;
  const cs = find(client);
  if (!cs) notFound();

  const episodes = selectedWork.filter((e) => e.client === cs.client);

  return (
    <>
      <Nav />
      <main>
        <section className="relative px-6 pb-12 pt-32 lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-[1400px]">
            <Link
              href="/case-studies"
              className="text-sm text-text-faint transition-colors hover:text-text"
            >
              ← All case studies
            </Link>
            <div className="mt-8 flex flex-col gap-4">
              <SectionLabel>{cs.tag}</SectionLabel>
              <h1 className="font-thunder text-[clamp(2.75rem,9vw,7rem)] uppercase leading-[0.95] tracking-[-0.01em]">
                {cs.client}
              </h1>
              <p className="max-w-2xl text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-text-muted">
                {cs.result}
              </p>
              {cs.status && (
                <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs text-text-muted">
                  <span className="led-breathe h-1.5 w-1.5 rounded-full bg-accent" />
                  {cs.status}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="relative px-6 pb-24 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-[1100px]">
            <CaseVideo vimeoId={cs.vimeoId} title={`${cs.client} case study`} />
          </div>
        </section>

        {episodes.length > 0 && (
          <section className="relative px-6 pb-24 lg:px-10 lg:pb-28">
            <div className="mx-auto max-w-[1400px]">
              <div className="mb-10 flex items-end justify-between">
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light tracking-tight">
                  Episodes from this show
                </h2>
                <ArrowLink href="/work">See all work</ArrowLink>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {episodes.map((ep) => (
                  <a
                    key={ep.id}
                    href={watch(ep.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${ep.id}/hqdefault.jpg`}
                        alt={`${ep.guest} on ${ep.client}`}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-90 brightness-[0.8] transition-[filter,opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:opacity-100 group-hover:brightness-100"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium leading-snug">
                      {ep.guest}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <ClosingCTA subline={`Want a show like ${cs.client}? Start with a call.`} />
      </main>
      <Footer />
    </>
  );
}
