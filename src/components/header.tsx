"use client";

import Link from "next/link";
import { useState } from "react";
import { BoltLogo } from "./logo";
import { CONTACT, waLink } from "@/content/site";

const NAV = [
  { href: "/flota", label: "Flota" },
  { href: "/precios", label: "Precios" },
  { href: "/#zonas", label: "Zonas" },
  { href: "/servicios", label: "Servicios" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="BOLT — inicio" onClick={() => setOpen(false)}>
          <BoltLogo dark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-volt"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/solicitar-disponibilidad"
            className="rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            ⚡ Solicitar disponibilidad
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-6 pt-2 md:hidden" aria-label="Principal móvil">
          {NAV.map((item) => (
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
              href="/solicitar-disponibilidad"
              className="rounded-full bg-volt px-5 py-3 text-center text-sm font-bold text-ink"
              onClick={() => setOpen(false)}
            >
              ⚡ Solicitar disponibilidad
            </Link>
            <a
              href={waLink("Hola BOLT, quiero información sobre la renta de un golf cart.")}
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
