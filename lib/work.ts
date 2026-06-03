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
export function embed(id: string, autoplay = false, chromeless = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
  }
  // chromeless = silent hover preview: no controls, captions, annotations,
  // fullscreen, or keyboard. Loops the clip. Just the footage playing.
  if (chromeless) {
    params.set("controls", "0");
    params.set("cc_load_policy", "0");
    params.set("iv_load_policy", "3");
    params.set("fs", "0");
    params.set("disablekb", "1");
    params.set("loop", "1");
    params.set("playlist", id); // loop requires playlist for a single video
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
];

// ── Unified work catalog ────────────────────────────────────────────────────
// The full body of work across sources, formats and orientations, for /work and
// /work/archive. Vimeo clips carry an `h` (horizontal) and/or `v` (vertical)
// cut, each an id + optional unlisted hash; long-form podcasts carry a YouTube
// id. Search tokenizes over client + format + desc, so no titles are needed.

export type Orientation = "horizontal" | "vertical";
export type VimeoClip = { id: string; hash?: string };

export type WorkItem = {
  client: string;
  format: string;
  source: "vimeo" | "youtube";
  orientation: Orientation;
  h?: VimeoClip; // horizontal cut (vimeo)
  v?: VimeoClip; // vertical cut (vimeo)
  yt?: string; // youtube id (long-form podcasts)
  desc?: string;
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

const vimeoItems: WorkItem[] = (
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

    // My Fin short-form (vertical)
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169859907" }, desc: "Outfits" },
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169860021" }, desc: "EMI" },
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169859962" }, desc: "90 days" },
    { client: "My Fin", format: "Short-form reel", source: "vimeo", orientation: "vertical", v: { id: "1169860087" }, desc: "Spent close to a decade" },

    // ORMH perfume product films
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169858512" }, desc: "Perfume, high-end product edit" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169857371" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169857410" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169857686" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169857461" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169856436" }, desc: "Perfume" },
    { client: "ORMH", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169859817" }, desc: "Perfume" },

    // Beena product films
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169860644" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169860819" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169860759" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169860937" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169860866" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169860464" } },
    { client: "Beena", format: "Product video", source: "vimeo", orientation: "horizontal", h: { id: "1169860692" } },
    { client: "Beena", format: "Commercial", source: "vimeo", orientation: "horizontal", h: { id: "1169858565" }, desc: "A young woman using the product" },

    { client: "Read Reels", format: "Commercial", source: "vimeo", orientation: "horizontal", h: { id: "1172800968" }, desc: "Quirky service-launch video with motion graphics" },
    { client: "BD Software", format: "Talking head", source: "vimeo", orientation: "horizontal", h: { id: "1197344755" }, desc: "Corporate talking head, shot outdoors at an event" },
  ] as WorkItem[]
).map((it) => ({ ...it, caseStudy: CASE_STUDY[it.client] }));

// Long-form podcasts (YouTube), reusing the existing library.
const podcastItems: WorkItem[] = workLibrary.map((e) => ({
  client: e.client,
  format: "Long-form podcast",
  source: "youtube",
  orientation: "horizontal",
  yt: e.id,
  desc: e.guest,
  caseStudy: e.caseStudy,
}));

