import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import ClosingCta from "@/components/sections/ClosingCta";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact — ERA Residence",
  description:
    "Contact the Era Residence sales office on the New Golden Mile, Estepona. Visit us daily 09:00 – 21:00 on Avenida Litoral or book a call.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactClient />
      <ClosingCta />
      <Footer />
    </>
  );
}
