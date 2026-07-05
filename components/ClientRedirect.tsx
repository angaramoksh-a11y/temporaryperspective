"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Client-side redirect with a no-JS link fallback. Static export can't issue a
// server 301, so the server page wrapping this sets robots noindex + a canonical
// pointing at the real destination; this component performs the actual navigation.
export default function ClientRedirect({
  to,
  label,
  preserveQuery = false,
}: {
  to: string;
  label: string;
  preserveQuery?: boolean;
}) {
  const router = useRouter();
  useEffect(() => {
    const qs =
      preserveQuery && typeof window !== "undefined" ? window.location.search : "";
    router.replace(`${to}${qs}`);
  }, [router, to, preserveQuery]);
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center text-text-muted">
      <p>
        Redirecting to{" "}
        <Link href={to} className="text-text underline">
          {label}
        </Link>
        …
      </p>
    </main>
  );
}
