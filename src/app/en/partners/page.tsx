import type { Metadata } from "next";
import { PartnersView } from "@/views/partners";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "BOLT Partner Program — golf carts for villas & agencies",
  description:
    "Preferred partner rate all year, monthly e-CF invoicing with no per-booking deposit, priority availability and per-villa reporting. Join the BOLT Partner Program in Punta Cana.",
  alternates: { canonical: "/en/partners/", ...hreflang("/aliados/", "/en/partners/") },
};

export default function PartnersPage() {
  return <PartnersView locale="en" />;
}
