import Link from "next/link";
import { MODELS } from "@/content/models";
import { CONTACT, ZONES } from "@/content/site";
import { BoltIcon } from "@/components/icons";
import { RequestFormEnhance } from "./request-form-enhance";
import type { Locale } from "@/lib/i18n";

/** Formulario de disponibilidad — server component sin React. El HTML es nativo
 *  (campos no controlados) y <RequestFormEnhance> añade validación, reglas de
 *  negocio, armado del wa.me, captura dual y a11y en vanilla, sin hidratación. */

const T = {
  es: {
    success:
      "Gracias por su solicitud. Nuestro equipo verificará la disponibilidad y se comunicará con usted lo antes posible para confirmar su reserva y ofrecerle la mejor opción disponible.",
    sentTitle: "Solicitud enviada",
    waFallback: "Si WhatsApp no se abrió automáticamente, escríbenos directo al",
    header: "⚡ SOLICITUD DE DISPONIBILIDAD — boltgolfcars.com",
    fields: { nombre: "Nombre", email: "Email", whatsapp: "WhatsApp", modelo: "Modelo", llegada: "Llegada", salida: "Salida", entrega: "Entrega", pasajeros: "Pasajeros", comentarios: "Comentarios" },
    recommend: "Por recomendar",
    day: "día",
    days: "días",
    lNombre: "Nombre completo *",
    lEmail: "Correo electrónico *",
    lWhatsapp: "WhatsApp *",
    lLlegada: "Fecha de llegada *",
    lSalida: "Fecha de salida *",
    lZona: "Lugar de entrega *",
    zonaPlaceholder: "Selecciona la zona…",
    minDays: (n: number) => ` (mínimo ${n} días)`,
    zoneNoteTpl: "{name}: reservas de {min}+ días · {note}",
    lPasajeros: "Cantidad de pasajeros *",
    pasajerosPlaceholder: "Selecciona…",
    lModelo: "Modelo",
    modeloPlaceholder: "Recomiéndenme según mi grupo",
    plazas: "plazas",
    lComentarios: "Comentarios adicionales",
    comentariosPlaceholder: "Nombre de la villa, horario de llegada, ocasión especial…",
    errFechas: "Selecciona tus fechas de llegada y salida.",
    errOrden: "La fecha de salida debe ser posterior a la fecha de llegada.",
    errMin: "Para entregas en {name} el mínimo es de {min} días. Ajusta tus fechas o elige otra zona de entrega.",
    warnMin: "Para {name} el mínimo es de {min} días — tu selección actual es de {days} {dayword}.",
    submit: "Enviar solicitud por WhatsApp",
    legalPre: "Al enviar tu solicitud aceptas nuestros",
    legalTerms: "Términos y Condiciones",
    legalAnd: "y nuestra",
    legalPrivacy: "Política de Privacidad",
    termsHref: "/terminos",
    privacyHref: "/privacidad",
    disclaimer: "Al enviar se abrirá WhatsApp con tu solicitud lista — solo presiona enviar. También puedes escribirnos a",
  },
  en: {
    success:
      "Thank you for your request. Our team will verify availability and contact you as soon as possible to confirm your reservation and offer you the best available option.",
    sentTitle: "Request sent",
    waFallback: "If WhatsApp didn't open automatically, message us directly at",
    header: "⚡ AVAILABILITY REQUEST — boltgolfcars.com",
    fields: { nombre: "Name", email: "Email", whatsapp: "WhatsApp", modelo: "Model", llegada: "Arrival", salida: "Departure", entrega: "Delivery", pasajeros: "Passengers", comentarios: "Comments" },
    recommend: "Recommend one for my group",
    day: "day",
    days: "days",
    lNombre: "Full name *",
    lEmail: "Email *",
    lWhatsapp: "WhatsApp *",
    lLlegada: "Arrival date *",
    lSalida: "Departure date *",
    lZona: "Delivery location *",
    zonaPlaceholder: "Select your zone…",
    minDays: (n: number) => ` (${n}-day minimum)`,
    zoneNoteTpl: "{name}: {min}+ day rentals · {note}",
    lPasajeros: "Number of passengers *",
    pasajerosPlaceholder: "Select…",
    lModelo: "Model",
    modeloPlaceholder: "Recommend one for my group",
    plazas: "seats",
    lComentarios: "Additional comments",
    comentariosPlaceholder: "Villa name, arrival time, special occasion…",
    errFechas: "Select your arrival and departure dates.",
    errOrden: "The departure date must be after the arrival date.",
    errMin: "Deliveries in {name} require a minimum of {min} days. Adjust your dates or choose another delivery zone.",
    warnMin: "{name} requires a {min}-day minimum — your current selection is {days} {dayword}.",
    submit: "Send request via WhatsApp",
    legalPre: "By sending your request you accept our",
    legalTerms: "Terms & Conditions",
    legalAnd: "and our",
    legalPrivacy: "Privacy Policy",
    termsHref: "/en/terms",
    privacyHref: "/en/privacy",
    disclaimer: "WhatsApp will open with your request ready — just press send. You can also email us at",
  },
} as const;

