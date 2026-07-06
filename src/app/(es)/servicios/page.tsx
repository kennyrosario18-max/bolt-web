import type { Metadata } from "next";
import Link from "next/link";
import { waLink } from "@/content/site";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Servicios — renta, venta y aliados",
  description:
    "Renta de golf carts por día, semana o temporada; venta de unidades nuevas con garantía; y programa de aliados para concierges y property managers.",
  alternates: { canonical: "/servicios/", ...hreflang("/servicios/", "/en/services/") },
};

const SERVICES = [
  {
    title: "Renta por día, semana o temporada",
    titleEn: "Daily, weekly & seasonal rental",
    body: "Flota de 4 y 6 plazas con entrega y recogida en tu villa (incluida en rentas de 2+ días). Para 7 noches o más, pregunta por la tarifa semanal y mensual con descuento.",
    cta: { label: "Ver precios →", href: "/precios" },
  },
  {
    title: "Venta de unidades nuevas",
    titleEn: "New unit sales",
    body: "Golf carts nuevos con garantía para villas, comunidades y negocios. Te asesoramos en el modelo ideal según tu propiedad y uso — y te acompañamos después de la compra.",
    cta: {
      label: "Cotizar por WhatsApp →",
      href: waLink("Hola BOLT, quiero información sobre la VENTA de golf carts nuevos."),
      external: true,
    },
  },
  {
    title: "Entrega donde estés",
    titleEn: "Delivery wherever you are",
    body: "Llevamos tu carrito con carga completa y orientación de uso hasta tu villa en Puntacana Resort & Club, Cap Cana y Bávaro — y hasta Casa de Campo y La Romana en reservas de 7+ días.",
    cta: { label: "Ver zonas →", href: "/#zonas" },
  },
  {
    title: "Soporte 24/7 en español e inglés",
    titleEn: "24/7 bilingual support",
    body: "Un WhatsApp y respondemos: asistencia en ruta, reposición si algo falla y guía de uso siempre disponible. Tu renta nunca se queda sin respaldo.",
    cta: {
      label: "Escribir por WhatsApp →",
      href: waLink("Hola BOLT, necesito asistencia con un golf cart."),
      external: true,
    },
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">Servicios</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Más que rentar carritos
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Movilidad completa para tu estadía o tu propiedad: renta, venta, entrega y soporte que
            responde.
          </p>
          <p lang="en" className="mt-1 text-sm italic text-white/60">
            Complete mobility — rental, sales, delivery and support that answers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex flex-col rounded-card border border-line p-7">
              <h2 className="font-display text-xl font-extrabold">{s.title}</h2>
              <p lang="en" className="text-sm italic text-steel">{s.titleEn}</p>
              <p className="mt-3 flex-1 text-inktext">{s.body}</p>
              {"external" in s.cta && s.cta.external ? (
                <a
                  href={s.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 font-bold text-volt-dark hover:underline"
                >
                  {s.cta.label}
                </a>
              ) : (
                <Link href={s.cta.href} className="mt-5 font-bold text-volt-dark hover:underline">
                  {s.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Programa de Aliados — beneficios públicos, tarifas solo por WhatsApp */}
        <div className="mt-12 rounded-card bg-ink p-8 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
            Agencias &amp; Property Managers
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Programa de Aliados BOLT
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">
            ¿Manejas villas o eres agencia de renta vacacional? Conviértete en aliado BOLT y
            simplifica los carritos de todas tus propiedades.
          </p>
          <ul className="mt-5 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <li>✓ Tarifa preferencial de aliado</li>
            <li>✓ Cuenta mensual con factura e-CF, sin depósito por reserva</li>
            <li>✓ Disponibilidad prioritaria</li>
            <li>✓ Reporte por villa</li>
          </ul>
          <p lang="en" className="mt-3 text-xs italic text-white/60">
            Preferred rates · monthly e-invoice account · priority availability · per-villa
            reporting.
          </p>
          <a
            href={waLink("Hola BOLT, manejo villas y quiero información del Programa de Aliados.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            Pregunta por la tarifa de aliado →
          </a>
        </div>
      </section>
    </>
  );
}
