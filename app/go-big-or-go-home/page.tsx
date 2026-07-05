"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GoBigRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center text-text-muted">
      <p>
        Redirecting to{" "}
        <Link href="/" className="text-text underline">
          home
        </Link>
        …
      </p>
    </main>
  );
}
