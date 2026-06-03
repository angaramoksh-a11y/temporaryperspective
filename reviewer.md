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

**OPEN — user is choosing the H1 direction:**
- ① *(recommended)* **You've built the conversation. We build the stage.** — sub: "Cinema-grade podcasts for India's hardest-to-book guests — shot, edited, and live in under a week."
- ② **Most podcasts don't fail on content. They fail on context.**
- ③ **Double the quality. Half the time.** — sub: "...plus 8–10 ready-to-post reels, in under seven days."
- ④ Keep "For podcast conversations you only get to have once." + concrete subhead.

---

## DEV HANDOFF PROMPTS (give these to the website developer)

### Handoff #1 — Hero CTAs + structure (ready; headline pending pick)
> In the home hero: remove the "See case studies →" pill and replace it with a small proof line above the headline reading "100+ episodes shipped →" (links to the work/case-studies page). Keep exactly two buttons below the subhead: primary "Book a call", secondary "See our work". Do not change the headline yet.

### Handoff #2 — Embed pitch film in hero right (ready)
> Add the Vimeo pitch film (vimeo.com/1197960218, 16:9, 61s, narrated) to the right side of the home hero. Layout: text on the left, a generous 16:9 video card on the right, vertically centered; let the Silk background frame the space above/below. Behavior: show a muted ambient loop with a clear play button; on click, restart the video from the beginning WITH sound (inline unmute or lightbox). This replaces the need for a separate showreel.

*(Headline handoff added once the user picks a direction.)*

---

## Changelog
- Set up reviewer.md, lens, references, asset store.
- Reviewed HOME (copy + structure; hero seen visually). Logged diagnosis + prioritized findings.
- Hero: locked CTA + video-embed decisions; drafted 4 headline directions (awaiting pick).
