import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import VirtualCallout from "@/components/VirtualCallout";
import Newsletter from "@/components/Newsletter";
import ClosingCTA from "@/components/ClosingCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <Process />
        <CaseStudies />
        <VirtualCallout />
        <Newsletter />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
