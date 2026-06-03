# reviewer.md — Temporary Perspective site review

> **Working file for the reviewer (Claude, chat mode). NOT part of the website.**

## Ground rules (do not break)

1. **I do not edit the website.** No touching components, copy, styles, data, config — nothing in the app.
2. The only file I write to is **this one** (`reviewer.md`) — my notes, findings, drafts, and storage.
3. My output to the team is **handoff prompts**: copy-paste instructions the user gives to the website developer (a separate Claude Code chat). I never make the change myself.
4. A separate Claude Code chat owns all real edits. I stay read-only on the site (preview/inspect only).

---

## The review lens (run every page through this)

1. **First-frame clarity** — in 3s: what is this, who's it for, what do I do next?
2. **Show vs tell** — is the *work* (video) doing the talking, or is text?
3. **One job per screen** — one idea, one primary action (the Resend discipline).
4. **Material quality** — type, contrast, texture, spacing. Crisp & intentional vs muddy/"almost".
5. **Voice** — confident & specific vs templatey.

**North-star references (user-chosen):**
- **Resend** — ruthless restraint, one idea per screen, near-black crispness, product shown literally.
- **Sarvam** — one confident declarative statement, editorial calm, proudly Indian, never cluttered.
- Shared: **show the thing, give one action, stay crisp not muddy.**

---

## Asset / fact store

- **Pitch film:** Vimeo `1197960218` — title "Products - Pitch", **16:9 landscape**, **61s**, **narrated** (VO is the message).
  - Thumbnail: `https://i.vimeocdn.com/video/2164419209-...-d_295x166`
- **Positioning spine (from the film script):**
  - "Most podcasts aren't failing because of content. They're failing because of **context**."
  - Raise how the conversation *feels* — better lighting, cleaner sets, cinema-level grading.
  - 1% improvements compounding → **double the quality in half the time**.
  - Most agencies: 2 weeks. Us: **shoot + edit + publish a full podcast, high-retention hook + 8–10 ready-to-post reels with client approvals, in < 7 days.**
  - Proof: Bharatvaarta / Vikram Sood ep tweet — production value jumped.
  - Closer: **"You've built the conversation. Let's build the stage. Temporary Perspective. Let's talk."**
- **Two value props on the table:** *access* ("hardest-to-book guests") vs *craft + speed* (cinema-grade, <7 days). Guests = proof; craft = promise.

---

## HOME PAGE

### Sections (in order)
1. Hero
2. Some of our work (horizontal carousel)
3. The process (accordion — Branding/Guest Prep/Production/Post/Growth)
4. Testimonials (tabbed case studies: Bharatvaarta / Bureau / Qapita)
5. Where the guest is (remote shooting differentiator)
6. From the newsletter
7. Common questions (FAQ accordion)
8. Final CTA — "Let's talk about your show."

### Core diagnosis
**Copy is already at Sarvam/Resend level. Visuals + composition are not — and for a video studio that gap is the whole "off" feeling.** Home opens with text on a noisy gradient and zero footage; the proof (faces, work) is buried in section 2. Telling, not showing.

### Findings (prioritized)
**P0**
- Show work above the fold — fill the dead right side of the hero with actual work (now: embed the pitch film). *(in progress — see handoff)*
- Three competing hero CTAs → collapse to one primary + one secondary. *(DECIDED)*

**P1**
- Sharpest line ("hardest-to-book guests") is buried as gray subhead while the abstract poetic line is the H1. Promote the concrete. *(being resolved via hero rewrite)*
- Muddy texture — Silk + grain + diagonal streak reads generic-AI-gradient. Deepen blacks, sharpen type, cut grain.
- "Testimonials / What our clients say about us." = the one templatey line; clashes with the voice. Also duplicated on /about.

**P2**
- 8 sections + two accordions (Process + FAQ) = long & click-heavy.
- Newsletter block (sec 6) interrupts the sales narrative mid-funnel — push lower.
- "Where the guest is" remote section is a strong differentiator buried at #5.
- Nav label "Watch" reads consumer/YouTube for a B2B buyer.

