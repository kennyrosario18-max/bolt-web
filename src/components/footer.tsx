import Link from "next/link";
import { BoltLogo } from "./logo";
import { CONTACT, SLOGAN, ZONES, waLink } from "@/content/site";

export function Footer() {
  return (
    // pb-20 en móvil: deja libre la franja que ocupa la barra CTA fija (MobileCta)
    <footer className="bg-ink pb-20 text-white md:pb-0" id="contacto">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <BoltLogo dark />
          <p className="mt-3 text-lg font-display font-bold text-volt">{SLOGAN}</p>
          <p className="mt-2 max-w-xs text-sm text-white/60">
            Renta y venta de golf carts premium en Punta Cana.
            <span className="mt-1 block italic text-white/60">
              Premium golf cart rental &amp; sales in Punta Cana.
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">Zonas</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {ZONES.map((z) => (
              <li key={z.id}>
                <Link href={`/alquiler/${z.id}`} className="hover:text-volt">
                  {z.name}
                </Link>
                {z.minDays ? <span className="text-white/55"> · reservas 7+ días</span> : null}
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-white/80">
            <li>
              <Link href="/precios" className="hover:text-volt">
                Precios
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-volt">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/flota" className="hover:text-volt">
                Flota
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">Contacto</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a
                href={waLink("Hola BOLT, quiero información sobre la renta de un golf cart.")}
                className="hover:text-volt"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {CONTACT.phoneDisplay} · 24/7
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-volt">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-white/60">{CONTACT.address}</li>
          </ul>
          <Link
            href="/solicitar-disponibilidad"
            className="mt-5 inline-block rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-ink"
          >
            ⚡ Solicitar disponibilidad
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:px-6">
          <span>
            BOLT ⚡ es una marca operada por {CONTACT.legal}
          </span>
          {/* Año evaluado en build (export estático): un deploy al año lo refresca */}
          <span>© {new Date().getFullYear()} BOLT Golf Cars</span>
        </div>
      </div>
    </footer>
  );
}
