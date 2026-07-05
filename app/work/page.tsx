import type { Metadata } from "next";
import ClientRedirect from "@/components/ClientRedirect";

// /work has moved to /portfolio. Noindex the stub and canonicalize to the real
// destination so it isn't indexed as a soft-404 homepage duplicate.
export const metadata: Metadata = {
  title: { absolute: "Redirecting…" },
  robots: { index: false, follow: true },
  alternates: { canonical: "https://temporaryperspective.com/portfolio" },
};

export default function WorkRedirect() {
  return <ClientRedirect to="/portfolio" label="the portfolio" />;
}
