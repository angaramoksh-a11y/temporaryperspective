import Link from "next/link";
import { EdgeDivider } from "./ui";

const secondary = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="relative">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-line-strong bg-bg-raised font-display text-sm text-text">
                TP
              </span>
              <span className="font-medium tracking-tight">
                Temporary Perspective
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-faint">
              A B2B podcast production studio in Mumbai. The show is always the
              client&apos;s. We&apos;re the studio behind it.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {secondary.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-text-faint md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© Temporary Perspective LLP, 2026.</span>
            <Link href="/privacy" className="transition-colors hover:text-text">
              Privacy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-text"
            >
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <span>Mumbai, India</span>
            <a
              href="https://www.linkedin.com/company/temporary-perspective/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-text"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-text"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
