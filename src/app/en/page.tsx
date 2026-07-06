import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { HomeView } from "@/views/home";

export const metadata: Metadata = {
  alternates: { canonical: "/en/", ...hreflang("/", "/en/") },
};

export default function HomePageEn() {
  return <HomeView locale="en" />;
}
