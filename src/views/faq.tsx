import Link from "next/link";
import { BoltIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { JsonLdScriptProps, faqSchema } from "@/lib/schema";

/** FAQ consolidada: renta, requisitos, entrega, pagos y políticas (fuentes: precios, política, depósito y manual). */
export const FAQS: Record<Locale, { q: string; a: string }[]> = {
  es: [
    {
      q: "¿Qué incluye la renta de un golf cart BOLT?",
      a: "Cargador para carga nocturna, orientación de uso al entregarte el carrito y soporte por WhatsApp 24/7 en español e inglés. La entrega y recogida en tu villa o residencial llevan un transporte fijo por zona (desde US$60 por viaje, gratis en reservas largas).",
    },
    {
      q: "¿Cuánto cuesta la renta?",
      a: "Los modelos de 4 plazas van desde US$50/día y los de 6 plazas desde US$65/día. El ITBIS (18%) se muestra por modelo en la página de precios. El transporte se cobra aparte por zona (desde US$60 por viaje, gratis en reservas largas). Para 7 noches o más hay tarifa semanal y mensual con descuento.",
    },
    {
      q: "¿La entrega tiene costo?",
      a: "Sí, es un cargo fijo por zona, ida y vuelta (entrega + recogida), por viaje de tráiler: US$60 en Puntacana Resort & Club, Cap Cana y Bávaro, y US$120 en Uvero Alto / Macao; otras zonas se cotizan. Es gratis en reservas de 5 días o más (Puntacana Resort & Club y Cap Cana) y de 10 días o más (Bávaro). Se paga con la reserva; ITBIS 18% aparte.",
    },
    {
      q: "¿Qué necesito para manejar el carrito?",
      a: "Ser mayor de 18 años con licencia de conducir vigente. El uso es exclusivo dentro de residenciales, villas y resorts — está prohibido circular por playa, arena o carreteras públicas.",
    },
    {
      q: "¿En qué zonas entregan?",
      a: "Puntacana Resort & Club, Cap Cana y Bávaro con transporte fijo de US$60 por viaje (gratis en reservas largas), y Uvero Alto / Macao a US$120. Casa de Campo y La Romana están disponibles para reservas de 7 días o más, con transporte sujeto a cotización.",
    },
    {
      q: "¿Cómo se confirma mi reserva?",
      a: "Envías tu solicitud de disponibilidad, nuestro equipo la verifica y te responde por WhatsApp — nunca es una confirmación automática. La reserva se asegura con un depósito del 50% del total; el saldo se paga a la entrega.",
    },
    {
      q: "¿Piden depósito de garantía?",
      a: "Sí, US$200 reembolsables que se retienen a la entrega y se devuelven tras la inspección de devolución, descontando daños o penalidades si los hubiera.",
    },
    {
      q: "¿Puedo cancelar o cambiar la fecha?",
      a: "Tienes un cambio de fecha gratis avisando con 48 horas, sujeto a disponibilidad. Si cancelas con más de 48 horas en temporada estándar, tu anticipo queda como crédito válido 12 meses; con menos de 48 horas o no-show se pierde. En temporada alta (20 dic–6 ene y Semana Santa) el anticipo no es reembolsable y solo queda como crédito si cancelas con 30 o más días. Detalles completos en la política de cancelación.",
    },
    {
      q: "¿Cómo se carga el carrito y cuánto dura la batería?",
      a: "Se conecta a un tomacorriente estándar con el cargador incluido; la carga completa toma 8–10 horas (ideal de noche). Autonomía según batería: plomo-ácido 25–40 km, litio estándar 105 Ah 60–70 km, litio de largo alcance 150 Ah 85–95 km.",
    },
    {
      q: "¿Cuántas personas caben?",
      a: "Los modelos de 4 plazas (2+2) cargan hasta 360 kg y los de 6 plazas (4+2) hasta 540 kg. Todos los pasajeros deben ir sentados; no se permite exceder la capacidad.",
    },
    {
      q: "¿Un “día de renta” es un día calendario?",
      a: "No — es un período de 24 horas desde la hora exacta de entrega. Si te entregamos el 30 de junio a las 11:00am, tu día 1 termina el 1 de julio a las 11:00am. Hay 60 minutos de gracia en la devolución.",
    },
    {
      q: "¿Trabajan con concierges y property managers?",
      a: "Sí — el Programa de Aliados ofrece tarifa preferencial, cuenta mensual a crédito para aliados aprobados, disponibilidad prioritaria y reporte por villa. Escríbenos por WhatsApp para conocer la tarifa de aliado.",
    },
  ],
  en: [
    {
      q: "What does a BOLT golf cart rental include?",
      a: "A charger for overnight charging, a usage briefing at delivery and 24/7 WhatsApp support in English and Spanish. Delivery and pickup at your villa carry a fixed transport fee by zone (from US$60 per trip, free on longer stays).",
    },
    {
      q: "How much does it cost?",
      a: "4-seaters start at US$50/day and 6-seaters at US$65/day. Tax (18% ITBIS) is shown per model on the pricing page. Transport is charged separately by zone (from US$60 per trip, free on longer stays). For 7+ nights, ask about discounted weekly and monthly rates.",
    },
    {
      q: "Is delivery free?",
      a: "Transport is a fixed round-trip fee (delivery + pickup) per trailer trip: US$60 to Puntacana Resort & Club, Cap Cana and Bávaro, and US$120 to Uvero Alto / Macao; other areas are quoted. It's free on bookings of 5+ days (Puntacana Resort & Club and Cap Cana) and 10+ days (Bávaro). Paid with the booking; 18% tax added.",
    },
    {
      q: "What do I need to drive the cart?",
      a: "Be 18 or older with a valid driver's license. Use is allowed only inside residential communities, villas and resorts — driving on the beach, sand or public roads is prohibited.",
    },
    {
      q: "Which areas do you deliver to?",
      a: "Puntacana Resort & Club, Cap Cana and Bávaro with a fixed US$60 transport fee per trip (free on longer stays), and Uvero Alto / Macao at US$120. Casa de Campo and La Romana are available for rentals of 7 days or more, with transport quoted separately.",
    },
    {
      q: "How is my booking confirmed?",
      a: "You send an availability request, our team checks the fleet and replies on WhatsApp — never an automatic confirmation. The booking is secured with a 50% deposit; the balance is due on delivery.",
    },
    {
      q: "Is there a damage deposit?",
      a: "Yes, a refundable US$200 held at delivery and returned after the return inspection, less any damage charges or penalties if applicable.",
    },
    {
      q: "Can I cancel or change dates?",
      a: "You get one free date change with 48h notice, subject to availability. If you cancel with more than 48h notice in standard season, your advance is kept as credit valid for 12 months; with less than 48h or a no-show it is forfeited. In high season (Dec 20–Jan 6 and Holy Week) the advance is non-refundable and is kept as credit only if you cancel 30+ days ahead. Full details on the cancellation policy page.",
    },
    {
      q: "How does charging work and how far does a charge go?",
      a: "Plug into a standard outlet with the included charger; a full charge takes 8–10 hours (perfect overnight). Range by battery: lead-acid 25–40 km, standard 105 Ah lithium 60–70 km, long-range 150 Ah lithium 85–95 km.",
    },
    {
      q: "How many people fit?",
      a: "4-seaters (2+2) carry up to 360 kg and 6-seaters (4+2) up to 540 kg. All passengers must remain seated; exceeding capacity is not allowed.",
    },
    {
      q: "Is a “rental day” a calendar day?",
      a: "No — it's a 24-hour period from the exact delivery time. If we deliver June 30 at 11:00am, day 1 ends July 1 at 11:00am. There's a 60-minute grace window on return.",
    },
    {
      q: "Do you work with concierges and property managers?",
      a: "Yes — the Partner Program offers preferred rates, a monthly credit account for approved partners, priority availability and per-villa reporting. Message us on WhatsApp for partner rates.",
    },
  ],
};

const T = {
  es: {
    kicker: "Ayuda",
    h1: "Preguntas frecuentes",
    intro: "Todo lo que los huéspedes nos preguntan antes de reservar — respondido claro.",
    policy: "Ver política de cancelación completa →",
    policyHref: "/politica",
    cta: "Solicitar disponibilidad",
    ctaHref: "/solicitar-disponibilidad",
  },
  en: {
    kicker: "Help",
    h1: "Frequently asked questions",
    intro: "Everything guests ask us before booking — answered clearly.",
    policy: "See the full cancellation policy →",
    policyHref: "/en/policy",
    cta: "Request availability",
    ctaHref: "/en/request-availability",
  },
} as const;

export function FaqView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const faqs = FAQS[locale];
  return (
    <>
      <script {...JsonLdScriptProps(faqSchema(faqs))} />
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-4 text-white/70">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-card border border-line bg-white p-6 open:bg-cream/50">
              <summary className="cursor-pointer list-none font-display text-base font-bold text-ink marker:content-none">
                <span aria-hidden="true" className="mr-2 inline-block text-volt-dark transition-transform group-open:rotate-90">
                  ›
                </span>
                {f.q}
              </summary>
              <p className="mt-3 pl-6 text-sm leading-relaxed text-inktext">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={t.ctaHref}
            className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.cta}
          </Link>
          <Link href={t.policyHref} className="text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark">
            {t.policy}
          </Link>
        </div>
      </section>
    </>
  );
}
