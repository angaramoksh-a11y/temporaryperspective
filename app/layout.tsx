import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Poster display face. Stand-in for Thunder (Pangram Pangram, commercial):
// Anton is the closest free tall-condensed grotesque. To use the real Thunder,
// swap this for next/font/local pointing at the Thunder files — the
// `--font-thunder` variable and every `font-thunder` usage stay unchanged.
const thunder = Anton({
  variable: "--font-thunder",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Temporary Perspective — B2B podcast studio, Mumbai",
  description:
    "A B2B podcast production studio in Mumbai. 100+ episodes shipped for India's hardest-to-book guests. Brand, shoot, edit, growth, end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${thunder.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text">{children}</body>
    </html>
  );
}
