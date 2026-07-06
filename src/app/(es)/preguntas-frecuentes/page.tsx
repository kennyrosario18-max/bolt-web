import type { Metadata } from "next";
import { FaqView } from "@/views/faq";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description: 'Respuestas claras sobre la renta de golf carts BOLT: qué incluye, requisitos, zonas de entrega, depósitos, cancelaciones, baterías y capacidad.',
  alternates: { canonical: '/preguntas-frecuentes/', ...hreflang('/preguntas-frecuentes/', '/en/faq/') },
};

export default function Page() {
  return <FaqView locale='es' />;
}
