import type { Metadata } from "next";
import ClientRedirect from "@/components/ClientRedirect";

// Vanity URL that redirects home. Noindex + canonical to home so the stub isn't
// indexed as a soft-404.
export const metadata: Metadata = {
  title: { absolute: "Redirecting…" },
  robots: { index: false, follow: true },
  alternates: { canonical: "https://temporaryperspective.com" },
};

export default function GoBigRedirect() {
  return <ClientRedirect to="/" label="home" />;
}
