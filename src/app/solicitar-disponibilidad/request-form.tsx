"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MODELS, getModel } from "@/content/models";
import { CONTACT, ZONES, waLink } from "@/content/site";

const SUCCESS_MESSAGE =
  "Gracias por su solicitud. Nuestro equipo verificará la disponibilidad y se comunicará con usted lo antes posible para confirmar su reserva y ofrecerle la mejor opción disponible.";

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

export function RequestForm() {
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
  const needsSevenDays = Boolean(zone?.minDays) && days > 0 && days < (zone?.minDays ?? 0);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const summary = useMemo(() => {
    const model = getModel(form.modelo);
    return [
      "⚡ SOLICITUD DE DISPONIBILIDAD — boltgolfcars.com",
      "",
      `Nombre: ${form.nombre}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Modelo: ${model ? `${model.name} (${model.pax} plazas)` : "Por recomendar"}`,
      `Llegada: ${form.llegada}`,
      `Salida: ${form.salida}${days > 0 ? ` (${days} día${days === 1 ? "" : "s"})` : ""}`,
      `Entrega: ${zone?.name ?? ""}${zone?.note ? ` — ${zone.note}` : ""}`,
      `Pasajeros: ${form.pasajeros}`,
      form.comentarios ? `Comentarios: ${form.comentarios}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [form, zone, days]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.empresa) return; // bot atrapado por el honeypot: no hacemos nada
    if (!form.llegada || !form.salida) {
      setError("Selecciona tus fechas de llegada y salida.");
      return;
    }
    if (days <= 0) {
      setError("La fecha de salida debe ser posterior a la fecha de llegada.");
      return;
    }
    if (zone?.minDays && days < zone.minDays) {
      setError(
        `Para entregas en ${zone.name} el mínimo es de ${zone.minDays} días. Ajusta tus fechas o elige otra zona de entrega.`
      );
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
        <h2 className="mt-3 font-display text-2xl font-extrabold">Solicitud enviada</h2>
        <p className="mx-auto mt-3 max-w-lg text-inktext">{SUCCESS_MESSAGE}</p>
        <p className="mt-4 text-sm text-steel">
          Si WhatsApp no se abrió automáticamente, escríbenos directo al{" "}
          <a href={waLink(summary)} className="font-bold text-ink underline" target="_blank" rel="noopener noreferrer">
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
          Nombre completo *
        </label>
        <input id="nombre" required value={form.nombre} onChange={set("nombre")} className={inputCls} autoComplete="name" />
      </div>

      <div>
        <label className={labelCls} htmlFor="email">
          Correo electrónico *
        </label>
        <input id="email" type="email" required value={form.email} onChange={set("email")} className={inputCls} autoComplete="email" />
      </div>
      <div>
        <label className={labelCls} htmlFor="whatsapp">
          WhatsApp *
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
          Fecha de llegada *
        </label>
        <input id="llegada" type="date" required value={form.llegada} onChange={set("llegada")} className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="salida">
          Fecha de salida *
        </label>
        <input id="salida" type="date" required value={form.salida} onChange={set("salida")} className={inputCls} />
      </div>

      <div>
        <label className={labelCls} htmlFor="zona">
          Lugar de entrega *
        </label>
        <select id="zona" required value={form.zona} onChange={set("zona")} className={inputCls}>
          <option value="">Selecciona la zona…</option>
          {ZONES.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
              {z.minDays ? ` (mínimo ${z.minDays} días)` : ""}
            </option>
          ))}
        </select>
        {zone?.note ? (
          <p className="mt-1.5 text-xs font-semibold text-volt-dark">
            {zone.name}: reservas de {zone.minDays}+ días · {zone.note}
          </p>
        ) : null}
      </div>
      <div>
        <label className={labelCls} htmlFor="pasajeros">
          Cantidad de pasajeros *
        </label>
        <select id="pasajeros" required value={form.pasajeros} onChange={set("pasajeros")} className={inputCls}>
          <option value="">Selecciona…</option>
          {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="modelo">
          Modelo
        </label>
        <select id="modelo" value={form.modelo} onChange={set("modelo")} className={inputCls}>
          <option value="">Recomiéndenme según mi grupo</option>
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} · {m.pax} plazas
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="comentarios">
          Comentarios adicionales
        </label>
        <textarea
          id="comentarios"
          rows={3}
          value={form.comentarios}
          onChange={set("comentarios")}
          className={inputCls}
          placeholder="Nombre de la villa, horario de llegada, ocasión especial…"
        />
      </div>

      {/* Honeypot invisible para bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="empresa">
          Empresa
          <input id="empresa" tabIndex={-1} autoComplete="off" value={form.empresa} onChange={set("empresa")} />
        </label>
      </div>

      {needsSevenDays ? (
        <p className="rounded-box bg-cream px-4 py-3 text-sm font-semibold text-volt-dark sm:col-span-2">
          Para {zone?.name} el mínimo es de {zone?.minDays} días — tu selección actual es de {days}{" "}
          día{days === 1 ? "" : "s"}.
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
          ⚡ Enviar solicitud por WhatsApp
        </button>
        <p className="mt-3 text-xs text-steel">
          Al enviar se abrirá WhatsApp con tu solicitud lista — solo presiona enviar. También puedes
          escribirnos a{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline">
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
