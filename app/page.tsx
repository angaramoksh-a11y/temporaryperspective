import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeBackdrop from "@/components/HomeBackdrop";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import VirtualCallout from "@/components/VirtualCallout";
import Newsletter from "@/components/Newsletter";
import CommonQuestions from "@/components/CommonQuestions";
import ClosingCTA from "@/components/ClosingCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <HomeBackdrop />
      <main>
        <Hero />
        <SelectedWork />
        <Process />
        <CaseStudies />
        <VirtualCallout />
        <Newsletter />
        <CommonQuestions />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
