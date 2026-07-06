import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODELS, getModel } from "@/content/models";
import { priceFrom } from "@/content/site";
import { hreflang } from "@/lib/i18n";
import { ogMeta } from "@/lib/og";
import { ModelDetailView } from "@/views/model-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return MODELS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const model = getModel(id);
  if (!model) return {};
  return {
    title: `${model.name} rental in Punta Cana — ${model.pax} seats`,
    description: `Rent the ${model.name} (${model.pax} seats) in Punta Cana from US$${priceFrom(model.pax)}/day. Villa delivery, insurance and 24/7 support — same-day confirmation.`,
    alternates: {
      canonical: `/en/fleet/${model.id}/`,
      ...hreflang(`/flota/${model.id}/`, `/en/fleet/${model.id}/`),
    },
    ...ogMeta(`model-${model.id}`),
  };
}

export default async function ModelPageEn({ params }: Props) {
  const { id } = await params;
  const model = getModel(id);
  if (!model) notFound();
  return <ModelDetailView model={model} locale="en" />;
}
