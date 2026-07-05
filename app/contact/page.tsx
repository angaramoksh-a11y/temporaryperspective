import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CAL_LINK, contact } from "@/lib/work";

export const metadata: Metadata = {
  title: "Book a Call — Start Your B2B Podcast",
  description:
    "Book a 30-minute call with Temporary Perspective. Tell us about your show idea — we'll tell you if we're the right studio to build it.",
  alternates: { canonical: "https://temporaryperspective.com/contact" },
  openGraph: {
    title: "Book a Call — Start Your B2B Podcast",
    description:
      "Book a 30-minute call with Temporary Perspective. Tell us about your show idea — we'll tell you if we're the right studio to build it.",
    url: "https://temporaryperspective.com/contact",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Temporary Perspective",
  url: "https://temporaryperspective.com",
  logo: "https://temporaryperspective.com/logo-white.svg",
  telephone: "+91-99204-21611",
  email: "hey@temporaryperspective.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: [
    "Mumbai",
    "Bangalore",
    "Delhi",
    "Chennai",
    "Hyderabad",
    "San Francisco",
    "New York",
  ],
  priceRange: "$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Headline */}
        <section className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
          <h1 className="font-thunder text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-[-0.01em]">
            Book a call.
          </h1>
          <p className="mt-6 max-w-lg text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-text-muted">
            A short call to see if we&apos;re the right studio for your show.
          </p>
        </section>

        {/* 2. Booking */}
        <section className="relative px-6 pb-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="chrome-card relative overflow-hidden">
              <iframe
                src={CAL_LINK}
                title="Book a 30-minute call with Moksh"
                loading="lazy"
                className="h-[680px] w-full"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-faint">
              30 minutes · with Moksh
            </p>
          </div>
        </section>

        {/* 3 + 4. What to expect / What we don't do */}
        <section className="relative px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto flex max-w-[720px] flex-col gap-12">
            <div>
              <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-tight text-text">
                What to expect
              </h2>
              <p className="mt-5 text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.65] text-text">
                Thirty minutes. We&apos;ll ask what you&apos;re building, who you
                want on it, and where you want it to go. You&apos;ll leave knowing
                whether we&apos;re the right fit, and if we are, what working
                together looks like.
              </p>
            </div>
            <div>
              <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-tight text-text">
                What we don&apos;t do
              </h2>
              <p className="mt-5 text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.65] text-text">
                No pitch deck, no quote on the call. We listen first, then come
                back with a plan built for your show.
              </p>
            </div>
          </div>
        </section>

        {/* 5 + 6. Fallback / Location */}
        <section className="relative px-6 pb-28 lg:px-10 lg:pb-36">
          <div className="mx-auto max-w-[720px] border-t border-line pt-10">
            <p className="text-sm text-text-faint">Prefer to skip the form?</p>
            <div className="mt-4 flex flex-col gap-2 text-[1.0625rem]">
              <a
                href={`tel:${contact.phoneHref}`}
                className="w-fit text-text transition-colors hover:text-white"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="w-fit text-text transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </div>
            <p className="mt-8 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-text-faint">
              {contact.location}
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
