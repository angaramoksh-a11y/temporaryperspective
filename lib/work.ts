export type Episode = {
  id: string; // youtube id
  guest: string;
  client: string;
  caseStudy?: string; // /case-studies/[client]
};

// maxresdefault, with a runtime fallback to hqdefault handled in the component.
export function thumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}
export function thumbFallback(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
export function embed(
  id: string,
  autoplay = false,
  chromeless = false,
  start?: number,
) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
  }
  if (start && start > 0) {
    params.set("start", String(Math.floor(start)));
  }
  // chromeless = silent hover preview: no controls, captions, annotations,
  // fullscreen, or keyboard. Loops the clip. Just the footage playing.
  if (chromeless) {
    params.set("controls", "0");
    params.set("cc_load_policy", "0");
    params.set("iv_load_policy", "3");
    params.set("fs", "0");
    params.set("disablekb", "1");
    // YouTube ignores `start` on re-loop — a mid-video start snaps back to 0:00
    // on every repeat, showing the wrong scene. Only loop when starting from 0.
    if (!start) {
      params.set("loop", "1");
      params.set("playlist", id);
    }
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
export function watch(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
export function vimeo(id: string) {
  const params = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

export const selectedWork: Episode[] = [
  { id: "TomnFVq3Bt4", guest: "Vikram Sood", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "Wd5h0gl5Cj0", guest: "Saurabh Mukherjea", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "f1hRTb6MIZ8", guest: "Manish Sabharwal", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "_RR2a1bh1T0", guest: "Bureau Podcast — Ishaan", client: "Bureau", caseStudy: "/case-studies/bureau" },
  { id: "KMZ_k4C8vxQ", guest: "Indmoney testimonial", client: "Bureau", caseStudy: "/case-studies/bureau" },
  { id: "FKA-b5KXha8", guest: "Ananthan Ayyasamy", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
];

// The full catalog for /work. Same shape as selectedWork; the home row shows a
// curated subset, this wall shows everything.
export const workLibrary: Episode[] = [
  { id: "TomnFVq3Bt4", guest: "Vikram Sood", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "W6odY9EG6Jk", guest: "Saurabh Mukherjea", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "f1hRTb6MIZ8", guest: "Manish Sabharwal", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "Ef5bn6AWxUQ", guest: "Amish Tripathi", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "_RR2a1bh1T0", guest: "Bureau Podcast — Ishaan", client: "Bureau", caseStudy: "/case-studies/bureau" },
  { id: "qpIIH89FepQ", guest: "Aabhas Maldahiyar", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "KRFL9DtVFfk", guest: "Bureau Fraud Forum", client: "Bureau", caseStudy: "/case-studies/bureau" },
  { id: "QTH0goRHdn0", guest: "Medha Bhaskaran", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "KMZ_k4C8vxQ", guest: "Indmoney testimonial", client: "Bureau", caseStudy: "/case-studies/bureau" },
  { id: "SwF6KbsbITc", guest: "Ami Ganatra — 1 God or 33 Crore", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "ZDDBFbaSxoY", guest: "Neelkanth Podcast", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "b4l3-RO4A9c", guest: "Nilesh Oak", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "7srevoi1THs", guest: "IPS Amit Lodha", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "kgOeJjDuf-w", guest: "Ranjan Reddy — Bureau Founder", client: "Bureau", caseStudy: "/case-studies/bureau" },
  { id: "FKA-b5KXha8", guest: "Ananthan Ayyasamy", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "560sRbXiyGA", guest: "Dr. Uday S. Kulkarni", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "nsVBqVg3ipo", guest: "Medha Bhaskaran — Forgotten Genocide", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
  { id: "56LqTXT3jeo", guest: "Medha Bhaskaran", client: "Bharatvaarta", caseStudy: "/case-studies/bharatvaarta" },
];

// ── Unified work catalog ────────────────────────────────────────────────────
// The full body of work across sources, formats and orientations, for /work and
// /work/archive. Vimeo clips carry an `h` (horizontal) and/or `v` (vertical)
// cut, each an id + optional unlisted hash; long-form podcasts carry a YouTube
// id. Search tokenizes over client + format + desc, so no titles are needed.

export type Orientation = "horizontal" | "vertical";
export type VimeoClip = { id: string; hash?: string };

export type WorkItem = {
  slug: string; // unique + shareable: /portfolio/archive/<slug>
  client: string;
  format: string;
  source: "vimeo" | "youtube";
  orientation: Orientation;
  h?: VimeoClip; // horizontal cut (vimeo)
  v?: VimeoClip; // vertical cut (vimeo)
  yt?: string; // youtube id (long-form podcasts)
  title?: string; // human title; falls back to desc/client for display
  desc?: string;
  tags?: string[]; // extra search keywords
  caseStudy?: string;
};

// A WorkItem with its poster resolved + a stable key, ready for the client.
export type ResolvedWorkItem = WorkItem & { thumb: string; key: string };

// Clients that have a dedicated case-study page (drives the lightbox link).
const CASE_STUDY: Record<string, string> = {
  Bharatvaarta: "/case-studies/bharatvaarta",
  Bureau: "/case-studies/bureau",
  Qapita: "/case-studies/qapita",
};

// A catalog entry before its slug + case-study link are computed.
type WorkSeed = Omit<WorkItem, "slug" | "caseStudy"> & { slug?: string };

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Give every item a stable, unique slug (explicit wins; else derived from
// client + title/desc/format) and attach its case-study link.
function assignSlugs(seeds: WorkSeed[]): WorkItem[] {
  const used = new Set<string>();
  seeds.forEach((s) => s.slug && used.add(s.slug));
  return seeds.map((s) => {
    let slug = s.slug;
    if (!slug) {
      const base =
        slugify(`${s.client} ${s.title ?? s.desc ?? s.format}`) || "clip";
      slug = base;
      let i = 2;
      while (used.has(slug)) slug = `${base}-${i++}`;
      used.add(slug);
    }
    return { ...s, slug, caseStudy: CASE_STUDY[s.client] };
  });
}

const vimeoSeeds: WorkSeed[] = (
  [
    // Testimonials about TP (surfaced on /about, not in the work archive)
    { client: "Bharatvaarta", format: "Testimonial", source: "vimeo", orientation: "horizontal", h: { id: "1169858825" }, desc: "Roshan Cariappa (host) on TP" },
    { client: "Tarini Shah", format: "Testimonial", source: "vimeo", orientation: "horizontal", h: { id: "1169859676" }, desc: "500k+ followers, on TP's cinematic storytelling" },
    { client: "Ettara", format: "Testimonial", source: "vimeo", orientation: "horizontal", h: { id: "1169859867" }, desc: "Meet, founder of Ettara, on TP's ownership and care" },
    { client: "Bureau", format: "Testimonial", source: "vimeo", orientation: "horizontal", h: { id: "1195342176" }, desc: "Rahi (Content Head), on industry knowledge and flexibility" },
    { client: "Qapita", format: "Testimonial", source: "vimeo", orientation: "horizontal", h: { id: "1196195127" }, desc: "Brendan Marshall, on TP's production ownership" },

    // Bureau Fraud Forum
    { client: "Bureau", format: "Event coverage / Sizzle reel", source: "vimeo", orientation: "horizontal", h: { id: "1195301877", hash: "843cb7b206" }, desc: "Bureau Fraud Forum sizzle reel" },
    { client: "Bureau", format: "Talking head", source: "vimeo", orientation: "horizontal", h: { id: "1195303497", hash: "5a1aae3ea4" }, v: { id: "1195303501", hash: "c81e8c9d92" }, desc: "Sandesh (CTO) at Bureau Fraud Forum" },
    { client: "Bureau", format: "Talking head", source: "vimeo", orientation: "horizontal", h: { id: "1195301878", hash: "78a173b6ee" }, v: { id: "1195303110", hash: "325b0b4083" }, desc: "Ranjan Reddy (Founder) at Bureau Fraud Forum" },
    { client: "Bureau", format: "Talking head", source: "vimeo", orientation: "horizontal", h: { id: "1195301876", hash: "c6150cd478" }, v: { id: "1195301875", hash: "482906e52d" }, desc: "Deepak Sharma (Investor) at Bureau Fraud Forum" },

    { client: "Ignosis", format: "Event coverage / Sizzle reel", source: "vimeo", orientation: "horizontal", h: { id: "1195304346", hash: "79f1fb2591" }, desc: "Event edit" },
    { slug: "ignosis-saas-edit", title: "Ignosis — SaaS Edit", client: "Ignosis", format: "SaaS Edit", source: "vimeo", orientation: "horizontal", h: { id: "1200381808" }, desc: "SaaS motion graphics edit", tags: ["saas", "motion-graphics"] },
    { slug: "saas-edit-1200403846", title: "SaaS Edit", client: "SaaS Edit", format: "SaaS Edit", source: "vimeo", orientation: "horizontal", h: { id: "1200403846" }, tags: ["saas", "motion-graphics"] },

    // My Fin short-form (vertical)
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169859907" }, desc: "Outfits" },
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169860021" }, desc: "EMI" },
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169859962" }, desc: "90 days" },
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169860087" }, desc: "Spent close to a decade" },

    // ORMH perfume product films
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169858512" }, desc: "Perfume, high-end product edit" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169857371" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169857410" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169857686" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169857461" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169856436" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169859817" }, desc: "Perfume" },

    // Beena product films
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169860644" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169860819" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169860759" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169860937" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169860866" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169860464" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "vertical", v: { id: "1169860692" } },
    { client: "Beena", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1169858565" }, desc: "A young woman using the product" },

    { client: "Read Reels", format: "Commercial", source: "vimeo", orientation: "horizontal", h: { id: "1172800968" }, desc: "Quirky service-launch video with motion graphics" },
    { client: "BD Software", format: "Talking head", source: "vimeo", orientation: "horizontal", h: { id: "1197344755" }, desc: "Corporate talking head, shot outdoors at an event" },
    { slug: "bureau-backyard", title: "Bureau Backyard", client: "Bureau", format: "Long-form podcast", source: "vimeo", orientation: "horizontal", h: { id: "1198374453" }, desc: "Bureau's podcast series", tags: ["podcast", "fraud", "fintech"] },

    // ── New projects (handoff) ───────────────────────────────────────────────
    { slug: "gmorn-valentines-reel", title: "Gmorn — Valentine's reel", client: "Gmorn", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169861256" }, tags: ["brand", "valentines", "ads"] },
    { slug: "gmorn-hanger-reel", title: "Gmorn — Hanger reel", client: "Gmorn", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169861200" }, tags: ["studio", "fashion", "white-bg"] },
    { slug: "gmorn-outdoor-reel", title: "Gmorn — Outdoor reel", client: "Gmorn", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169860406" }, tags: ["outdoor", "sunny", "music", "cycle"] },
    { slug: "pixel-tarini", title: "Pixel — Tarini", client: "Pixel (Google)", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197941353" }, tags: ["ad", "mobile", "tarini"] },
    { slug: "loreal-tarini", title: "L'Oréal — Tarini", client: "L'Oréal", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197941354" }, tags: ["ad", "beauty", "tarini"] },
    { slug: "amazon-prime-day", title: "Amazon Prime Day", client: "Amazon", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197943312" }, tags: ["ad", "prime-day", "d_starrr_"] },
    { slug: "good-things-take-time", title: "Good Things Take Time", client: "Ishpreet × Muskan", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197949652" }, tags: ["creator", "narrative", "ishpreet"] },
    { slug: "see-you-online", title: "See You Online", client: "See You Online", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197941945" }, tags: ["narrative"] },
    { slug: "how-i-met-you-ep-1", title: "How I Met You — Ep 1", client: "How I Met You", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197942565" }, tags: ["narrative", "dating", "ishpreet", "tarini"] },
    { slug: "how-i-met-you-ep-2", title: "How I Met You — Ep 2", client: "How I Met You", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197942386" }, tags: ["narrative", "dating", "ishpreet", "tarini"] },
    { slug: "ishi-ki-khushi-ep-5", title: "Ishi Ki Khushi — Ep 5", client: "Ishi Ki Khushi", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197942739" }, desc: "At a beach; Khushi is about to leave town.", tags: ["narrative", "beach", "khushbu", "ishpreet"] },
    { slug: "ishi-ki-khushi-ep-6", title: "Ishi Ki Khushi — Ep 6", client: "Ishi Ki Khushi", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197942848" }, desc: "Ishpreet asks Imran Khan for advice at a café.", tags: ["narrative", "imran-khan", "cafe"] },
    { slug: "ishi-ki-khushi-ep-7", title: "Ishi Ki Khushi — Ep 7", client: "Ishi Ki Khushi", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197947961" }, desc: "Ishpreet follows Imran's advice; chooses long-distance over breaking it off.", tags: ["narrative"] },
    { slug: "ishi-ki-khushi-ep-8", title: "Ishi Ki Khushi — Ep 8", client: "Ishi Ki Khushi", format: "Narrative series", source: "vimeo", orientation: "vertical", v: { id: "1197947863" }, desc: "Imran & Khushi meet; all three have a heartfelt conversation.", tags: ["narrative"] },
    { slug: "ansh-x-lenskart", title: "Ansh × Lenskart", client: "Lenskart", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197947258" }, tags: ["brand-collab", "ansh-dhote"] },
    { slug: "ansh-x-navi-upi", title: "Ansh × Navi UPI", client: "Navi", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197947259" }, tags: ["brand-collab", "ansh-dhote", "fintech"] },
    { slug: "ansh-x-flo", title: "Ansh × Flo", client: "Flo", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197947261" }, tags: ["brand-collab", "ansh-dhote"] },
    { slug: "ansh-x-mudrex", title: "Ansh × Mudrex", client: "Mudrex", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197947260" }, tags: ["brand-collab", "ansh-dhote", "crypto"] },
    { slug: "ansh-x-tvs-bike", title: "Ansh × TVS", client: "TVS", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197947427" }, tags: ["brand-collab", "ansh-dhote", "auto"] },
    { slug: "ansh-x-happn", title: "Ansh × Happn", client: "Happn", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197947434" }, tags: ["brand-collab", "ansh-dhote"] },
    { slug: "ansh-x-croma", title: "Ansh × Croma", client: "Croma", format: "Commercial", source: "vimeo", orientation: "vertical", v: { id: "1197947479" }, tags: ["brand-collab", "ansh-dhote", "retail"] },
    { slug: "shutup-beta-logo-animation", title: "Shutup Beta — Logo animation", client: "Shutup Beta", format: "Logo animation", source: "vimeo", orientation: "horizontal", h: { id: "1172823675" }, tags: ["motion-graphics", "branding"] },
  ] as WorkSeed[]
);

// Long-form podcasts (YouTube), reusing the existing library.
const podcastSeeds: WorkSeed[] = workLibrary.map((e) => ({
  client: e.client,
  format: "Long-form podcast",
  source: "youtube",
  orientation: "horizontal",
  yt: e.id,
  desc: e.guest,
}));

export const workCatalog: WorkItem[] = assignSlugs([
  ...podcastSeeds,
  ...vimeoSeeds,
]);

// Catalog minus testimonials (those live on /about).
export const archiveItems = workCatalog.filter((i) => i.format !== "Testimonial");
export const clientTestimonials = workCatalog.filter(
  (i) => i.format === "Testimonial",
);

const FORMAT_ORDER = [
  "Long-form podcast",
  "Talking head",
  "Event coverage / Sizzle reel",
  "Short-form reel",
  "Product video",
  "Commercial",
  "Narrative series",
  "Logo animation",
];
export const workClients = [...new Set(archiveItems.map((i) => i.client))].sort();
export const workFormats = [...new Set(archiveItems.map((i) => i.format))].sort(
  (a, b) => FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b),
);

// Stable key for an item (no titles, so build one from source + ids).
export function workItemKey(i: WorkItem): string {
  return i.yt ?? i.h?.id ?? i.v?.id ?? `${i.client}-${i.format}`;
}

// Primary clip (horizontal preferred) for the grid tile + default lightbox cut.
export function primaryClip(i: WorkItem): VimeoClip | undefined {
  return i.h ?? i.v;
}

// Vimeo player embed; carries the unlisted `h` hash when present.
export function vimeoEmbed(
  clip: VimeoClip,
  { autoplay = false, muted = autoplay }: { autoplay?: boolean; muted?: boolean } = {},
) {
  const params = new URLSearchParams({ title: "0", byline: "0", portrait: "0", dnt: "1" });
  if (clip.hash) params.set("h", clip.hash);
  if (autoplay) params.set("autoplay", "1");
  if (muted) params.set("muted", "1");
  return `https://player.vimeo.com/video/${clip.id}?${params.toString()}`;
}

// Public Vimeo link for the "Watch on Vimeo" action.
export function vimeoLink(clip: VimeoClip) {
  return clip.hash
    ? `https://vimeo.com/${clip.id}/${clip.hash}`
    : `https://vimeo.com/${clip.id}`;
}

// Resolve a poster thumbnail for a catalog item. YouTube uses the predictable
// thumbnail URL; Vimeo uses the free public oEmbed endpoint (works for unlisted
// clips via the hash), cached for a day, falling back to vumbnail.com.
// TODO(thumbnails): vumbnail is only a fallback today. Revisit a more robust
// poster pipeline (self-hosted frames or the Vimeo API) once the archive ships.
export async function resolveThumb(i: WorkItem): Promise<string> {
  if (i.source === "youtube" && i.yt) {
    return `https://i.ytimg.com/vi/${i.yt}/maxresdefault.jpg`;
  }
  const clip = primaryClip(i);
  if (!clip) return "";
  try {
    const src = vimeoLink(clip);
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(src)}&width=960`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { thumbnail_url?: string };
    if (data.thumbnail_url) return data.thumbnail_url;
    throw new Error("no thumbnail");
  } catch {
    return `https://vumbnail.com/${clip.id}.jpg`;
  }
}

// ── Testimonials ────────────────────────────────────────────────────────────
// Richer than the catalog testimonials: each carries a category, role, a pull
// quote, credential links, and the projects it relates to. Used on /testimonials
// and (a 3-pick preview) on /about.

export type TestimonialCategory =
  | "Creators"
  | "Podcasters & B2B"
  | "Founders";
export type CredIcon = "instagram" | "linkedin" | "youtube" | "website";
// `side` decides which column the link renders in on /testimonials:
//   - "client": the show, channel, or company (left column, with the title card)
//   - "speaker": the person on the cover (right column, with the video)
export type Credential = {
  label: string;
  href: string;
  icon: CredIcon;
  side: "client" | "speaker";
};
export type TestimonialProject = { label: string; href?: string };

export type SiteTestimonial = {
  category: TestimonialCategory;
  name: string;
  note?: string; // e.g. handle shown beside the name
  role: string;
  vimeoId: string;
  quote: string; // the pull quote shown prominently
  transcript: string[]; // full transcript, one entry per paragraph
  credentials: Credential[];
  projects: TestimonialProject[];
  preview?: boolean; // surfaced on the /about preview row
};

export type ResolvedTestimonial = SiteTestimonial & { thumb: string };

export const testimonialCategories: TestimonialCategory[] = [
  "Creators",
  "Podcasters & B2B",
  "Founders",
];

// TODO(testimonials): Tarini's transcript is the cleaned partial cut (a fuller
// cut is pending, one-line swap when it lands). Verify the @Bharatvaarta YouTube
// handle is canonical. Creator project links point at /work/archive; deep-linking
// to the exact entry would need URL-driven archive filters.
export const siteTestimonials: SiteTestimonial[] = [
  {
    category: "Podcasters & B2B",
    name: "Brendan Marshall",
    role: "Host, The Catapult Code · Advisor, Qapita",
    vimeoId: "1196195127",
    quote: "Everyone on this team genuinely cares.",
    transcript: [
      "My name is Brendan Marshall and I'm an advisor to Qapita. I spent the last few days with Temporary Perspective, had a wonderful time, learnt a lot about how to deliver a great show on a podcast. And I think what's really clear is that everyone on this team cares. They care about the product they're making, but also the people who were part of that, including our guest. They're very meticulous about all those details, and great people to work with.",
    ],
    credentials: [
      { label: "qapita.com", href: "https://www.qapita.com", icon: "website", side: "client" },
      { label: "Qapita on LinkedIn", href: "https://www.linkedin.com/company/qapita/posts/?feedView=all", icon: "linkedin", side: "client" },
      { label: "Brendan on LinkedIn", href: "https://www.linkedin.com/in/brendantmarshall/", icon: "linkedin", side: "speaker" },
    ],
    projects: [{ label: "The Catapult Code", href: "/case-studies/qapita" }],
    preview: true,
  },
  {
    category: "Podcasters & B2B",
    name: "Roshan Cariappa",
    role: "Host, Bharatvaarta",
    vimeoId: "1169858825",
    quote: "Committed to the art of production.",
    transcript: [
      "Hey, it's been amazing working with Temporary Perspective. Moksh and team are fantastic, really committed to the art and science of production, which I really appreciate. They really care about the outcomes as well. Not your run-of-the-mill production team that will just get the camera, audio, video, sound, and so on. I really like that. We've had a great time working with them, and look forward to working with them again in future.",
    ],
    credentials: [
      {
        label: "@Bharatvaarta on YouTube",
        href: "https://www.youtube.com/@Bharatvaarta",
        icon: "youtube",
        side: "client",
      },
      {
        label: "Roshan on LinkedIn",
        href: "https://www.linkedin.com/in/cariappack/",
        icon: "linkedin",
        side: "speaker",
      },
    ],
    projects: [{ label: "Bharatvaarta", href: "/case-studies/bharatvaarta" }],
  },
  {
    category: "Podcasters & B2B",
    name: "Rahi Bhattacharjee",
    role: "Content Head, Bureau",
    vimeoId: "1195342176",
    quote: "They understand the nuances, it shows.",
    transcript: [
      "When you work in an industry where you're doing collaborations and videos, especially in B2B, it's important that the team you work with understands you. You give them a project brief, and every time you go back to them on the same or similar projects, their understanding is intuitive, it becomes instinctive. You don't have to sit for an hour or two going over the nitty-gritty. There's a level of understanding where your team gets the nuances, understands who the audience is, and it just gets easier every time you do something with them.",
      "I don't think the goal should be reducing workload, the quality of the output should be excellent, and that should be mutually beneficial for both parties. Even though the workload hasn't reduced, your team has been extremely flexible, and that's given us the opportunity to demand excellence, to expect it, and to put forward requests that, even though they increase the workload, we know will make the project that much better. Flexibility and understanding is something that, on a day-to-day basis, has made it really easy to work with you.",
      "We work with you on testimonials, and on our brand IP, the Bureau Fraud Forum, where we interview people from the industry on how fraud works, what their go-to tech is, their biggest concerns. The video output runs into hours, and knowing your team understands the nuances and can edit it down to its most polished, clean version, where the end result is the most valuable part of everything we shot, that matters. Unless you know the industry, know about fraud prevention and B2B and people who work in tech, I don't think you'd have been able to do that.",
      "I'd always say, work on a smaller project first. We started with one small event, a banking breakfast for the Bureau Fraud Forum. When I saw the quality of the output, and how easy it was to discuss deliverables, timelines, commercials, everything is a negotiation, it's never everybody-happy on the first shot, just making it easy to go back and forth, and a space where ideas and flexibility and innovation from both sides are encouraged. That two-way process is valuable. Start small, see how it goes, see how you like the team, and then go ahead.",
      "And apart from the work, we also happily banter with the team. For me, that's a plus, I like that I can be professional and also have fun with the team.",
    ],
    credentials: [
      {
        label: "Bureau on LinkedIn",
        href: "https://www.linkedin.com/company/bureauidentity/",
        icon: "linkedin",
        side: "client",
      },
      {
        label: "Rahi on LinkedIn",
        href: "https://www.linkedin.com/in/rahi-bhattacharjee-3a4456135/",
        icon: "linkedin",
        side: "speaker",
      },
    ],
    projects: [
      { label: "Bureau Fraud Forum", href: "/case-studies/bureau" },
      { label: "Bureau Backyard", href: "/case-studies/bureau" },
      { label: "Testimonials", href: "/case-studies/bureau" },
    ],
    preview: true,
  },
  {
    category: "Creators",
    name: "Tarini Shah",
    role: "Content creator · 540k+ followers",
    vimeoId: "1169859676",
    quote: "Their filmmaking brings your idea to life.",
    transcript: [
      "The first project I ended up shooting with these guys wasn't my hire — it was Ishpreet Balbir's. It was one of the longest, craziest days I've ever had, but the result turned out so good. Humne bahut jugaad kiya hai woh set pe, but the creative lens I got from them — jaise kaam karna hai. That's something Temporary Perspective brings into the picture. No matter what, the vision and the sense of filmmaking they have will bring your idea to life — I saw that on the first shoot. The best part is a mix of things: you have an idea, they understand your perspective — but it doesn't end there; there's a lot more additive value from their sense of filmmaking. In the end, the product you want — they're ready to learn and tweak everything, but also add their own touch, which makes them unique: bringing the best out of your idea and the best of what they have, together, to create something magical. Would I collaborate again? Oh yes — as long as they have time. Thank you so much.",
    ],
    credentials: [
      {
        label: "@tarini_shah on Instagram",
        href: "https://www.instagram.com/tarini_shah/",
        icon: "instagram",
        side: "speaker",
      },
      {
        label: "Tarini on LinkedIn",
        href: "https://www.linkedin.com/in/tarini-shah-043b042a4/",
        icon: "linkedin",
        side: "speaker",
      },
    ],
    projects: [
      { label: "How I Met You", href: "/portfolio/archive?q=how-i-met-you" },
      { label: "Google Pixel commercial", href: "/portfolio/archive?q=pixel-tarini" },
      { label: "L'Oréal commercial", href: "/portfolio/archive?q=loreal-tarini" },
    ],
    preview: true,
  },
  {
    category: "Creators",
    name: "Ishpreet Balbir",
    role: "Content creator · 230k+ followers",
    vimeoId: "1197937165",
    quote: "Supremely talented, and genuinely caring.",
    transcript: [
      "Hi, my name is Ishpreet Balbir and I have worked with Temporary Perspective — which represents Manav & Moksh — for five videos, and I've had the best time working with them. I worked on two amazing series on Instagram: one is Ishi Ki Khushi and the other is How I Met You. In those five videos, humara jo experience raha hai in terms of the highs and the lows, going through different challenges, working together — especially because each video was very different. We shot in public spaces, with different people featuring; one was an A-lister Bollywood actor. Keeping all those variables in mind, and ensuring things were executed in the time we had, both of them were utterly professional. We had a lot of fun editing too — whenever you shoot such videos, you shoot far more than the final cut. Going from 3–4 minutes down to a minute or two, with so many people involved, there's always some creative opinion each one carries. In most cases we were all in sync, all wanting the best product for the audience. And the result — people loved every video. Both are supremely talented, and especially at their age — early 20s — to have that creative vision and sense, and the understanding of the challenges, always looking out for the final product rather than 'main kya chahta hoon, woh kya chahta hai' — they're very well headed. That's extremely important in our space. I really wish them all the best, and anyone wondering whether they should collaborate with Temporary Perspective — from my perspective, they definitely should.",
    ],
    credentials: [
      {
        label: "@ishpreetbalbir on Instagram",
        href: "https://www.instagram.com/ishpreetbalbir/",
        icon: "instagram",
        side: "speaker",
      },
      {
        label: "Ishpreet on LinkedIn",
        href: "https://www.linkedin.com/in/ishpreetbalbir/",
        icon: "linkedin",
        side: "speaker",
      },
    ],
    projects: [
      { label: "Ishi Ki Khushi (Eps 5-8)", href: "/portfolio/archive?q=ishi-ki-khushi" },
      { label: "Good Things Take Time", href: "/portfolio/archive?q=good-things-take-time" },
      { label: "How I Met You (Eps 1-2)", href: "/portfolio/archive?q=how-i-met-you" },
      { label: "See You Online", href: "/portfolio/archive/see-you-online" },
    ],
  },
  {
    category: "Creators",
    name: "Khushbu Chandarana",
    note: "chashmishkhushi",
    role: "Content creator · 180k+ followers",
    vimeoId: "1197937167",
    quote: "Vision, vibes, and a lot of magic.",
    transcript: [
      "A lot of people bring cameras to shoots; Moksh & Manav bring vision, vibes and a lot of magic. Hi, my name is Khushbu Chandarana, also known as chashmishkhushi. I worked with Moksh & Manav on a series called Ishi Ki Khushi. We shot at my home, across Mumbai, and at the beach. There was a lot of tadakti-bhadakti Mumbai ki garmi, but a lot of hope. Through it all, these guys were always calm, creative and somehow excited — even though my head and the wind were clearly not getting along. They weren't just DOPs; they were co-directors, idea partners, and even mood stabilizers. We even pulled off a final shoot with Imran Khan, and it was magical. They didn't just want it to look good — they wanted it to feel right. They made sure I was in sync with the process, edits and final cuts, even though I had like 56 opinions. If you're a creator looking for a team that gets your vibe, matches your madness, and doesn't cry whenever you say 'let's shoot on the beach' — these are your guys. Temporary Perspective might just be their name, but my recommendation is permanently solid. Bye!",
    ],
    credentials: [
      {
        label: "@chashmishkhushi on Instagram",
        href: "https://www.instagram.com/chashmishkhushi/",
        icon: "instagram",
        side: "speaker",
      },
      {
        label: "Khushbu on LinkedIn",
        href: "https://www.linkedin.com/in/khushbuchandarana/",
        icon: "linkedin",
        side: "speaker",
      },
    ],
    projects: [{ label: "Ishi Ki Khushi (Eps 5-8)", href: "/portfolio/archive?q=ishi-ki-khushi" }],
  },
  {
    category: "Founders",
    name: "Meet",
    role: "Founder, Ettara (D2C brand)",
    vimeoId: "1169859867",
    quote: "Feels like they're part of the team.",
    transcript: [
      "Working with Temporary Perspective, it's never only been about finishing the job and ticking off tasks — they've been so involved in each and every part of the process. They helped us think, ideate, plan the shoots, and finally shoot and get it done. They've been so involved that now it feels like they're a part of Team Ettara. It's very rare to find people who care so much, who take ownership of others' projects to this extent — not just on set, but behind the scenes. The kind of hard work they've put in, not caring about their own sleep schedules or other commitments — that's what sets them apart for me.",
    ],
    credentials: [
      { label: "ettara.co", href: "https://ettara.co/", icon: "website", side: "client" },
      { label: "Meet on LinkedIn", href: "https://www.linkedin.com/in/meet-shah-/", icon: "linkedin", side: "speaker" },
    ],
    projects: [
      { label: "Website content shoot", href: "/portfolio/archive" },
      {
        label: "BTS reel",
        href: "https://www.instagram.com/reel/DNBFk15yCSM/",
      },
    ],
  },
];

// Vimeo poster for a public clip (oEmbed, cached, vumbnail fallback).
export async function vimeoPoster(id: string): Promise<string> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}&width=900`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { thumbnail_url?: string };
    if (data.thumbnail_url) return data.thumbnail_url;
    throw new Error("no thumbnail");
  } catch {
    return `https://vumbnail.com/${id}.jpg`;
  }
}

export type CaseStudy = {
  client: string;
  href: string;
  vimeoId: string;
  tag: string;
  result: string;
  status: string | null;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Bharatvaarta",
    href: "/case-studies/bharatvaarta",
    vimeoId: "1169858825",
    tag: "Politics · Policy · Culture",
    result:
      "A long-form channel for Indian politics and policy, booking guests like Vikram Sood, Saurabh Mukherjea and Manish Sabharwal across 100+ episodes.",
    status: null,
  },
  {
    client: "Bureau",
    href: "/case-studies/bureau",
    vimeoId: "1195342176",
    tag: "Fintech · Fraud Prevention",
    result:
      "Event films, a podcast series and customer testimonials for India's fraud-prevention fintech, shot on location and in studio.",
    status: null,
  },
  {
    client: "Qapita",
    href: "/case-studies/qapita",
    vimeoId: "1196195127",
    tag: "Founder stories",
    result:
      "A founder podcast for the messy middle of building a company, filmed across Mumbai and the US.",
    status: "In production",
  },
];

// Bespoke long-form content for individual case studies. Clients present here
// render the rich layout; clients absent fall back to the generic template.
export type CaseContent = {
  producedWith: string;
  tagline: string;
  testimonialId: string; // youtube id
  testimonialName: string;
  aboutShow: string[];
  ourRole: string[];
  showcase: Episode[];
  related: { client: string; tag: string; href: string }[];
};

// Generic rich-template registry, for any future client that only needs the
// simple template. Clients with a dedicated component (Bureau, Qapita,
// Bharatvaarta) are dispatched before this map is consulted.
export const caseStudyContent: Record<string, CaseContent> = {};

// Bureau: bespoke, organised by production format rather than a single show.
// A format card carries both the YouTube highlight tiles (for the scroll reel +
// schema) and a Vimeo gallery (what opens when the card itself is clicked).
// Gallery clips can ship both a horizontal and vertical cut for the H/V toggle.
export type FormatClip = {
  label: string;
  h?: VimeoClip;
  v?: VimeoClip;
};
export type FormatBlock = {
  heading: string;
  label: string;
  body: string;
  tiles: Episode[];
  gallery?: FormatClip[];
};

export const bureauContent = {
  producedWith: "Produced for Bureau",
  tagline: "Fintech · Fraud Prevention",
  testimonialVimeoId: "1195342176",
  testimonialName: "Rahi · Content Head, Bureau",
  about: [
    "Bureau builds fraud-prevention infrastructure for fintech. Their thinking: fraudsters network fast, so the people stopping them have to network faster. The Bureau Fraud Forum is how they do it, an industry event putting operators in one room on how fraud works.",
    "We produce across Bureau's formats: the Forum, their series, and their testimonial work. One team that knows the brand and the subject.",
  ],
  quote: {
    text: "It gets easier every single project we do.",
    attribution: "Rahi, Content Head, Bureau",
  },
  formats: [
    {
      heading: "Bureau Fraud Forum",
      label: "Event coverage",
      body: "Event coverage of the Forum, sizzle reels and talking heads with founders, investors, and operators.",
      tiles: [
        { id: "KRFL9DtVFfk", guest: "Forum sizzle reel", client: "Bureau" },
        { id: "kgOeJjDuf-w", guest: "Ranjan Reddy, Founder", client: "Bureau" },
      ],
      gallery: [
        { label: "Sizzle reel", h: { id: "1195301877", hash: "843cb7b206" } },
        { label: "Sandesh", h: { id: "1195303497", hash: "5a1aae3ea4" }, v: { id: "1195303501", hash: "c81e8c9d92" } },
        { label: "Ranjan Reddy", h: { id: "1195301878", hash: "78a173b6ee" }, v: { id: "1195303110", hash: "325b0b4083" } },
        { label: "Deepak Sharma", h: { id: "1195301876", hash: "c6150cd478" }, v: { id: "1195301875", hash: "482906e52d" } },
      ],
    },
    {
      heading: "Bureau Backyard",
      label: "Podcast series",
      body: "Bureau's ongoing series, podcast format. Long-form conversations with operators in the fraud-prevention space.",
      tiles: [{ id: "_RR2a1bh1T0", guest: "Ishaan", client: "Bureau" }],
      gallery: [{ label: "Bureau Backyard Podcast", h: { id: "1198374453" } }],
    },
    {
      heading: "Testimonials",
      label: "Client work",
      body: "Client testimonial production for Bureau's customers.",
      tiles: [{ id: "KMZ_k4C8vxQ", guest: "Indmoney", client: "Bureau" }],
      gallery: [{ label: "IndMoney Testimonial", h: { id: "1172800968" } }],
    },
  ] as FormatBlock[],
  related: [
    { client: "Bharatvaarta", tag: "Politics · Policy · Culture", href: "/case-studies/bharatvaarta" },
    { client: "Qapita", tag: "Founder stories · In production", href: "/case-studies/qapita" },
  ],
};

// Qapita / The Catapult Code: title differs from the client; show is pre-launch.
export const qapitaContent = {
  title: "The Catapult Code",
  producedWith: "Produced for Qapita",
  tagline: "Founder stories · In production",
  testimonialVimeoId: "1196195127",
  testimonialName: "Brendan Marshall · The Catapult Code",
  aboutShow: [
    "The Catapult Code is a founder podcast from Qapita, hosted by Brendan Marshall (StartX, Stanford) and Ravi Ravulaparthi (CEO, Qapita). It's built for the messy middle: founders past early traction, scaling toward the next level.",
  ],
  ourRole: [
    "We're producing the series end to end. Three episodes shot in Mumbai, with more in production across the US. We consult and edit those, and finish all nine in house. Full production ownership.",
  ],
  status: {
    label: "In production.",
    sub: "First episodes launching soon.",
  },
  related: [
    { client: "Bharatvaarta", tag: "Politics · Policy · Culture", href: "/case-studies/bharatvaarta" },
    { client: "Bureau", tag: "Fintech · Fraud Prevention", href: "/case-studies/bureau" },
  ],
};

// Bharatvaarta: a bespoke 8-section case study with its own component. A case
// study should feel like one: lean on proof, keep the prose tight.
export type ShowcaseTile = { id: string; title: string; guest?: string };

export const bharatvaartaContent = {
  eyebrow: "Politics · Policy · Culture",
  host: "by Roshan Cariappa",
  testimonialVimeoId: "1169858825",
  testimonialName: "Roshan Cariappa, host of Bharatvaarta",
  // The existing pull-quote stays (from siteTestimonials).
  quote: "Committed to the art of production.",
  aboutShow: [
    "Bharatvaarta is a long-form show on Indian politics, policy, and culture: the longer, harder conversations, taken seriously. Guests have included former R&AW chief Vikram Sood, Saurabh Mukherjea, Manish Sabharwal, and Medha Bhaskaran.",
    "It isn't built for views. It's built for the people who want the full conversation, and it's stayed that way because that's how Roshan runs it. We're grateful Roshan still trusts us with it.",
  ],
  ourRole: [
    "We handle the production end to end: brand and visual identity, the shoot, the master edit, colour grade and lighting tuned to each conversation, clipping, and distribution. When the host needed to record on location, we brought the studio to him.",
    "The show, the guests, and the editorial direction are Roshan's. Our job is to make sure the production never gets in the way of the conversation, and that an hour worth watching looks like one.",
  ],
  channel: {
    href: "https://www.youtube.com/@Bharatvaarta",
    handle: "@Bharatvaarta",
    posterId: "TomnFVq3Bt4", // Vikram Sood frame: a recognizable, on-brand still
  },
  // Before / after: same studio, regraded and relit, three angles. Both start
  // wide for a fair comparison. YouTube ids + start seconds.
  compare: {
    label: "Since we came on",
    line: "Same room, same host. We just made it look like what it always was.",
    before: { id: "f3_qOvKrP8Y", start: 75 },
    after: { id: "FKA-b5KXha8", start: 133 },
  },
  // Someone externally noticing the production jump.
  tweet: {
    line: "Noticed from the outside.",
    url: "https://x.com/PatkarSumedh/status/2013494631724634552",
  },
  // The full body of work, conveyed by quantity. Reuses the workLibrary ids and
  // adds the third Medha episode. Marquee on desktop, static row when reduced.
  marquee: [
    { id: "ZDDBFbaSxoY", title: "Neelkanth Podcast" },
    { id: "QTH0goRHdn0", title: "Medha Bhaskaran" },
    { id: "SwF6KbsbITc", title: "1 God or 33 Crore?", guest: "Ami Ganatra" },
    { id: "560sRbXiyGA", title: "When Marathas (Almost) Ruled India", guest: "Dr. Uday S. Kulkarni" },
    { id: "qpIIH89FepQ", title: "Nazi Germany & the Palestinian Cause", guest: "Aabhas Maldahiyar" },
    { id: "TomnFVq3Bt4", title: "Understanding the Deep State", guest: "Vikram Sood, former R&AW chief" },
    { id: "Ef5bn6AWxUQ", title: "Amish Tripathi" },
    { id: "f1hRTb6MIZ8", title: "Deregulation, Civil Service Reform & India's Growth", guest: "Manish Sabharwal" },
    { id: "b4l3-RO4A9c", title: "Nilesh Oak" },
    { id: "56LqTXT3jeo", title: "Medha Bhaskaran" },
    { id: "7srevoi1THs", title: "IPS Amit Lodha" },
    { id: "FKA-b5KXha8", title: "The Ananthan Ayyasamy Story" },
    { id: "nsVBqVg3ipo", title: "The Forgotten Genocide That Sparked Swaraj", guest: "Medha Bhaskaran" },
    { id: "W6odY9EG6Jk", title: "Saurabh Mukherjea" },
  ] as ShowcaseTile[],
  related: [
    { client: "Bureau", tag: "Fintech · Fraud Prevention", href: "/case-studies/bureau" },
    { client: "Qapita", tag: "Founder stories · In production", href: "/case-studies/qapita" },
  ],
};

export type Phase = {
  id: string;
  title: string;
  label: string;
  body: string; // short, for the home accordion
  detail: string; // fuller, for the /process page section
  link?: { label: string; href: string };
};

export const phases: Phase[] = [
  {
    id: "branding",
    title: "Branding",
    label: "Foundational",
    body:
      "Logo, palette, typography, and the show's full visual system. Built from scratch, only if you're starting cold.",
    detail:
      "If you're starting from scratch: logo, palette, typography, the show's full visual system. Done once, at the start. Built so every episode after has a consistent identity.",
  },
  {
    id: "guest-prep",
    title: "Guest Prep",
    label: "Per episode",
    body:
      "Briefs and questionnaires per guest. The host walks in ready; the guest knows the format.",
    detail:
      "A custom questionnaire and brief for every guest. The host walks in ready, the guest knows the format. No ninety-minute conversation should start cold.",
  },
  {
    id: "production",
    title: "Production",
    label: "Per episode",
    body:
      "The shoot, studio, on location, or remote across cities. Multi-camera, properly lit and miked.",
    detail:
      "The shoot: your studio, the guest's location, or remote across cities. Multi-camera, properly lit and miked. Built for an hour that looks like one.",
    link: { label: "How we shoot remote", href: "/virtual" },
  },
  {
    id: "post",
    title: "Post",
    label: "Per episode",
    body:
      "Master edit with hooks and b-roll, colour grade tuned per conversation, plus clips cut for distribution.",
    detail:
      "Master edit with hooks and b-roll, colour grade tuned per conversation, plus clips cut for distribution. As many clips as the show needs, typically three, six, or twelve.",
  },
  {
    id: "growth",
    title: "Growth",
    label: "Per episode",
    body: "Publishing and channel management, ongoing after the show ships.",
    detail:
      "Publishing and channel management, ongoing after launch. The show keeps growing because someone keeps running it.",
  },
];

export type PostSection = { heading?: string; paragraphs: string[] };

export type NewsletterPost = {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  date: string; // short, for cards: "May 2026"
  dateLong: string; // full, for the post header: "May 30, 2026"
  author: string;
  videoId?: string; // youtube id, top of post — pending real uploads
  body: PostSection[];
  faqs: QA[];
};

export const newsletterPosts: NewsletterPost[] = [
  {
    slug: "guest-list-is-your-ceiling",
    title: "Your guest list is your show's ceiling.",
    excerpt:
      "The format matters less than people think. What decides whether your show works is who agrees to sit down. Spend the time on the guest list and most production problems quietly solve themselves.",
    readingTime: "4 min read",
    date: "May 2026",
    dateLong: "May 24, 2026",
    author: "Moksh",
    body: [
      {
        paragraphs: [
          "Most founders start a podcast by deciding the format. Solo or interview. Weekly or fortnightly. Forty minutes or ninety. They settle the look, the name, the intro music, and only then start thinking about who to put in front of the camera.",
          "That order is backwards. The format is a small decision wearing a big costume. The decision that actually sets the ceiling on your show is the guest list, and it is the one most people rush.",
        ],
      },
      {
        heading: "The format is a smaller decision than you think",
        paragraphs: [
          "A show with a sharp guest and a plain format beats a show with a clever format and a guest nobody came for. The audience is not tuning in for your lower thirds. They are tuning in because someone they respect agreed to talk for an hour, and they want to hear it.",
          "Once you accept that, a lot of production anxiety disappears. You stop optimising the things that do not move the needle and start spending your attention on the one thing that does: the names.",
        ],
      },
      {
        heading: "Booking is the work",
        paragraphs: [
          "Booking a guest who does not already know you is a real skill, and it is mostly patience plus a reason to say yes. The reason is rarely your audience size in the early days. It is the quality of the conversation you are promising, and the proof that you take it seriously.",
          "This is why the brief matters before the booking. A guest can tell within two messages whether you have done the reading. The ones worth having on are exactly the ones who notice.",
        ],
      },
      {
        heading: "What a ceiling actually means",
        paragraphs: [
          "When we say the guest list is your ceiling, we mean it literally. Your best episode this year will be your best guest this year. Everything else, the edit, the clips, the distribution, raises the floor. It does not raise the ceiling.",
          "So spend accordingly. Put your scarce hours into the list. Let the studio handle the rest.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I wait until I can book big guests to start?",
        a: "No. Start with the best guest who will say yes now, and let the show earn the next one. A real episode in the world is worth more than a perfect plan. The list grows from proof, not from waiting.",
      },
      {
        q: "How do I get a guest who doesn't know me to say yes?",
        a: "Give them a reason that isn't your reach: a sharp brief, a clear format, and evidence you've done the reading. Serious people say yes to serious preparation more often than to big numbers.",
      },
      {
        q: "Does the guest matter more than production quality?",
        a: "The guest sets the ceiling; production raises the floor. You need both, but if you have to choose where your own hours go early on, put them on the list and let the studio carry the craft.",
      },
    ],
  },
  {
    slug: "stop-chasing-clips",
    title: "Stop chasing clips, start finishing episodes.",
    excerpt:
      "Every founder asks about clip counts first. It's the wrong end of the funnel. A clip from a thin episode dies in a day. A clip from an episode someone finished gets sent in DMs for a year.",
    readingTime: "5 min read",
    date: "May 2026",
    dateLong: "May 10, 2026",
    author: "Hatim",
    body: [
      {
        paragraphs: [
          "The first question almost every founder asks us is how many clips they will get per episode. It is a fair question, and it is the wrong place to start. Clips are the last step in the pipeline, not the first, and treating them as the goal quietly damages everything upstream.",
        ],
      },
      {
        heading: "The clip is the last step, not the first",
        paragraphs: [
          "A clip is a window into a conversation. If the conversation is good, the window is easy to cut and worth watching. If the conversation is thin, no amount of clever editing will hide it. You can feel the difference in the first three seconds, and so can the person scrolling past.",
          "When clips become the objective, the episode gets built to produce clippable moments instead of a conversation worth finishing. The guest senses it. The audience senses it. The show starts to feel like a content farm wearing a studio's clothes.",
        ],
      },
      {
        heading: "A thin episode can't be saved in post",
        paragraphs: [
          "Post-production is leverage on what already exists. A good colour grade, a tight edit, and a strong hook make a real episode shine. They cannot manufacture substance that was never recorded. Garbage in is still garbage out, just with nicer typography.",
          "This is why we work back from the conversation. Get the booking right, prepare the host, shoot it properly, and the clips almost cut themselves because the raw material is genuinely good.",
        ],
      },
      {
        heading: "Finish the episode",
        paragraphs: [
          "A clip from an episode someone actually finished gets sent in DMs for a year. It carries the weight of the full conversation behind it. A clip from a thin episode gets a few views and dies by the weekend.",
          "So the metric we care about is not clip count. It is whether the episode is the kind of thing a serious person watches to the end and then forwards to one other serious person. Get that right and the clips do their job for free.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many clips should I get per episode?",
        a: "As many as the episode earns, typically three, six, or twelve, sized to where you're distributing. But the count is downstream of the conversation. A strong episode yields strong clips without forcing it.",
      },
      {
        q: "Do clips even drive the business?",
        a: "They drive discovery. The episode drives trust. Clips bring the right person to the door; the finished conversation is what makes them stay and remember who made it.",
      },
      {
        q: "Should I cut the episode shorter to hold attention?",
        a: "Length is not the problem; thin content is. A ninety-minute conversation worth finishing holds better than a padded thirty. Cut for density, not for a target runtime.",
      },
    ],
  },
  {
    slug: "cheapest-table",
    title: "The cheapest table you'll ever buy.",
    excerpt:
      "A flight to meet a CFO costs more than a quarter of production. A podcast is the only format where the person you want across from you says yes because the cost is ninety minutes, not a calendar.",
    readingTime: "3 min read",
    date: "Apr 2026",
    dateLong: "Apr 28, 2026",
    author: "Moksh",
    body: [
      {
        paragraphs: [
          "There is a person you want to be in a room with. A CFO, an investor, a founder two stages ahead of you. Getting thirty minutes of their real attention through the usual channels is expensive and slow. A podcast is the cheapest table you will ever buy to sit across from them.",
        ],
      },
      {
        heading: "The math nobody runs",
        paragraphs: [
          "Flying to a conference to maybe catch fifteen minutes with the person you want costs more than a quarter of a production budget, and the odds are poor. A cold introduction takes months and a favour you may not have. A podcast invitation flips the dynamic entirely.",
          "You are not asking for their time as a buyer. You are offering them a platform and a serious conversation. That is a far easier yes, and it puts you on equal footing in the room.",
        ],
      },
      {
        heading: "Ninety minutes is the currency",
        paragraphs: [
          "The reason this works is that the cost to your guest is ninety minutes, not a slot on a sales calendar. People who would never take a pitch will happily sit for a good conversation about their own work. It flatters the right way, and it gives them something to share afterwards.",
          "By the end of that ninety minutes you have done something no sales call achieves: you have spent real time thinking alongside the person you wanted to meet, on the record, in a way they are proud to circulate.",
        ],
      },
      {
        heading: "Why the format does the convincing",
        paragraphs: [
          "A podcast is the only format where the person you want across from you says yes because of what it is, not because of who you are yet. That is rare, and it is worth far more than the production it costs to run.",
          "Buy the table. Fill the seat with the person who decides what happens to your company. The rest is just making sure the room looks like one worth sitting in.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will the guest I want actually come on a small show?",
        a: "More often than you'd expect. Serious people respond to a serious invitation and a sharp brief, not to subscriber counts. The format gives them a reason to say yes that a sales call never can.",
      },
      {
        q: "Isn't a podcast a lot of effort for one meeting?",
        a: "It's one meeting that also becomes an episode, a set of clips, and a relationship on the record. Compared to the cost and odds of catching that person any other way, the effort is low for what it returns.",
      },
      {
        q: "What makes someone say yes to a podcast over a sales call?",
        a: "On a sales call they're the buyer being sold to. On a podcast they're the expert being listened to. The second is a far more comfortable yes, and it puts you in the room as a peer.",
      },
    ],
  },
];

// Studio team. Remaining headshots are pending; those cards render an initials
// plate until the photos land. Tejas's LinkedIn URL is still to come.
export const team: {
  name: string;
  role: string;
  line: string;
  linkedin: string | null;
  headshot?: string;
}[] = [
  {
    name: "Moksh Angara",
    role: "Founder & CEO",
    line: "Runs strategy and the room. The first call and the last cut.",
    linkedin: "https://www.linkedin.com/in/angaramoksh/",
    headshot: "/moksh.jpg",
  },
  {
    name: "Manav Bendi",
    role: "Production Head",
    line: "Owns what happens on set, from the cameras to the calm.",
    linkedin: "https://www.linkedin.com/in/manavbendi/",
    headshot: "/manav.jpg",
  },
  {
    name: "Hatim Motiwala",
    role: "Post-Production Head",
    line: "Turns a day of footage into an hour worth watching twice.",
    linkedin: "https://www.linkedin.com/in/motiwala-hatim/",
    headshot: "/hatim.jpg",
  },
  {
    name: "Rudra Jaiswal",
    role: "CMO",
    line: "Makes sure the right people find the work.",
    linkedin: "https://www.linkedin.com/in/rudra-jaiswal-878100241/",
  },
  {
    name: "Tejas Bainalwar",
    role: "Lead Designer",
    line: "The brand systems behind every show we build.",
    linkedin: null,
  },
];

// The studio's four convictions, shown on /about. Each is its own block.
export const beliefs: string[] = [
  "A podcast isn't content. It's the cheapest way to sit across from the people who decide what happens to your company.",
  "The guest matters more than the views. One CFO who finished the episode beats ten thousand who watched a clip.",
  "Production should disappear. If the audience notices the edit before the idea, we did it wrong.",
  "Show the work, don't claim it. The show belongs to the client. We're the studio behind it, not in front of it.",
];

export const contact = {
  phone: "+91 99204 21611",
  phoneHref: "+919920421611",
  email: "hey@temporaryperspective.com",
  location: "Mumbai, India",
};

export type QA = { q: string; a: string };

// Six surfaced on the home page; the full set lives on /faq.
export const homeFaqs: QA[] = [
  {
    q: "We've never run a podcast. Can you handle the whole thing?",
    a: "Yes, from format and positioning to shoot, edit, color, clips, and publishing. You show up and talk; we handle everything before and after.",
  },
  {
    q: "How much of my time does this realistically take?",
    a: "Just the conversation. We handle prep, setup, direction on the day, and all post. Most founders are in and out in a half-day per shoot.",
  },
  {
    q: "How fast do I get my episodes back?",
    a: "Full production (multi-cam, color, clips) in 4 to 7 days; lighter work (events, testimonials) in 1 to 2 days.",
  },
  {
    q: "Is this going to get me views, or actual business?",
    a: "We build shows around positioning, not vanity. The full episode builds authority; the clips put you in front of founders, operators, and LPs where they already scroll.",
  },
  {
    q: "What do you cost?",
    a: "Every show is scoped differently, so we quote per project, no one-size box. Tell us what you're building and we'll come back with a clear, itemized number.",
  },
  {
    q: "What makes you different from a cheaper studio or a freelance editor?",
    a: "We already understand your category (no time wasted explaining your business), and we own the full pipeline: strategy, shoot, edit, clips, publishing. A freelancer cuts a video; we build a show that compounds.",
  },
  {
    q: "Do you understand SaaS, fintech, or VC?",
    a: "You won't have to explain. Our editors and producers speak the language: cap tables, PLG, fraud rails, fund economics. We've worked inside these categories long enough that we already know what matters to your audience.",
  },
  {
    q: "Who have you worked with?",
    a: "Bharatvaarta, Bureau, Qapita, Seclore, and a growing set of SaaS and fintech founders across India and Singapore. The full archive is at /portfolio.",
  },
];

export const faqs: QA[] = [
  {
    q: "Do you actually understand SaaS, fintech, and VC — or will I have to explain my business?",
    a: "You won't. Our editors and producers already speak the language — cap tables, product-led growth, fraud rails, fund economics. That's the whole point of TP. We make the conversations founders only get to have once actually land.",
  },
  {
    q: "We've never run a podcast. Can you handle the whole thing?",
    a: "Yes — from format and positioning to shoot, edit, color, clips, and publishing. You show up and talk. We handle everything that happens before and after.",
  },
  {
    q: "How much of my time does this realistically take?",
    a: "Your time goes into one thing: the conversation with your guest. We handle prep, setup, direction on the day, and all post-production. Most founders are in and out in a half-day per shoot.",
  },
  {
    q: "How fast do I get my episodes back?",
    a: "Full production — multi-cam, color, clips — lands in 4–7 days. Lighter work like event coverage or testimonials comes back in 1–2 days.",
  },
  {
    q: "Is this going to get me views, or actual business?",
    a: "We build shows around positioning, not vanity. The full episode builds authority; the short-form clips put you in front of the exact people you want — founders, operators, LPs — where they already scroll.",
  },
  {
    q: "Where can you shoot?",
    a: "Mumbai, Bangalore, Chennai, Hyderabad, Delhi, and Singapore. Your office, our studio, or a space we book for the day — whatever the shoot needs.",
  },
  {
    q: "Can I start with just one episode, or do I have to commit?",
    a: "Both work. Some clients run a one-off; others go monthly so the show compounds. We'll tell you honestly which makes sense for what you're trying to build.",
  },
  {
    q: "What do you cost?",
    a: "Every show is scoped differently, so we quote per project rather than sell a one-size box. Tell us what you're trying to build and we'll come back with a clear, itemized number — no vague retainers.",
  },
  {
    q: "Do you just hand me footage, or handle the clips and posting too?",
    a: "We go past delivery. Short-form clips for social, show strategy, and YouTube SEO and publishing are all part of what we do. The episode is the start, not the finish.",
  },
  {
    q: "Who have you worked with?",
    a: "Qapita, Bureau, Seclore, Bharatvaarta and a growing list of SaaS and fintech operators across India and Singapore.",
  },
  {
    q: "What if I'm not happy with the cut?",
    a: "You see the work before anything goes live. We build in revision rounds so the final episode sounds like you — not a template.",
  },
  {
    q: "Will the people I'm talking to now actually be on my shoot, or do you send juniors?",
    a: "The team you meet is the team that shows up. Our DOP and lead editor are co-founders — your project doesn't get passed down a chain to whoever's free that week.",
  },
  {
    q: "My numbers and roadmap are sensitive. How do you handle confidential material?",
    a: "NDA before anything sensitive gets discussed, and nothing goes public without your explicit sign-off. Your unreleased metrics stay yours until you decide otherwise.",
  },
  {
    q: "I don't even know what I'd talk about. Can you help with that?",
    a: "That's where we start. Before any camera rolls, we shape the angle, the episode topics, and the through-line — so the show actually says something instead of being another founder talking into a mic.",
  },
  {
    q: "What makes you different from a cheaper studio or a freelance editor?",
    a: "Two things. We already understand your category, so you're not burning hours explaining your business. And we own the full pipeline — strategy, shoot, edit, clips, publishing. A freelancer cuts a video. We build a show that compounds.",
  },
  {
    q: "How do we actually get started?",
    a: "One call. We figure out what you're building, scope it, and send a clear plan and number. After that, it's a shoot date.",
  },
];

export const CAL_LINK = "https://cal.com/temporary-perspective/30min";
