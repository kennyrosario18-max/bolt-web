import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { FleetView } from "@/views/fleet";

export const metadata: Metadata = {
  title: "Flota — golf carts de 4 y 6 plazas",
  description:
    "Catálogo completo de golf carts BOLT en Punta Cana: líneas ECO, Club Car y Zycar, de 4 y 6 plazas, desde US$50/día con entrega en tu villa.",
  alternates: { canonical: "/flota/", ...hreflang("/flota/", "/en/fleet/") },
};

export default function FleetPage() {
  return <FleetView locale="es" />;
}
