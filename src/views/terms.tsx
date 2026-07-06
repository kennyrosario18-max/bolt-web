import Link from "next/link";
import { CONTACT } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Términos y Condiciones — unifica las prácticas ya publicadas (política, depósito, manual).
    Última actualización: 6 de julio de 2026. */

interface Section {
  n: string;
  title: string;
  body: string[];
}

const T: Record<
  Locale,
  {
    kicker: string;
    h1: string;
    updated: string;
    intro: string;
    sections: Section[];
    accept: string;
    policyLink: string;
    policyHref: string;
    privacyLink: string;
    privacyHref: string;
  }
> = {
  es: {
    kicker: "Legal",
    h1: "Términos y Condiciones",
    updated: "Última actualización: 6 de julio de 2026",
    intro:
      "Estos términos rigen la renta de golf carts y los servicios de BOLT. Al enviar una solicitud y confirmar una reserva con el pago del depósito, el cliente acepta estos términos junto con la Política de Cancelación y Depósitos.",
    sections: [
      {
        n: "01",
        title: "Quiénes somos",
        body: [
          "BOLT es una marca comercial operada y representada legalmente por KR Experts and Management SRL (RNC 132-22400-2), con domicilio en Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro, La Altagracia, República Dominicana. Contacto: +1 809 839 8515 · info@krexpert.com.",
        ],
      },
      {
        n: "02",
        title: "El servicio",
        body: [
          "BOLT renta golf carts con entrega y recogida en villas y residenciales dentro de sus zonas de cobertura, y vende unidades nuevas. La renta incluye cargador, orientación de uso, seguro del vehículo y soporte por WhatsApp 24/7 en español e inglés.",
          "Las solicitudes de reserva se confirman siempre por una persona del equipo — ninguna reserva se confirma automáticamente. La disponibilidad está sujeta a flota.",
        ],
      },
      {
        n: "03",
        title: "Reserva y pagos",
        body: [
          "La reserva se asegura con un depósito de confirmación del 30% del total; el saldo se paga a la entrega. A la entrega se retiene además un depósito de garantía de US$200, reembolsable tras la inspección de devolución, descontando cargos por daños o penalidades si los hubiera.",
          "Los precios se publican en US$ por día; el ITBIS (18%) se muestra por modelo. Un día de renta es un período de 24 horas desde la hora exacta de entrega, con 60 minutos de gracia en la devolución.",
        ],
      },
      {
        n: "04",
        title: "Requisitos del conductor",
        body: [
          "Todo conductor debe ser mayor de 18 años y contar con licencia de conducir vigente. El cliente es responsable de que solo personas que cumplan estos requisitos operen el vehículo durante la renta.",
        ],
      },
      {
        n: "05",
        title: "Uso permitido",
        body: [
          "El golf cart es para uso exclusivo dentro de residenciales, villas y resorts, respetando las normas internas de cada comunidad y el límite BOLT de 25 km/h en zonas residenciales.",
          "Está prohibido: circular por playa, arena, carreteras públicas o zonas no autorizadas; conducir bajo efectos de alcohol, drogas o medicación que afecte la capacidad; llevar pasajeros de pie o exceder la capacidad del vehículo (4 plazas: 360 kg · 6 plazas: 540 kg); la conducción temeraria, acrobacias o el uso comercial no autorizado.",
        ],
      },
      {
        n: "06",
        title: "Custodia y responsabilidad del cliente",
        body: [
          "Desde la entrega hasta la recogida, la custodia del vehículo es del cliente. El cliente responde por daños, pérdidas o penalidades derivados del uso en violación de estos términos, según la tabla de penalidades publicada en la página de Soporte.",
          "En caso de accidente o falla: notificar de inmediato por WhatsApp, no mover el vehículo y esperar instrucciones del equipo BOLT.",
        ],
      },
      {
        n: "07",
        title: "Seguro",
        body: [
          "Las unidades BOLT están aseguradas. La cobertura no ampara daños ocasionados por uso en violación de estos términos (zonas prohibidas, conductor sin licencia o menor de edad, conducción bajo efectos de alcohol o drogas, sobrecarga o conducción temeraria).",
        ],
      },
      {
        n: "08",
        title: "Cancelaciones, cambios y devoluciones",
        body: [
          "Aplica la Política de Cancelación y Depósitos publicada en este sitio, que incluye los plazos de reembolso, las condiciones de temporada alta, el cambio de fecha gratuito con 48 horas de aviso y las reglas de devolución anticipada y renta pausada.",
        ],
      },
      {
        n: "09",
        title: "Fuerza mayor",
        body: [
          "Ante huracán, tormenta o cierre oficial del resort, se ofrece reprogramación o crédito, no reembolso en efectivo, conforme a la Política de Cancelación.",
        ],
      },
      {
        n: "10",
        title: "Venta de unidades nuevas",
        body: [
          "Las unidades nuevas se venden con garantía por escrito e inducción de uso. Las condiciones específicas de cada venta (modelo, precio, garantía y entrega) se acuerdan por escrito en la cotización correspondiente.",
        ],
      },
      {
        n: "11",
        title: "Ley aplicable",
        body: [
          "Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia se someterá a los tribunales competentes de la República Dominicana.",
        ],
      },
    ],
    accept:
      "Al reservar, el cliente declara haber leído y aceptado estos Términos y Condiciones, la Política de Cancelación y Depósitos y la Política de Privacidad.",
    policyLink: "Política de Cancelación y Depósitos →",
    policyHref: "/politica",
    privacyLink: "Política de Privacidad →",
    privacyHref: "/privacidad",
  },
  en: {
    kicker: "Legal",
    h1: "Terms & Conditions",
    updated: "Last updated: July 6, 2026",
    intro:
      "These terms govern BOLT golf cart rentals and services. By sending a request and confirming a booking with the deposit payment, the client accepts these terms together with the Cancellation & Deposit Policy.",
    sections: [
      {
        n: "01",
        title: "Who we are",
        body: [
          "BOLT is a commercial brand operated and legally represented by KR Experts and Management SRL (Tax ID/RNC 132-22400-2), based at Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro, La Altagracia, Dominican Republic. Contact: +1 809 839 8515 · info@krexpert.com.",
        ],
      },
      {
        n: "02",
        title: "The service",
        body: [
          "BOLT rents golf carts with delivery and pickup at villas and residential communities within its coverage areas, and sells new units. Rentals include a charger, usage briefing, vehicle insurance and 24/7 WhatsApp support in English and Spanish.",
          "Booking requests are always confirmed by a member of our team — no booking is ever confirmed automatically. Availability is subject to fleet.",
        ],
      },
      {
        n: "03",
        title: "Booking and payments",
        body: [
          "Bookings are secured with a 30% confirmation deposit; the balance is due on delivery. At delivery, a refundable US$200 damage deposit is also held and returned after the return inspection, less any damage charges or penalties if applicable.",
          "Prices are published in US$ per day; tax (18% ITBIS) is shown per model. A rental day is a 24-hour period from the exact delivery time, with a 60-minute grace window on return.",
        ],
      },
      {
        n: "04",
        title: "Driver requirements",
        body: [
          "Every driver must be 18 or older and hold a valid driver's license. The client is responsible for ensuring that only people meeting these requirements operate the vehicle during the rental.",
        ],
      },
      {
        n: "05",
        title: "Permitted use",
        body: [
          "The golf cart is for use exclusively inside residential communities, villas and resorts, following each community's internal rules and BOLT's 25 km/h limit in residential zones.",
          "The following are prohibited: driving on the beach, sand, public roads or unauthorized areas; driving under the influence of alcohol, drugs or impairing medication; standing passengers or exceeding vehicle capacity (4 seats: 360 kg · 6 seats: 540 kg); reckless driving, stunts or unauthorized commercial use.",
        ],
      },
      {
        n: "06",
        title: "Custody and client responsibility",
        body: [
          "From delivery to pickup, custody of the vehicle rests with the client. The client is liable for damage, losses or penalties arising from use in violation of these terms, per the penalty reference published on the Support page.",
          "In case of an accident or failure: notify us immediately via WhatsApp, do not move the vehicle and wait for instructions from the BOLT team.",
        ],
      },
      {
        n: "07",
        title: "Insurance",
        body: [
          "BOLT units are insured. Coverage does not extend to damage caused by use in violation of these terms (prohibited areas, unlicensed or underage drivers, driving under the influence, overloading or reckless driving).",
        ],
      },
      {
        n: "08",
        title: "Cancellations, changes and returns",
        body: [
          "The Cancellation & Deposit Policy published on this site applies, including refund windows, high-season conditions, the free date change with 48-hour notice, and the rules for early returns and paused rentals.",
        ],
      },
      {
        n: "09",
        title: "Force majeure",
        body: [
          "In case of hurricane, storm or official resort closure, we offer rescheduling or credit, not a cash refund, per the Cancellation Policy.",
        ],
      },
      {
        n: "10",
        title: "New unit sales",
        body: [
          "New units are sold with a written warranty and usage induction. The specific conditions of each sale (model, price, warranty and delivery) are agreed in writing in the corresponding quote.",
        ],
      },
      {
        n: "11",
        title: "Governing law",
        body: [
          "These terms are governed by the laws of the Dominican Republic. Any dispute shall be submitted to the competent courts of the Dominican Republic.",
        ],
      },
    ],
    accept:
      "By booking, the client confirms they have read and accepted these Terms & Conditions, the Cancellation & Deposit Policy and the Privacy Policy.",
    policyLink: "Cancellation & Deposit Policy →",
    policyHref: "/en/policy",
    privacyLink: "Privacy Policy →",
    privacyHref: "/en/privacy",
  },
};

export function TermsView({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-2 text-sm text-white/50">{t.updated}</p>
          <p className="mt-4 text-white/70">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-6">
          {t.sections.map((s) => (
            <div key={s.n} className="rounded-card border border-line p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-xl font-extrabold text-volt-dark">{s.n}</span>
                <h2 className="font-display text-xl font-extrabold">{s.title}</h2>
              </div>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-inktext">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-box bg-cream px-5 py-4 text-sm font-semibold text-ink">
          {t.accept}
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
          <Link href={t.policyHref} className="text-ink underline underline-offset-4 hover:text-volt-dark">
            {t.policyLink}
          </Link>
          <Link href={t.privacyHref} className="text-ink underline underline-offset-4 hover:text-volt-dark">
            {t.privacyLink}
          </Link>
        </div>
        <p className="mt-8 text-xs text-steel">{CONTACT.legal}</p>
      </section>
    </>
  );
}
