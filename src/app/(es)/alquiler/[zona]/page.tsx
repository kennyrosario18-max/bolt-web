import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getZoneLanding } from "@/content/zones-landing";
import { hreflang } from "@/lib/i18n";
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
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: {
      canonical: `/alquiler/${zona}/`,
      ...hreflang(`/alquiler/${zona}/`, `/en/rentals/${zona}/`),
    },
  };
}

export default async function ZonePage({ params }: Props) {
  const { zona } = await params;
  const landing = getZoneLanding(zona);
  if (!landing) notFound();
  return <ZoneLandingView landing={landing} locale="es" />;
}
