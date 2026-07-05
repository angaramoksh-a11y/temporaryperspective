import Link from "next/link";
import Logo from "./Logo";
import { EdgeDivider, PrimaryButton } from "./ui";
import { CredIconSvg } from "./testimonialBits";
import type { CredIcon } from "@/lib/work";

const primary = [
  { label: "Work", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const resources = [
  { label: "Glossary", href: "/glossary" },
  { label: "State of B2B Podcasts 2026", href: "/state-of-b2b-podcasts-2026" },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

const socials: { icon: CredIcon; href: string; label: string }[] = [
  {
    icon: "linkedin",
    href: "https://www.linkedin.com/company/temporary-perspective/",
    label: "LinkedIn",
  },
  {
    icon: "youtube",
    href: "https://www.youtube.com/@TemporaryPerspective",
    label: "YouTube",
  },
  {
    icon: "instagram",
    href: "https://www.instagram.com/temporaryperspective/",
    label: "Instagram",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative">
      <EdgeDivider />
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand column */}
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
            <PrimaryButton href="/contact" size="sm" className="mt-6">
              Book a call
            </PrimaryButton>
            {/* social icons */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-white/[0.03] text-text-faint transition-colors hover:border-white/30 hover:bg-white/[0.06] hover:text-text"
                >
                  <CredIconSvg name={s.icon} className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
          </div>

          {/* site nav */}
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

          {/* resources + legal */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-text-faint">
                Resources
              </p>
              <nav className="flex flex-col gap-3 text-sm">
                {resources.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="w-fit text-text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-text-faint">
                Legal
              </p>
              <nav className="flex flex-col gap-3 text-sm">
                {legal.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="w-fit text-text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Lifted above the fixed Vignette (z-30) so the legal line stays crisp */}
        <div className="relative z-40 mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© Temporary Perspective LLP, {year}.</span>
          <div className="flex items-center gap-4">
            <a
              href="/llms.txt"
              className="transition-colors hover:text-text-muted"
            >
              llms.txt
            </a>
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
