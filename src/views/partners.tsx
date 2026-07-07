import type { CSSProperties } from "react";
import Link from "next/link";
import { CONTACT, waLink } from "@/content/site";
import { BoltIcon, CheckIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema } from "@/lib/schema";

/** Programa de Aliados — vista única ES/EN. Landing B2B para agencias, concierges
 *  y property managers. Recrea reservas.boltgolfcars.com/aliados en el dominio
 *  nuevo para poder retirar el legado. */

const T = {
  es: {
    crumbHome: "Inicio",
    crumbHomeHref: "/",
    crumb: "Aliados",
    crumbAria: "Miga de pan",
    kicker: "Agencias · Concierges · Property Managers",
    h1: "Programa de Aliados BOLT",
    lead: "¿Manejas villas, eres concierge o agencia de renta vacacional? Conviértete en aliado BOLT y resuelve los golf carts de todas tus propiedades con una sola cuenta.",
    benefitsTitle: "Beneficios de ",
    benefitsHl: "aliado",
    benefits: [
      { t: "Tarifa de aliado fija todo el año", d: "Un precio preferencial que no cambia en temporada alta." },
      { t: "Cuenta mensual con factura e-CF", d: "Sin depósito por reserva: consolidamos todo en una cuenta mensual." },
      { t: "Disponibilidad prioritaria", d: "Tus solicitudes primero, incluso en fechas pico." },
      { t: "Reporte mensual por villa", d: "Sabes exactamente qué se rentó en cada propiedad." },
    ],
    howTitle: "Cómo ",
    howHl: "funciona",
    steps: [
      "Te damos de alta como aliado con tu tarifa fija.",
      "Reservas por el formulario concierge con los datos del huésped.",
      "Cierras cada mes con una factura e-CF y tu reporte por villa.",
    ],
    reqTitle: "Requisitos del ",
    reqHl: "aliado",
    reqGroups: [
      {
        t: "Para darte de alta",
        items: [
          "Ser agencia, concierge, property manager o villa con necesidad recurrente",
          "Contacto completo: nombre/empresa, WhatsApp y correo electrónico",
          "RNC o cédula para la facturación e-CF",
        ],
      },
      {
        t: "En cada reserva",
        items: [
          "Reservar por el formulario concierge con los datos completos del huésped",
          "Avisar cambios con 24h: el 1er cambio es gratis; desde el 2do, US$40 + ITBIS",
          "Pagar la cuenta mensual contra factura e-CF (sin depósito por reserva)",
        ],
      },
      {
        t: "Tu huésped debe cumplir",
        items: [
          "Conductor mayor de 18 años con licencia vigente",
          "Uso solo en residenciales, villas y resorts — nunca playa ni carreteras públicas",
          "Máx. 25 km/h, todos sentados y sin exceder la capacidad del carrito",
        ],
      },
    ],
    toolsTitle: "Tus ",
    toolsHl: "herramientas",
    tools: [
      { title: "Formulario concierge", desc: "Reserva por el huésped: villa, fechas y nº de carritos.", href: "/reserva-concierge", cta: "Abrir formulario →" },
      { title: "Política de cambios", desc: "1 cambio gratis por reserva; condiciones desde el 2do.", href: "/anexo-aliados", cta: "Ver política →" },
      { title: "Catálogo de flota", desc: "Modelos, fotos y especificaciones de 4 y 6 plazas.", href: "/flota", cta: "Ver flota →" },
    ],
    ctaTitle: "¿Listo para ser aliado BOLT?",
    ctaLead: "Escríbenos y te damos de alta con tu tarifa de aliado, sin compromiso.",
    ctaBtn: "Quiero ser aliado",
    waMsg: "Hola BOLT, manejo villas / soy concierge y quiero información del Programa de Aliados.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Quién puede ser aliado?", a: "Agencias de renta vacacional, concierges, property managers y villas que necesiten golf carts de forma recurrente." },
      { q: "¿Tiene costo el programa?", a: "No. Ser aliado es gratis; solo pagas las rentas a tu tarifa preferencial, consolidadas en tu cuenta mensual." },
      { q: "¿Cómo facturan?", a: "Con factura e-CF mensual (comprobante fiscal electrónico), sin depósito por cada reserva." },
      { q: "Refiero clientes, ¿cómo me beneficio?", a: "Te damos de alta como aliado: reservas para tus huéspedes o referidos con tu tarifa preferencial fija y todo queda consolidado en tu cuenta mensual con factura e-CF." },
    ],
  },
  en: {
    crumbHome: "Home",
    crumbHomeHref: "/en",
    crumb: "Partners",
    crumbAria: "Breadcrumb",
    kicker: "Agencies · Concierges · Property Managers",
    h1: "BOLT Partner Program",
    lead: "Do you manage villas, work as a concierge or run a vacation-rental agency? Become a BOLT partner and cover golf carts across all your properties with a single account.",
    benefitsTitle: "Partner ",
    benefitsHl: "benefits",
    benefits: [
      { t: "Fixed partner rate all year", d: "A preferred price that doesn't change in high season." },
      { t: "Monthly account with e-CF invoice", d: "No per-booking deposit: we consolidate everything into a monthly account." },
      { t: "Priority availability", d: "Your requests come first, even on peak dates." },
      { t: "Monthly per-villa report", d: "You know exactly what was rented at each property." },
    ],
    howTitle: "How it ",
    howHl: "works",
    steps: [
      "We set you up as a partner with your fixed rate.",
      "You book through the concierge form with the guest's details.",
      "You close each month with an e-CF invoice and your per-villa report.",
    ],
    reqTitle: "Partner ",
    reqHl: "requirements",
    reqGroups: [
      {
        t: "To get set up",
        items: [
          "Be an agency, concierge, property manager or villa with recurring need",
          "Full contact details: name/company, WhatsApp and email",
          "RNC or ID for e-CF invoicing",
        ],
      },
      {
        t: "On every booking",
        items: [
          "Book through the concierge form with the guest's full details",
          "Notify changes 24h ahead: 1st change free; from the 2nd, US$40 + tax",
          "Settle the monthly account against the e-CF invoice (no per-booking deposit)",
        ],
      },
      {
        t: "Your guest must follow",
        items: [
          "Driver over 18 with a valid license",
          "Use only in residential areas, villas and resorts — never the beach or public roads",
          "Max 25 km/h, everyone seated, never over the cart's capacity",
        ],
      },
    ],
    toolsTitle: "Your ",
    toolsHl: "tools",
    tools: [
      { title: "Concierge form", desc: "Book for the guest: villa, dates and number of carts.", href: "/en/concierge-booking", cta: "Open form →" },
      { title: "Change policy", desc: "1 free change per booking; terms from the 2nd change.", href: "/en/partner-change-policy", cta: "View policy →" },
      { title: "Fleet catalog", desc: "Models, photos and specs for 4 and 6 seaters.", href: "/en/fleet", cta: "View fleet →" },
    ],
    ctaTitle: "Ready to become a BOLT partner?",
    ctaLead: "Message us and we'll set you up with your partner rate, no obligation.",
    ctaBtn: "Become a partner",
    waMsg: "Hi BOLT, I manage villas / I'm a concierge and I'd like information about the Partner Program.",
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Who can become a partner?", a: "Vacation-rental agencies, concierges, property managers and villas that need golf carts on a recurring basis." },
      { q: "Does the program cost anything?", a: "No. Becoming a partner is free; you only pay for rentals at your preferred rate, consolidated in your monthly account." },
      { q: "How do you invoice?", a: "With a monthly e-CF invoice (electronic fiscal receipt), with no deposit per booking." },
      { q: "I refer clients — what's in it for me?", a: "We set you up as a partner: you book for your guests or referrals at your fixed preferred rate, all consolidated in your monthly account with an e-CF invoice." },
    ],
  },
} as const;

