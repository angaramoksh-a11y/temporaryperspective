import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import BottomBlur from "@/components/BottomBlur";
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
// the `--font-display` token in globals.css. No webfont to load.

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
      className={`${geistSans.variable} ${geistMono.variable} ${thunder.variable} h-full antialiased`}
    >
      <body className="min-h-full text-text">
        {children}
        <BottomBlur strength={1} />
      </body>
    </html>
  );
}
