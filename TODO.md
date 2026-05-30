# Deferred work (blocked on assets)

These sections from the spec are built around assets that don't exist in the repo
yet. The surrounding pages ship without them; drop the assets in and wire up the
section when ready. Each item notes exactly where it slots.

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
