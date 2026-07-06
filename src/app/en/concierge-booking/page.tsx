import type { Metadata } from "next";
import { ConciergeForm } from "@/views/concierge-form";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Concierge booking — BOLT partners",
  description:
    "Form for partners and concierges: book your guest's golf carts (villa, dates and number of carts) in a minute. We confirm on WhatsApp.",
  alternates: {
    canonical: "/en/concierge-booking/",
    ...hreflang("/reserva-concierge/", "/en/concierge-booking/"),
  },
};

export default function ConciergeBookingPage() {
  return <ConciergeForm locale="en" />;
}
