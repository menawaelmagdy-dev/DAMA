import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import IntroBand from "@/components/sections/IntroBand";
import Reasons from "@/components/sections/Reasons";
import Concept from "@/components/sections/Concept";
import MapSection from "@/components/sections/MapSection";
import Typologies from "@/components/sections/Typologies";
import RangeBand from "@/components/sections/RangeBand";
import Amenities from "@/components/sections/Amenities";
import Interiors from "@/components/sections/Interiors";
import Architecture from "@/components/sections/Architecture";
import Pillars from "@/components/sections/Pillars";
import ClosingCta from "@/components/sections/ClosingCta";
import Footer from "@/components/sections/Footer";
import { copy, site } from "@/lib/content";
import { asset } from "@/lib/era";

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Era Residence",
  description: copy.meta.description,
  image: asset.heroDay,
  telephone: "+34655408648",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Litoral",
    postalCode: "29680",
    addressLocality: "Estepona",
    addressRegion: "Málaga",
    addressCountry: "ES",
  },
  url: site.url,
  numberOfAccommodationUnits: 25,
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
      <Typologies />
      <RangeBand />
      <Amenities />
      <Interiors />
      <Architecture />
      <Pillars />
      <ClosingCta />
      <Footer />
    </>
  );
}
