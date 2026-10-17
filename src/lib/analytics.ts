/** Medición de BOLT — cero cookies, cero datos personales, compatible con export estático.
 *
 * Visitas + origen + eventos: Umami Cloud (plan gratis), script `defer` plano en
 * <Analytics/> (NO next/script: el postbuild quita el runtime de React y un script
 * inyectado por hidratación nunca correría). Para activarlo, pon el Website ID del
 * sitio en UMAMI_WEBSITE_ID. Vacío = no se inyecta nada y el sitio funciona igual.
 * `data-domains` limita la medición al dominio real (nada en local ni en preview).
 *
 * Eventos de conversión (wa_click, form_submit…): los shims vanilla los dejan en
 * window.__boltEvents (inspeccionables) y, si Umami está cargado, los reenvían con
 * `umami.track(ev)`. La línea de WhatsApp no se conecta a nada: solo se cuenta el clic.
 */

export const UMAMI_SRC = "https://cloud.umami.is/script.js";
export const UMAMI_WEBSITE_ID = "60f5da77-8414-42c8-9b27-b7b2579f6353";
export const UMAMI_DOMAINS = "boltgolfcars.com";

export type BoltEvent =
  | "wa_click" // clic en cualquier enlace de WhatsApp
  | "form_submit" // envío del formulario de disponibilidad
  | "form_open_whatsapp" // apertura efectiva de wa.me desde el formulario
  | "cta_hero" // clic en el CTA principal del hero
  | "tel_click" // clic en el teléfono
  | "email_click"; // clic en el email

/** Registra un evento de conversión. Seguro en SSR (no hace nada sin window). */
export function track(event: BoltEvent, detail?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __boltEvents?: unknown[]; umami?: { track?: (n: string, d?: object) => void } };
  (w.__boltEvents ??= []).push({ event, detail, t: Date.now(), path: location.pathname });
  try {
    w.umami?.track?.(event, detail);
  } catch {
    /* la medición nunca rompe la página */
  }
}
