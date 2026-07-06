import type { Metadata } from "next";
import { TermsView } from "@/views/terms";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms for BOLT golf cart rentals: booking and payments, driver requirements, permitted use, liability, insurance and governing law in the Dominican Republic.',
  alternates: { canonical: '/en/terms/', ...hreflang('/terminos/', '/en/terms/') },
};

export default function Page() {
  return <TermsView locale='en' />;
}