const inputCls =
  "w-full rounded-box border border-steel/60 bg-white px-4 py-3 text-base text-ink outline-none transition-colors focus:border-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1";
const labelCls = "block text-sm font-bold text-ink";

export function RequestForm({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const es = locale === "es";

  const payload = {
    phone: CONTACT.whatsapp,
    header: t.header,
    plazas: t.plazas,
    recommend: t.recommend,
    day: t.day,
    days: t.days,
    f: t.fields,
    errFechas: t.errFechas,
    errOrden: t.errOrden,
    errMin: t.errMin,
    warnMin: t.warnMin,
    zoneNoteTpl: t.zoneNoteTpl,
  };

  return (
    <>
      {/* F4: la barra CTA fija es redundante donde vive el formulario — el envío
          ES el CTA. La ocultamos solo en esta página, sin JS. */}
      <style>{`#mobile-cta{display:none}`}</style>
      <form id="req-form" className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="nombre">{t.lNombre}</label>
          <input id="nombre" name="nombre" required className={inputCls} autoComplete="name" />
        </div>

        <div>
          <label className={labelCls} htmlFor="email">{t.lEmail}</label>
          <input id="email" name="email" type="email" required className={inputCls} autoComplete="email" />
        </div>
        <div>
          <label className={labelCls} htmlFor="whatsapp">{t.lWhatsapp}</label>
          <input id="whatsapp" name="whatsapp" type="tel" required placeholder="+1 809 000 0000" className={inputCls} autoComplete="tel" />
        </div>

        <div>
          <label className={labelCls} htmlFor="llegada">{t.lLlegada}</label>
          <input id="llegada" name="llegada" type="date" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="salida">{t.lSalida}</label>
          <input id="salida" name="salida" type="date" required className={inputCls} />
        </div>

        <div>
          <label className={labelCls} htmlFor="zona">{t.lZona}</label>
          <select id="zona" name="zona" required className={inputCls}>
            <option value="">{t.zonaPlaceholder}</option>
            {ZONES.map((z) => (
              <option
                key={z.id}
                value={z.id}
                data-name={z.name}
                data-mindays={z.minDays ?? ""}
                data-note={(es ? z.note : z.noteEn) ?? ""}
              >
                {z.name}
                {z.minDays ? t.minDays(z.minDays) : ""}
              </option>
            ))}
          </select>
          <p id="zona-note" hidden aria-live="polite" className="mt-1.5 text-xs font-semibold text-volt-dark" />
        </div>
        <div>
          <label className={labelCls} htmlFor="pasajeros">{t.lPasajeros}</label>
          <select id="pasajeros" name="pasajeros" required className={inputCls}>
            <option value="">{t.pasajerosPlaceholder}</option>
            {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="modelo">{t.lModelo}</label>
          <select id="modelo" name="modelo" className={inputCls}>
            <option value="">{t.modeloPlaceholder}</option>
            {MODELS.map((m) => (
              <option key={m.id} value={m.id} data-name={m.name} data-pax={m.pax}>
                {m.name} · {m.pax} {t.plazas}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="comentarios">{t.lComentarios}</label>
          <textarea id="comentarios" name="comentarios" rows={3} className={inputCls} placeholder={t.comentariosPlaceholder} />
        </div>

        {/* Honeypot invisible para bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="extra-notas">
            No llenar
            <input id="extra-notas" name="empresa" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <p id="min-warning" hidden aria-live="polite" className="rounded-box bg-cream px-4 py-3 text-sm font-semibold text-volt-dark sm:col-span-2" />
        <p id="form-error" hidden role="alert" className="rounded-box bg-red-50 px-4 py-3 text-sm font-semibold text-danger sm:col-span-2" />

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-full bg-volt px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.02] sm:w-auto"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.submit}
          </button>
          <p className="mt-3 text-xs text-steel">
            {t.disclaimer}{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>.
          </p>
          <p className="mt-2 text-xs text-steel">
            {t.legalPre}{" "}
            <Link href={t.termsHref} className="underline">{t.legalTerms}</Link>{" "}
            {t.legalAnd}{" "}
            <Link href={t.privacyHref} className="underline">{t.legalPrivacy}</Link>.
          </p>
        </div>
      </form>

      {/* Pantalla de éxito — oculta hasta el envío; role=status la anuncia. */}
      <div
        id="req-success"
        hidden
        role="status"
        tabIndex={-1}
        className="rounded-card border border-line bg-cream p-8 text-center outline-none"
      >
        <BoltIcon className="mx-auto text-volt" size={44} />
        <h2 className="mt-3 font-display text-2xl font-extrabold">{t.sentTitle}</h2>
        <p className="mx-auto mt-3 max-w-lg text-inktext">{t.success}</p>
        <p className="mt-4 text-sm text-steel">
          {t.waFallback}{" "}
          <a id="wa-fallback" href={`https://wa.me/${CONTACT.whatsapp}`} className="font-bold text-ink underline" target="_blank" rel="noopener noreferrer">
            {CONTACT.phoneDisplay}
          </a>.
        </p>
      </div>

      <RequestFormEnhance payload={payload} />
    </>
  );
}
