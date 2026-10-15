import type { Metadata } from "next";
import ApartmentsClient from "./ApartmentsClient";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Available units",
  description:
    "Browse available residences at Rawasin — ground floor with garden, typical residences, duplexes and penthouses, plus commercial and clinic units in New Sohag.",
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
      <Footer />
    </>
  );
}
