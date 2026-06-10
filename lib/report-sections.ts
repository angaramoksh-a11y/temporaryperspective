export const SECTIONS = [
  { id: "why-this-report", label: "Why This Report" },
  { id: "methodology", label: "Methodology" },
  { id: "key-findings", label: "Key Findings" },
  { id: "by-category", label: "By Category" },
  { id: "production-benchmarks", label: "Production Benchmarks" },
  { id: "audience-intelligence", label: "Audience Intelligence" },
  { id: "the-production-gap", label: "The Production Gap" },
  { id: "recommendations", label: "What Works" },
  { id: "about-this-report", label: "About This Report" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
