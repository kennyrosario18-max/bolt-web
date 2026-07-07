import Link from "next/link";
import { MODELS } from "@/content/models";
import { ModelPhoto } from "@/components/model-photo";
import { CONTACT, waLink } from "@/content/site";
import { BoltIcon, CheckIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema } from "@/lib/schema";

/** Página de venta — vista única ES/EN. Nuevos importados + seminuevos de flota.
 *  Sin precios públicos: CTA "Consultar precio de compra" por WhatsApp. */

const T = {
  es: {
    crumbHome: "Inicio",
    crumbHomeHref: "/",
    crumb: "Venta",
    crumbAria: "Miga de pan",
    kicker: "Venta de golf carts",
    h1: "Compra tu golf cart en Punta Cana",
    lead:
      "Vendemos golf carts nuevos importados y unidades seminuevas de nuestra flota, con entrega, soporte y mantenimiento local. Cuéntanos qué buscas y te cotizamos.",
    buyCta: "Consultar precio de compra",
    buyMsg: "Hola BOLT, quiero información sobre la COMPRA de un golf cart.",
    fleetCta: "Ver la flota →",
    fleetHref: "/flota",
    offersTitle: "Dos formas de ",
    offersHl: "comprar",
    offers: [
      {
        title: "Nuevos importados",
        body: "Unidades nuevas de las líneas ECO, Club Car y Zycar bajo pedido. Configura plazas, color y batería de litio; con garantía.",
        bullets: ["Garantía de fábrica", "Configuración a tu gusto", "Batería de litio de largo alcance"],
      },
      {
        title: "Seminuevos de flota",
        body: "Unidades de nuestra flota de renta, mantenidas y revisadas por nuestro taller. Disponibilidad rotativa — pregunta por lo que hay hoy.",
        bullets: ["Mantenimiento al día", "Precio más accesible", "Historial conocido"],
      },
    ],
    modelsTitle: "Modelos ",
    modelsHl: "disponibles",
    modelsLead: "Las mismas líneas de nuestra flota, disponibles para compra. Consúltanos por el modelo que te interesa.",
    seats: "plazas",
    modelCta: "Consultar compra →",
    modelMsg: (name: string, pax: number) => `Hola BOLT, quiero información sobre la COMPRA del ${name} (${pax} plazas).`,
    whyTitle: "Por qué comprar con ",
    whyHl: "BOLT",
    why: [
      "Operamos nuestra propia flota: conocemos cada modelo a fondo.",
      "Soporte y repuestos locales en Punta Cana — no te quedas varado.",
      "Entrega e inducción de uso donde estés.",
      "Asesoría honesta: te recomendamos según tu uso real, no lo más caro.",
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Venden nuevos o usados?", a: "Ambos: unidades nuevas importadas bajo pedido y seminuevas de nuestra flota, mantenidas por nuestro taller." },
      { q: "¿Entregan e instalan?", a: "Sí. Coordinamos la entrega en tu villa, residencial o negocio, con orientación de uso y carga." },
      { q: "¿Dan mantenimiento después de la compra?", a: "Sí. Ofrecemos soporte, repuestos y mantenimiento local en Punta Cana para las unidades que vendemos." },
      { q: "¿Litio o plomo?", a: "Recomendamos litio por autonomía y vida útil; también hay opciones de plomo. Te asesoramos según tu uso." },
    ],
    ready: "¿Listo para comprar tu BOLT?",
    readyNote: "Cuéntanos qué buscas y te cotizamos por WhatsApp, sin compromiso.",
  },
  en: {
    crumbHome: "Home",
    crumbHomeHref: "/en",
    crumb: "For sale",
    crumbAria: "Breadcrumb",
    kicker: "Golf carts for sale",
    h1: "Buy your golf cart in Punta Cana",
    lead:
      "We sell brand-new imported golf carts and pre-owned units from our own fleet, with local delivery, support and maintenance. Tell us what you need and we'll quote you.",
    buyCta: "Ask for a purchase price",
    buyMsg: "Hi BOLT, I'd like information about BUYING a golf cart.",
    fleetCta: "See the fleet →",
    fleetHref: "/en/fleet",
    offersTitle: "Two ways to ",
    offersHl: "buy",
    offers: [
      {
        title: "New imported",
        body: "Brand-new ECO, Club Car and Zycar units on order. Configure seats, color and long-range lithium battery; warranty included.",
        bullets: ["Factory warranty", "Configured to your needs", "Long-range lithium battery"],
      },
      {
        title: "Pre-owned from fleet",
        body: "Units from our rental fleet, maintained and inspected by our workshop. Rotating availability — ask what's in stock today.",
        bullets: ["Up-to-date maintenance", "More affordable price", "Known history"],
      },
    ],
    modelsTitle: "Available ",
    modelsHl: "models",
    modelsLead: "The same lines as our fleet, available to buy. Ask us about the model you're interested in.",
    seats: "seats",
    modelCta: "Ask to buy →",
    modelMsg: (name: string, pax: number) => `Hi BOLT, I'd like information about BUYING the ${name} (${pax} seats).`,
    whyTitle: "Why buy from ",
    whyHl: "BOLT",
    why: [
      "We run our own fleet — we know every model inside out.",
      "Local support and parts in Punta Cana — you're never stranded.",
      "Delivery and usage briefing wherever you are.",
      "Honest advice: we recommend based on your real use, not the priciest option.",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Do you sell new or used?", a: "Both: brand-new imported units on order and pre-owned units from our fleet, maintained by our workshop." },
      { q: "Do you deliver and set up?", a: "Yes. We coordinate delivery to your villa, community or business, with a usage briefing and charging." },
      { q: "Do you service after the sale?", a: "Yes. We offer local support, parts and maintenance in Punta Cana for the units we sell." },
      { q: "Lithium or lead-acid?", a: "We recommend lithium for range and lifespan; lead-acid options are available too. We'll advise based on your use." },
    ],
    ready: "Ready to buy your BOLT?",
    readyNote: "Tell us what you need and we'll quote you on WhatsApp, no obligation.",
  },
} as const;

