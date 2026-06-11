"use client";

import { useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNUP_ADDRESS = "hey@temporaryperspective.com";

// Inline email capture. Chromium hairline frame, light sweep on the button,
// inline validation. The site is statically exported, so there is no Next API
// route to post to; until a provider is wired, submit opens a prefilled mailto
// to the studio inbox so signups reach a real human instead of vanishing.
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
    const addr = email.trim();
    if (!EMAIL.test(addr)) {
      setError("That email doesn't look right.");
      return;
    }
    setError(null);
    // TODO(newsletter): replace this mailto stopgap with a real subscribe call
    // (e.g. Buttondown / ConvertKit / Formspree POST) right here, and only
    // setDone(true) on a 2xx response. Must be a third-party endpoint — the
    // site is `output: "export"`, so Next API routes don't exist at runtime.
    window.location.href = `mailto:${SIGNUP_ADDRESS}?subject=${encodeURIComponent(
      "Newsletter signup",
    )}&body=${encodeURIComponent(`Please add ${addr} to the newsletter list.`)}`;
    setDone(true);
  };

  const lg = size === "lg";

  return (
    <div className={lg ? "w-full max-w-md" : "w-full max-w-sm"}>
      <form
        onSubmit={submit}
        noValidate
        className={`glass flex items-center gap-2 rounded-2xl p-1.5 transition-colors ${
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
          className={`sweep group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl font-medium transition-[transform,background,color] duration-300 ease-[var(--ease-out-quart)] ${
            done
              ? "bg-text text-bg"
              : "bg-text text-bg hover:scale-[1.02] hover:bg-white"
          } ${lg ? "h-10 px-5 text-[0.95rem]" : "h-9 px-4 text-sm"}`}
        >
          {done ? (
            <>
              One step left
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
        {error ? (
          error
        ) : done ? (
          <>
            We opened an email draft to{" "}
            <a href={`mailto:${SIGNUP_ADDRESS}`} className="underline underline-offset-2 hover:text-text">
              {SIGNUP_ADDRESS}
            </a>
            {" "}— hit send and you&apos;re on the list.
          </>
        ) : lg ? (
          "Occasional notes, no spam. Unsubscribe anytime."
        ) : (
          " "
        )}
      </p>
    </div>
  );
}
