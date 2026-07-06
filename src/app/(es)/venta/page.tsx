import type { Metadata } from "next";
import { SaleView } from "@/views/sale";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Venta de golf carts en Punta Cana — nuevos y usados",
  description:
    "Compra golf carts en Punta Cana: nuevos importados y seminuevos de nuestra flota, con entrega, garantía y mantenimiento local. Consulta precio de compra por WhatsApp.",
  alternates: {
    canonical: "/venta/",
    ...hreflang("/venta/", "/en/golf-carts-for-sale/"),
  },
};

export default function VentaPage() {
  return <SaleView locale="es" />;
}
