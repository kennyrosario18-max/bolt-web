import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { JsonLdScriptProps, faqSchema } from "@/lib/schema";

/** FAQ consolidada: renta, requisitos, entrega, pagos y políticas (fuentes: precios, política, depósito y manual). */
export const FAQS: Record<Locale, { q: string; a: string }[]> = {
  es: [
    {
      q: "¿Qué incluye la renta de un golf cart BOLT?",
      a: "Entrega y recogida en tu villa o residencial, cargador para carga nocturna, orientación de uso al entregarte el carrito, seguro del vehículo y soporte por WhatsApp 24/7 en español e inglés.",
    },
    {
      q: "¿Cuánto cuesta la renta?",
      a: "Los modelos de 4 plazas van desde US$50/día y los de 6 plazas desde US$65/día. El ITBIS (18%) se muestra por modelo en la página de precios. Para 7 noches o más hay tarifa semanal y mensual con descuento.",
    },
    {
      q: "¿La entrega tiene costo?",
      a: "En rentas de 2 días o más, la entrega y recogida están incluidas sin costo. Para rentas de 1 día aplica US$40 + ITBIS por transporte.",
    },
    {
      q: "¿Qué necesito para manejar el carrito?",
      a: "Ser mayor de 18 años con licencia de conducir vigente. El uso es exclusivo dentro de residenciales, villas y resorts — está prohibido circular por playa, arena o carreteras públicas.",
    },
    {
      q: "¿En qué zonas entregan?",
      a: "Puntacana Resort & Club, Cap Cana y Bávaro con entrega estándar. Casa de Campo y La Romana están disponibles para reservas de 7 días o más, con transporte sujeto a cotización.",
    },
    {
      q: "¿Cómo se confirma mi reserva?",
      a: "Envías tu solicitud de disponibilidad, nuestro equipo la verifica y te responde por WhatsApp — nunca es una confirmación automática. La reserva se asegura con un depósito del 30% del total; el saldo se paga a la entrega.",
    },
    {
      q: "¿Piden depósito de garantía?",
      a: "Sí, US$200 reembolsables que se retienen a la entrega y se devuelven tras la inspección de devolución, descontando daños o penalidades si los hubiera.",
    },
    {
      q: "¿Puedo cancelar o cambiar la fecha?",
      a: "Tienes un cambio de fecha gratis avisando con 48 horas, sujeto a disponibilidad. Las cancelaciones se reembolsan según la antelación (100% con más de 48h en temporada estándar). En temporada alta (20 dic–6 ene y Semana Santa) el depósito no es reembolsable. Detalles completos en la política de cancelación.",
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
      a: "Sí — el Programa de Aliados ofrece tarifa preferencial, cuenta mensual con factura e-CF sin depósito por reserva, disponibilidad prioritaria y reporte por villa. Escríbenos por WhatsApp para conocer la tarifa de aliado.",
    },
  ],
  en: [
    {
      q: "What does a BOLT golf cart rental include?",
      a: "Delivery and pickup at your villa, a charger for overnight charging, a usage briefing at delivery, vehicle insurance and 24/7 WhatsApp support in English and Spanish.",
    },
    {
      q: "How much does it cost?",
      a: "4-seaters start at US$50/day and 6-seaters at US$65/day. Tax (18% ITBIS) is shown per model on the pricing page. For 7+ nights, ask about discounted weekly and monthly rates.",
    },
    {
      q: "Is delivery free?",
      a: "For rentals of 2+ days, delivery and pickup are included at no cost. For 1-day rentals, a US$40 + tax transport fee applies.",
    },
    {
      q: "What do I need to drive the cart?",
      a: "Be 18 or older with a valid driver's license. Use is allowed only inside residential communities, villas and resorts — driving on the beach, sand or public roads is prohibited.",
    },
    {
      q: "Which areas do you deliver to?",
      a: "Puntacana Resort & Club, Cap Cana and Bávaro with standard delivery. Casa de Campo and La Romana are available for rentals of 7 days or more, with transport quoted separately.",
    },
    {
      q: "How is my booking confirmed?",
      a: "You send an availability request, our team checks the fleet and replies on WhatsApp — never an automatic confirmation. The booking is secured with a 30% deposit; the balance is due on delivery.",
    },
    {
      q: "Is there a damage deposit?",
      a: "Yes, a refundable US$200 held at delivery and returned after the return inspection, less any damage charges or penalties if applicable.",
    },
    {
      q: "Can I cancel or change dates?",
      a: "You get one free date change with 48h notice, subject to availability. Cancellations are refunded based on notice (100% with more than 48h in standard season). In high season (Dec 20–Jan 6 and Holy Week) the deposit is non-refundable. Full details on the cancellation policy page.",
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
      a: "Yes — the Partner Program offers preferred rates, a monthly account with e-CF invoicing and no per-booking deposit, priority availability and per-villa reporting. Message us on WhatsApp for partner rates.",
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
    cta: "⚡ Solicitar disponibilidad",
    ctaHref: "/solicitar-disponibilidad",
  },
  en: {
    kicker: "Help",
    h1: "Frequently asked questions",
    intro: "Everything guests ask us before booking — answered clearly.",
    policy: "See the full cancellation policy →",
    policyHref: "/en/policy",
    cta: "⚡ Request availability",
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
                <span className="mr-2 inline-block text-volt-dark transition-transform group-open:rotate-90">
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
            {t.cta}
          </Link>
          <Link href={t.policyHref} className="text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark">
            {t.policy}
          </Link>
        </div>
      </section>
    </>
  );
}
