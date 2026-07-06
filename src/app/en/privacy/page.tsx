import type { Metadata } from "next";
import { PrivacyView } from "@/views/privacy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How BOLT handles your personal data under Dominican Law 172-13: what we collect with your request, how it is used, your rights and how to exercise them.',
  alternates: { canonical: '/en/privacy/', ...hreflang('/privacidad/', '/en/privacy/') },
};

export default function Page() {
  return <PrivacyView locale='en' />;
}
