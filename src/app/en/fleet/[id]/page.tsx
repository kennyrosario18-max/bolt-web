import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DESC_EN,
  INCLUDED,
  lineName,
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
    title: `${model.name} — ${model.pax} seater`,
    description: `${DESC_EN[model.id]} Rent from US$${priceFrom(model.pax)}/day with delivery to your villa in Punta Cana.`,
    alternates: {
      canonical: `/en/fleet/${model.id}/`,
      ...hreflang(`/flota/${model.id}/`, `/en/fleet/${model.id}/`),
    },
  };
}

const FAQS = (name: string, pax: number) => [
  {
    q: "What does the rental include?",
    a: "Delivery and pickup at your villa, charger, usage briefing, vehicle insurance and 24/7 WhatsApp support.",
  },
  {
    q: "Do I need a license to drive it?",
    a: "Yes. The driver must be 18 or older with a valid driver's license. Use is allowed only inside residential communities, villas and resorts.",
  },
  {
    q: `How many people fit in the ${name}?`,
    a: `Up to ${pax} seated passengers. For safety, standing passengers and exceeding capacity are not allowed.`,
  },
  {
    q: "How does it charge?",
    a: "It plugs into a standard outlet with the included charger. A full charge takes 8 to 10 hours — perfect overnight.",
  },
];

export default async function ModelPageEn({ params }: Props) {
  const { id } = await params;
  const model = getModel(id);
  if (!model) notFound();

  const related = relatedModels(model);
  const waMsg = `Hi BOLT ⚡ I'd like to check availability for the ${model.name} (${model.pax} seats).`;
  const faqs = FAQS(model.name, model.pax);

  const autonomySpecs = model.batteries
    ? model.batteries.map((b) => ({ label: b.nameEn, value: b.range }))
    : [
        { label: "Range (lead-acid)", value: model.range_lead },
        { label: "Range (lithium)", value: model.range_li },
      ];

  const specs = [
    { label: "Seats", value: `${model.pax} passengers` },
    { label: "Top speed", value: model.speed },
    { label: "Load capacity", value: model.cap },
    ...autonomySpecs,
    { label: "Line", value: lineName(model.line, "en") },
  ];

  return (
    <>
      <script {...JsonLdScriptProps(productSchema(model, "en"))} />
      <script {...JsonLdScriptProps(faqSchema(faqs))} />
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/en/" },
            { name: "Fleet", path: "/en/fleet/" },
            { name: model.name, path: `/en/fleet/${model.id}/` },
          ])
        )}
      />

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-white/5">
            <Image
              src={modelImage(model.id)}
              alt={`${model.name} golf cart — seats ${model.pax}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/50">
              <Link href="/en/fleet" className="hover:text-volt">
                Fleet
              </Link>{" "}
              / {lineName(model.line, "en")}
            </nav>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {model.name}
            </h1>
            <p className="mt-4 text-lg text-white/75">{DESC_EN[model.id]}</p>
            <p className="mt-6 text-2xl font-extrabold text-volt">
              from US${priceFrom(model.pax)}
              <span className="text-base font-semibold text-white/60">/day</span>
            </p>
            <p className="text-xs text-white/60">{PRICING.itbisNoteEn}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/en/request-availability?modelo=${model.id}`}
                className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
              >
                ⚡ Request availability
              </Link>
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:border-volt hover:text-volt"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          Technical <span className="hl">specifications</span>
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
          Your rental <span className="hl">includes</span>
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <li key={item.en} className="flex items-start gap-3 rounded-box bg-cream p-4">
              <span className="font-bold text-ok" aria-hidden="true">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{item.en}</p>
                <p lang="es" className="text-xs italic text-steel">{item.es}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Frequently asked questions
          </h2>
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

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          You may also <span className="hl">like</span>
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((m) => (
            <ModelCard key={m.id} model={m} locale="en" />
          ))}
        </div>
      </section>
    </>
  );
}
