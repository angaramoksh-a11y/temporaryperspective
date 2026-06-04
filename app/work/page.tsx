"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// /work has moved to /portfolio. Static export can't issue a server redirect,
// so this is a client-side redirect with a no-JS link fallback.
export default function WorkRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/portfolio");
  }, [router]);
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center text-text-muted">
      <p>
        Redirecting to{" "}
        <Link href="/portfolio" className="text-text underline">
          the portfolio
        </Link>
        …
      </p>
    </main>
  );
}
