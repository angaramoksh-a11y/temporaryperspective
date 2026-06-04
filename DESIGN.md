# Design system — Temporary Perspective

The single, practical reference every page follows, so we stop re-deciding design
per page. It **codifies the existing, working design** (the home page is the
reference); it is not a redesign. Source of truth is the live code
(`app/globals.css` + the home components), not this prose. When this doc and the
code disagree, the code wins and this doc gets fixed.

## Reference & default fallback

**resend.com is the standing reference.** When a decision is ambiguous, the
default answer is "what would the resend.com team do?": deep near-black canvas, a
single sculptural focal object under one light, calm motion, chromium hairline
edges, premium dev-tool chrome. Adopt the restraint and the sense of depth before
reaching for anything else. Spacing, gutters, section rhythm and control sizing
all take resend.com as the baseline.

## Theme

Dark, metallic, with a quiet glassmorphism. Scene: a founder evaluating a studio
late at night on a laptop, wanting to feel the production quality before they
book. The canvas is "matte metal in a dark room", a lit studio at rest: machined
surfaces, frosted-glass chrome, light raking across the dark. Near-OLED black,
never pure `#000`/`#fff`. Depth comes from a single key light, a radial vignette,
hairline edge-light and frosted floating elements, not from drop shadows.

## Colors (OKLCH, from `@theme` in globals.css)

Strategy: **Restrained.** Cool-tinted near-OLED neutrals + one barely-there green.

| Token | Value | Role |
|-------|-------|------|
| `--color-bg` | `oklch(0.02 0.003 264)` | near-OLED black canvas |
| `--color-bg-raised` | `oklch(0.125 0.005 264)` | raised surfaces / cards |
| `--color-bg-sunken` | `oklch(0.04 0.003 264)` | wells, video bays |
| `--color-text` | `oklch(0.985 0.002 264)` | primary text (never `#fff`) |
| `--color-text-muted` | `oklch(0.79 0.006 264)` | sub-headlines, body-muted, captions |
| `--color-text-faint` | `oklch(0.66 0.006 264)` | metadata, kickers, client names |
| `--color-line` | `white / 10%` | hairline borders |
| `--color-line-strong` | `white / 20%` | stronger borders, active rims |
| `--color-chrome` | `oklch(0.99 0.002 264)` | edge-light highlight, the metal sweep |
| `--color-accent` | `oklch(0.8 0.08 150)` | the very-light green (see rule below) |
| `--color-gold` | `oklch(0.82 0.085 85)` | the warm "burn" stop in the logomark only |

**The Green Rule.** The green is a *quiet tint only*, used barely-there on:
archive-grid hover + active filter chips, the centred divider node, `::selection`,
and focus rings. **Never** on the nav, CTAs, headings, or the process meter. It
must read as barely-there, never a brand-colour takeover.

**The Record-Light Rule.** The only fully saturated colour is the record-light red
`oklch(0.64 0.21 25)`, reserved for the breathing mic LED (`.led-breathe`) and
live dots. It is < 3% of any surface and never decorative.

## Typography

- **Display / poster** (`--font-display`, `--font-thunder`): the system sans (SF
  Pro Display on Apple, Geist elsewhere). All large statements and the per-client
  case-study poster names. No webfont loads; there is no serif and no condensed
  poster face in the live system.
- **UI / body / labels** (`--font-sans`): Geist. Tight tracking on labels, weight
  contrast within the one family. This is the chrome.
- **Mono** (`--font-mono`, Geist Mono): **dates and durations only** (newsletter
  dates, runtimes). See the Kicker Rule.
- Scale ratio ≥ 1.25 between steps. Light-on-dark adds ~0.05 to line-height. Body
  line length 65–75ch (`max-w-[68ch]`).

### Type scale (fluid `clamp`; pick the nearest role, don't invent per component)

| Role | Size | Leading | Tracking | Weight |
|------|------|---------|----------|--------|
| H1 hero | `clamp(3rem, 7vw, 5.5rem)` | 1.02 | -0.025em | 600 |
| H2 section | `clamp(2rem, 4vw, 3.25rem)` | 1.08 | -0.02em | 600 |
| H3 / card title | `clamp(1.25rem, 2vw, 1.6rem)` | 1.2 | -0.01em | 600 |
| Lead / subhead | `clamp(1.125rem, 1.4vw, 1.375rem)` | 1.5 | normal | 400 |
| Body | 1rem–1.0625rem (16–17px) | 1.6 | normal | 400 |
| Small / caption | 0.875rem (14px) | 1.45 | normal | 400 |
| Kicker / eyebrow | 0.8125rem (13px) | 1.4 | 0.18em, uppercase | 500 |
| Mono-meta | 0.75rem (12px) | 1.4 | 0.08em (dates/durations only) | 500 |

