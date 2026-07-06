import Link from "next/link";
import { waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Página de servicios — vista única ES/EN. Consolida servicios y en/services. */

interface Service {
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  ctaEs: string;
  ctaEn: string;
  hrefEs: string;
  hrefEn: string;
  external?: boolean;
}

const SERVICES: Service[] = [
  {
    title: "Renta por día, semana o temporada",
    titleEn: "Daily, weekly & seasonal rental",
    body: "Flota de 4 y 6 plazas con entrega y recogida en tu villa (incluida en rentas de 2+ días). Para 7 noches o más, pregunta por la tarifa semanal y mensual con descuento.",
    bodyEn: "4 and 6-seat fleet with delivery and pickup at your villa (included on 2+ day rentals). For 7+ nights, ask about discounted weekly and monthly rates.",
    ctaEs: "Ver precios →",
    ctaEn: "See pricing →",
    hrefEs: "/precios",
    hrefEn: "/en/pricing",
  },
  {
    title: "Venta de unidades nuevas",
    titleEn: "New unit sales",
    body: "Golf carts nuevos con garantía para villas, comunidades y negocios. Te asesoramos en el modelo ideal según tu propiedad y uso — y te acompañamos después de la compra.",
    bodyEn: "New golf carts with warranty for villas, communities and businesses. We advise you on the right model for your property and use — and stay with you after the purchase.",
    ctaEs: "Cotizar por WhatsApp →",
    ctaEn: "Get a quote on WhatsApp →",
    hrefEs: waLink("Hola BOLT, quiero información sobre la VENTA de golf carts nuevos."),
    hrefEn: waLink("Hi BOLT, I would like information about BUYING a new golf cart."),
    external: true,
  },
  {
    title: "Entrega donde estés",
    titleEn: "Delivery wherever you are",
    body: "Llevamos tu carrito con carga completa y orientación de uso hasta tu villa en Puntacana Resort & Club, Cap Cana y Bávaro — y hasta Casa de Campo y La Romana en reservas de 7+ días.",
    bodyEn: "We bring your cart fully charged with a usage briefing to your villa in Puntacana Resort & Club, Cap Cana and Bávaro — and to Casa de Campo and La Romana on 7+ day rentals.",
    ctaEs: "Ver zonas →",
    ctaEn: "See zones →",
    hrefEs: "/#zonas",
    hrefEn: "/en#zones",
  },
  {
    title: "Soporte 24/7 en español e inglés",
    titleEn: "24/7 bilingual support",
    body: "Un WhatsApp y respondemos: asistencia en ruta, reposición si algo falla y guía de uso siempre disponible. Tu renta nunca se queda sin respaldo.",
    bodyEn: "One WhatsApp and we answer: roadside assistance, a swap if something fails, and usage guidance always available. Your rental is never left without backup.",
    ctaEs: "Escribir por WhatsApp →",
    ctaEn: "Message us on WhatsApp →",
    hrefEs: waLink("Hola BOLT, necesito asistencia con un golf cart."),
    hrefEn: waLink("Hi BOLT, I need assistance with a golf cart."),
    external: true,
  },
];

const T = {
  es: {
    kicker: "Servicios",
    h1: "Más que rentar carritos",
    lead: "Movilidad completa para tu estadía o tu propiedad: renta, venta, entrega y soporte que responde.",
    leadSub: "Complete mobility — rental, sales, delivery and support that answers.",
    partnersKicker: "Agencias & Property Managers",
    partnersTitle: "Programa de Aliados BOLT",
    partnersLead: "¿Manejas villas o eres agencia de renta vacacional? Conviértete en aliado BOLT y simplifica los carritos de todas tus propiedades.",
    partnersBullets: [
      "✓ Tarifa preferencial de aliado",
      "✓ Cuenta mensual con factura e-CF, sin depósito por reserva",
      "✓ Disponibilidad prioritaria",
      "✓ Reporte por villa",
    ],
    partnersSub: "Preferred rates · monthly e-invoice account · priority availability · per-villa reporting.",
    partnersCta: "Pregunta por la tarifa de aliado →",
    partnersMsg: "Hola BOLT, manejo villas y quiero información del Programa de Aliados.",
  },
  en: {
    kicker: "Services",
    h1: "More than renting carts",
    lead: "Complete mobility for your stay or your property: rental, sales, delivery and support that answers.",
    leadSub: "Movilidad completa para tu estadía o tu propiedad: renta, venta, entrega y soporte que responde.",
    partnersKicker: "Agencies & Property Managers",
    partnersTitle: "BOLT Partner Program",
    partnersLead: "Do you manage villas or run a vacation-rental agency? Become a BOLT partner and simplify golf carts across all your properties.",
    partnersBullets: [
      "✓ Preferred partner rates",
      "✓ Monthly account with e-CF invoicing, no per-booking deposit",
      "✓ Priority availability",
      "✓ Per-villa reporting",
    ],
    partnersSub: "Tarifa preferencial · cuenta mensual con factura e-CF · disponibilidad prioritaria · reporte por villa.",
    partnersCta: "Ask for the partner rate →",
    partnersMsg: "Hola BOLT, manejo villas y quiero información del Programa de Aliados.",
  },
} as const;

export function ServicesView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const es = locale === "es";

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-xl text-white/70">{t.lead}</p>
          <p lang={es ? "en" : "es"} className="mt-1 text-sm italic text-white/60">
            {t.leadSub}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex flex-col rounded-card border border-line p-7">
              <h2 className="font-display text-xl font-extrabold">{es ? s.title : s.titleEn}</h2>
              <p lang={es ? "en" : "es"} className="text-sm italic text-steel">
                {es ? s.titleEn : s.title}
              </p>
              <p className="mt-3 flex-1 text-inktext">{es ? s.body : s.bodyEn}</p>
              {s.external ? (
                <a
                  href={es ? s.hrefEs : s.hrefEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 font-bold text-volt-dark hover:underline"
                >
                  {es ? s.ctaEs : s.ctaEn}
                </a>
              ) : (
                <Link
                  href={es ? s.hrefEs : s.hrefEn}
                  className="mt-5 font-bold text-volt-dark hover:underline"
                >
                  {es ? s.ctaEs : s.ctaEn}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Programa de Aliados — beneficios públicos, tarifas solo por WhatsApp */}
        <div className="mt-12 rounded-card bg-ink p-8 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
            {t.partnersKicker}
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            {t.partnersTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">{t.partnersLead}</p>
          <ul className="mt-5 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            {t.partnersBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p lang={es ? "en" : "es"} className="mt-3 text-xs italic text-white/60">
            {t.partnersSub}
          </p>
          <a
            href={waLink(t.partnersMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            {t.partnersCta}
          </a>
        </div>
      </section>
    </>
  );
}
