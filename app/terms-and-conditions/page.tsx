import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and conditions — Temporary Perspective",
  description:
    "The terms that govern your use of the Temporary Perspective website and the work we do together.",
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paras: [
      "Temporary Perspective is a podcast production studio based in Mumbai. We run shows end-to-end: brand, guest prep, shoot, edit, and growth. These terms apply to anyone using this site or working with us.",
    ],
  },
  {
    heading: "What we do",
    paras: [
      "Every show is scoped differently. Cinematography, editing, color grading, creative direction, social cuts, channel growth: we build the engagement around what your show actually needs. The exact deliverables, timeline, and pricing for your project will be written down in a project agreement before we start.",
    ],
  },
  {
    heading: "What we need from you",
    paras: [
      "Honest communication and timely feedback. Most production delays come from slow approvals or missing assets on the client side, not from us. If you're slow, the show is slow.",
    ],
  },
  {
    heading: "Timelines",
    paras: [
      "Timelines we share are estimates. We hit them when we can. Scope changes, extra feedback rounds, and creative complexity can shift delivery by roughly ±20%. We'll flag delays as soon as we see them: we don't sit on bad news.",
    ],
  },
  {
    heading: "Payments",
    paras: ["Unless your project agreement says otherwise:"],
    bullets: [
      "50% of the project cost is due upfront to confirm the booking.",
      "The remaining 50% is due on final delivery.",
      "Once work has started, payments are non-refundable.",
      "Late payments may carry additional fees.",
    ],
  },
  {
    heading: "Revisions",
    paras: [
      "Most projects include up to two rounds of revisions at each major stage: scripting, editing, color grading. More than that can be quoted separately. Clear, batched feedback gets you better revisions than scattered notes.",
    ],
  },
  {
    heading: "Ownership and usage",
    paras: [
      "Final deliverables are licensed for your use as agreed in the project agreement.",
      "We retain the unconditional right to use, display, and distribute any work we produce, in whole or in part, across our portfolio, social channels, case studies, and promotional material, at any time, regardless of the project's status, your agreement terms, or any dispute. This right is non-revocable and survives the end of our engagement.",
      "Raw files (project timelines, full footage, editable source files) are not included unless your agreement specifically covers them.",
    ],
  },
  {
    heading: "Confidentiality",
    paras: [
      "Anything sensitive you share with us during a project stays between us. We don't disclose it unless the law requires us to.",
    ],
  },
  {
    heading: "Cancellation",
    paras: [
      "Once a shoot date is locked, the advance is non-refundable. If you cancel the booking for any reason, that amount is gone.",
      "If you cancel within 48 hours of a confirmed shoot, the full project sum becomes payable. No exceptions. The entire amount is due regardless of how much work has or hasn't been completed at that point.",
      "If we have to cancel (rare, but possible), we'll issue a fair, proportionate refund for unfinished work.",
    ],
  },
  {
    heading: "Things outside our control",
    paras: [
      "Natural disasters, power outages, equipment failure, third-party platform disruptions: if something genuinely unforeseen affects your timeline, we'll do our best to recover, but we can't be held responsible for it.",
    ],
  },
  {
    heading: "Updates to these terms",
    paras: [
      "We may revise these terms. The latest version always lives here, with the updated date at the top. Continuing to use the site or our services means you accept the current version.",
    ],
  },
  {
    heading: "Governing law",
    paras: [
      "These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in Mumbai, Maharashtra.",
    ],
  },
  {
    heading: "Get in touch",
    paras: ["Questions about these terms?"],
    bullets: ["Email: hey@temporaryperspective.com", "Phone: +91 99204 21611"],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions."
      lastUpdated="6 June 2026"
      sections={sections}
    />
  );
}