export function SaleView({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const es = locale === "es";

  return (
    <>
      <script {...JsonLdScriptProps(faqSchema([...t.faqs]))} />
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: t.crumbHome, path: es ? "/" : "/en/" },
            { name: t.crumb, path: es ? "/venta/" : "/en/golf-carts-for-sale/" },
          ])
        )}
      />

      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <nav aria-label={t.crumbAria} className="text-sm text-white/50">
            <Link href={t.crumbHomeHref} className="hover:text-volt">
              {t.crumbHome}
            </Link>{" "}
            / {t.crumb}
          </nav>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">{t.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={waLink(t.buyMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />
              {t.buyCta}
            </a>
            <Link
              href={t.fleetHref}
              className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:border-volt hover:text-volt"
            >
              {t.fleetCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Dos formas de comprar */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          {t.offersTitle}
          <span className="hl">{t.offersHl}</span>
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {t.offers.map((o) => (
            <div key={o.title} className="rounded-card border border-line p-7">
              <h3 className="font-display text-xl font-extrabold">{o.title}</h3>
              <p className="mt-2 text-inktext">{o.body}</p>
              <ul className="mt-4 space-y-2">
                {o.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-inktext">
                    <CheckIcon className="mt-0.5 shrink-0 text-ok" size={16} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Modelos disponibles */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            {t.modelsTitle}
            <span className="hl">{t.modelsHl}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-inktext">{t.modelsLead}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m) => (
              <div key={m.id} className="group lift overflow-hidden rounded-card border border-line bg-white hover:border-volt/40">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <ModelPhoto
                    id={m.id}
                    alt={es ? `Golf cart ${m.name} en venta` : `${m.name} golf cart for sale`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08]"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-lg font-extrabold">{m.name}</h3>
                    <p className="text-sm text-steel">
                      {m.pax} {t.seats}
                    </p>
                  </div>
                  <a
                    href={waLink(t.modelMsg(m.name, m.pax))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm font-bold text-volt-dark hover:text-ink"
                  >
                    {t.modelCta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué comprar con BOLT */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          {t.whyTitle}
          <span className="hl">{t.whyHl}</span>
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {t.why.map((w) => (
            <li key={w} className="flex items-start gap-3 rounded-box bg-cream p-4">
              <CheckIcon className="mt-0.5 shrink-0 text-ok" size={18} />
              <span className="text-sm text-inktext">{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t.faqTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {t.faqs.map((f) => (
              <div key={f.q} className="rounded-card border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-card bg-ink p-8 text-center">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">{t.ready}</p>
            <p className="mx-auto mt-1 max-w-lg text-sm text-white/60">{t.readyNote}</p>
            <a
              href={waLink(t.buyMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />
              {t.buyCta} · {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
