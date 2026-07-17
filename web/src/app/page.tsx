import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import WorkReel from "@/components/home/WorkReel";
import ShortForm from "@/components/home/ShortForm";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import SelectedFrames from "@/components/home/SelectedFrames";
import StatementCTA from "@/components/home/StatementCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ShortForm />
      <SelectedFrames />
      <Stats />
      <WorkReel />
      <Services />
      <About />
      <StatementCTA />
    </>
  );
}
