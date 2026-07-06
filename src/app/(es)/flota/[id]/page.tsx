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
    title: `Renta ${model.name} en Punta Cana — ${model.pax} plazas`,
    description: `Alquila el ${model.name} (${model.pax} plazas) en Punta Cana desde US$${priceFrom(model.pax)}/día. Entrega en tu villa, seguro y soporte 24/7 — confirmación el mismo día.`,
    alternates: {
      canonical: `/flota/${model.id}/`,
      ...hreflang(`/flota/${model.id}/`, `/en/fleet/${model.id}/`),
    },
    ...ogMeta(`model-${model.id}`),
  };
}

export default async function ModelPage({ params }: Props) {
  const { id } = await params;
  const model = getModel(id);
  if (!model) notFound();
  return <ModelDetailView model={model} locale="es" />;
}
