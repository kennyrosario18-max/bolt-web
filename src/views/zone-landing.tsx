import type { CSSProperties } from "react";
import Link from "next/link";
import { getModel } from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { HighSeasonNote } from "@/components/high-season-note";
import { BoltIcon, CheckIcon } from "@/components/icons";
import { ZONE_LANDINGS, type ZoneLanding } from "@/content/zones-landing";
import { PRICING, transportLabel, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema } from "@/lib/schema";

/** Landing de zona — vista única ES/EN. Consolida alquiler/[zona] y en/rentals/[zona]. */

const T = {
  es: {
    crumbHome: "Inicio",
    crumbHomeHref: "/",
    crumbZones: "Zonas",
    crumbAria: "Miga de pan",
    minDays: (d: number, note: string) => `Reservas de ${d} días o más · ${note}`,
    reqCta: "Solicitar disponibilidad",
    reqHref: "/solicitar-disponibilidad",
    pricesCta: "Ver precios →",
    pricesHref: "/precios",
    recA: "Modelos ",
    recB: "recomendados",
    recFor: (short: string) => ` para ${short}`,
    allFleet: "Ver toda la flota →",
    allFleetHref: "/flota",
    zoneHref: (id: string) => `/alquiler/${id}/`,
    faqTitle: (short: string) => `Preguntas frecuentes — ${short}`,
    ready: (short: string) => `¿Listo para tu BOLT en ${short}?`,
    waCta: "o escríbenos por WhatsApp",
    waMsg: (name: string) => `Hola BOLT, quiero rentar un golf cart en ${name}.`,
    sectorsTitle: (short: string) => `Dónde entregamos en ${short}`,
    sectorsNote: "Sectores y residenciales dentro de la comunidad. Si el tuyo no aparece, indícalo en tu solicitud.",
  },
  en: {
    crumbHome: "Home",
    crumbHomeHref: "/en",
    crumbZones: "Zones",
    crumbAria: "Breadcrumb",
    minDays: (d: number, note: string) => `Rentals of ${d}+ days · ${note}`,
    reqCta: "Request availability",
    reqHref: "/en/request-availability",
    pricesCta: "See pricing →",
    pricesHref: "/en/pricing",
    recA: "Recommended ",
    recB: "models",
    recFor: (short: string) => ` for ${short}`,
    allFleet: "See the full fleet →",
    allFleetHref: "/en/fleet",
    zoneHref: (id: string) => `/en/rentals/${id}/`,
    faqTitle: (short: string) => `FAQ — ${short}`,
    ready: (short: string) => `Ready for your BOLT in ${short}?`,
    waCta: "or message us on WhatsApp",
    waMsg: (name: string) => `Hi BOLT, I'd like to rent a golf cart in ${name}.`,
    sectorsTitle: (short: string) => `Where we deliver in ${short}`,
    sectorsNote: "Sectors and residential areas inside the community. If yours isn't listed, mention it in your request.",
  },
} as const;

export function generateZoneParams() {
  return ZONE_LANDINGS.map((l) => ({ zona: l.zone.id }));
}

