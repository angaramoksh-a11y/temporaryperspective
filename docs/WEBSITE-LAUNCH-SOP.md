# Website Pre-Launch SOP & Checklist

**Purpose:** A repeatable, verify-as-you-go checklist for shipping any website. Every
item here comes from a real problem we hit and fixed on temporaryperspective.com. Run
this before *and after* going live. Nothing is "done" until it's **verified live**, not
just "pushed."

**How to use:** Work top to bottom. Each item has a **Do** and a **Verify** (usually a
copy-paste command). Don't tick a box on faith — run the check. Replace
`example.com` with the site's real domain in every command.

> **Audience note:** This was written for a **Next.js (`output: 'export'`) site on
> Cloudflare** (Workers static assets). The *principles* are stack-agnostic; the
> exact commands/paths are noted where they're stack-specific.

---

## 🔴 THE PRIME DIRECTIVE (read this first, every time)

**"Pushed to git" ≠ "live on the site."** Between your commit and the live page sit a
build and a deploy, and either can silently fail.

The single most expensive bug we hit: **one TypeScript error in a component silently
failed `next build`, which silently failed every Cloudflare deploy, with NO error
surfaced anywhere.** Days of work sat in git, never serving, while the site kept showing
the last good build. We only found it by running the build locally.

**The rule that prevents it:**

1. **Always run the production build locally before pushing.** If it fails, the deploy
   will too.
   ```bash
   npm run build        # must end in success, no "Failed to type check"
   ```
2. **After the deploy, verify the change is actually live** — don't trust the dashboard.
   The fastest tell: hit a **brand-new URL** you just added. If it 404s, the build
   didn't deploy.
   ```bash
   curl -s "https://example.com/your-new-page?cb=$(date +%s)" | grep -i "<title>"
   ```
3. **Never add `ignoreBuildErrors: true`** to silence a failing build. That ships broken
   code. Fix the error.

If you do nothing else on this list, do this.

---

## 1. Build & Deploy Integrity

- [ ] **Production build passes locally.** `npm run build` — zero errors.
- [ ] **New routes actually deploy.** After deploy, a brand-new URL returns 200 with the
      right `<title>`, not the 404 page.
- [ ] **Deploy method understood.** Know what triggers the build (git push? manual?),
      where the build logs live, and how long it takes. Set up build-failure
      notifications if the host supports them (Cloudflare: project → Settings → Builds).

---

## 2. Indexability — can search/AI engines even reach the pages?

- [ ] **robots.txt is not blocking you.** The #2 most expensive bug: a host-injected
      "AI crawler block" (Cloudflare → AI Crawl Control → **Managed robots.txt** toggle)
      was disallowing *every* AI bot. Check the *live* file, not just your code:
      ```bash
      curl -s https://example.com/robots.txt
      ```
      Confirm it has an `Allow: /` and a `User-agent: *` catch-all, and that no host
      feature is prepending `Disallow: /` blocks.
- [ ] **Sitemap exists, is submitted, and has real dates.** Every indexable URL present;
      no redirect/404 URLs in it; `lastmod` reflects real change dates (not all the same
      stale timestamp). Thin/low-value pages at low priority (≤0.3) to protect crawl
      budget.
      ```bash
      curl -s https://example.com/sitemap.xml | grep -c "<loc>"
      ```
- [ ] **Every indexable page has a self-referencing canonical.** Missing canonicals =
      duplicate-content dilution.
      ```bash
      curl -s https://example.com/some-page | grep -i 'rel="canonical"'
      ```
- [ ] **Redirect/vanity stubs are noindexed** and canonicalized to their real
      destination (not the homepage). In frameworks where `metadata` is ignored in client
      components, make the stub a **server** component that exports
      `robots: { index: false }`.
- [ ] **No accidental `noindex`** on pages you *want* indexed.

---

## 3. Metadata — titles & descriptions

- [ ] **Every page has a unique, keyword-first title, ≤ ~60 chars.**
- [ ] **Watch the title `template` trap.** If the root layout sets a
      `title.template` of `"%s — Brand"`, page titles must **not** also hard-code
      `"— Brand"` or you get **double-branding** (`"Page — Brand — Brand"`). The homepage
      should use `title.absolute` to opt out of the template.
      ```bash
      # after build, eyeball every emitted title:
      grep -rhoiE '<title>[^<]*</title>' out/*.html
      ```
- [ ] **Every page has a unique meta description**, ~120–158 chars. No two pages
      byte-identical (common failure: templated dynamic routes all sharing one string).
- [ ] **One `<h1>` per page,** keyword-relevant. Headless hero sections and dynamic
      routes are the usual offenders — add an `<h1>` (visible or `sr-only`).

---

## 4. Structured Data (Schema / JSON-LD)

