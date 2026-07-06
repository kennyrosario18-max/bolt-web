import type { Metadata } from "next";
import { AboutView } from "@/views/about";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Nosotros — quiénes somos',
  description: 'Misión, visión y valores de BOLT: renta y venta de golf carts en Puntacana Resort & Club, Cap Cana y Bávaro, operada por KR Experts and Management SRL.',
  alternates: { canonical: '/nosotros/', ...hreflang('/nosotros/', '/en/about/') },
};

export default function Page() {
  return <AboutView locale='es' />;
}