export function ZoneLandingView({ landing, locale }: { landing: ZoneLanding; locale: Locale }) {
  const t = T[locale];
  const es = locale === "es";
  const { zone } = landing;
  const recommended = landing.recommendedIds
    .map(getModel)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const heroTitle = es ? landing.heroTitle : landing.heroTitleEn;
  const heroSub = es ? landing.heroTitleEn : landing.heroTitle;
  const intro = es ? landing.intro : landing.introEn;
  const faqs = es ? landing.faqs : landing.faqsEn;
  const note = es ? zone.note : zone.noteEn;
  const sections = landing.sections.map((s) => ({
    h: es ? s.h : s.hEn,
    p: es ? s.p : s.pEn,
  }));

  return (
    <>
      <script {...JsonLdScriptProps(faqSchema(faqs))} />
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: t.crumbHome, path: es ? "/" : "/en/" },
            { name: t.crumbZones, path: es ? "/#zonas" : "/en/#zones" },
            { name: zone.name, path: t.zoneHref(zone.id) },
          ])
        )}
      />
      <section className="relative isolate overflow-hidden mesh-ink grain text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <nav aria-label={t.crumbAria} className="animate-rise stagger text-sm text-white/70" style={{ "--i": 0 } as CSSProperties}>
            <Link href={t.crumbHomeHref} className="hover:text-volt">
              {t.crumbHome}
            </Link>{" "}
            / {t.crumbZones}
          </nav>
          <h1 className="animate-rise-t stagger mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ "--i": 1 } as CSSProperties}>
            {heroTitle}
          </h1>
          <p lang={es ? "en" : "es"} className="animate-rise stagger mt-1 text-sm italic text-white/60" style={{ "--i": 2 } as CSSProperties}>
            {heroSub}
          </p>
          <p className="animate-rise stagger mt-5 max-w-2xl text-lg text-white/75" style={{ "--i": 3 } as CSSProperties}>{intro}</p>
          {zone.minDays ? (
            <p className="animate-rise stagger mt-4 inline-block rounded-full bg-volt px-4 py-1.5 text-sm font-bold text-ink" style={{ "--i": 4 } as CSSProperties}>
              {t.minDays(zone.minDays, note ?? "")}
            </p>
          ) : zone.transport ? (
            <p className="animate-rise stagger mt-4 inline-block rounded-full bg-volt px-4 py-1.5 text-sm font-bold text-ink" style={{ "--i": 4 } as CSSProperties}>
              {transportLabel(zone, locale)}
            </p>
          ) : null}
          <div className="animate-rise stagger mt-7 flex flex-wrap gap-3" style={{ "--i": 5 } as CSSProperties}>
            {/* ?zona= prellena la zona en el formulario: el cliente no vuelve a elegirla. */}
            <Link
              href={`${t.reqHref}?zona=${zone.id}`}
              className="shine lift rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink shadow-[var(--shadow-glow)]"
            >
              <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.reqCta}
            </Link>
            <Link
              href={t.pricesHref}
              className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-[var(--dur-base)] hover:border-volt hover:text-volt"
            >
              {t.pricesCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="reveal-list grid gap-4 md:grid-cols-3">
          {landing.bullets.map((b) => (
            <li key={b.es} className="rounded-card bg-cream p-6">
              <p className="font-semibold text-ink">
                <CheckIcon className="mr-2 inline-block align-[-0.15em] text-ok" size={15} />
                {es ? b.es : b.en}
              </p>
            </li>
          ))}
        </ul>
        {zone.transport ? <HighSeasonNote locale={locale} className="mt-6" /> : null}
      </section>

      {/* Cuerpo largo (F7-B): contenido único e indexable por zona. */}
      <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
        {sections.map((s, i) => (
          <div key={s.h} className={i > 0 ? "reveal mt-10" : "reveal"}>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{s.h}</h2>
            {s.p.map((para, j) => (
              <p key={j} className="mt-4 text-lg leading-relaxed text-inktext">
                {para}
              </p>
            ))}
          </div>
        ))}
        {/* Dónde entregamos: solo nombres de sector (sin villas ni clientes). */}
        {landing.sectors?.length ? (
          <div className="reveal mt-10">
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{t.sectorsTitle(zone.short)}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {landing.sectors.map((s) => (
                <li key={s} className="rounded-full border border-line bg-cream px-4 py-1.5 text-sm font-semibold text-ink">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-steel">{t.sectorsNote}</p>
          </div>
        ) : null}
      </section>

      <section className="mx-auto mt-6 max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          {t.recA}
          <span className="hl">{t.recB}</span>
          {t.recFor(zone.short)}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((m) => (
            <ModelCard key={m.id} model={m} locale={locale} />
          ))}
        </div>
        <p className="mt-3 text-xs text-steel">{es ? PRICING.itbisNote : PRICING.itbisNoteEn}</p>
        <Link
          href={t.allFleetHref}
          className="mt-6 inline-block text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark"
        >
          {t.allFleet}
        </Link>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t.faqTitle(zone.short)}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-card border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-card bg-ink p-8 text-center">
            <p className="font-display text-xl font-bold text-white">{t.ready(zone.short)}</p>
            <Link
              href={`${t.reqHref}?zona=${zone.id}`}
              className="mt-4 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.reqCta}
            </Link>
            <p className="mt-3 text-sm text-white/70">
              <a href={waLink(t.waMsg(zone.name))} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-volt">
                {t.waCta}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
