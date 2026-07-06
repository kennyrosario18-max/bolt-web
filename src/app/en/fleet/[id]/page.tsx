import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DESC_EN, MODELS, getModel } from "@/content/models";
import { priceFrom } from "@/content/site";
import { hreflang } from "@/lib/i18n";
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
    title: `${model.name} — ${model.pax} seater`,
    description: `${DESC_EN[model.id]} Rent from US$${priceFrom(model.pax)}/day with delivery to your villa in Punta Cana.`,
    alternates: {
      canonical: `/en/fleet/${model.id}/`,
      ...hreflang(`/flota/${model.id}/`, `/en/fleet/${model.id}/`),
    },
  };
}

export default async function ModelPageEn({ params }: Props) {
  const { id } = await params;
  const model = getModel(id);
  if (!model) notFound();
  return <ModelDetailView model={model} locale="en" />;
}
