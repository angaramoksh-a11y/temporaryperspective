# Deferred work (blocked on assets)

These sections from the spec are built around assets that don't exist in the repo
yet. The surrounding pages ship without them; drop the assets in and wire up the
section when ready. Each item notes exactly where it slots.

## Newsletter — /newsletter and /newsletter/[slug]

- [ ] **Post thumbnails.** The index rows currently use a numbered chromium
      plate in place of a photo. If you want real 16:9 thumbnails per post, add a
      `thumb` field to each `newsletterPost` in `lib/work.ts` and swap the plate
      in `app/newsletter/page.tsx`.
- [ ] **Top-of-post video.** Each post template has a video slot that renders
      only when `videoId` is set. Add the YouTube ID from Moksh's channel to the
      relevant `newsletterPost` in `lib/work.ts` and it appears automatically.
- [ ] **Body copy is a first draft.** The long-form article bodies and inline
      FAQs in `lib/work.ts` were written in-house to populate the template.
      Review and replace with Moksh's own copy before this is treated as final
      published writing.

## About — /about

- [ ] **Remaining team headshots.** Moksh's photo is wired (`/moksh.jpg`); the
      `headshot` field and image rendering exist in `team` (`lib/work.ts`) and
      `app/about/page.tsx`. Manav, Hatim, Rudra, and Tejas still render an
      initials monogram plate. Drop each photo in `public/` and set `headshot`
      on their `team` entry; the card swaps automatically.
- [ ] **Tejas LinkedIn.** Tejas's card ships without a LinkedIn icon until the
      URL exists. Set `linkedin` on the Tejas entry in `team` and the icon
      renders automatically.

## Case study — /case-studies/bharatvaarta

- [ ] **Section 5, artifacts row (brand book).** A second showcase row with a
      "Brand book" tile that opens the Bharatvaarta brand guide in a PDF lightbox.
      Needs: the brand-book PDF + a page-1 thumbnail. Wire into `CaseWorkRow` (add
      an artifacts row) or a sibling row in `app/case-studies/[client]/page.tsx`.
- [ ] **Section 6, before / after.** Two synchronized muted-autoplay clips side by
      side under the label "Since we came on", sub-line "Same studio. The production
      caught up to the conversation." Needs: the two source clips (early vs current).
- [ ] **Section 7, the tweet.** Frame line "Noticed from the outside." above an
      embedded tweet. Needs: a VERIFIED tweet URL (the spec's
      x.com/PatkarSumedh/status/2013494631724634552 was not confirmed to resolve)
      and a styled/dark X embed.

## Case study — /case-studies/bureau

- [ ] **Section 5, Fraud Forum talking heads.** Two more tiles in the "Bureau
      Fraud Forum" block: Deepak Sharma (Investor) and Sandessh (CTO). Needs:
      their YouTube IDs. Drop into `bureauContent.formats[0].tiles` in
      `lib/work.ts` and they render automatically in the by-format grid.

## Process — /process

The page ships as a sticky scroll-spy timeline over five text-forward phase
sections. The spec's right-column visuals are all asset-blocked; sections render
single-column until the assets land. Each item notes where it slots.

- [ ] **Branding, brand book.** Right-column PDF first-page thumbnail of the
      Bharatvaarta brand book + a "View the Bharatvaarta brand book →" link that
      opens a PDF lightbox. Needs: the brand-book PDF + page-1 thumb + a PDF
      lightbox mode. Slots into the `branding` section in `ProcessTimeline.tsx`.
- [ ] **Guest Prep, questionnaire.** A sample questionnaire/brief PDF thumbnail
      (or a stylized quote pulled from a real prep doc). Slots into `guest-prep`.
- [ ] **Production, BTS still.** A behind-the-scenes still from a Bharatvaarta
      shoot, hairline/chromium framed. Slots into `production` (alongside the
      existing "How we shoot remote →" link). Note: `/virtual` route is itself
      not built yet; the link is live across the site already.
- [ ] **Post, one-to-many grid.** A small grid: one master-edit thumb + 3-4 clip
      thumbnails signalling the "1 episode → many cuts" model. Slots into `post`.
- [ ] **Growth, channel chart.** A subtle chart or stat strip showing channel
      growth over time (Bharatvaarta-themed sample numbers). Slots into `growth`.
- [ ] **Before / after proof.** Final full-viewport section: frame line "This is
      what production does." over two synchronized muted-autoplay clips of the
      same Bharatvaarta scene, different grades, sub-line "Same studio. The
      production caught up to the conversation." Needs: the two graded clips.
      Slots after the `growth` section, before the closing CTA.

## Work archive — /work/archive

- [ ] **PDF artifact tiles.** The grid currently shows video episodes only. The
      spec also wants PDF artifacts (brand guides, decks) as 16:9 tiles with a
      page-1 thumbnail that open in a PDF lightbox viewer. Needs: the PDFs + their
      thumbnails + a PDF lightbox mode (today `Lightbox` is YouTube-only).
- [ ] **Fuller catalog.** Archive currently reuses `workLibrary` (the 17 wall
      episodes). If "the full library" is meant to exceed the wall, add the extra
      episodes to a dedicated archive dataset in `lib/work.ts`.
- [ ] **Extra filter clients.** Filter options are derived from episodes present
      (Bharatvaarta, Bureau). Spec also lists Qapita, Shut Up Beta, The Sarcastic
      Show, Other; they'll appear automatically once episodes for them are added.
