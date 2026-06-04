import Link from "next/link";
import Logo from "./Logo";
import { EdgeDivider } from "./ui";

const primary = [
  { label: "Work", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const secondary = [
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Terms", href: "/terms-and-conditions", external: false },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/temporary-perspective/",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TemporaryPerspective",
    external: true,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo className="h-5 w-auto text-text" />
              <span className="font-medium tracking-tight">
                Temporary Perspective
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-faint">
              Podcasts for serious shows. Mumbai, India.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-sm">
            {primary.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3 text-sm">
            {secondary.map((l) =>
              l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="w-fit text-text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        {/* Lifted above the fixed BottomBlur (z-30) so the legal line stays
            crisp at the foot of the page instead of dissolving into the blur. */}
        <div className="relative z-40 mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© Temporary Perspective LLP, {year}.</span>
          <span>Mumbai, India</span>
        </div>
      </div>
    </footer>
  );
}
