import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { GhostButton } from "@/components/ui";
import { CAL_LINK } from "@/lib/work";

export const metadata: Metadata = {
  title: "Not found",
};

const routes = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/portfolio" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Book a call", href: CAL_LINK },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -10%, oklch(0.18 0.01 264) 0%, oklch(0.1 0.005 264) 42%, var(--color-bg) 78%)",
          }}
        />
        <span
          aria-hidden
          className="font-thunder text-[clamp(7rem,28vw,22rem)] uppercase leading-[0.8] tracking-[-0.02em] text-text-faint/15"
        >
          404
        </span>
        <h1 className="mt-2 max-w-[18ch] font-thunder text-[clamp(2.5rem,8vw,5.5rem)] uppercase leading-[0.95] tracking-[-0.01em]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 text-[clamp(1.0625rem,1.6vw,1.35rem)] text-text-muted">
          But the show does.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {routes.map((r) => (
            <GhostButton key={r.href} href={r.href}>
              {r.label}
            </GhostButton>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
