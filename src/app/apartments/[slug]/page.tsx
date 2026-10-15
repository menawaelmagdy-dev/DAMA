import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apartments, getApartment } from "@/lib/era";
import { site } from "@/lib/content";
import UnitDetail from "./UnitDetail";
import Amenities from "@/components/sections/Amenities";
import ClosingCta from "@/components/sections/ClosingCta";
import Footer from "@/components/sections/Footer";

export function generateStaticParams() {
  return apartments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const unit = getApartment(slug);
  if (!unit) return { title: "Apartment not found" };

  const title = `Apartment №${unit.no} — ERA Residence Estepona`;
  const description = `${unit.beds} bedroom residence of ${unit.interior} m² with a ${unit.terrace} m² terrace${
    unit.garden ? ` and ${unit.garden} m² garden` : ""
  } at Era Residence, New Golden Mile, Estepona. Completion ${unit.completion}.`;

  return {
    title,
    description,
    alternates: { canonical: `/apartments/${unit.slug}` },
    openGraph: { title, description, images: [unit.image], url: `${site.url}/apartments/${unit.slug}` },
  };
}

export default async function ApartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getApartment(slug);
  if (!unit) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: `Era Residence №${unit.no}`,
    numberOfRooms: unit.beds,
    floorSize: { "@type": "QuantitativeValue", value: unit.interior, unitCode: "MTK" },
    image: unit.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Estepona",
      addressRegion: "Málaga",
      addressCountry: "ES",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnitDetail unit={unit} />
      <Amenities />
      <ClosingCta />
      <Footer />
    </>
  );
}
