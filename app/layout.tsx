import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Vignette from "@/components/Vignette";
import BottomBlur from "@/components/BottomBlur";
import SiteBackdrop from "@/components/SiteBackdrop";
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
  title: "Temporary Perspective — B2B podcast studio, Mumbai",
  description:
    "A B2B podcast production studio in Mumbai. 100+ episodes shipped for India's hardest-to-book guests. Brand, shoot, edit, growth, end to end.",
  openGraph: {
    title: "Temporary Perspective — B2B podcast studio, Mumbai",
    description:
      "A B2B podcast production studio in Mumbai. 100+ episodes shipped for India's hardest-to-book guests. Brand, shoot, edit, growth, end to end.",
    url: "https://temporaryperspective.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Temporary Perspective",
  alternateName: "TP",
  url: "https://temporaryperspective.com",
  logo: "https://temporaryperspective.com/logo-white.svg",
  description:
    "India's premium podcast and film studio. Cinema-grade B2B podcasts shot, edited, and live in under a week — for the hardest-to-book guests.",
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
      name: "Manav",
      jobTitle: "Production Head",
      sameAs: "https://www.linkedin.com/in/manavbendi/",
    },
    {
      "@type": "Person",
      name: "Hatim",
      jobTitle: "Post-Production Head",
      sameAs: "https://www.linkedin.com/in/motiwala-hatim/",
    },
    {
      "@type": "Person",
      name: "Rudra",
      jobTitle: "CMO",
      sameAs: "https://www.linkedin.com/in/rudra-jaiswal-878100241/",
    },
    {
      "@type": "Person",
      name: "Tejas",
      jobTitle: "Lead Designer",
    },
  ],
  email: "hey@temporaryperspective.com",
  telephone: "+91-99204-21611",
  areaServed: [
    "Mumbai",
    "Bangalore",
    "Delhi",
    "Chennai",
    "Hyderabad",
    "San Francisco",
    "New York",
  ],
  sameAs: [
    "https://www.instagram.com/temporaryperspective/",
  ],
  priceRange: "$$$",
  knowsAbout: [
    "Podcast Production",
    "B2B Podcasts",
    "Remote Production",
    "Post-Production",
    "Brand Identity",
    "YouTube Channel Management",
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
        <SiteBackdrop />
        {children}
        <Vignette />
        <BottomBlur />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
