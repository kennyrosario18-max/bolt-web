import Link from "next/link";
import { BoltLogo } from "./logo";
import { CONTACT, SLOGAN, ZONES, waLink } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white" id="contacto">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <BoltLogo dark />
          <p className="mt-3 text-lg font-display font-bold text-volt">{SLOGAN}</p>
          <p className="mt-2 max-w-xs text-sm text-white/60">
            Renta y venta de golf carts premium en Punta Cana.
            <span className="mt-1 block italic text-white/40">
              Premium golf cart rental &amp; sales in Punta Cana.
            </span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Zonas</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {ZONES.map((z) => (
              <li key={z.id}>
                {z.name}
                {z.minDays ? <span className="text-white/45"> · reservas 7+ días</span> : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Contacto</h3>
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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-white/40 sm:px-6">
          <span>
            BOLT ⚡ es una marca operada por {CONTACT.legal}
          </span>
          <span>© {new Date().getFullYear()} BOLT Golf Cars</span>
        </div>
      </div>
    </footer>
  );
}
