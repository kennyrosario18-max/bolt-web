import Link from "next/link";
import { BoltLogo } from "./logo";
import { BoltIcon } from "@/components/icons";
import { CONTACT, SLOGAN, ZONES, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const T = {
  es: {
    tagline: "Renta y venta de golf carts premium en Punta Cana.",
    taglineSub: "Premium golf cart rental & sales in Punta Cana.",
    zones: "Zonas",
    zoneNote: " · reservas 7+ días",
    contact: "Contacto",
    waMsg: "Hola BOLT, quiero información sobre la renta de un golf cart.",
    links: [
      { href: "/precios", label: "Precios" },
      { href: "/servicios", label: "Servicios" },
      { href: "/flota", label: "Flota" },
      { href: "/venta", label: "Venta" },
      { href: "/aliados", label: "Programa de Aliados" },
      { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
      { href: "/soporte", label: "Soporte y manual" },
      { href: "/politica", label: "Política de cancelación" },
      { href: "/terminos", label: "Términos y condiciones" },
      { href: "/privacidad", label: "Privacidad" },
      { href: "/deposito", label: "Datos de depósito" },
      { href: "/nosotros", label: "Nosotros" },
      { href: "/blog", label: "Blog" },
      { href: "/contacto", label: "Contacto" },
    ],
    cta: "Solicitar disponibilidad",
    ctaHref: "/solicitar-disponibilidad",
    zoneHref: (id: string) => `/alquiler/${id}`,
    legal: "BOLT ⚡ es una marca operada por",
  },
  en: {
    tagline: "Premium golf cart rental & sales in Punta Cana.",
    taglineSub: "Renta y venta de golf carts premium en Punta Cana.",
    zones: "Zones",
    zoneNote: " · 7+ day rentals",
    contact: "Contact",
    waMsg: "Hi BOLT, I would like information about renting a golf cart.",
    links: [
      { href: "/en/pricing", label: "Pricing" },
      { href: "/en/services", label: "Services" },
      { href: "/en/fleet", label: "Fleet" },
      { href: "/en/golf-carts-for-sale", label: "For sale" },
      { href: "/en/partners", label: "Partner Program" },
      { href: "/en/faq", label: "FAQ" },
      { href: "/en/support", label: "Support & manual" },
      { href: "/en/policy", label: "Cancellation policy" },
      { href: "/en/terms", label: "Terms & conditions" },
      { href: "/en/privacy", label: "Privacy" },
      { href: "/en/deposit", label: "Deposit details" },
      { href: "/en/about", label: "About us" },
      { href: "/en/blog", label: "Blog" },
      { href: "/en/contact", label: "Contact" },
    ],
    cta: "Request availability",
    ctaHref: "/en/request-availability",
    zoneHref: (id: string) => `/en/rentals/${id}`,
    legal: "BOLT ⚡ is a brand operated by",
  },
} as const;

export function Footer({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  return (
    // pb-20 en móvil: deja libre la franja que ocupa la barra CTA fija (MobileCta)
    <footer className="bg-ink pb-20 text-white lg:pb-0" id="contacto">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <BoltLogo dark />
          <p className="mt-3 text-lg font-display font-bold text-volt">{SLOGAN}</p>
          <p className="mt-2 max-w-xs text-sm text-white/60">
            {t.tagline}
            <span lang={locale === "es" ? "en" : "es"} className="mt-1 block italic text-white/60">{t.taglineSub}</span>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">{t.zones}</h2>
          <ul className="mt-3 space-y-0.5 text-sm text-white/80">
            {ZONES.map((z) => (
              <li key={z.id}>
                <Link href={t.zoneHref(z.id)} className="inline-block py-1 hover:text-volt">
                  {z.name}
                </Link>
                {z.minDays ? <span className="text-white/55">{t.zoneNote}</span> : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">BOLT</h2>
          <ul className="mt-3 space-y-0.5 text-sm text-white/80">
            {t.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 hover:text-volt">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">{t.contact}</h2>
          <ul className="mt-3 space-y-0.5 text-sm text-white/80">
            <li>
              <a
                href={waLink(t.waMsg)}
                className="inline-block py-1 hover:text-volt"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {CONTACT.phoneDisplay} · 24/7
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="inline-block py-1 hover:text-volt">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-white/60">{CONTACT.address}</li>
          </ul>
          <Link
            href={t.ctaHref}
            className="mt-5 inline-block rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-ink"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />
            {t.cta}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:px-6">
          <span>
            {t.legal} {CONTACT.legal}
          </span>
          {/* Año evaluado en build (export estático): un deploy al año lo refresca */}
          <span>© {new Date().getFullYear()} BOLT Golf Cars</span>
        </div>
      </div>
    </footer>
  );
}
