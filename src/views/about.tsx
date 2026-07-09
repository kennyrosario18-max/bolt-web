import Link from "next/link";
import { CONTACT, waLink } from "@/content/site";
import { BoltIcon, CheckIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

/** Contenido migrado de reservas.boltgolfcars.com/empresa (Identidad Corporativa, jul/2026). */
const T = {
  es: {
    kicker: "Quiénes somos",
    h1: "Esto es lo que somos y cómo trabajamos",
    intro: "Renta y venta de carritos de golf en Puntacana Resort & Club, Cap Cana y Bávaro.",
    misionTitle: "Misión",
    mision:
      "Resolver la movilidad en Punta Cana de principio a fin: rentamos carritos de golf confiables, entregados donde está el cliente, y vendemos unidades nuevas para villas, familias y negocios que quieren su propio carrito — siempre con confirmación rápida, precios claros y atención personalizada de gente local que responde.",
    visionTitle: "Visión",
    vision:
      "Ser la marca de movilidad turística líder del este dominicano: la primera opción para rentar, y también para comprar, carritos de golf en Puntacana Resort & Club, Cap Cana y Bávaro — reconocidos por velocidad, transparencia, una flota impecable y un respaldo post-venta que ningún importador ofrece.",
    valoresTitle: "Valores",
    valores: [
      { t: "Velocidad con seriedad.", d: "Respondemos en minutos y cumplimos lo que confirmamos. El rayo es promesa, no adorno." },
      { t: "Claridad total.", d: "Precios publicados con ITBIS, políticas por escrito, facturación e-CF. En renta y en venta: sin sorpresas ni letra pequeña." },
      { t: "Servicio local, estándar internacional.", d: "Atendemos en español e inglés, con la calidez dominicana y la formalidad que espera el huésped extranjero." },
      { t: "Seguridad primero.", d: "Unidades mantenidas y entregadas en condiciones óptimas, siempre." },
      { t: "Relaciones que crecen.", d: "Aliados, clientes de renta y compradores: cada cliente es una relación de años, no una transacción." },
      { t: "Vendemos lo que operamos.", d: "Rentamos la misma flota que vendemos. Conocemos cada modelo en el terreno real — sol, salitre, distancias — y eso respalda nuestra recomendación." },
    ],
    compromisosTitle: "Compromisos con el cliente",
    rentaTitle: "Todo cliente tiene derecho a",
    renta: [
      "Recibir el carrito en la fecha, hora y lugar confirmados",
      "Una unidad mantenida, cargada y en buen estado",
      "Precios claros por adelantado, con ITBIS detallado y factura formal",
      "Soporte por WhatsApp durante toda su renta, en español o inglés",
      "Políticas de cancelación, depósito y cambios por escrito antes de pagar",
    ],
    compraTitle: "Y todo comprador, además, a",
    compra: [
      "Asesoría honesta sobre el modelo correcto para su uso real",
      "Unidad nueva con garantía por escrito e inducción de uso",
      "Respaldo post-venta local: mantenimiento, piezas y soporte del mismo equipo que opera la flota BOLT a diario",
    ],
    culturaTitle: "Cultura · Cómo somos por dentro",
    cultura: [
      { t: "El rayo se demuestra en la respuesta", d: "Nadie deja un WhatsApp en visto. Quien escribe recibe respuesta en minutos, aunque sea un «dame 10 minutos y te confirmo»." },
      { t: "Todo se registra, nada queda en el aire", d: "Cada renta, pago, comisión y mantenimiento entra al sistema. Lo que no está registrado no existe." },
      { t: "El carrito habla de nosotros", d: "Cada unidad se entrega limpia, cargada y revisada. El cliente no ve nuestra oficina: ve el carrito." },
      { t: "Puntualidad de reloj, calidez dominicana", d: "Llegamos a la hora confirmada y con buena actitud: saludamos, explicamos, dejamos al cliente sonriendo." },
      { t: "Los problemas se avisan antes, no se explican después", d: "Un daño, un atraso o un reclamo se comunica de inmediato. Avisado a tiempo es servicio; escondido es una crisis." },
      { t: "El aliado es parte del equipo", d: "Concierges y property managers son socios de operación: misma prioridad, tarifa cumplida, y los hacemos quedar bien frente a su huésped." },
      { t: "Cada temporada nos deja mejores", d: "Después de cada temporada alta revisamos qué funcionó y qué no: flota, tiempos, zonas, precios." },
      { t: "La venta empieza donde otros la terminan", d: "Entregar la unidad vendida no cierra el trato — lo abre. Cada carrito vendido rodando feliz por Punta Cana es nuestra mejor publicidad." },
    ],
    cta: "Escríbenos por WhatsApp",
    waMsg: "Hola BOLT, quiero conocer más sobre ustedes.",
    fleet: "Conoce la flota →",
    fleetHref: "/flota",
  },
  en: {
    kicker: "Who we are",
    h1: "This is who we are and how we work",
    intro: "Golf cart rental and sales in Puntacana Resort & Club, Cap Cana and Bávaro.",
    misionTitle: "Mission",
    mision:
      "To solve mobility in Punta Cana end to end: we rent reliable golf carts delivered wherever the client is, and we sell new units to villas, families and businesses that want their own cart — always with fast confirmation, clear pricing and personal attention from local people who answer.",
    visionTitle: "Vision",
    vision:
      "To be the leading tourist-mobility brand of the Dominican east: the first choice to rent — and to buy — golf carts in Puntacana Resort & Club, Cap Cana and Bávaro, known for speed, transparency, an impeccable fleet and after-sales backing no importer offers.",
    valoresTitle: "Values",
    valores: [
      { t: "Speed with seriousness.", d: "We reply in minutes and deliver what we confirm. The lightning bolt is a promise, not a decoration." },
      { t: "Total clarity.", d: "Published prices with tax, written policies, formal e-CF invoicing. Renting or buying: no surprises, no fine print." },
      { t: "Local service, international standard.", d: "We serve in Spanish and English, with Dominican warmth and the formality foreign guests expect." },
      { t: "Safety first.", d: "Maintained units delivered in optimal condition, always." },
      { t: "Relationships that grow.", d: "Partners, renters and buyers: every client is a years-long relationship, not a transaction." },
      { t: "We sell what we operate.", d: "We rent the same fleet we sell. We know every model in real terrain — sun, salt air, distances — and that backs our recommendation." },
    ],
    compromisosTitle: "Our commitments to you",
    rentaTitle: "Every client has the right to",
    renta: [
      "Receive the cart at the confirmed date, time and place",
      "A maintained unit, charged and in good condition",
      "Clear prices up front, with itemized tax and a formal invoice",
      "WhatsApp support through the whole rental, in Spanish or English",
      "Written cancellation, deposit and change policies before paying",
    ],
    compraTitle: "And every buyer, additionally, to",
    compra: [
      "Honest advice on the right model for their real use",
      "A new unit with written warranty and usage induction",
      "Local after-sales backing: maintenance, parts and support from the same team that runs the BOLT fleet daily",
    ],
    culturaTitle: "Culture · What we're like inside",
    cultura: [
      { t: "The bolt shows in the reply", d: "Nobody leaves a WhatsApp on read. Whoever writes gets an answer in minutes, even if it's just “give me 10 minutes to confirm”." },
      { t: "Everything gets recorded, nothing floats", d: "Every rental, payment, commission and maintenance enters the system. What isn't recorded doesn't exist." },
      { t: "The cart speaks for us", d: "Every unit is delivered clean, charged and checked. The client never sees our office — they see the cart." },
      { t: "Clockwork punctuality, Dominican warmth", d: "We arrive at the confirmed time and with a good attitude: we greet, we explain, we leave the client smiling." },
      { t: "Problems are announced before, not explained after", d: "Damage, a delay or a claim is communicated immediately. Told in time it's service; hidden it's a crisis." },
      { t: "The partner is part of the team", d: "Concierges and property managers are operating partners: same priority, honored rate, and we make them look good in front of their guest." },
      { t: "Every season makes us better", d: "After each high season we review what worked and what didn't: fleet, timing, zones, prices." },
      { t: "The sale starts where others end it", d: "Delivering a sold unit doesn't close the deal — it opens it. Every sold cart rolling happily around Punta Cana is our best advertising." },
    ],
    cta: "Message us on WhatsApp",
    waMsg: "Hi BOLT, I would like to know more about you.",
    fleet: "Meet the fleet →",
    fleetHref: "/en/fleet",
  },
} as const;

export function AboutView({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-xl text-white/70">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-cream p-8">
            <p className="font-display text-3xl font-extrabold text-volt-dark">01</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">{t.misionTitle}</h2>
            <p className="mt-3 text-inktext">{t.mision}</p>
          </div>
          <div className="rounded-card bg-ink p-8 text-white">
            <p className="font-display text-3xl font-extrabold text-volt">02</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-white">{t.visionTitle}</h2>
            <p className="mt-3 text-white/75">{t.vision}</p>
          </div>
        </div>

        <h2 className="mt-14 font-display text-2xl font-extrabold sm:text-3xl">
          <span className="hl">{t.valoresTitle}</span>
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.valores.map((v) => (
            <div key={v.t} className="rounded-card border border-line p-6">
              <h3 className="font-display text-base font-extrabold">{v.t}</h3>
              <p className="mt-2 text-sm text-inktext">{v.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-extrabold sm:text-3xl">
          {t.compromisosTitle}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-cream p-7">
            <h3 className="font-display text-lg font-bold">{t.rentaTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-inktext">
              {t.renta.map((r) => (
                <li key={r} className="flex gap-2">
                  <CheckIcon className="mt-0.5 shrink-0 text-ok" size={16} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-cream p-7">
            <h3 className="font-display text-lg font-bold">{t.compraTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-inktext">
              {t.compra.map((r) => (
                <li key={r} className="flex gap-2">
                  <CheckIcon className="mt-0.5 shrink-0 text-ok" size={16} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mt-14 font-display text-2xl font-extrabold sm:text-3xl">{t.culturaTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {t.cultura.map((c, i) => (
            <div key={c.t} className="flex gap-4 rounded-card border border-line p-6">
              <span className="font-display text-2xl font-extrabold text-volt-dark">{i + 1}</span>
              <div>
                <h3 className="font-display text-base font-extrabold">{c.t}</h3>
                <p className="mt-1 text-sm text-inktext">{c.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={waLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.cta}
          </a>
          <Link
            href={t.fleetHref}
            className="rounded-full border border-ink px-7 py-3.5 text-base font-semibold text-ink hover:bg-cream"
          >
            {t.fleet}
          </Link>
        </div>
        <p className="mt-8 text-xs text-steel">{CONTACT.legal} · {CONTACT.phoneDisplay} · {CONTACT.email}</p>
      </section>
    </>
  );
}
