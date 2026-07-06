"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { BoltLogo } from "./logo";
import { CONTACT, waLink } from "@/content/site";
import { counterpartPath, type Locale } from "@/lib/i18n";

/** Switcher de idioma. Conserva el query string (p.ej. ?modelo=X del formulario).
    useSearchParams exige Suspense en prerender — el fallback enlaza sin query. */
function LangSwitchInner({ href, label, ariaLabel, className }: {
  href: string; label: string; ariaLabel: string; className: string;
}) {
  const searchParams = useSearchParams();
  const qs = searchParams.toString();
  return (
    <Link href={qs ? `${href}?${qs}` : href} className={className} aria-label={ariaLabel}>
      {label}
    </Link>
  );
}

function LangSwitch(props: { href: string; label: string; ariaLabel: string; className: string }) {
  return (
    <Suspense
      fallback={
        <Link href={props.href} className={props.className} aria-label={props.ariaLabel}>
          {props.label}
        </Link>
      }
    >
      <LangSwitchInner {...props} />
    </Suspense>
  );
}

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
  es: { href: "/solicitar-disponibilidad", label: "⚡ Solicitar disponibilidad" },
  en: { href: "/en/request-availability", label: "⚡ Request availability" },
};

const WA_MSG: Record<Locale, string> = {
  es: "Hola BOLT, quiero información sobre la renta de un golf cart.",
  en: "Hi BOLT, I would like information about renting a golf cart.",
};

export function Header({ locale = "es" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const otherPath = counterpartPath(pathname ?? "/");
  const otherLabel = locale === "es" ? "EN" : "ES";

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={locale === "es" ? "/" : "/en"}
          aria-label={locale === "es" ? "BOLT — inicio" : "BOLT — home"}
          onClick={() => setOpen(false)}
        >
          <BoltLogo dark />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label={locale === "es" ? "Principal" : "Main"}>
          {NAV[locale].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-volt"
            >
              {item.label}
            </Link>
          ))}
          <LangSwitch
            href={otherPath}
            label={otherLabel}
            ariaLabel={locale === "es" ? "Switch to English" : "Cambiar a español"}
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold text-white/80 transition-colors hover:border-volt hover:text-volt"
          />
          <Link
            href={CTA[locale].href}
            className="rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            {CTA[locale].label}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch
            href={otherPath}
            label={otherLabel}
            ariaLabel={locale === "es" ? "Switch to English" : "Cambiar a español"}
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold text-white/80"
          />
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-expanded={open}
            aria-label={
              open
                ? locale === "es" ? "Cerrar menú" : "Close menu"
                : locale === "es" ? "Abrir menú" : "Open menu"
            }
            onClick={() => setOpen(!open)}
          >
            <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 px-4 pb-6 pt-2 md:hidden"
          aria-label={locale === "es" ? "Principal móvil" : "Main mobile"}
        >
          {NAV[locale].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-base font-medium text-white/90"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <Link
              href={CTA[locale].href}
              className="rounded-full bg-volt px-5 py-3 text-center text-sm font-bold text-ink"
              onClick={() => setOpen(false)}
            >
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
      )}
    </header>
  );
}
