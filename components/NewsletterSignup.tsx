"use client";

import { useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Inline email capture. Chromium hairline frame, light sweep on the button,
// inline validation, and a one-way morph to a "Subscribed" confirmation. There
// is no backend wired yet, so submit only validates and confirms locally.
export default function NewsletterSignup({
  size = "lg",
}: {
  size?: "lg" | "sm";
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (done) return;
    if (!EMAIL.test(email.trim())) {
      setError("That email doesn't look right.");
      return;
    }
    setError(null);
    setDone(true);
  };

  const lg = size === "lg";

  return (
    <div className={lg ? "w-full max-w-md" : "w-full max-w-sm"}>
      <form
        onSubmit={submit}
        noValidate
        className={`glass flex items-center gap-2 rounded-full p-1.5 transition-colors ${
          error ? "ring-1 ring-accent/60" : ""
        }`}
      >
        <input
          type="email"
          value={email}
          disabled={done}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Your email"
          aria-label="Your email"
          aria-invalid={error ? "true" : undefined}
          className={`min-w-0 flex-1 bg-transparent px-4 text-text placeholder:text-text-faint focus:outline-none ${
            lg ? "h-10 text-base" : "h-9 text-sm"
          }`}
        />
        <button
          type="submit"
          disabled={done}
          className={`sweep group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-medium transition-[transform,background,color] duration-300 ease-[var(--ease-out-quart)] ${
            done
              ? "bg-text text-bg"
              : "bg-text text-bg hover:scale-[1.02] hover:bg-white"
          } ${lg ? "h-10 px-5 text-[0.95rem]" : "h-9 px-4 text-sm"}`}
        >
          {done ? (
            <>
              Subscribed
              <span aria-hidden className="text-accent">
                ✓
              </span>
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      <p
        className={`mt-2 px-4 text-sm transition-colors ${
          error ? "text-accent" : "text-text-faint"
        }`}
        role={error ? "alert" : undefined}
      >
        {error
          ? error
          : done
            ? "You're on the list. Watch your inbox."
            : lg
              ? "Occasional notes, no spam. Unsubscribe anytime."
              : " "}
      </p>
    </div>
  );
}
