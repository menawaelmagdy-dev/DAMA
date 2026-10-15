import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import IntroBand from "@/components/sections/IntroBand";
import Reasons from "@/components/sections/Reasons";
import Concept from "@/components/sections/Concept";
import MapSection from "@/components/sections/MapSection";
import UnitTypes from "@/components/sections/UnitTypes";
import Amenities from "@/components/sections/Amenities";
import Interiors from "@/components/sections/Interiors";
import Architecture from "@/components/sections/Architecture";
import SpaceCards from "@/components/sections/SpaceCards";
import CtaBlock from "@/components/sections/CtaBlock";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Rawasin — A place to return to",
  description:
    "Discover Rawasin by DAMA Development: six residential buildings, four homes per floor, 130–240 m² residences with gardens, terraces and private roof solariums in New Sohag.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Rawasin — DAMA Development",
  description:
    "A boutique gated community of 25 residences in New Sohag, Egypt, designed by Dar Arafa Architecture.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Sohag",
    addressRegion: "Sohag",
    addressCountry: "EG",
  },
  telephone: "+20 100 000 0000",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <IntroBand />
      <Reasons />
      <Concept />
      <MapSection />
      <UnitTypes />
      <Amenities />
      <Interiors />
      <Architecture />
      <SpaceCards />
      <CtaBlock />
      <Footer />
    </>
  );
}
