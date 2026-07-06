import type { Metadata } from "next";
import { SupportView } from "@/views/support";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Support & user manual',
  description: "The BOLT golf cart manual: step-by-step start-up, battery charging, usage rules, maximum speeds, emergencies and penalty reference.",
  alternates: { canonical: '/en/support/', ...hreflang('/soporte/', '/en/support/') },
};

export default function Page() {
  return <SupportView locale='en' />;
}
