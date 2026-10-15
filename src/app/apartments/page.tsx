import type { Metadata } from "next";
import ApartmentsClient from "./ApartmentsClient";
import ClosingCta from "@/components/sections/ClosingCta";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Apartments — ERA Residence Estepona",
  description:
    "All 25 residences at Era Residence: ground floor with basement, ground floor apartments and duplex penthouses between 75 and 202 m² on the New Golden Mile, Estepona.",
  alternates: { canonical: "/apartments" },
};

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  return (
    <>
      <ApartmentsClient initialType={type} />
      <ClosingCta />
      <Footer />
    </>
  );
}
