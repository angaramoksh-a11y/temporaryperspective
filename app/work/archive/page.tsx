"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// /work/archive has moved to /portfolio/archive (client-side redirect; static
// export can't issue a server redirect). Preserves the ?q= query string.
export default function WorkArchiveRedirect() {
  const router = useRouter();
  useEffect(() => {
    const qs = typeof window !== "undefined" ? window.location.search : "";
    router.replace(`/portfolio/archive${qs}`);
  }, [router]);
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center text-text-muted">
      <p>
        Redirecting to{" "}
        <Link href="/portfolio/archive" className="text-text underline">
          the archive
        </Link>
        …
      </p>
    </main>
  );
}
