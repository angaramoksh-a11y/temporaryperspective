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
