import Link from "next/link";
import { waLink } from "@/content/site";
import { CheckIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { JsonLdScriptProps, breadcrumbSchema } from "@/lib/schema";

/** Anexo de aliados — política de cambios. Vista única ES/EN. Recrea
 *  reservas.boltgolfcars.com/anexo-aliados. Condiciones tal cual del kit. */

const T = {
  es: {
    crumbHome: "Inicio",
    crumbHomeHref: "/",
    partners: "Aliados",
    partnersHref: "/aliados",
    crumb: "Política de cambios",
    crumbAria: "Miga de pan",
    kicker: "Anexo para aliados",
    h1: "Política de cambios para aliados",
    lead: "Flexibilidad para tus reservas de aliado, con reglas claras para todos.",
    rules: [
      { t: "1 cambio gratis por reserva", d: "Sin costo, avisando con al menos 24 horas de antelación." },
      { t: "Desde el 2º cambio", d: "US$40 + ITBIS por cada viaje adicional (transporte del carrito)." },
      { t: "Avisos con menos de 24 h", d: "Sujetos a disponibilidad y a posible cargo de transporte." },
    ],
    note: "Esta política aplica a las reservas hechas bajo el Programa de Aliados. Para dudas o casos especiales, escríbenos por WhatsApp y lo resolvemos.",
    waCta: "Consultar por WhatsApp",
    waMsg: "Hola BOLT, tengo una duda sobre la política de cambios de aliados.",
    back: "← Volver al Programa de Aliados",
  },
  en: {
    crumbHome: "Home",
    crumbHomeHref: "/en",
    partners: "Partners",
    partnersHref: "/en/partners",
    crumb: "Change policy",
    crumbAria: "Breadcrumb",
    kicker: "Partner annex",
    h1: "Partner change policy",
    lead: "Flexibility for your partner bookings, with clear rules for everyone.",
    rules: [
      { t: "1 free change per booking", d: "No charge, with at least 24 hours' notice." },
      { t: "From the 2nd change", d: "US$40 + tax for each additional trip (cart transport)." },
      { t: "Notice under 24 h", d: "Subject to availability and a possible transport charge." },
    ],
    note: "This policy applies to bookings made under the Partner Program. For questions or special cases, message us on WhatsApp and we'll sort it out.",
    waCta: "Ask on WhatsApp",
    waMsg: "Hi BOLT, I have a question about the partner change policy.",
    back: "← Back to the Partner Program",
  },
} as const;

export function PartnerPolicyView({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const es = locale === "es";

  return (
    <>
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: t.crumbHome, path: es ? "/" : "/en/" },
            { name: t.partners, path: es ? "/aliados/" : "/en/partners/" },
            { name: t.crumb, path: es ? "/anexo-aliados/" : "/en/partner-change-policy/" },
          ])
        )}
      />

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <nav aria-label={t.crumbAria} className="text-sm text-white/50">
            <Link href={t.crumbHomeHref} className="hover:text-volt">
              {t.crumbHome}
            </Link>{" "}
            /{" "}
            <Link href={t.partnersHref} className="hover:text-volt">
              {t.partners}
            </Link>{" "}
            / {t.crumb}
          </nav>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-4 text-white/75">{t.lead}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ul className="space-y-4">
          {t.rules.map((r) => (
            <li key={r.t} className="flex items-start gap-3 rounded-card border border-line p-6">
              <CheckIcon className="mt-0.5 shrink-0 text-ok" size={20} />
              <div>
                <h2 className="font-display text-lg font-extrabold">{r.t}</h2>
                <p className="mt-1 text-sm text-inktext">{r.d}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-box bg-cream px-4 py-3 text-sm text-inktext">{t.note}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={waLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink px-6 py-3 text-sm font-bold text-ink hover:bg-cream"
          >
            {t.waCta}
          </a>
          <Link href={t.partnersHref} className="text-sm font-bold text-volt-dark hover:text-ink">
            {t.back}
          </Link>
        </div>
      </section>
    </>
  );
}
