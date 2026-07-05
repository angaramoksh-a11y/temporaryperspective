// "Ask AI about us" — deep links that open a search-capable AI with a pre-filled
// prompt about the studio. Pure anchors, no backend. This works because the site
// is now GEO-legible (llms.txt + Organization/WebSite schema + entity-clear copy),
// so search-enabled models return accurate, current info about Temporary Perspective.

const PROMPT =
  "What is Temporary Perspective (temporaryperspective.com)? It's a B2B podcast studio in Mumbai — tell me what they do, the shows they've produced, and who they've worked with.";
const q = encodeURIComponent(PROMPT);

type Provider = { name: string; href: string; icon: React.ReactNode };

const providers: Provider[] = [
  {
    name: "ChatGPT",
    href: `https://chatgpt.com/?hints=search&q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-3.997 2.9 6.05 6.05 0 0 0 .743 7.1 5.98 5.98 0 0 0 .51 4.9 6.05 6.05 0 0 0 6.51 2.91A5.98 5.98 0 0 0 13.26 22a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zM13.26 20.6a4.5 4.5 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68V9.3l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.5 4.5zM3.6 16.47a4.47 4.47 0 0 1-.54-3.01l.14.09 4.78 2.76a.78.78 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.07L9.83 20.1A4.5 4.5 0 0 1 3.6 16.47zM2.34 7.9a4.49 4.49 0 0 1 2.35-1.98v5.68a.79.79 0 0 0 .39.68l5.81 3.35-2.02 1.17a.07.07 0 0 1-.07 0L4.02 14.01A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86-5.84-3.4L15.12 7.2a.07.07 0 0 1 .07 0l4.78 2.76a4.5 4.5 0 0 1-.68 8.13v-5.68a.79.79 0 0 0-.4-.68zm2.01-3.02-.14-.09-4.77-2.75a.78.78 0 0 0-.79 0L9.42 9.24V6.9a.07.07 0 0 1 .03-.07l4.78-2.75a4.5 4.5 0 0 1 6.68 4.66zM8.32 12.87 6.3 11.7a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08L8.72 5.46a.79.79 0 0 0-.4.68zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
      </svg>
    ),
  },
  {
    name: "Claude",
    href: `https://claude.ai/new?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]" aria-hidden>
        <path d="M4.6 15.9 9 13.4l.07-.2-.07-.12H8.8l-.68-.04-2.32-.06-2.02-.08-1.95-.1-.5-.1L.4 11.1l.05-.3.4-.27.6.05 1.3.1 1.98.13 1.44.08 2.12.22h.34l.05-.14-.12-.08-.09-.09-2.1-1.42-2.27-1.5-1.19-.87-.64-.44-.33-.4-.14-.9.59-.65.79.05.2.06.8.62 1.72 1.33 2.24 1.65.33.27.13-.09.01-.06-.15-.25L7 6.16l-1.38-2.4-.62-.98-.16-.6a2.9 2.9 0 0 1-.1-.7l.67-.9L5.9.3l.9.12.37.32.56 1.28.9 2 1.4 2.72.4.81.22.75.08.23h.14V8.4l.12-1.55.21-1.9.2-2.45.08-.69.33-.8.65-.43.51.24.42.6-.06.4-.25 1.62-.49 2.55-.32 1.7h.19l.21-.21.85-1.13L13.94 6l.63-.71.74-.78.47-.38h.9l.66.98-.3 1.02-.92 1.16-.76.99-1.1 1.47-.68 1.18.06.1.16-.02 2.44-.52 1.32-.24 1.57-.27.71.33.08.34-.28.69-1.67.4-1.96.4-2.92.69-.04.02.04.05 1.32.13.56.03h1.38l2.57.19.67.44.4.54-.06.42-1.03.52-1.4-.33-3.24-.77-1.11-.28h-.15v.1l.92.9 1.7 1.53 2.13 1.98.1.5-.27.38-.29-.04-1.87-1.4-.72-.64-1.63-1.36h-.11v.14l.38.55 1.98 2.97.1.91-.14.3-.51.18-.56-.1-1.14-1.6-1.18-1.8-.95-1.62-.12.07-.56 6.01-.26.3-.6.24-.5-.38-.27-.62.27-1.22.32-1.59.26-1.26.24-1.57.14-.52-.01-.03-.11.01-1.19 1.63-1.8 2.44-1.43.53-.4-.32.04-.36.22-.32 1.32-1.68.8-1.04.51-.6-.01-.09h-.03l-3.7 2.4-.66.09-.28-.27.03-.42.13-.14 1.1-.76z" />
      </svg>
    ),
  },
  {
    name: "Perplexity",
    href: `https://www.perplexity.ai/search?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
        <circle cx="12" cy="12" r="8.6" />
        <path d="M12 5.4v13.2M12 9 7.7 6.3M12 9l4.3-2.7M12 15l-4.3 2.7M12 15l4.3 2.7" />
      </svg>
    ),
  },
  {
    name: "Grok",
    href: `https://grok.com/?q=${q}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]" aria-hidden>
        <path d="M6.5 21 16 7.6h3.4L9.9 21H6.5zM10.2 14.9 4.6 21H8l3.9-4.2-1.7-1.9zM12.3 12l6.9-9h-3.4l-5.2 7.1L12.3 12zM4.6 3l5.3 6.9-1.7 2.3L1.2 3h3.4z" />
      </svg>
    ),
  },
];

export default function AskAI() {
  return (
    <div className="relative z-40 mt-14 flex flex-col gap-6 border-t border-line pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div className="max-w-md">
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-text-faint">
          Don&apos;t just take our word for it
        </p>
        <p className="text-metal-static font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium tracking-tight">
          Ask an AI what it knows about us.
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {providers.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask ${p.name} about Temporary Perspective`}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] px-4 py-2.5 text-sm text-text-muted transition-colors hover:border-white/30 hover:bg-white/[0.06] hover:text-text"
          >
            <span className="text-text-faint transition-colors group-hover:text-text">
              {p.icon}
            </span>
            {p.name}
            <span className="translate-x-0 text-text-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