export function PartnersView({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const es = locale === "es";

  return (
    <>
      <script {...JsonLdScriptProps(faqSchema([...t.faqs]))} />
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: t.crumbHome, path: es ? "/" : "/en/" },
            { name: t.crumb, path: es ? "/aliados/" : "/en/partners/" },
          ])
        )}
      />

      <section className="relative isolate overflow-hidden mesh-ink grain text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <nav
            aria-label={t.crumbAria}
            className="animate-rise stagger text-sm text-white/70"
            style={{ "--i": 0 } as CSSProperties}
          >
            <Link href={t.crumbHomeHref} className="hover:text-volt">
              {t.crumbHome}
            </Link>{" "}
            / {t.crumb}
          </nav>
          <p
            className="animate-rise stagger mt-3 text-sm font-bold uppercase tracking-[0.2em] text-volt"
            style={{ "--i": 1 } as CSSProperties}
          >
            {t.kicker}
          </p>
          <h1
            className="animate-rise stagger mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            style={{ "--i": 2 } as CSSProperties}
          >
            {t.h1}
          </h1>
          <p
            className="animate-rise stagger mt-4 max-w-2xl text-lg text-white/75"
            style={{ "--i": 3 } as CSSProperties}
          >
            {t.lead}
          </p>
          <a
            href={waLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="shine lift animate-rise stagger mt-7 inline-flex items-center gap-1.5 rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink shadow-[var(--shadow-glow)]"
            style={{ "--i": 4 } as CSSProperties}
          >
            <BoltIcon className="inline-block align-[-0.15em]" size={15} />
            {t.ctaBtn}
          </a>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="reveal font-display text-2xl font-extrabold sm:text-3xl">
          {t.benefitsTitle}
          <span className="hl">{t.benefitsHl}</span>
        </h2>
        <div className="reveal-list mt-6 grid gap-4 md:grid-cols-2">
          {t.benefits.map((b) => (
            <div
              key={b.t}
              className="lift flex items-start gap-3 rounded-card border border-line p-6 hover:border-volt/40"
            >
              <CheckIcon className="mt-0.5 shrink-0 text-ok" size={20} />
              <div>
                <h3 className="font-display text-lg font-extrabold">{b.t}</h3>
                <p className="mt-1 text-sm text-inktext">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="section-glow bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="reveal font-display text-2xl font-extrabold sm:text-3xl">
            {t.howTitle}
            <span className="hl">{t.howHl}</span>
          </h2>
          <div className="reveal-list mt-6 grid gap-6 md:grid-cols-3">
            {t.steps.map((s, i) => (
              <div key={s}>
                <span className="font-display text-4xl font-extrabold text-volt-dark">0{i + 1}</span>
                <p className="mt-2 text-inktext">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos del aliado — la respuesta oficial a "¿qué debo cumplir?" */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="reveal font-display text-2xl font-extrabold sm:text-3xl">
          {t.reqTitle}
          <span className="hl">{t.reqHl}</span>
        </h2>
        <div className="reveal-list mt-6 grid gap-6 md:grid-cols-3">
          {t.reqGroups.map((g) => (
            <div key={g.t} className="lift rounded-card border border-line bg-white p-6 hover:border-volt/40">
              <h3 className="font-display text-lg font-extrabold">{g.t}</h3>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-inktext">
                    <CheckIcon className="mt-0.5 shrink-0 text-ok" size={15} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Herramientas del aliado */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="reveal font-display text-2xl font-extrabold sm:text-3xl">
          {t.toolsTitle}
          <span className="hl">{t.toolsHl}</span>
        </h2>
        <div className="reveal-list mt-6 grid gap-6 md:grid-cols-3">
          {t.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group lift rounded-card border border-line p-6 hover:border-volt/40"
            >
              <h3 className="font-display text-lg font-extrabold">{tool.title}</h3>
              <p className="mt-2 text-sm text-inktext">{tool.desc}</p>
              <span className="mt-4 inline-block text-sm font-bold text-volt-dark group-hover:text-ink">
                {tool.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="section-glow bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="reveal font-display text-2xl font-extrabold sm:text-3xl">{t.faqTitle}</h2>
          <div className="reveal-list mt-6 grid gap-4 md:grid-cols-3">
            {t.faqs.map((f) => (
              <div
                key={f.q}
                className="lift rounded-card border border-line bg-white p-6 hover:border-volt/40"
              >
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </div>
          <hr className="divider-volt mx-auto mt-12 max-w-3xl border-0" />
          <div className="reveal relative isolate mt-10 overflow-hidden rounded-card mesh-ink grain p-8 text-center">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">{t.ctaTitle}</p>
            <p className="mx-auto mt-1 max-w-lg text-sm text-white/70">{t.ctaLead}</p>
            <a
              href={waLink(t.waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="shine lift mt-5 inline-flex items-center gap-1.5 rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink shadow-[var(--shadow-glow)]"
            >
              <BoltIcon className="inline-block align-[-0.15em]" size={15} />
              {t.ctaBtn} · {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
