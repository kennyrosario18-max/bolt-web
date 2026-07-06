import Image from "next/image";
import Link from "next/link";
import {
  DESC_EN,
  INCLUDED,
  lineName,
  modelImages,
  relatedModels,
  type Model,
} from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { BoltIcon, CheckIcon } from "@/components/icons";
import { PRICING, priceFrom, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

/** Ficha de modelo — vista única ES/EN. Consolida flota/[id] y en/fleet/[id]. */

const T = {
  es: {
    crumb: "Flota",
    crumbHref: "/flota",
    perDay: "/día",
    reqCta: "Solicitar disponibilidad",
    reqHref: (id: string) => `/solicitar-disponibilidad?modelo=${id}`,
    waCta: "Consultar por WhatsApp",
    waMsg: (m: Model) => `Hola BOLT ⚡ Quiero consultar disponibilidad del ${m.name} (${m.pax} plazas).`,
    from: "desde US$",
    specsA: "Especificaciones ",
    specsB: "técnicas",
    seats: "Plazas",
    seatsVal: (p: number) => `${p} pasajeros`,
    speed: "Velocidad máxima",
    cap: "Capacidad de carga",
    rangeLead: "Autonomía (plomo)",
    rangeLi: "Autonomía (litio)",
    line: "Línea",
    inclA: "Tu renta ",
    inclB: "incluye",
    faqTitle: "Preguntas frecuentes",
    relA: "También te puede ",
    relB: "interesar",
    faqs: (name: string, pax: number) => [
      { q: "¿Qué incluye la renta?", a: "Entrega y recogida en tu villa, cargador, orientación de uso, seguro del vehículo y soporte por WhatsApp 24/7." },
      { q: "¿Necesito licencia para manejarlo?", a: "Sí. El conductor debe ser mayor de 18 años con licencia de conducir vigente. El uso es exclusivo dentro de residenciales, villas y resorts." },
      { q: `¿Cuántas personas pueden ir en el ${name}?`, a: `Hasta ${pax} pasajeros sentados. Por seguridad no se permiten pasajeros de pie ni exceder la capacidad.` },
      { q: "¿Cómo se carga?", a: "Se conecta a un tomacorriente estándar con el cargador incluido. Una carga completa toma entre 8 y 10 horas — ideal durante la noche." },
    ],
    alt: (m: Model) => `Golf cart ${m.name} de ${m.pax} plazas`,
    crumbAria: "Miga de pan",
    itbis: PRICING.itbisNote,
  },
  en: {
    crumb: "Fleet",
    crumbHref: "/en/fleet",
    perDay: "/day",
    reqCta: "Request availability",
    reqHref: (id: string) => `/en/request-availability?modelo=${id}`,
    waCta: "Ask on WhatsApp",
    waMsg: (m: Model) => `Hi BOLT ⚡ I'd like to check availability for the ${m.name} (${m.pax} seats).`,
    from: "from US$",
    specsA: "Technical ",
    specsB: "specifications",
    seats: "Seats",
    seatsVal: (p: number) => `${p} passengers`,
    speed: "Top speed",
    cap: "Load capacity",
    rangeLead: "Range (lead-acid)",
    rangeLi: "Range (lithium)",
    line: "Line",
    inclA: "Your rental ",
    inclB: "includes",
    faqTitle: "Frequently asked questions",
    relA: "You may also ",
    relB: "like",
    faqs: (name: string, pax: number) => [
      { q: "What does the rental include?", a: "Delivery and pickup at your villa, charger, usage briefing, vehicle insurance and 24/7 WhatsApp support." },
      { q: "Do I need a license to drive it?", a: "Yes. The driver must be 18 or older with a valid driver's license. Use is allowed only inside residential communities, villas and resorts." },
      { q: `How many people fit in the ${name}?`, a: `Up to ${pax} seated passengers. For safety, standing passengers and exceeding capacity are not allowed.` },
      { q: "How does it charge?", a: "It plugs into a standard outlet with the included charger. A full charge takes 8 to 10 hours — perfect overnight." },
    ],
    alt: (m: Model) => `${m.name} golf cart — seats ${m.pax}`,
    crumbAria: "Breadcrumb",
    itbis: PRICING.itbisNoteEn,
  },
} as const;

export function ModelDetailView({ model, locale }: { model: Model; locale: Locale }) {
  const t = T[locale];
  const es = locale === "es";
  const related = relatedModels(model);
  const photos = modelImages(model.id);
  const faqs = t.faqs(model.name, model.pax);

  const autonomySpecs = model.batteries
    ? model.batteries.map((b) => ({ label: es ? b.name : b.nameEn, value: b.range }))
    : [
        { label: t.rangeLead, value: model.range_lead },
        { label: t.rangeLi, value: model.range_li },
      ];

  const specs = [
    { label: t.seats, value: t.seatsVal(model.pax) },
    { label: t.speed, value: model.speed },
    { label: t.cap, value: model.cap },
    ...autonomySpecs,
    { label: t.line, value: lineName(model.line, locale) },
  ];

  // Descripción principal en el idioma de la página + subtítulo en el otro idioma.
  const mainDesc = es ? model.desc : DESC_EN[model.id];
  const subDesc = es ? DESC_EN[model.id] : model.desc;
  const crumbBase = es ? "/" : "/en/";

  return (
    <>
      <script {...JsonLdScriptProps(productSchema(model, locale))} />
      <script {...JsonLdScriptProps(faqSchema(faqs))} />
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: es ? "Inicio" : "Home", path: crumbBase },
            { name: t.crumb, path: `${t.crumbHref}/` },
            { name: model.name, path: `${t.crumbHref}/${model.id}/` },
          ])
        )}
      />
      {/* Hero del modelo — premium negro */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-white/5">
              <Image
                src={photos[0]}
                alt={t.alt(model)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Galería lista: aparece sola cuando el modelo tenga varias fotos. */}
            {photos.length > 1 ? (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {photos.slice(0, 4).map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-box bg-white/5">
                    <Image src={src} alt={`${model.name} — ${i + 1}`} fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <nav aria-label={t.crumbAria} className="text-sm text-white/50">
              <Link href={t.crumbHref} className="hover:text-volt">
                {t.crumb}
              </Link>{" "}
              / {lineName(model.line, locale)}
            </nav>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {model.name}
            </h1>
            <p className="mt-4 text-lg text-white/75">{mainDesc}</p>
            <p lang={es ? "en" : "es"} className="mt-1 text-sm italic text-white/60">
              {subDesc}
            </p>
            <p className="mt-6 text-2xl font-extrabold text-volt">
              {t.from}
              {priceFrom(model.pax)}
              <span className="text-base font-semibold text-white/60">{t.perDay}</span>
            </p>
            <p className="text-xs text-white/60">{t.itbis}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={t.reqHref(model.id)}
                className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
              >
                <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.reqCta}
              </Link>
              <a
                href={waLink(t.waMsg(model))}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:border-volt hover:text-volt"
              >
                {t.waCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Especificaciones */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          {t.specsA}
          <span className="hl">{t.specsB}</span>
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
          {t.inclA}
          <span className="hl">{t.inclB}</span>
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <li key={item.es} className="flex items-start gap-3 rounded-box bg-cream p-4">
              <CheckIcon className="mt-0.5 shrink-0 text-ok" size={18} />
              <p className="text-sm font-semibold text-ink">{es ? item.es : item.en}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t.faqTitle}</h2>
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
          {t.relA}
          <span className="hl">{t.relB}</span>
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((m) => (
            <ModelCard key={m.id} model={m} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
