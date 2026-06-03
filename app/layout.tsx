import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-text">
        <SiteBackdrop />
        {children}
        <BottomBlur strength={1} />
      </body>
    </html>
  );
}
