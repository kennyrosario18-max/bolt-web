import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DESC_EN,
  INCLUDED,
  LINE_NAMES,
  MODELS,
  getModel,
  modelImage,
  relatedModels,
} from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { PRICING, priceFrom, waLink } from "@/content/site";
import { hreflang } from "@/lib/i18n";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

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
    title: `${model.name} — ${model.pax} plazas`,
    description: `${model.desc} Renta desde US$${priceFrom(model.pax)}/día con entrega en tu villa en Punta Cana.`,
    alternates: {
      canonical: `/flota/${model.id}/`,
      ...hreflang(`/flota/${model.id}/`, `/en/fleet/${model.id}/`),
    },
  };
}

const FAQS = (name: string, pax: number) => [
  {
    q: "¿Qué incluye la renta?",
    a: `Entrega y recogida en tu villa, cargador, orientación de uso, seguro del vehículo y soporte por WhatsApp 24/7.`,
  },
  {
    q: "¿Necesito licencia para manejarlo?",
    a: "Sí. El conductor debe ser mayor de 18 años con licencia de conducir vigente. El uso es exclusivo dentro de residenciales, villas y resorts.",
  },
  {
    q: `¿Cuántas personas pueden ir en el ${name}?`,
    a: `Hasta ${pax} pasajeros sentados. Por seguridad no se permiten pasajeros de pie ni exceder la capacidad.`,
  },
  {
    q: "¿Cómo se carga?",
    a: "Se conecta a un tomacorriente estándar con el cargador incluido. Una carga completa toma entre 8 y 10 horas — ideal durante la noche.",
  },
];

export default async function ModelPage({ params }: Props) {
  const { id } = await params;
  const model = getModel(id);
  if (!model) notFound();

  const related = relatedModels(model);
  const waMsg = `Hola BOLT ⚡ Quiero consultar disponibilidad del ${model.name} (${model.pax} plazas).`;

  const autonomySpecs = model.batteries
    ? model.batteries.map((b) => ({ label: b.name, value: b.range }))
    : [
        { label: "Autonomía (plomo)", value: model.range_lead },
        { label: "Autonomía (litio)", value: model.range_li },
      ];

  const specs = [
    { label: "Plazas", value: `${model.pax} pasajeros` },
    { label: "Velocidad máxima", value: model.speed },
    { label: "Capacidad de carga", value: model.cap },
    ...autonomySpecs,
    { label: "Línea", value: LINE_NAMES[model.line] },
  ];

  const faqs = FAQS(model.name, model.pax);

  return (
    <>
      <script {...JsonLdScriptProps(productSchema(model, "es"))} />
      <script {...JsonLdScriptProps(faqSchema(faqs))} />
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Flota", path: "/flota/" },
            { name: model.name, path: `/flota/${model.id}/` },
          ])
        )}
      />
      {/* Hero del modelo — premium negro */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-white/5">
            <Image
              src={modelImage(model.id)}
              alt={`Golf cart ${model.name} de ${model.pax} plazas`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <nav aria-label="Miga de pan" className="text-sm text-white/50">
              <Link href="/flota" className="hover:text-volt">
                Flota
              </Link>{" "}
              / {LINE_NAMES[model.line]}
            </nav>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {model.name}
            </h1>
            <p className="mt-4 text-lg text-white/75">{model.desc}</p>
            <p className="mt-1 text-sm italic text-white/60">{DESC_EN[model.id]}</p>
            <p className="mt-6 text-2xl font-extrabold text-volt">
              desde US${priceFrom(model.pax)}
              <span className="text-base font-semibold text-white/60">/día</span>
            </p>
            <p className="text-xs text-white/60">{PRICING.itbisNote}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/solicitar-disponibilidad?modelo=${model.id}`}
                className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
              >
                ⚡ Solicitar disponibilidad
              </Link>
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:border-volt hover:text-volt"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Especificaciones */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          Especificaciones <span className="hl">técnicas</span>
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {specs.map((s) => (
            <div key={s.label} className="rounded-box border border-line p-5">
              <dt className="text-xs font-bold uppercase tracking-wider text-steel">{s.label}</dt>
              <dd className="mt-1 font-display text-lg font-bold text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-12 font-display text-2xl font-extrabold sm:text-3xl">
          Tu renta <span className="hl">incluye</span>
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <li key={item.es} className="flex items-start gap-3 rounded-box bg-cream p-4">
              <span className="font-bold text-ok" aria-hidden="true">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{item.es}</p>
                <p className="text-xs italic text-steel">{item.en}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Preguntas frecuentes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-card border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          También te puede <span className="hl">interesar</span>
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>
    </>
  );
}
