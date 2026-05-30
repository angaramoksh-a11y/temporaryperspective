import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { contact } from "@/lib/work";

export const metadata: Metadata = {
  title: "Terms and conditions — Temporary Perspective",
  description:
    "The terms that govern your use of the Temporary Perspective website and the work we do together.",
};

const sections: LegalSection[] = [
  {
    heading: "Agreement",
    paras: [
      "These terms govern your use of the Temporary Perspective website and the relationship between you and Temporary Perspective LLP. By using this site or engaging us, you accept them. If you do not, please do not use the site.",
    ],
  },
  {
    heading: "The studio and the show",
    paras: [
      "We build the studio; the show stays yours. The editorial direction, the guests, and the conversation are owned and controlled by the client. We provide production: brand, shoot, edit, and growth, in whatever scope we agree on.",
    ],
  },
  {
    heading: "Scope of work",
    paras: [
      "The specific work we do for you, its timeline, and its price are set out in a separate proposal or statement of work, not on this site. Where those documents and these terms conflict, the signed proposal governs the engagement.",
    ],
  },
  {
    heading: "Fees and payment",
    paras: [
      "We do not publish rates. Fees are scoped per engagement and confirmed in writing before work begins. Unless agreed otherwise, invoices are due within the period stated on them, and work may pause if an invoice is significantly overdue.",
    ],
  },
  {
    heading: "Intellectual property",
    paras: [
      "On full payment, ownership of the final delivered episodes and assets passes to the client. We retain ownership of our underlying methods, templates, and project files, and the right to be credited as the studio behind the work unless we agree otherwise.",
    ],
  },
  {
    heading: "Showing our work",
    paras: [
      "We may reference completed work in our portfolio and marketing, including on this site and our social channels, unless you ask us in writing to keep an engagement private. We will always respect a confidentiality request.",
    ],
  },
  {
    heading: "Confidentiality",
    paras: [
      "Anything you share with us in confidence stays in confidence. We will not disclose your non-public business information to third parties except the service providers needed to deliver the work, and we expect the same discretion from you regarding our methods and pricing.",
    ],
  },
  {
    heading: "Your responsibilities",
    paras: [
      "Delivery depends on you too. You are responsible for booking guests, securing their consent to be recorded, approving cuts in good time, and giving us the access and materials we need. Delays on these can move timelines.",
    ],
  },
  {
    heading: "Liability",
    paras: [
      "We deliver our work with care, but to the extent the law allows, our total liability for any engagement is limited to the fees paid for that engagement. We are not liable for indirect or consequential losses, or for outcomes outside our control, such as platform performance or audience numbers.",
    ],
  },
  {
    heading: "Governing law",
    paras: [
      "These terms are governed by the laws of India, and any dispute falls under the exclusive jurisdiction of the courts of Mumbai, Maharashtra. We will always try to resolve things in conversation first.",
    ],
  },
  {
    heading: "Changes and contact",
    paras: [
      `We may update these terms as the studio grows; the date above reflects the current version. For any question about them, write to ${contact.email}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions."
      lastUpdated="May 2026"
      intro="The plain version: we build the studio, the show stays yours, and we scope every engagement in writing. The full terms are below."
      sections={sections}
    />
  );
}
