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
export function embed(id: string, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
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

export const phases = [
  {
    id: "branding",
    title: "Branding",
    label: "Foundational",
    body:
      "Logo, palette, typography, and the show's full visual system. Built from scratch, only if you're starting cold.",
  },
  {
    id: "guest-prep",
    title: "Guest Prep",
    label: "Per episode",
    body:
      "Briefs and questionnaires per guest. The host walks in ready; the guest knows the format.",
  },
  {
    id: "production",
    title: "Production",
    label: "Per episode",
    body:
      "The shoot, studio, on location, or remote across cities. Multi-camera, properly lit and miked.",
  },
  {
    id: "post",
    title: "Post",
    label: "Per episode",
    body:
      "Master edit with hooks and b-roll, colour grade tuned per conversation, plus clips cut for distribution.",
  },
  {
    id: "growth",
    title: "Growth",
    label: "Per episode",
    body: "Publishing and channel management, ongoing after the show ships.",
  },
];

export const newsletterPosts = [
  {
    slug: "guest-list-is-your-ceiling",
    title: "Your guest list is your show's ceiling.",
    excerpt:
      "The format matters less than people think. What decides whether your show works is who agrees to sit down. Spend the time on the guest list and most production problems quietly solve themselves.",
    readingTime: "4 min read",
    date: "May 2026",
  },
  {
    slug: "stop-chasing-clips",
    title: "Stop chasing clips, start finishing episodes.",
    excerpt:
      "Every founder asks about clip counts first. It's the wrong end of the funnel. A clip from a thin episode dies in a day. A clip from an episode someone finished gets sent in DMs for a year.",
    readingTime: "5 min read",
    date: "May 2026",
  },
  {
    slug: "cheapest-table",
    title: "The cheapest table you'll ever buy.",
    excerpt:
      "A flight to meet a CFO costs more than a quarter of production. A podcast is the only format where the person you want across from you says yes because the cost is ninety minutes, not a calendar.",
    readingTime: "3 min read",
    date: "Apr 2026",
  },
];

export const CAL_LINK = "https://cal.com/temporary-perspective/30min";
