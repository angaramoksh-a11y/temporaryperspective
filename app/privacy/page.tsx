import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { contact } from "@/lib/work";

export const metadata: Metadata = {
  title: "Privacy — Temporary Perspective",
  description:
    "How Temporary Perspective collects, uses, and protects your information, under the DPDP Act 2023 and GDPR.",
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paras: [
      "Temporary Perspective LLP is a podcast production studio based in Mumbai, India. This policy explains what information we collect when you visit this site or get in touch, how we use it, and the rights you have over it.",
      "It applies to this website and to the enquiries you send us. It does not cover the separate platforms where our clients publish their shows, each of which has its own policy.",
    ],
  },
  {
    heading: "What we collect",
    paras: [
      "We keep data collection to what a small studio actually needs to talk to you and run this site.",
    ],
    bullets: [
      "Contact details you give us: your name, email, company, and anything you write when you book a call or send an enquiry.",
      "Basic usage data: pages visited and rough, aggregated analytics. We do not build advertising profiles.",
      "Technical data your browser sends automatically, such as device type and approximate region.",
    ],
  },
  {
    heading: "How we use it",
    paras: [
      "We use your information to reply to you, to plan and deliver work if we end up collaborating, and to understand which parts of this site are useful. We do not sell your data, and we do not share it except with the service providers listed below who help us operate.",
    ],
  },
  {
    heading: "Third-party services",
    paras: [
      "A few tools process limited data on our behalf. Each is bound by its own privacy terms.",
    ],
    bullets: [
      "Cal.com handles call scheduling. When you book, it processes your name, email, and chosen time.",
      "Formspree handles enquiry forms, passing the message you send through to us by email.",
      "Privacy-respecting analytics give us aggregate traffic numbers without tracking you across the web.",
    ],
  },
  {
    heading: "Your rights",
    paras: [
      "Under India's Digital Personal Data Protection Act, 2023, and the EU General Data Protection Regulation where it applies, you can ask us to show you the data we hold about you, correct it, or delete it. You can also withdraw consent for us to contact you at any time.",
      "We keep enquiry data only as long as we need it to respond and, if we work together, to keep our records straight. To make any of these requests, email us and we will act on it promptly.",
    ],
  },
  {
    heading: "Contact",
    paras: [
      `For anything about this policy or your data, write to ${contact.email}. We read every message ourselves.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy."
      lastUpdated="May 2026"
      intro="We collect as little as we can, use it only to talk to you and run the studio, and never sell it. The details are below."
      sections={sections}
    />
  );
}