- **The oversized page-hero exception.** The interior page-hero word
  (`PageHeroWord`: Portfolio, Testimonials, Process, the Bharatvaarta case study)
  is deliberately huge: `clamp(3rem, 11vw, 8.5rem)`, centred, metallic. It is the
  one exception to the H1 cap.

**The Minimum-Size Rule.** Nothing readable goes below **0.8125rem (13px)**, except
genuine mono-meta dates/durations at 0.75rem (12px). Kill stray sub-12px labels
(`text-[0.6rem]`, `text-[0.65rem]`, `text-[0.7rem]`): bump them to the kicker
floor. Super-small text is out of system.

**The Kicker Rule.** Eyebrows/kickers (`SectionLabel`, page-hero eyebrows,
case-study taglines) are **Geist sans**, uppercase, 0.18–0.2em tracking, 13–14px,
weight 500. **No mono/typewriter font for kickers or labels** — mono is reserved
for dates, durations and numeric indices only. A kicker is an eyebrow that sits
**above** a larger heading; a 13px label must never *be* the section heading (see
the Hierarchy Rule).

**The Chromium Ladder.** Metallic sheen grades down with hierarchy:
- **H1 / page-hero word** = max sheen: animated brushed-chrome (`.text-metal`, the
  6s drift). The studio's signature.
- **H2** = `.text-metal-static` (the same gradient, frozen).
- **H3–H6** = solid `--color-text`, no sheen.
- **Body / labels** = never metallic.

**The Word-Highlight Rule.** To emphasise one word in a heading, use the metallic
treatment (`.text-metal-static`) or weight — never colour. One emphasis device per
heading.

**The Hierarchy Rule (the one that keeps getting broken).** Section headings are
**real H2s** in the display font, the **biggest element in their section**, clearly
larger than body. They are never tiny uppercase labels. The order
**section heading > pull quote > body** must always hold; no section heading may
render smaller than its body. De-mono'ing a label to 13px is **not** the fix: where
a label *is* the heading (About the show, Our role, What to expect), promote it to a
real H2 (`font-display`, `clamp(1.75rem, 3.2vw, 2.5rem)`). A 13px eyebrow only
belongs **above** a larger heading, never as the heading itself. Audit every page.

## Spacing & layout (resend.com baseline)

4px base grid: **4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160**. Land on a
step; vary for rhythm, never identical padding everywhere.

- **One content container.** Standard/reading sections: `max-w-[1200px]`. Wide
  grids, marquees, case-study headers and the footer may use `max-w-[1360px]`–
  `max-w-[1400px]`. Reuse the same token; mixed max-widths are a top cause of
  "off".
- **Minimum side gutters (never flush to the wall):** `px-6` (24px) mobile,
  `px-10` (40px) desktop. The hero obeys the same gutters as every other section.
- **Section padding-y:** desktop `py-24`–`py-32` (`clamp(6rem, 10vw, 10rem)`),
  mobile 72–96px. **Vary per section** for rhythm.
