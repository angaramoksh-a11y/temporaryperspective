import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Vignette from "@/components/Vignette";
import BottomBlur from "@/components/BottomBlur";
import SiteBackdrop from "@/components/SiteBackdrop";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face: the system sans (SF Pro on Apple, Geist elsewhere) wired into
// the `--font-display` token in globals.css. The `--font-thunder` token now
// aliases the same display stack, so the old poster usages render in our sans.
// No webfont to load.

export const metadata: Metadata = {
  metadataBase: new URL("https://temporaryperspective.com"),
  title: {
    default: "Temporary Perspective — B2B Podcast Studio, Mumbai",
    template: "%s — Temporary Perspective",
  },
  description:
    "B2B podcast production studio in Mumbai. Cinema-grade shows for India's hardest-to-book guests — brand, shoot, edit, growth, delivered in under a week.",
  keywords: [
    "B2B podcast studio",
    "podcast production Mumbai",
    "podcast agency India",
    "B2B podcast production India",
    "corporate podcast studio",
    "podcast editing India",
    "remote podcast production",
    "fintech podcast",
    "founder podcast",
  ],
  authors: [{ name: "Temporary Perspective", url: "https://temporaryperspective.com" }],
  creator: "Temporary Perspective",
  publisher: "Temporary Perspective",
  alternates: {
    canonical: "https://temporaryperspective.com",
  },
  openGraph: {
    title: "Temporary Perspective — B2B Podcast Studio, Mumbai",
    description:
      "B2B podcast production studio in Mumbai. Cinema-grade shows for India's hardest-to-book guests — brand, shoot, edit, growth, delivered in under a week.",
    url: "https://temporaryperspective.com",
    siteName: "Temporary Perspective",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://temporaryperspective.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Temporary Perspective — B2B Podcast Studio, Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Business",
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://temporaryperspective.com/#website",
      url: "https://temporaryperspective.com",
      name: "Temporary Perspective",
      description:
        "B2B podcast production studio in Mumbai. Cinema-grade shows for India's hardest-to-book guests.",
      publisher: { "@id": "https://temporaryperspective.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://temporaryperspective.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-IN",
    },
    {
      "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
      "@id": "https://temporaryperspective.com/#organization",
      name: "Temporary Perspective",
      alternateName: ["TP", "Temporary Perspective Studio"],
      url: "https://temporaryperspective.com",
      logo: {
        "@type": "ImageObject",
        url: "https://temporaryperspective.com/logo-white.svg",
        contentUrl: "https://temporaryperspective.com/logo-white.svg",
      },
      image: "https://temporaryperspective.com/opengraph-image",
      description:
        "India's leading B2B podcast studio. Cinema-grade podcasts shot, edited, and published in under a week — brand strategy, production, post-production, and growth, all in-house. Based in Mumbai, serving founders and enterprises across India.",
      foundingDate: "2023",
      founders: [
        {
          "@type": "Person",
          name: "Angara Moksh",
          jobTitle: "CEO",
          sameAs: "https://www.linkedin.com/in/angaramoksh/",
        },
        {
          "@type": "Person",
          name: "Manav Bendi",
          jobTitle: "Production Head",
          sameAs: "https://www.linkedin.com/in/manavbendi/",
        },
        {
          "@type": "Person",
          name: "Hatim Motiwala",
          jobTitle: "Post-Production Head",
          sameAs: "https://www.linkedin.com/in/motiwala-hatim/",
        },
        {
          "@type": "Person",
          name: "Rudra Jaiswal",
          jobTitle: "CMO",
          sameAs: "https://www.linkedin.com/in/rudra-jaiswal-878100241/",
        },
      ],
      email: "hey@temporaryperspective.com",
      telephone: "+91-99204-21611",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "19.0760",
        longitude: "72.8777",
      },
      areaServed: [
        { "@type": "City", name: "Mumbai" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Hyderabad" },
        { "@type": "City", name: "San Francisco" },
        { "@type": "City", name: "New York" },
      ],
      sameAs: [
        "https://www.instagram.com/temporaryperspective/",
        "https://www.linkedin.com/company/temporary-perspective/",
        "https://www.youtube.com/@TemporaryPerspective",
      ],
      priceRange: "$$$",
      knowsAbout: [
        "B2B Podcast Production",
        "Podcast Branding",
        "Remote Podcast Production",
        "Video Post-Production",
        "Brand Identity for Podcasts",
        "YouTube Channel Management",
        "Podcast Growth Strategy",
        "Long-form Video Production",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Podcast Production Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full-Stack Podcast Production",
              description:
                "End-to-end B2B podcast production: brand identity, studio shoot, video editing, and distribution strategy.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Remote Podcast Production",
              description:
                "Cinema-grade remote podcast recording with professional crew at both ends — Mumbai and guest location.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Podcast Post-Production",
              description:
                "Video editing, colour grading, audio mastering, and short-form clip packaging for B2B podcasts.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-text">
        {/* Warm connections to the media origins used site-wide (thumbnails +
            hero/video embeds) so the first image/frame paints sooner. */}
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vumbnail.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://player.vimeo.com" crossOrigin="anonymous" />
        <SiteBackdrop />
        <MotionProvider>{children}</MotionProvider>
        <Vignette />
        <BottomBlur />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </body>
    </html>
  );
}
