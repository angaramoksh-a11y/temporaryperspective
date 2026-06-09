import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import VirtualCallout from "@/components/VirtualCallout";
import Newsletter from "@/components/Newsletter";
import CommonQuestions from "@/components/CommonQuestions";
import ClosingCTA from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Temporary Perspective — B2B podcast studio, Mumbai",
  description:
    "A B2B podcast production studio in Mumbai. 100+ episodes shipped for India's hardest-to-book guests. Brand, shoot, edit, growth, end to end.",
  openGraph: {
    title: "Temporary Perspective — B2B podcast studio, Mumbai",
    description:
      "A B2B podcast production studio in Mumbai. 100+ episodes shipped for India's hardest-to-book guests. Brand, shoot, edit, growth, end to end.",
    url: "https://temporaryperspective.com",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <VirtualCallout />
        <Process />
        <CaseStudies />
        <CommonQuestions />
        <Newsletter />
        <ClosingCTA
          divider={false}
          subline="One call to see if we're the right studio for you."
        />
      </main>
      <Footer />
    </>
  );
}
