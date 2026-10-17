import { CONTACT } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Política de Privacidad — basada en las prácticas reales de BOLT y la Ley 172-13 (RD).
    Última actualización: 17 de octubre de 2026 (analítica sin cookies y copia de solicitudes por correo). */

interface Section {
  n: string;
  title: string;
  body: string[];
  bullets?: string[];
}

const T: Record<
  Locale,
  { kicker: string; h1: string; updated: string; intro: string; sections: Section[] }
> = {
  es: {
    kicker: "Legal",
    h1: "Política de Privacidad",
    updated: "Última actualización: 17 de octubre de 2026",
    intro:
      "En BOLT tratamos tus datos personales con la misma claridad que nuestros precios: recogemos solo lo necesario para atenderte, no vendemos tus datos y respondemos cualquier duda por WhatsApp o correo.",
    sections: [
      {
        n: "01",
        title: "Responsable del tratamiento",
        body: [
          "KR Experts and Management SRL (RNC 132-22400-2), Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro, La Altagracia, República Dominicana. Contacto: info@krexpert.com · +1 809 839 8515.",
        ],
      },
      {
        n: "02",
        title: "Qué datos recogemos",
        body: ["Cuando envías una solicitud de disponibilidad o nos escribes, podemos recibir:"],
        bullets: [
          "Nombre completo",
          "Correo electrónico y número de WhatsApp",
          "Fechas de tu estadía, zona o villa de entrega y cantidad de pasajeros",
          "Los comentarios que decidas incluir",
          "Para facturación con comprobante fiscal (e-CF): los datos fiscales que nos proporciones",
        ],
      },
      {
        n: "03",
        title: "Para qué los usamos",
        body: ["Usamos tus datos exclusivamente para:"],
        bullets: [
          "Verificar disponibilidad y gestionar tu reserva o compra",
          "Comunicarnos contigo por WhatsApp, teléfono o correo sobre tu solicitud",
          "Coordinar la entrega, el soporte durante la renta y la devolución",
          "Emitir facturas y cumplir obligaciones fiscales y contables",
        ],
      },
      {
        n: "04",
        title: "Base legal",
        body: [
          "Tratamos tus datos con base en tu consentimiento (al enviarnos tu solicitud) y en la ejecución de la relación comercial que solicitas, conforme a la Ley 172-13 sobre Protección de Datos de Carácter Personal de la República Dominicana.",
        ],
      },
      {
        n: "05",
        title: "Con quién se comparten",
        body: [
          "No vendemos ni alquilamos tus datos a terceros. Tus mensajes por WhatsApp se transmiten a través de la plataforma de WhatsApp (Meta), sujeta a sus propias políticas de privacidad. Cuando envías una solicitud desde el sitio, una copia nos llega por correo a través de Web3Forms, un servicio de envío de formularios que procesa esos datos solo para entregarnos el mensaje. Podemos compartir datos con autoridades fiscales cuando la ley lo requiera (por ejemplo, en la facturación e-CF).",
        ],
      },
      {
        n: "06",
        title: "Cookies y analítica",
        body: [
          "Este sitio no utiliza cookies de rastreo ni publicidad. Para saber cuántas personas nos visitan y qué canales funcionan, usamos Umami, una herramienta de analítica sin cookies: registra datos agregados (página visitada, país, tipo de dispositivo, sitio desde el que llegaste y clics en nuestros botones de contacto) sin identificarte y sin guardar tu dirección IP. Cuando envías una solicitud, anotamos también el origen de tu visita (por ejemplo, \"google\" o \"instagram\") en nuestro correo interno, solo para medir qué canal te trajo. Si incorporamos otra herramienta de medición, actualizaremos esta política antes de activarla.",
        ],
      },
      {
        n: "07",
        title: "Conservación",
        body: [
          "Conservamos tus datos mientras dure la relación comercial y por el tiempo que exijan las obligaciones fiscales y contables dominicanas. Después, se eliminan o anonimizan.",
        ],
      },
      {
        n: "08",
        title: "Tus derechos",
        body: [
          "Puedes solicitar en cualquier momento el acceso, la rectificación, la cancelación o la oposición al tratamiento de tus datos (derechos reconocidos por la Ley 172-13) escribiendo a info@krexpert.com o por WhatsApp al +1 809 839 8515. Respondemos lo antes posible.",
        ],
      },
      {
        n: "09",
        title: "Seguridad",
        body: [
          "Aplicamos medidas razonables de seguridad para proteger tus datos: acceso limitado al equipo que gestiona reservas y registros en sistemas administrados con credenciales propias.",
        ],
      },
      {
        n: "10",
        title: "Cambios a esta política",
        body: [
          "Si esta política cambia, publicaremos la versión actualizada en esta misma página con su fecha de actualización.",
        ],
      },
    ],
  },
  en: {
    kicker: "Legal",
    h1: "Privacy Policy",
    updated: "Last updated: October 17, 2026",
    intro:
      "At BOLT we treat your personal data with the same clarity as our pricing: we collect only what we need to serve you, we never sell your data, and we answer any question via WhatsApp or email.",
    sections: [
      {
        n: "01",
        title: "Data controller",
        body: [
          "KR Experts and Management SRL (Tax ID/RNC 132-22400-2), Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro, La Altagracia, Dominican Republic. Contact: info@krexpert.com · +1 809 839 8515.",
        ],
      },
      {
        n: "02",
        title: "What data we collect",
        body: ["When you send an availability request or message us, we may receive:"],
        bullets: [
          "Full name",
          "Email address and WhatsApp number",
          "Your stay dates, delivery zone or villa, and number of passengers",
          "Any comments you choose to include",
          "For tax-receipt invoicing (e-CF): the fiscal details you provide",
        ],
      },
      {
        n: "03",
        title: "How we use it",
        body: ["We use your data exclusively to:"],
        bullets: [
          "Check availability and manage your booking or purchase",
          "Communicate with you via WhatsApp, phone or email about your request",
          "Coordinate delivery, support during the rental, and return",
          "Issue invoices and meet tax and accounting obligations",
        ],
      },
      {
        n: "04",
        title: "Legal basis",
        body: [
          "We process your data based on your consent (when you send your request) and on the performance of the commercial relationship you request, in accordance with Dominican Law 172-13 on Personal Data Protection.",
        ],
      },
      {
        n: "05",
        title: "Who we share it with",
        body: [
          "We do not sell or rent your data to third parties. Your WhatsApp messages are transmitted through the WhatsApp platform (Meta), subject to its own privacy policies. When you send a request from the site, a copy reaches us by email through Web3Forms, a form-delivery service that processes that data only to deliver the message to us. We may share data with tax authorities where required by law (for example, e-CF invoicing).",
        ],
      },
      {
        n: "06",
        title: "Cookies and analytics",
        body: [
          "This site does not use tracking or advertising cookies. To know how many people visit us and which channels work, we use Umami, a cookie-free analytics tool: it records aggregated data (page visited, country, device type, the site you came from and clicks on our contact buttons) without identifying you and without storing your IP address. When you send a request, we also note the origin of your visit (for example \"google\" or \"instagram\") in our internal email, only to measure which channel brought you. If we add another measurement tool, we will update this policy before enabling it.",
        ],
      },
      {
        n: "07",
        title: "Retention",
        body: [
          "We keep your data for as long as the commercial relationship lasts and as required by Dominican tax and accounting obligations. After that, it is deleted or anonymized.",
        ],
      },
      {
        n: "08",
        title: "Your rights",
        body: [
          "You may request access, rectification, deletion or objection to the processing of your data at any time (rights recognized by Law 172-13) by writing to info@krexpert.com or via WhatsApp at +1 809 839 8515. We reply as soon as possible.",
        ],
      },
      {
        n: "09",
        title: "Security",
        body: [
          "We apply reasonable security measures to protect your data: access limited to the team that manages bookings, and records kept in systems managed with individual credentials.",
        ],
      },
      {
        n: "10",
        title: "Changes to this policy",
        body: [
          "If this policy changes, we will publish the updated version on this page with its update date.",
        ],
      },
    ],
  },
};

export function PrivacyView({ locale }: { locale: Locale }) {
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
              {s.bullets ? (
                <ul className="mt-3 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-inktext">
                      <span className="font-bold text-volt-dark" aria-hidden="true">
                        ·
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-steel">{CONTACT.legal}</p>
      </section>
    </>
  );
}
