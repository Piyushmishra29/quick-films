import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import WorkReel from "@/components/home/WorkReel";
import ShortForm from "@/components/home/ShortForm";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import SelectedFrames from "@/components/home/SelectedFrames";
import StatementCTA from "@/components/home/StatementCTA";
import { SITE_URL } from "./layout";

const SITE_DESCRIPTION =
  "Quick Films is a video editing and film studio in Bengaluru, India — narrative films, brand films, short-form content and digital ads, cut and graded end to end.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Quick Films",
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      logo: `${SITE_URL}/hero-desktop.jpg`,
      areaServed: "IN",
      founders: [
        { "@type": "Person", name: "Pranay" },
        { "@type": "Person", name: "Hema" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Quick Films",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