**Already great (leave alone):** the voice — "We don't send quotes." / "Answered honestly." / "guests who don't usually say yes."

---

## HERO — decisions & open items

**DECIDED:**
- CTAs: primary **Book a call**, secondary **See our work**. Remove redundant "See case studies" pill; repurpose top pill as a **proof line** (`100+ episodes shipped →`).
- Embed the **pitch film on the right** of the hero (replaces a separate showreel).
  - 16:9 landscape → text-left / generous 16:9 film-card-right, vertically centered; Silk frames the space intentionally.
  - Narrated → **muted ambient loop + play button → click restarts WITH sound** (inline or lightbox). Do not leave it muted-only.

**DECIDED — H1 direction ① (user agreed, "go for your likings"):**
- Pill: `100+ episodes shipped →`
- H1: **You've built the conversation. We build the stage.**
- Sub: **Cinema-grade podcasts for India's hardest-to-book guests — shot, edited, and live in under a week.**
- CTAs: primary **Book a call**, secondary **See our work**.
- Play button label: `▶ Play with sound · 60s` · caption: `The studio, in 60 seconds.`

(Rejected: ② context/content hook, ③ double-quality-half-time, ④ keep old poetic line — all logged above for reuse elsewhere, e.g. ② could open a pricing/process page.)

---

## DEV HANDOFF PROMPTS (give these to the website developer)

> Handoffs #1 and #2 are superseded by the consolidated **#3** below.

### Handoff #3 — Home page updates (FINAL, given to dev)
> Context: home page of a B2B podcast-studio site (Temporary Perspective). Keep the existing Silk/dark aesthetic, `motion` for animation, and current component patterns. Honor `prefers-reduced-motion` everywhere. Read the relevant Next.js guide before writing code.
>
> **1) HERO — rebuild as a two-column layout (text left, film right)**
> Copy (use exactly):
> - Proof line above the headline (replaces the old "See case studies" pill): `100+ episodes shipped →` — links to the work/case-studies page.
> - H1: `You've built the conversation. We build the stage.`
> - Subhead: `Cinema-grade podcasts for India's hardest-to-book guests — shot, edited, and live in under a week.`
> - Exactly two buttons: primary `Book a call`, secondary `See our work`. Remove any other hero CTAs.
>
> Film (right column):
> - Embed Vimeo `https://vimeo.com/1197960218` (16:9, 61s, narrated).
> - Text left column, generous 16:9 video card right column, vertically centered; Silk frames the space above/below (intentional, not stretched). On mobile stack: text first, then film.
> - Behavior: muted ambient loop (Vimeo `background=1`) + clear play affordance. On click, restart from 0 and play WITH sound (inline unmute + setCurrentTime(0) + play via Vimeo Player SDK, or lightbox; inline preferred).
> - Play button label: `▶ Play with sound · 60s`. Caption under card: `The studio, in 60 seconds.`
> - `prefers-reduced-motion`: no autoplay — show poster + play button.
>
> **2) TEXTURE** — deepen hero bg toward near-black, reduce grain/noise, crisp full-white H1. Keep Silk but calmer. Goal: Resend/Sarvam crispness.
>
> **3) TESTIMONIALS heading** — replace H2 "What our clients say about us." with `The people we make it for.` (keep any "TESTIMONIALS" kicker).
>
> **4) STRUCTURE (lower priority)** — move "From the newsletter" lower (just above final CTA/footer); move "Where the guest is" remote section up to right after the work carousel.
>
> Don't change other pages. Keep all existing links/routes working.

---

## Changelog
- Set up reviewer.md, lens, references, asset store.
- Reviewed HOME (copy + structure; hero seen visually). Logged diagnosis + prioritized findings.
- Hero: locked CTA + video-embed decisions; drafted 4 headline directions (awaiting pick).