- [ ] **Organization + WebSite schema** in the root layout (with `SearchAction`,
      `LocalBusiness` + address/geo if local, and a real `sameAs` list of *all* social
      profiles — don't forget YouTube).
- [ ] **BreadcrumbList** on hub/listing pages.
- [ ] **Article** schema on posts: `headline`, **ISO-8601** `datePublished` +
      `dateModified`, `image`, `author`, `mainEntityOfPage`. **Dates must be ISO
      (`2026-05-24`), not `"May 24, 2026"`** — Google rejects the human string.
      - ⚠️ **Timezone off-by-one trap:** `new Date("May 24, 2026").toISOString()` shifts
        to the previous day in UTC. Store an explicit `dateISO` field instead of parsing.
- [ ] **VideoObject** for videos, with **real** `uploadDate` (not a placeholder).
- [ ] **Person** schema for team/about pages, linked to the Org node via `@id`.
- [ ] **Validate** everything in Google's Rich Results Test before launch. No missing
      required fields, no placeholder values.

---

## 5. GEO — being found & cited by AI (ChatGPT / Claude / Perplexity / Gemini)

- [ ] **`/llms.txt`** exists, is accurate, and matches the site's structured data
      (name, location, services, clients, cities — no drift between llms.txt, schema,
      and on-page copy). Link to it from the footer so it's discoverable.
- [ ] **Answer-shaped content.** Key facts stated as plain declarative sentences an AI
      can quote ("X is a Y based in Z that does A"). A "What is [Brand]?" FAQ entry is a
      strong, cheap citation source. Stats must be *defined* in a sentence, not left as
      naked numbers.
- [ ] **Entity clarity.** The who/what/where is stated as fact in visible HTML, not only
      in meta tags.
- [ ] **✅ "Ask AI about us" footer widget — ADD THIS TO EVERY SITE BEFORE LAUNCH.**
      Deep-link buttons that open ChatGPT / Claude / Perplexity / Grok in **search mode**
      with a pre-filled "Tell me about [Brand]" prompt. Pure anchor tags, no backend.
      It's a confidence signal *and* it drives AI engines to crawl the (now AI-legible)
      site. Only ship it once items 2–5 above are done, so the AI actually returns good
      info. Reference implementation: `components/AskAI.tsx` in this repo. URL patterns:
      - ChatGPT: `https://chatgpt.com/?hints=search&q=<encoded prompt>`
      - Claude: `https://claude.ai/new?q=<encoded prompt>`
      - Perplexity: `https://www.perplexity.ai/search?q=<encoded prompt>`
      - Grok: `https://grok.com/?q=<encoded prompt>`

---

## 6. Performance (Core Web Vitals — a ranking factor)

- [ ] **No oversized images.** We shipped a page that preloaded **3.2 MB** of headshots
      for cards rendered at ~200px. Resize to ~2× display size and re-encode.
      ```bash
      sips --resampleHeightWidthMax 800 -s format jpeg -s formatOptions 82 in.jpg --out out.jpg
      # each hero/card image should be tens of KB, not ~1 MB
      ```
      (If the framework can't optimize images at build — e.g. `images.unoptimized: true`
      on a static export — you MUST ship right-sized source files.)
- [ ] **`preconnect` to third-party media/asset origins** used site-wide (video embeds,
      thumbnail CDNs, font hosts). Render `<link rel="preconnect">` in the document head.
- [ ] **LCP element identified** and not blocked by heavy above-the-fold JS/images.
- [ ] **Immutable caching for content-hashed assets** (`/_next/static/*` etc.), while
      HTML stays on a short revalidate. On Cloudflare static assets: `public/_headers`.

---

## 7. Social / Open Graph

- [ ] **OG + Twitter tags** on every page: `og:title/description/url/image`,
      `og:site_name`, `og:locale`, `twitter:card`.
- [ ] **OG image** is a real 1200×630, absolute URL, with `alt`.
- [ ] **`og:type: article`** pages carry `article:published_time` + `article:author`.
- [ ] **Don't invent social handles.** Only set `twitter:site` to a handle that actually
      exists; a wrong `@handle` is worse than none.
- [ ] **Favicon + apple-touch-icon** present (`/favicon.ico`, `apple-icon`), not just an
      SVG.

---

## 8. Accessibility (also an SEO/GEO signal)

- [ ] **Every meaningful `<img>` has a real `alt`;** decorative images use `alt=""`.
- [ ] **Icon-only buttons/links have `aria-label`s** that include the item's identity
      (not 40 identical "Play" labels).
- [ ] **Animations honor `prefers-reduced-motion`** (CSS media queries do NOT auto-cover
      JS animation libraries — gate those in code).
- [ ] **Semantic landmarks:** one `<main>`, `<nav>`, `<header>`, `<footer>`; sane
      heading order.

---

## 9. Infrastructure & DNS (the stuff that breaks links silently)

- [ ] **`www` → apex (or vice-versa) redirect exists.** A missing `www` DNS record means
      every search-result click to `www.` dies with a DNS/522 error. Add the CNAME **and**
      a 301 redirect rule (Cloudflare has a "Redirect from WWW to root" template).
      ```bash
      curl -sI https://www.example.com/some-page | grep -iE "^HTTP|^location"
      # want: 301 → https://example.com/some-page  (path preserved)
      ```
- [ ] **HTTP → HTTPS forced.** Cloudflare: SSL/TLS → Edge Certificates → **Always Use
      HTTPS**.
      ```bash
      curl -sI http://example.com | grep -iE "^HTTP|^location"   # want 301 → https
      ```
- [ ] **HSTS enabled** (max-age ≥ 6 months). Keep `includeSubDomains` and `preload`
      **off** unless every subdomain is HTTPS-ready (they're hard to reverse).
      ```bash
      curl -sI https://example.com | grep -i strict-transport-security
      ```
- [ ] **Security headers present:** `X-Content-Type-Options: nosniff`,
      `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. On Cloudflare static
      assets, a `public/_headers` file works (it's copied into the build output).
      ```bash
      curl -sI https://example.com | grep -iE "x-content-type|x-frame|referrer-policy"
      ```
- [ ] **SSL mode is Full/Full(strict)**, not Flexible.

---

## 10. Legal & Compliance

- [ ] **Privacy Policy page exists** at `/privacy` (or `/privacy-policy`). Must cover: what
      data you collect, how you use it, third-party services (analytics, video embeds, email
      providers), cookie usage, and user rights. Link it from the footer on every page.
- [ ] **Terms of Service / Terms of Use** page exists. Covers liability, IP ownership,
      acceptable use. Especially important if the site has forms, accounts, or paid services.
- [ ] **Cookie consent banner** if you use analytics, tracking pixels, or any non-essential
      cookies. Required by GDPR (EU visitors), recommended everywhere. Must allow opt-out
      before non-essential cookies fire.
- [ ] **Contact information is real and reachable.** A working email or form, not a dead
      `mailto:` or broken form endpoint. If you show a physical address, confirm it's current.
- [ ] **Copyright notice in footer** with the correct entity name and year.
- [ ] **GDPR / CCPA compliance** if applicable: data deletion request flow, "Do Not Sell"
      link (California), clear data-retention policy.
- [ ] **Accessibility statement** (optional but recommended): declares WCAG conformance
      target and provides a contact for accessibility issues.
- [ ] **Third-party embeds disclosed.** If you embed YouTube, Vimeo, analytics, or social
      widgets, the privacy policy must name them — they set their own cookies/trackers.

---

## 11. Post-Launch (do these the day you go live)

- [ ] **Google Search Console:** add property, verify, submit `sitemap.xml`, Request
      Indexing on the top pages.
- [ ] **Bing Webmaster Tools:** import from GSC, submit the same sitemap.
- [ ] **Click your own "Ask AI about us" buttons** — confirm the AIs return accurate
      info. Thin answers = they haven't re-crawled yet; give it time.
- [ ] **Re-run this whole file against the LIVE site** one more time.

---

## 🏆 Gotchas Hall of Fame (the specific mistakes — never repeat these)

| # | What happened | The fix |
|---|---------------|---------|
| 1 | A TS error silently failed `next build` → **every deploy silently failed**, work never went live | `npm run build` before every push; verify a new URL is live |
| 2 | Cloudflare "Managed robots.txt" was **blocking all AI crawlers** | Check the *live* robots.txt; disable host-injected AI blocks |
| 3 | No `www` DNS record → every Google click to `www.` hit a **522 dead end** | Add `www` CNAME + a 301 redirect rule |
| 4 | A `title.template` double-branded every page (`"X — Brand — Brand"`) | Strip manual brand suffix; homepage uses `title.absolute` |
| 5 | 3.2 MB of headshots preloaded on a small grid → **wrecked LCP** | Resize/re-encode to ~2× display size |
| 6 | Article dates as `"May 24, 2026"` (Google rejects) + a UTC **off-by-one** when parsing | Store explicit ISO `dateISO`, don't parse a display string |
| 7 | ~69 dynamic pages shared **one identical meta description** | Derive per-item descriptions |
| 8 | Redirect stubs were **indexable soft-404s** canonicalizing to the homepage | Server component + `robots: noindex` + correct canonical |
| 9 | Guessed a `twitter:site` handle that **didn't exist** | Only reference real, verified profiles |

---

## Sign-off

Before announcing launch, confirm out loud:

> "I ran `npm run build` and it passed. I loaded a brand-new URL on the **live** domain
> and it served. robots.txt, sitemap, canonicals, schema, `www`/HTTPS/HSTS, security
> headers, images, OG tags, privacy policy, cookie consent, and the **Ask-AI footer** are
> all verified live. Search Console + Bing have the sitemap."

If you can't say all of that, it's not launched — it's just pushed.

---

*Last updated from the temporaryperspective.com launch. Keep this file in your project
boilerplate so every new site starts with it.*
