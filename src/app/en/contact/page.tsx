import type { Metadata } from "next";
import { ContactView } from "@/views/contact";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Message us on WhatsApp at +1 809 839 8515 (24/7), email info@krexpert.com or visit us in Bávaro. Fast replies in English and Spanish.',
  alternates: { canonical: '/en/contact/', ...hreflang('/contacto/', '/en/contact/') },
};

export default function Page() {
  return <ContactView locale='en' />;
}
