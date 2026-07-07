import Link from "next/link";
import { BoltLogo } from "./logo";
import { BoltIcon } from "@/components/icons";
import { HeaderEnhance } from "./header-enhance";
import { MODELS, lineName, type Model } from "@/content/models";
import { modelPrice } from "@/content/pricing";
import { CONTACT, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Cabecera del sitio — server component, sin hidratación React.
 *  · Menú móvil: Popover API nativo (toggle/Escape/click-fuera/foco sin JS).
 *  · Mega-menú de Flota (desktop): panel glass con modelos por línea + precio,
 *    abierto por CSS group-hover/focus-within (sin JS, teclado-accesible).
 *  · Header gana glass+sombra al hacer scroll (clase .is-scrolled del shim).
 *  · Switcher de idioma: href de respaldo mejorado por <HeaderEnhance>. */

const NAV: Record<Locale, { href: string; label: string }[]> = {
  es: [
    { href: "/precios", label: "Precios" },
    { href: "/venta", label: "Venta" },
    { href: "/#zonas", label: "Zonas" },
    { href: "/servicios", label: "Servicios" },
    { href: "/blog", label: "Blog" },
  ],
  en: [
    { href: "/en/pricing", label: "Pricing" },
    { href: "/en/golf-carts-for-sale", label: "For sale" },
    { href: "/en#zones", label: "Zones" },
    { href: "/en/services", label: "Services" },
    { href: "/en/blog", label: "Blog" },
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

const LINES: Model["line"][] = ["eco", "clubcar", "zycar"];

export function Header({ locale = "es" }: { locale?: Locale }) {
  const es = locale === "es";
  const otherLabel = es ? "EN" : "ES";
  const otherHome = es ? "/en" : "/"; // respaldo sin-JS; el shim lo hace exacto
  const langAria = es ? "Switch to English" : "Cambiar a español";
  const fleetHref = es ? "/flota" : "/en/fleet";
  const modelHref = (id: string) => (es ? `/flota/${id}` : `/en/fleet/${id}`);

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-ink text-white transition-shadow">
      {/* relative: ancla del mega-menú (centrado al contenedor, no al link Flota,
          que quedaba cortado fuera del viewport en 768-1100px). */}
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={es ? "/" : "/en"} aria-label={es ? "BOLT — inicio" : "BOLT — home"}>
          <BoltLogo dark />
        </Link>

        {/* lg: en md (768-1023) la nav completa no cabe (CTA partido en 2 líneas) → menú móvil. */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label={es ? "Principal" : "Main"}>
          {/* Flota con mega-menú (CSS group-hover / focus-within). */}
          <div className="group">
            <Link href={fleetHref} className="nav-link flex items-center gap-1 text-sm font-medium text-white/80">
              {es ? "Flota" : "Fleet"}
              <span className="text-white/40 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true">⌄</span>
            </Link>
            <div className="mega invisible absolute left-1/2 top-full z-40 w-[min(92vw,720px)] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="glass grid grid-cols-3 gap-x-6 gap-y-1 rounded-2xl p-6 shadow-[var(--shadow-xl)]">
                {LINES.map((line) => (
                  <div key={line}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-volt">{lineName(line, locale)}</p>
                    <ul className="space-y-0.5">
                      {MODELS.filter((m) => m.line === line).map((m) => (
                        <li key={m.id}>
                          <Link
                            href={modelHref(m.id)}
                            className="flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <span className="truncate">{m.name}</span>
                            <span className="shrink-0 text-xs font-bold tabular-nums text-white/55">US${modelPrice(m.id)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-3 mt-3 flex flex-wrap items-center gap-4 border-t border-white/10 pt-3 text-sm">
                  <Link href={fleetHref} className="font-bold text-volt hover:text-white">
                    {es ? "Ver toda la flota →" : "See the full fleet →"}
                  </Link>
                  <Link href={es ? "/precios" : "/en/pricing"} className="text-white/70 hover:text-white">
                    {es ? "Precios" : "Pricing"}
                  </Link>
                  <Link href={es ? "/venta" : "/en/golf-carts-for-sale"} className="text-white/70 hover:text-white">
                    {es ? "Venta" : "For sale"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {NAV[locale].map((item) => (
            <Link key={item.href} href={item.href} className="nav-link text-sm font-medium text-white/80">
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
            className="shine rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-ink transition-transform duration-[var(--dur-base)] hover:scale-105"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />
            {CTA[locale].label}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            data-langswitch
            href={otherHome}
            aria-label={langAria}
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-white/25 px-3 text-xs font-bold text-white/80"
          >
            {otherLabel}
          </a>
          <button
            type="button"
            id="nav-toggle"
            popoverTarget="nav-movil"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
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
        className="fixed inset-x-0 top-16 bottom-auto z-40 m-0 max-h-[calc(100dvh-4rem)] w-full max-w-full overflow-y-auto border-x-0 border-b-0 border-t border-white/10 bg-ink px-4 pb-6 pt-2 text-white lg:hidden"
        aria-label={es ? "Principal móvil" : "Main mobile"}
      >
        <Link href={fleetHref} className="block py-3 text-base font-medium text-white/90">
          {es ? "Flota" : "Fleet"}
        </Link>
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
