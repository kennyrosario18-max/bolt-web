import type { Locale } from "@/lib/i18n";

/** Política de cancelación y depósitos — migrada 1:1 de reservas.boltgolfcars.com/politica. */
interface PolicySection {
  n: string;
  title: string;
  body: (string | { rows: [string, string][] })[];
}

const T: Record<Locale, { kicker: string; h1: string; intro: string; accept: string; sections: PolicySection[] }> = {
  es: {
    kicker: "Condiciones",
    h1: "Política de Cancelación y Depósitos",
    intro:
      "Estas condiciones aplican a toda reserva de carrito BOLT. Al confirmar y pagar el depósito, el cliente acepta esta política.",
    accept: "Aceptación: al reservar, el cliente declara haber leído y aceptado esta política.",
    sections: [
      { n: "01", title: "Depósito de confirmación", body: ["30% del total para apartar la reserva. El saldo se paga a la entrega."] },
      {
        n: "02",
        title: "Cancelación — Temporada estándar",
        body: [
          { rows: [["Más de 48h antes de la entrega", "100%"], ["Entre 48h y 24h antes", "50%"], ["Menos de 24h o no-show", "0%"]] },
          "Reembolso del depósito según la antelación.",
        ],
      },
      {
        n: "03",
        title: "Cancelación — Temporada alta",
        body: [
          "Aplica del 20 dic al 6 ene y Semana Santa (jue–dom). En esta temporada el depósito es no reembolsable.",
          { rows: [["Más de 7 días antes", "100%*"], ["Entre 7 días y 72h antes", "50%*"], ["Menos de 72h o no-show", "0%"]] },
          "*Sobre el saldo; el depósito de confirmación no se reembolsa.",
        ],
      },
      {
        n: "04",
        title: "Definición de día de renta",
        body: [
          "Un día de renta es un período de 24 horas desde la hora exacta de entrega — no un día calendario. Ej.: entrega 30 jun 11:00am → el día 1 termina 1 jul 11:00am.",
          "Devolución dentro de 60 minutos de la hora de corte: sin cargo. Después: se factura un día completo adicional.",
        ],
      },
      { n: "05", title: "Cambio de fecha", body: ["Un cambio sin costo avisando con 48h de antelación, sujeto a disponibilidad. Siempre preferible a cancelar."] },
      { n: "06", title: "Devolución anticipada", body: ["Los días no utilizados no se reembolsan; la tarifa se basa en la estadía contratada."] },
      {
        n: "07",
        title: "Renta fraccionada / pausada",
        body: [
          "Si se solicita pausar el uso del carrito dentro del mismo período de renta (días no consecutivos), la tarifa se cobra por el tramo completo — incluyendo los días de pausa — sin importar si el carrito permanece en la villa o es retirado temporalmente.",
          "Si se solicita que BOLT retire y reentregue el carrito durante la pausa, aplica US$40 + ITBIS por cada viaje adicional. Mientras el carrito permanezca en la villa, la custodia y responsabilidad son del cliente.",
        ],
      },
      {
        n: "08",
        title: "Depósito de garantía por daños",
        body: ["US$200 reembolsable, retenido a la entrega y devuelto tras la inspección de devolución, descontando cargos por daños o penalidades del manual."],
      },
      { n: "09", title: "Fuerza mayor / clima", body: ["Ante huracán, tormenta o cierre oficial del resort, se ofrece reprogramación o crédito, no reembolso en efectivo."] },
      { n: "10", title: "Comisiones bancarias", body: ["Los reembolsos se procesan menos las comisiones bancarias o de procesador de pago aplicables."] },
    ],
  },
  en: {
    kicker: "Terms",
    h1: "Cancellation & Deposit Policy",
    intro:
      "These terms apply to every BOLT cart booking. By confirming and paying the deposit, the client accepts this policy.",
    accept: "By booking, the client confirms they have read and accepted this policy.",
    sections: [
      { n: "01", title: "Confirmation deposit", body: ["30% of the total to confirm the booking. Balance due on delivery."] },
      {
        n: "02",
        title: "Cancellation — Standard season",
        body: [
          { rows: [["More than 48h before delivery", "100%"], ["Between 48h and 24h before", "50%"], ["Less than 24h or no-show", "0%"]] },
          "Deposit refunded based on notice.",
        ],
      },
      {
        n: "03",
        title: "Cancellation — High season",
        body: [
          "Applies Dec 20–Jan 6 and Holy Week (Thu–Sun). The deposit is non-refundable in high season.",
          { rows: [["More than 7 days before", "100%*"], ["Between 7 days and 72h before", "50%*"], ["Less than 72h or no-show", "0%"]] },
          "*On the balance; the confirmation deposit is not refunded.",
        ],
      },
      {
        n: "04",
        title: "Rental day definition",
        body: [
          "A rental day is a 24-hour period from the exact delivery time — not a calendar day. E.g.: delivery Jun 30, 11:00am → day 1 ends Jul 1, 11:00am.",
          "Return within 60 minutes of the cutoff: no charge. After that: a full additional day is billed.",
        ],
      },
      { n: "05", title: "Date change", body: ["One free date change with 48h notice, subject to availability. Always preferable to cancelling."] },
      { n: "06", title: "Early return", body: ["Unused days are not refunded; the rate is based on the booked rental period."] },
      {
        n: "07",
        title: "Split / paused rental",
        body: [
          "Pausing use within the same rental period (non-consecutive days) is billed for the full span, including paused days, regardless of whether the cart stays at the villa or is temporarily picked up.",
          "If BOLT is asked to pick up and redeliver during the pause, US$40 + tax applies per extra trip. While the cart stays at the villa, custody and liability remain with the client.",
        ],
      },
      {
        n: "08",
        title: "Damage deposit",
        body: ["US$200 refundable, held at delivery and returned after the return inspection, less any damage charges or manual penalties."],
      },
      { n: "09", title: "Force majeure / weather", body: ["In case of hurricane, storm or official resort closure, we offer rescheduling or credit, not a cash refund."] },
      { n: "10", title: "Bank fees", body: ["Refunds are processed less applicable bank or payment-processor fees."] },
    ],
  },
};

export function PolicyView({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <>
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
        <div className="space-y-8">
          {t.sections.map((s) => (
            <div key={s.n} className="rounded-card border border-line p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-xl font-extrabold text-volt-dark">{s.n}</span>
                <h2 className="font-display text-xl font-extrabold">{s.title}</h2>
              </div>
              {s.body.map((b, i) =>
                typeof b === "string" ? (
                  <p key={i} className="mt-3 text-sm text-inktext">
                    {b}
                  </p>
                ) : (
                  <div key={i} className="mt-4 overflow-hidden rounded-box border border-line">
                    {b.rows.map(([label, val]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-4 border-b border-line bg-cream/60 px-4 py-3 text-sm last:border-b-0"
                      >
                        <span className="text-inktext">{label}</span>
                        <span className="font-display text-base font-extrabold">{val}</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-box bg-cream px-5 py-4 text-sm font-semibold text-ink">{t.accept}</p>
      </section>
    </>
  );
}
