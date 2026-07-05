import type { Metadata } from "next";
import ClientRedirect from "@/components/ClientRedirect";

// /work/archive has moved to /portfolio/archive. Noindex + canonical to the real
// destination; the client redirect preserves the ?q= query string.
export const metadata: Metadata = {
  title: { absolute: "Redirecting…" },
  robots: { index: false, follow: true },
  alternates: { canonical: "https://temporaryperspective.com/portfolio/archive" },
};

export default function WorkArchiveRedirect() {
  return <ClientRedirect to="/portfolio/archive" label="the archive" preserveQuery />;
}
