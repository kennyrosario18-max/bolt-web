import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getZoneLanding } from "@/content/zones-landing";
import { hreflang } from "@/lib/i18n";
import { ogMeta } from "@/lib/og";
import { ZoneLandingView, generateZoneParams } from "@/views/zone-landing";

interface Props {
  params: Promise<{ zona: string }>;
}

export const generateStaticParams = generateZoneParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zona } = await params;
  const landing = getZoneLanding(zona);
  if (!landing) return {};
  return {
    title: landing.metaTitleEn,
    description: landing.metaDescriptionEn,
    alternates: {
      canonical: `/en/rentals/${zona}/`,
      ...hreflang(`/alquiler/${zona}/`, `/en/rentals/${zona}/`),
    },
    ...ogMeta(`zone-${zona}`),
  };
}

export default async function ZonePageEn({ params }: Props) {
  const { zona } = await params;
  const landing = getZoneLanding(zona);
  if (!landing) notFound();
  return <ZoneLandingView landing={landing} locale="en" />;
}
