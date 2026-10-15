import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Speak with the DAMA Development sales team about Rawasin in New Sohag — availability, payment plans and site visits.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ unit?: string }>;
}) {
  const { unit } = await searchParams;

  return (
    <>
      <ContactClient unit={unit} />
      <Footer />
    </>
  );
}
