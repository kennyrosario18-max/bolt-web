import type { Metadata } from "next";
import { AboutView } from "@/views/about";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'About us',
  description: "BOLT's mission, vision and values: golf cart rental and sales in Puntacana Resort & Club, Cap Cana and Bávaro, operated by KR Experts and Management SRL.",
  alternates: { canonical: '/en/about/', ...hreflang('/nosotros/', '/en/about/') },
};

export default function Page() {
  return <AboutView locale='en' />;
}
