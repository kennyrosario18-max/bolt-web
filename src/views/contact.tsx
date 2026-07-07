import Link from "next/link";
import { CONTACT, waLink } from "@/content/site";
import { BoltIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

const T = {
  es: {
    kicker: "Contacto",
    h1: "Hablemos — respondemos rápido",
    intro: "WhatsApp es nuestra vía más rápida, atendida 24/7 en español e inglés.",
    waMsg: "Hola BOLT, quiero información sobre la renta de un golf cart.",
    wa: "Escribir por WhatsApp",
    call: "Llamar",
    mail: "Escribir un correo",
    visit: "Nuestra base",
    hours: "Soporte por WhatsApp 24/7 · Entregas coordinadas a tu horario",
    datesQ: "¿Ya tienes fechas?",
    request: "Solicitar disponibilidad →",
    requestHref: "/solicitar-disponibilidad",
  },
  en: {
    kicker: "Contact",
    h1: "Let's talk — we answer fast",
    intro: "WhatsApp is our fastest channel, staffed 24/7 in English and Spanish.",
    waMsg: "Hi BOLT, I would like information about renting a golf cart.",
    wa: "Message us on WhatsApp",
    call: "Call",
    mail: "Send an email",
    visit: "Our base",
    hours: "24/7 WhatsApp support · Deliveries scheduled around you",
    datesQ: "Got your dates?",
    request: "Request availability →",
    requestHref: "/en/request-availability",
  },
} as const;

export function ContactView({ locale }: { locale: Locale }) {
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
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={waLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-card bg-ink p-7 text-white transition-transform hover:scale-[1.02]"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-volt">WhatsApp · 24/7</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-white">{CONTACT.phoneDisplay}</p>
            <p className="mt-2 text-sm text-white/70">{t.wa} →</p>
          </a>
          <a href={`tel:+${CONTACT.whatsapp}`} className="rounded-card border border-line p-7 transition-shadow hover:shadow-lg">
            <p className="text-xs font-bold uppercase tracking-wider text-volt-dark">{t.call}</p>
            <p className="mt-2 font-display text-2xl font-extrabold">{CONTACT.phoneDisplay}</p>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="rounded-card border border-line p-7 transition-shadow hover:shadow-lg">
            <p className="text-xs font-bold uppercase tracking-wider text-volt-dark">Email</p>
            <p className="mt-2 font-display text-xl font-extrabold">{CONTACT.email}</p>
            <p className="mt-2 text-sm text-steel">{t.mail} →</p>
          </a>
          <div className="rounded-card bg-cream p-7">
            <p className="text-xs font-bold uppercase tracking-wider text-volt-dark">{t.visit}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{CONTACT.address}</p>
            <p className="mt-2 text-sm text-steel">{t.hours}</p>
          </div>
        </div>

        {/* Pregunta fuera de la píldora: a 320px el texto completo partía el botón en 2 líneas. */}
        <p className="mt-8 text-sm font-semibold text-ink">{t.datesQ}</p>
        <Link
          href={t.requestHref}
          className="mt-3 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
        >
          <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.request}
        </Link>
        <p className="mt-8 text-xs text-steel">{CONTACT.legal}</p>
      </section>
    </>
  );
}