export const workCatalog: WorkItem[] = [...podcastItems, ...vimeoItems];

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
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(src)}&width=640`,
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

export const caseStudyContent: Record<string, CaseContent> = {
  bharatvaarta: {
    producedWith: "Produced with Roshan Cariappa",
    tagline: "Politics · Policy · Culture",
    testimonialId: "ilqq-eyj80M",
    testimonialName: "Roshan Cariappa · Bharatvaarta",
    aboutShow: [
      "Bharatvaarta is a long-form show on Indian politics, policy, and culture. The longer, harder conversations, taken seriously. Guests have included former R&AW chief Vikram Sood, Saurabh Mukherjea, Manish Sabharwal, and Medha Bhaskaran.",
      "It isn't built for views. It's built for the people who want the full conversation, and it's stayed that way because that's how Roshan runs it. We're glad to still be on the project.",
    ],
    ourRole: [
      "We handle the production end to end. Brand and visual identity, the shoot, the master edit, the colour grade and lighting tuned to each conversation, clipping, and distribution. When the host needed to record on location, we brought the studio to him.",
      "The show, the guests, and the editorial direction are Roshan's. Our job is to make sure the production never gets in the way of the conversation, and that an hour worth watching looks like one.",
    ],
    showcase: [
      { id: "TomnFVq3Bt4", guest: "Vikram Sood", client: "Bharatvaarta" },
      { id: "W6odY9EG6Jk", guest: "Saurabh Mukherjea", client: "Bharatvaarta" },
      { id: "f1hRTb6MIZ8", guest: "Manish Sabharwal", client: "Bharatvaarta" },
      { id: "Ef5bn6AWxUQ", guest: "Amish Tripathi", client: "Bharatvaarta" },
      { id: "QTH0goRHdn0", guest: "Medha Bhaskaran", client: "Bharatvaarta" },
      { id: "SwF6KbsbITc", guest: "Ami Ganatra", client: "Bharatvaarta" },
      { id: "qpIIH89FepQ", guest: "Aabhas Maldahiyar", client: "Bharatvaarta" },
    ],
    related: [
      { client: "Bureau", tag: "Fintech · Fraud Prevention", href: "/case-studies/bureau" },
      { client: "Qapita", tag: "Founder stories · In production", href: "/case-studies/qapita" },
    ],
  },
};

// Bureau: bespoke, organised by production format rather than a single show.
export type FormatBlock = {
  heading: string;
  label: string;
  body: string;
  tiles: Episode[];
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
    },
    {
      heading: "Bureau Backyard",
      label: "Podcast series",
      body: "Bureau's ongoing series, podcast format. Long-form conversations with operators in the fraud-prevention space.",
      tiles: [{ id: "_RR2a1bh1T0", guest: "Ishaan", client: "Bureau" }],
    },
    {
      heading: "Testimonials",
      label: "Client work",
      body: "Client testimonial production for Bureau's customers.",
      tiles: [{ id: "KMZ_k4C8vxQ", guest: "Indmoney", client: "Bureau" }],
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
    author: "Moksh",
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
    name: "Angara Moksh",
    role: "CEO",
    line: "Runs strategy and the room. The first call and the last cut.",
    linkedin: "https://www.linkedin.com/in/angaramoksh/",
    headshot: "/moksh.jpg",
  },
  {
    name: "Manav",
    role: "Production Head",
    line: "Owns what happens on set, from the cameras to the calm.",
    linkedin: "https://www.linkedin.com/in/manavbendi/",
  },
  {
    name: "Hatim",
    role: "Post-Production Head",
    line: "Turns a day of footage into an hour worth watching twice.",
    linkedin: "https://www.linkedin.com/in/motiwala-hatim/",
  },
  {
    name: "Rudra",
    role: "CMO",
    line: "Makes sure the right people find the work.",
    linkedin: "https://www.linkedin.com/in/rudra-jaiswal-878100241/",
  },
  {
    name: "Tejas",
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
    q: "What does it cost?",
    a: "We don't send quotes. We learn what your show needs on the first call, then come back with a plan and pricing built around it, not a number pulled from a rate card.",
  },
  {
    q: "Do you only work with B2B companies?",
    a: "It's where we do our best work: founders, fintech, SaaS, the kind of show with a serious guest list. We've done other formats, but B2B is the focus.",
  },
  {
    q: "Can you shoot if my guest is in another city?",
    a: "Yes. We produce remotely: your city, the guest's, or split across both. The show looks the same wherever it's shot.",
  },
  {
    q: "Do you handle editing only, or full production?",
    a: "Either. Some clients take the full pipeline; others come to us only for the edit. We'll scope it to what you actually need.",
  },
  {
    q: "How long until my first episode is live?",
    a: "Depends on scope, but a typical first episode moves from shoot to published in a few weeks. We'll give you a real timeline on the call.",
  },
  {
    q: "Do you write the questions or book the guests?",
    a: "No. The guests and the conversation are yours. That's your relationship and your vision. We help with prep and structure, but the editorial call is always the host's.",
  },
];

export const faqs: QA[] = [
  {
    q: "What does a typical engagement look like?",
    a: "It starts with a call to understand the show you want. From there we scope the work, brand and shoot if you're starting cold, or pick up editing and distribution if you're already running. Most clients settle into a per-episode rhythm with us once the format is set.",
  },
  {
    q: "Do you only work with B2B companies?",
    a: "It's where we do our best work: founders, fintech, SaaS, the kind of show with a serious guest list. We've done other formats, but B2B is the focus.",
  },
  {
    q: "What do you need from me to start?",
    a: "A sense of who you want on the show and what you want it to do. We handle the rest of the production planning. If you have brand assets already, send them; if you don't, that's a phase we cover.",
  },
  {
    q: "Do you write the questions or book the guests?",
    a: "No. The guests and the conversation are yours. That's your relationship and your vision. We help with prep and structure, but the editorial call is always the host's.",
  },
  {
    q: "Can you shoot if my guest is in another city?",
    a: "Yes. We produce remotely: your city, the guest's, or split across both. The show looks the same wherever it's shot.",
  },
  {
    q: "Where are you based?",
    a: "Mumbai. We shoot in studio here, on location, and remotely across cities and countries.",
  },
  {
    q: "Do you handle editing only, or full production?",
    a: "Either. Some clients take the full pipeline; others come to us only for the edit. We'll scope it to what you actually need.",
  },
  {
    q: "How many clips do I get from an episode?",
    a: "As many as the show needs. Typically three, six, or twelve cuts per episode, sized to where you're distributing.",
  },
  {
    q: "Do you do the branding too?",
    a: "Yes, if you're starting from scratch. Logo, palette, typography, and the show's full visual system, built once at the start so every episode after stays consistent.",
  },
  {
    q: "How long until my first episode is live?",
    a: "Depends on scope, but a typical first episode moves from shoot to published in a few weeks. We'll give you a real timeline on the call.",
  },
  {
    q: "What does it cost?",
    a: "We don't send quotes. We learn what your show needs on the first call, then come back with a plan and pricing built around it, not a number pulled from a rate card.",
  },
  {
    q: "How do we start?",
    a: "Book a thirty-minute call. No pitch, no quote on the call. We listen first, then come back with a plan built for your show.",
  },
];

export const CAL_LINK = "https://cal.com/temporary-perspective/30min";
