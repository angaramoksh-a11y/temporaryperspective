import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import ClosingCTA from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "The process — Temporary Perspective",
  description:
    "How a show comes together: branding, guest prep, production, post, and growth. Per episode, end to end.",
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          title="The process."
          subcopy="From a cold start to a show that ships every week. Five phases, scoped to what you actually need."
          size="md"
          minH="short"
        />
        <Process embedded />
        <ClosingCTA subline="Tell us where your show is. We'll scope the rest." />
      </main>
      <Footer />
    </>
  );
}
