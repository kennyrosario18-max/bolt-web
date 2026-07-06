import type { Metadata } from "next";
import { ConciergeForm } from "@/views/concierge-form";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Reserva concierge — aliados BOLT",
  description:
    "Formulario para aliados y concierges: reserva los golf carts de tu huésped (villa, fechas y nº de carritos) en un minuto. Te confirmamos por WhatsApp.",
  alternates: {
    canonical: "/reserva-concierge/",
    ...hreflang("/reserva-concierge/", "/en/concierge-booking/"),
  },
};

export default function ReservaConciergePage() {
  return <ConciergeForm locale="es" />;
}
