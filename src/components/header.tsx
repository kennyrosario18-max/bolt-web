import Link from "next/link";
import { BoltLogo } from "./logo";
import { BoltIcon } from "@/components/icons";
import { HeaderEnhance } from "./header-enhance";
import { CONTACT, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Cabecera del sitio — server component, sin hidratación React.
 *  · Menú móvil: Popover API nativo (toggle/Escape/click-fuera/foco sin JS).
 *  · Switcher de idioma: href de respaldo (home del otro idioma) mejorado por
 *    <HeaderEnhance> a la ruta equivalente exacta + query. El hreflang del
 *    <head> mantiene la paridad para buscadores pase lo que pase. */

const NAV: Record<Locale, { href: string; label: string }[]> = {
  es: [
    { href: "/flota", label: "Flota" },
    { href: "/precios", label: "Precios" },
    { href: "/#zonas", label: "Zonas" },
    { href: "/servicios", label: "Servicios" },
    { href: "/blog", label: "Blog" },
  ],
  en: [
    { href: "/en/fleet", label: "Fleet" },
    { href: "/en/pricing", label: "Pricing" },
    { href: "/en#zones", label: "Zones" },
    { href: "/en/services", label: "Services" },
  ],
};

const CTA: Record<Locale, { href: string; label: string }> = {
  es: { href: "/solicitar-disponibilidad", label: "Solicitar disponibilidad" },
  en: { href: "/en/request-availability", label: "Request availability" },
};

const WA_MSG: Record<Locale, string> = {
  es: "Hola BOLT, quiero información sobre la renta de un golf cart.",
  en: "Hi BOLT, I would like information about renting a golf cart.",
};

export function Header({ locale = "es" }: { locale?: Locale }) {
  const es = locale === "es";
  const otherLabel = es ? "EN" : "ES";
  const otherHome = es ? "/en" : "/"; // respaldo sin-JS; el shim lo hace exacto
  const langAria = es ? "Switch to English" : "Cambiar a español";

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={es ? "/" : "/en"} aria-label={es ? "BOLT — inicio" : "BOLT — home"}>
          <BoltLogo dark />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label={es ? "Principal" : "Main"}>
          {NAV[locale].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-volt"
            >
              {item.label}
            </Link>
          ))}
          <a
            data-langswitch
            href={otherHome}
            aria-label={langAria}
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold text-white/80 transition-colors hover:border-volt hover:text-volt"
          >
            {otherLabel}
          </a>
          <Link
            href={CTA[locale].href}
            className="rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />
            {CTA[locale].label}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            data-langswitch
            href={otherHome}
            aria-label={langAria}
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold text-white/80"
          >
            {otherLabel}
          </a>
          <button
            type="button"
            id="nav-toggle"
            popoverTarget="nav-movil"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-expanded="false"
            aria-controls="nav-movil"
            aria-label={es ? "Menú" : "Menu"}
          >
            <span className="nav-line nav-l1 h-0.5 w-6 bg-white transition-transform" />
            <span className="nav-line nav-l2 h-0.5 w-6 bg-white transition-opacity" />
            <span className="nav-line nav-l3 h-0.5 w-6 bg-white transition-transform" />
          </button>
        </div>
      </div>

      <nav
        id="nav-movil"
        popover="auto"
        className="fixed inset-x-0 top-16 bottom-auto z-40 m-0 max-h-[calc(100dvh-4rem)] w-full max-w-full overflow-y-auto border-x-0 border-b-0 border-t border-white/10 bg-ink px-4 pb-6 pt-2 text-white md:hidden"
        aria-label={es ? "Principal móvil" : "Main mobile"}
      >
        {NAV[locale].map((item) => (
          <Link key={item.href} href={item.href} className="block py-3 text-base font-medium text-white/90">
            {item.label}
          </Link>
        ))}
        <div className="mt-3 flex flex-col gap-3">
          <Link
            href={CTA[locale].href}
            className="rounded-full bg-volt px-5 py-3 text-center text-sm font-bold text-ink"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />
            {CTA[locale].label}
          </Link>
          <a
            href={waLink(WA_MSG[locale])}
            className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {CONTACT.phoneDisplay}
          </a>
        </div>
      </nav>

      <HeaderEnhance />
    </header>
  );
}
