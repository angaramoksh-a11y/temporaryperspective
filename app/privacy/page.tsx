import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy — Temporary Perspective",
  description:
    "How Temporary Perspective collects, uses, and protects your information, under the DPDP Act 2023 and GDPR.",
};

const sections: LegalSection[] = [
  {
    heading: "What we collect",
    bullets: [
      "Your name, email, and phone number, when you fill out a contact form or subscribe to the newsletter.",
      "Anything you share with us voluntarily over email, call, or message.",
      "Basic technical data (IP address, browser type, device info) through cookies and analytics tools.",
    ],
  },
  {
    heading: "How we use it",
    bullets: [
      "To respond to you and keep a conversation going.",
      "To deliver and improve the services you've engaged us for.",
      "To send occasional updates, only if you've opted in.",
      "To understand how the site is used, so we can make it better.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paras: [
      "We may use cookies and third-party analytics tools (like Google Analytics or Meta Pixel) to see how people interact with the site. This helps us improve. You can disable cookies in your browser settings if you'd rather not be tracked.",
    ],
  },
  {
    heading: "Who we share it with",
    paras: [
      "We don't sell, trade, or rent your data. Ever.",
      "We may share information with trusted service providers who help us run the business, only when necessary, and only under confidentiality agreements (for example, our calendar booking tool, email service, or form handler).",
    ],
  },
  {
    heading: "How we keep it safe",
    paras: [
      "We use reasonable security measures: encryption, access controls, regular monitoring. No online system is bulletproof, but we treat your data the way we'd want ours treated.",
    ],
  },
  {
    heading: "Your rights",
    paras: [
      "Under India's Digital Personal Data Protection Act 2023, and the EU's GDPR where it applies, you can ask us to:",
    ],
    bullets: [
      "Show you what data we have on you.",
      "Update or delete it.",
      "Stop sending you anything.",
      "Explain how your data is being used.",
    ],
  },
  {
    heading: "External links",
    paras: [
      "The site links out to YouTube, Instagram, Vimeo, X, and other platforms. We're not responsible for how those platforms handle your data, so check their policies.",
    ],
  },
  {
    heading: "Updates to this policy",
    paras: [
      "We may update this policy from time to time. The latest version always lives here, with the updated date at the top.",
    ],
  },
  {
    heading: "Get in touch",
    paras: ["Questions about your privacy?"],
    bullets: ["Email: hey@temporaryperspective.com", "Phone: +91 99204 21611"],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy." lastUpdated="6 June 2026" sections={sections} />
  );
}
