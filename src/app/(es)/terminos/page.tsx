import type { Metadata } from "next";
import { TermsView } from "@/views/terms";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos de la renta de golf carts BOLT: reserva, requisitos del conductor, uso permitido, responsabilidad, seguro y ley aplicable en República Dominicana.',
  alternates: { canonical: '/terminos/', ...hreflang('/terminos/', '/en/terms/') },
};

export default function Page() {
  return <TermsView locale='es' />;
}