- **Vertical rhythm:** kicker → heading 24–32px; heading → subhead 16–24px;
  subhead → content 32–48px; content → CTA 40–64px; `<EdgeDivider>` → first
  content ≥ 48px (the section's own padding supplies the gap).

## Backdrop & texture

The canvas is never flat. `SiteBackdrop` mounts a desaturated silver **Silk**
shader (`ogl`, WebGL) at ~0.28 opacity behind every page, "matte metal in a dark
room", with a radial vignette baked in so headline contrast holds. Fixed,
pointer-events-none, `-z-10`; content scrolls over it. No CSS film-grain layer in
the live system; the Silk sheen is the texture.

## Glass

`.glass`: frosted floating chrome. `backdrop-blur(20px) saturate(1.25)`, a hairline
`white/14%` border, an inset top highlight and a soft dark ambient. Opaque enough
that text on it stays ≥ 4.5:1. Use on small/fixed elements (the nav bar, toggles,
video bays, chips). Decorative full-bleed glass on large scrolling surfaces is
banned.

## Elevation & surfaces

- **Cards:** `.chrome-card` (a `--bg-raised` surface with a 1px top edge-light, the
  chromium look) or `--bg-raised` + a hairline `--line` border. Radius 14–16px,
  padding 20–24px. Lift comes from edge-light + a very dark ambient shadow, not
  heavy drop shadows. **Nested cards are banned.**

## Dividers

`<EdgeDivider>`: a thin horizontal line, transparent → chrome → transparent, with a
faint blur glow beneath. Separates major sections. The `.divider-node` variant adds
a single green node at centre.

## Lighting & vignette

The page reads as a lit object in a dark room (resend depth):
- **Key light** — one soft radial bloom behind the focal object.
- **Floor beam** — a long, blurred diagonal streak raking the lower scene.
- **Vignette** — `Vignette` (replaces the old bottom-blur band): a fixed,
  full-viewport **radial vignette**, clear/soft through the centre and deepening
  toward the **edges and corners** (not a flat linear bottom band), so the lit
  centre pops and content dissolves into the frame at the bottom. `z-30`
  (above content, below nav/menu/lightbox), pointer-events-none.

All are pointer-events-none background/overlay layers. No flat fills.

## Motion

- Ease-out-expo / -quart only (`cubic-bezier(0.16,1,0.3,1)` / `(0.25,1,0.5,1)`). No
  bounce, no elastic. 200–300ms hovers, < 600ms reveals.
- One orchestrated load per section (staggered fade-up on scroll-into-view).
- Light sweep (`.sweep`): a left-to-right gradient pass across card surfaces on
  hover (~600ms). The mic LED pulses continuously (~2s).
- Continuous marquees (`.marquee-track`) duplicate the row and slide -50% for a
  seamless loop, slowing on hover.
- Respect `prefers-reduced-motion`: kill sweeps, breathing, auto-scroll, marquee,
  and entrance transforms (all are in the reduced-motion freeze list).

## Components

- **Buttons:** boxy, radius `--radius-btn` (8px). Primary = near-white fill, dark
  text (`PrimaryButton`); Secondary/Ghost = hairline border + light sweep on hover
  (`GhostButton`). Geist, weight 500. Sizes `sm` (h-9) / `md` (h-11) / `lg` (h-12);
  min tap target 44px (use `md`+ for primary actions). Small chips/kickers may stay
  full-pill.
- **Tiles:** 16:9, dimmed to 0.8 brightness at rest (film-strip calm), 1.0 + scale
  1.02 on hover. Captions below, never overlaid.
- **Kicker (`SectionLabel`):** Geist sans, uppercase, 13px, 0.18em, weight 500,
  `--text-faint`. The one section-label component; reuse it, don't re-roll inline.
- **Process meter:** the Start → Day-7 fill bar is **chromium/metallic glow, no
  green** (a white gradient fill with a soft chrome shadow). Label reads `Day 7`.
- **Nav:** floating glass bar, 66px content height, 12–16px inset, pill radius
  `--radius-btn`. Morphing megamenu on desktop; hamburger-left / logo-centre /
  Book-a-call-right on mobile.
- **Lightbox (`MediaLightbox`):** the one shared lightbox — YouTube/Vimeo (with an
  H/V toggle for dual-cut clips) + PDF. Orientation-aware (vertical = 9:16, never
  stretched), focus-trapped, Esc + backdrop close, arrow prev/next.
- **Footer:** sitemap columns + a compact `Book a call` CTA (the permanent footer
  carries the booking CTA site-wide).

## Per-page application

- **Home** — the reference. Hero (metallic H1 film), SelectedWork rail, remote
  compare, process timeline, case studies, questions, newsletter, closing CTA.
- **Interior pages (Portfolio, Process, FAQ, Testimonials, case studies)** — open
  with `PageHeroWord` (oversized centred metallic word + sans kicker), then inherit
  the section rhythm, glass cards, and `EdgeDivider` rules above.
- **Bharatvaarta case study** — the worked example of the system: metallic
  page-hero, home-hero film, glass channel card, reused `RemoteCompare`,
  `WorkMarquee`, shared lightbox; ends on Related work + the permanent footer CTA
  (no closing band).
- **Closing band** — pages end on the standard `ClosingCTA` ("Let's talk about your
  show."); the Bharatvaarta case study is the deliberate exception (footer CTA
  carries it).
