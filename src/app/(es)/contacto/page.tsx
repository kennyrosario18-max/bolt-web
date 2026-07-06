import type { Metadata } from "next";
import { ContactView } from "@/views/contact";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbenos por WhatsApp al +1 809 839 8515 (24/7), por correo a info@krexpert.com o visítanos en Bávaro. Respondemos rápido, en español e inglés.',
  alternates: { canonical: '/contacto/', ...hreflang('/contacto/', '/en/contact/') },
};

export default function Page() {
  return <ContactView locale='es' />;
}
