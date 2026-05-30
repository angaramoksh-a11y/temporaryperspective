# Design system — Temporary Perspective

## Reference & default fallback

**resend.com is the standing reference for this site.** When a decision is
ambiguous, the default answer is "what would the resend.com team do?" — deep
near-black canvas, a single sculptural focal object under one dramatic light,
calm motion, chromium hairline edges, premium dev-tool chrome. Match their
restraint and their sense of depth before reaching for anything else.

## Theme

Dark, **metallic with a premium glassmorphism vibe.** Scene: a founder evaluating
a studio late at night on a laptop, wanting to feel the production quality before
they book. The canvas is "matte metal in a dark room", a lit studio at rest:
machined surfaces, frosted glass chrome, light raking across the dark. Near-OLED
black, never pure `#000`. Depth comes from a single key light + vignette, hairline
edge-light, and frosted-glass floating elements, not from drop shadows.

## Color (OKLCH)

Strategy: **Restrained.** Cool-tinted near-OLED neutrals + one warm accent.

- `--bg`        oklch(0.085 0.004 264) near-OLED black, cool (resend-dark)
- `--bg-raised` oklch(0.135 0.005 264) raised surfaces / cards
- `--bg-sunken` oklch(0.065 0.004 264) wells
- `--text`      oklch(0.96 0.004 264)  primary (never #fff)
- `--text-muted` oklch(0.70 0.006 264) sub-headlines, captions
- `--text-faint` oklch(0.55 0.006 264) metadata, client names
- `--line`      white @ 8% opacity     hairline borders
- `--chrome`    oklch(0.99 0.002 264)  edge-light highlight (the metal sweep)
- `--accent`    oklch(0.64 0.21 25)    record-light red. The ONLY saturated color.
                Used <3% of surface: the breathing mic LED, live dots, focus rings.

## Typography

- **Display**: Fraunces (high-contrast modern serif, optical sizing). Weights
  400/500/600 + italic. Large statements only. Tight leading, fluid `clamp()`.
  Closer to resend's licensed Reckless than a pure Didone: the optical-size axis
  keeps the stroke contrast editorial at poster scale without turning brittle.
  Headlines sit at 500; emphasis italics drop to 400.
- **Poster (Thunder)**: tall ultra-condensed grotesque, `--font-thunder` (Anton
  stands in for the licensed Thunder until swapped). Uppercase, poster scale only:
  the `/case-studies` page title and the per-client names. Never for body or UI.
- **UI / body / labels**: Geist (sans). Tight tracking on labels, weight contrast
  within the family. This is the chrome.
- Mono (Geist Mono) for tiny technical labels only, sparingly.
- Scale ratio >= 1.25. Body line length 65-75ch. Light-on-dark: +0.05 line-height.
- Hero headline is locked to exactly three lines ("For podcast conversations" /
  "you only get to have" / "once.") on every breakpoint — each line `whitespace-nowrap`,
  never reflowed.

## Type scale (locked)

Do not invent sizes per component. Pick the nearest role below. Headings are
Fraunces (display); body, labels, and captions are Geist (sans). Values use
fluid `clamp(min, vw, max)` so they lock at both ends.

| Role | Font | Size | Leading | Tracking | Weight |
|------|------|------|---------|----------|--------|
| h1   | display | `clamp(2.25rem, 5.4vw, 3.5rem)` | 1.06 | -0.025em | 500 |
| h2   | display | `clamp(1.75rem, 3.2vw, 2.5rem)` | 1.1  | -0.02em  | 400 |
| h3   | display | `clamp(1.375rem, 2.2vw, 1.9rem)`| 1.15 | -0.015em | 400 |
| h4   | sans    | `1.25rem` (20px)                | 1.25 | -0.01em  | 500 |
| h5   | sans    | `1.0625rem` (17px)              | 1.3  | normal   | 500 |
| h6   | mono    | `0.75rem` (12px)                | 1.4  | 0.2em uppercase | 500 |
| body-lg | sans | `1.125rem` (18px)               | 1.7  | normal   | 400 |
| body    | sans | `1rem` (16px)                   | 1.65 | normal   | 400 |
| body-sm | sans | `0.875rem` (14px)               | 1.55 | normal   | 400 |
| caption | sans | `0.8125rem` (13px)              | 1.5  | normal   | 400 |

- **h6 is the eyebrow/kicker** (`SectionLabel`): mono, uppercase, wide tracking,
  `--text-faint`. Use it to label sections, never as running text.
- **Hero headline is the one locked exception**: it keeps a smaller `1.5rem`
  min so the three `whitespace-nowrap` lines fit at 375px. Max still 3.5rem (h1).
- Body copy lives in `body-lg` for lede paragraphs, `body` for everything else.
  Line length stays 65-75ch.

### Poster display (Thunder) — locked

The condensed poster face is sized separately from the Playfair scale. Uppercase,
two roles only. Leading stays open enough that stacked lines never kiss.

| Role | Where | Size | Leading | Tracking |
|------|-------|------|---------|----------|
| poster-xl | `/case-studies` page title | `clamp(3.25rem, 13.5vw, 11.5rem)` | 0.96 | -0.01em |
| poster-name | per-client name (CaseSection) | `clamp(2.5rem, 7vw, 8rem)` | 0.85 | -0.01em |

- Never tighter than `0.85` leading on a single line, `0.95` when it wraps to two.
- The longest client name must fit its grid column at every breakpoint, so the
  `vw` term is capped low enough to avoid horizontal overflow on desktop.

### Accordion / list-item headings

Repeating item titles that name a thing (Process phases: Branding, Guest Prep,
Production, …) are **h3 (display)**, not body or a shrunken label. They carry the
section, so they get the h3 role; the per-item meta tag stays h6 (mono kicker).

## Spacing scale (locked)

4px base grid. Use these steps, not arbitrary values. Tailwind units map 1:1
(`mt-6` = 24px). Vary spacing for rhythm but always land on a step.

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

Vertical rhythm rules (the relationships that must hold):

- **Eyebrow (h6) → heading**: 24-32px (`mt-6`/`mt-8`).
- **Heading → supporting paragraph**: 24-28px (`mt-6`/`mt-7`).
- **Paragraph → CTA group**: 32-36px (`mt-8`/`mt-9`).
- **Divider → first content below it**: minimum 48px. The `<EdgeDivider />` sits
  at the section's top edge (`absolute inset-x-0 top-0`); the section's own
  vertical padding supplies the gap, so text is never glued to the line.
- **Between major sections**: 96-128px (`py-24` to `py-32`).
- Inside a card: 24-32px padding (`p-6`/`p-8`). Nested cards are banned.

## Texture

The canvas is never flat. A fixed, full-viewport film-grain overlay sits above the
background (`body::after`, `pointer-events-none`, `z-index: 1`).

- `--noise`  inline SVG `feTurbulence` (fractalNoise, baseFrequency 0.9, 2 octaves),
             tiled at 180px, `opacity: 0.035`, `mix-blend-mode: overlay`.
- Keep it subtle: it should read as physical film grain, not visible noise. Per
  performance: grain only ever lives on a fixed pointer-events-none layer, never on
  a scrolling container.

## Glass (metallic glassmorphism)

`.glass` — frosted floating chrome for small elements (kicker pills, future chips).
Translucent white top-down gradient, `backdrop-blur(12px) saturate(1.2)`, hairline
`white/10` border, an inset top highlight + a faint dark ambient. Use sparingly and
only on small / fixed elements (blur on large scrolling surfaces is banned).

## Elevation & surfaces

- Cards: `--bg-raised` with a hairline `--line` border and a top edge that catches
  light (1px inset highlight gradient, the chromium look). No heavy drop shadows on
  the dark canvas; lift comes from the edge-light + a soft, very dark ambient shadow.
- Nested cards are banned.

## Dividers

The chromium edge-light: a thin horizontal line, transparent → `--chrome` @ low
opacity → transparent, with a faint blur glow beneath. Separates major sections.
Reused as `<EdgeDivider />`.

## Lighting (the resend "3D room")

The hero reads as a lit object in a dark room, copied from resend.com's depth:

- **Key light** — one soft radial bloom behind/around the focal object (upper-right),
  brightest at the object and falling to black. Reads as a single light source.
- **Floor beam** — a long, heavily blurred diagonal light streak raking across the
  lower scene, like light catching a surface beneath the object.
- **Vignette** — a radial darken offset toward the key light that crushes the
  corners, so the lit center pops in 3D.

All three are `pointer-events-none` background layers behind the content. No flat
fills; the gradient stack is what makes the scene feel dimensional.

## Motion

- Ease-out-expo / quart only. No bounce. 200-300ms for hovers, <600ms for reveals.
- One orchestrated load per section (staggered fade-up on scroll-into-view).
- Light sweep: a left-to-right gradient pass across card surfaces on hover (~600ms).
- The mic LED pulses continuously (~2s opacity cycle), independent of interaction.
- Respect `prefers-reduced-motion`: kill auto-rotate, sweeps, and breathing.

## Components

- Buttons: boxy, not pills. Radius `--radius-btn` (8px): a square with just-softened
  corners, like resend's CTAs. Primary = near-white fill, dark text. Secondary =
  ghost with hairline border, light sweep on hover. Both Geist, medium weight.
  (Small chips/kickers may still be full pills.)
- Tiles: 16:9, dimmed to 0.8 brightness at rest (film-strip calm), 1.0 + scale 1.02
  on hover. Captions below, never overlaid.
- Pill: small rounded chrome-bordered chip, used for the hero kicker link.
