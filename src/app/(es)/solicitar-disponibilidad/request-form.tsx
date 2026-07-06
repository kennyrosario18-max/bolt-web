"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MODELS, getModel } from "@/content/models";
import { CONTACT, ZONES, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const T = {
  es: {
    success:
      "Gracias por su solicitud. Nuestro equipo verificará la disponibilidad y se comunicará con usted lo antes posible para confirmar su reserva y ofrecerle la mejor opción disponible.",
    sentTitle: "Solicitud enviada",
    waFallback: "Si WhatsApp no se abrió automáticamente, escríbenos directo al",
    header: "⚡ SOLICITUD DE DISPONIBILIDAD — boltgolfcars.com",
    fields: {
      nombre: "Nombre",
      email: "Email",
      whatsapp: "WhatsApp",
      modelo: "Modelo",
      llegada: "Llegada",
      salida: "Salida",
      entrega: "Entrega",
      pasajeros: "Pasajeros",
      comentarios: "Comentarios",
    },
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
    zoneNote: (name: string, n: number, note: string) => `${name}: reservas de ${n}+ días · ${note}`,
    lPasajeros: "Cantidad de pasajeros *",
    pasajerosPlaceholder: "Selecciona…",
    lModelo: "Modelo",
    modeloPlaceholder: "Recomiéndenme según mi grupo",
    plazas: "plazas",
    lComentarios: "Comentarios adicionales",
    comentariosPlaceholder: "Nombre de la villa, horario de llegada, ocasión especial…",
    errFechas: "Selecciona tus fechas de llegada y salida.",
    errOrden: "La fecha de salida debe ser posterior a la fecha de llegada.",
    errMin: (name: string, min: number) =>
      `Para entregas en ${name} el mínimo es de ${min} días. Ajusta tus fechas o elige otra zona de entrega.`,
    warnMin: (name: string | undefined, min: number | undefined, days: number) =>
      `Para ${name} el mínimo es de ${min} días — tu selección actual es de ${days} día${days === 1 ? "" : "s"}.`,
    submit: "⚡ Enviar solicitud por WhatsApp",
    disclaimer:
      "Al enviar se abrirá WhatsApp con tu solicitud lista — solo presiona enviar. También puedes escribirnos a",
  },
  en: {
    success:
      "Thank you for your request. Our team will verify availability and contact you as soon as possible to confirm your reservation and offer you the best available option.",
    sentTitle: "Request sent",
    waFallback: "If WhatsApp didn't open automatically, message us directly at",
    header: "⚡ AVAILABILITY REQUEST — boltgolfcars.com",
    fields: {
      nombre: "Name",
      email: "Email",
      whatsapp: "WhatsApp",
      modelo: "Model",
      llegada: "Arrival",
      salida: "Departure",
      entrega: "Delivery",
      pasajeros: "Passengers",
      comentarios: "Comments",
    },
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
    zoneNote: (name: string, n: number, note: string) => `${name}: ${n}+ day rentals · ${note}`,
    lPasajeros: "Number of passengers *",
    pasajerosPlaceholder: "Select…",
    lModelo: "Model",
    modeloPlaceholder: "Recommend one for my group",
    plazas: "seats",
    lComentarios: "Additional comments",
    comentariosPlaceholder: "Villa name, arrival time, special occasion…",
    errFechas: "Select your arrival and departure dates.",
    errOrden: "The departure date must be after the arrival date.",
    errMin: (name: string, min: number) =>
      `Deliveries in ${name} require a minimum of ${min} days. Adjust your dates or choose another delivery zone.`,
    warnMin: (name: string | undefined, min: number | undefined, days: number) =>
      `${name} requires a ${min}-day minimum — your current selection is ${days} day${days === 1 ? "" : "s"}.`,
    submit: "⚡ Send request via WhatsApp",
    disclaimer: "WhatsApp will open with your request ready — just press send. You can also email us at",
  },
} as const;

interface FormState {
  nombre: string;
  email: string;
  whatsapp: string;
  llegada: string;
  salida: string;
  zona: string;
  pasajeros: string;
  modelo: string;
  comentarios: string;
  /** Honeypot anti-spam: los humanos no lo ven ni lo llenan. */
  empresa: string;
}

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

const inputCls =
  "w-full rounded-box border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors focus:border-ink";
const labelCls = "block text-sm font-bold text-ink";

export function RequestForm({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const searchParams = useSearchParams();
  const preselected = getModel(searchParams.get("modelo") ?? "")?.id ?? "";

  const [form, setForm] = useState<FormState>({
    nombre: "",
    email: "",
    whatsapp: "",
    llegada: "",
    salida: "",
    zona: "",
    pasajeros: "",
    modelo: preselected,
    comentarios: "",
    empresa: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const zone = ZONES.find((z) => z.id === form.zona);
  const days = daysBetween(form.llegada, form.salida);
  const needsMinDays = Boolean(zone?.minDays) && days > 0 && days < (zone?.minDays ?? 0);
  const zoneNote = locale === "es" ? zone?.note : zone?.noteEn;

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const summary = useMemo(() => {
    const model = getModel(form.modelo);
    const f = t.fields;
    return [
      t.header,
      "",
      `${f.nombre}: ${form.nombre}`,
      `${f.email}: ${form.email}`,
      `${f.whatsapp}: ${form.whatsapp}`,
      `${f.modelo}: ${model ? `${model.name} (${model.pax} ${t.plazas})` : t.recommend}`,
      `${f.llegada}: ${form.llegada}`,
      `${f.salida}: ${form.salida}${days > 0 ? ` (${days} ${days === 1 ? t.day : t.days})` : ""}`,
      `${f.entrega}: ${zone?.name ?? ""}${zoneNote ? ` — ${zoneNote}` : ""}`,
      `${f.pasajeros}: ${form.pasajeros}`,
      form.comentarios ? `${f.comentarios}: ${form.comentarios}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [form, zone, zoneNote, days, t]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.empresa) return; // bot atrapado por el honeypot: no hacemos nada
    if (!form.llegada || !form.salida) {
      setError(t.errFechas);
      return;
    }
    if (days <= 0) {
      setError(t.errOrden);
      return;
    }
    if (zone?.minDays && days < zone.minDays) {
      setError(t.errMin(zone.name, zone.minDays));
      return;
    }

    window.open(waLink(summary), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-card border border-line bg-cream p-8 text-center">
        <span className="text-4xl" aria-hidden="true">
          ⚡
        </span>
        <h2 className="mt-3 font-display text-2xl font-extrabold">{t.sentTitle}</h2>
        <p className="mx-auto mt-3 max-w-lg text-inktext">{t.success}</p>
        <p className="mt-4 text-sm text-steel">
          {t.waFallback}{" "}
          <a
            href={waLink(summary)}
            className="font-bold text-ink underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {CONTACT.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="nombre">
          {t.lNombre}
        </label>
        <input id="nombre" required value={form.nombre} onChange={set("nombre")} className={inputCls} autoComplete="name" />
      </div>

      <div>
        <label className={labelCls} htmlFor="email">
          {t.lEmail}
        </label>
        <input id="email" type="email" required value={form.email} onChange={set("email")} className={inputCls} autoComplete="email" />
      </div>
      <div>
        <label className={labelCls} htmlFor="whatsapp">
          {t.lWhatsapp}
        </label>
        <input
          id="whatsapp"
          type="tel"
          required
          placeholder="+1 809 000 0000"
          value={form.whatsapp}
          onChange={set("whatsapp")}
          className={inputCls}
          autoComplete="tel"
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="llegada">
          {t.lLlegada}
        </label>
        <input id="llegada" type="date" required value={form.llegada} onChange={set("llegada")} className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="salida">
          {t.lSalida}
        </label>
        <input id="salida" type="date" required value={form.salida} onChange={set("salida")} className={inputCls} />
      </div>

      <div>
        <label className={labelCls} htmlFor="zona">
          {t.lZona}
        </label>
        <select id="zona" required value={form.zona} onChange={set("zona")} className={inputCls}>
          <option value="">{t.zonaPlaceholder}</option>
          {ZONES.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
              {z.minDays ? t.minDays(z.minDays) : ""}
            </option>
          ))}
        </select>
        {zoneNote && zone?.minDays ? (
          <p className="mt-1.5 text-xs font-semibold text-volt-dark">
            {t.zoneNote(zone.name, zone.minDays, zoneNote)}
          </p>
        ) : null}
      </div>
      <div>
        <label className={labelCls} htmlFor="pasajeros">
          {t.lPasajeros}
        </label>
        <select id="pasajeros" required value={form.pasajeros} onChange={set("pasajeros")} className={inputCls}>
          <option value="">{t.pasajerosPlaceholder}</option>
          {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="modelo">
          {t.lModelo}
        </label>
        <select id="modelo" value={form.modelo} onChange={set("modelo")} className={inputCls}>
          <option value="">{t.modeloPlaceholder}</option>
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} · {m.pax} {t.plazas}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="comentarios">
          {t.lComentarios}
        </label>
        <textarea
          id="comentarios"
          rows={3}
          value={form.comentarios}
          onChange={set("comentarios")}
          className={inputCls}
          placeholder={t.comentariosPlaceholder}
        />
      </div>

      {/* Honeypot invisible para bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="empresa">
          Empresa
          <input id="empresa" tabIndex={-1} autoComplete="off" value={form.empresa} onChange={set("empresa")} />
        </label>
      </div>

      {needsMinDays ? (
        <p className="rounded-box bg-cream px-4 py-3 text-sm font-semibold text-volt-dark sm:col-span-2">
          {t.warnMin(zone?.name, zone?.minDays, days)}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="rounded-box bg-red-50 px-4 py-3 text-sm font-semibold text-danger sm:col-span-2">
          {error}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-full bg-volt px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.02] sm:w-auto"
        >
          {t.submit}
        </button>
        <p className="mt-3 text-xs text-steel">
          {t.disclaimer}{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline">
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
