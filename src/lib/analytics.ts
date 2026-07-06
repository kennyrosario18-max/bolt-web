/** Medición de BOLT — cero cookies, cero PII, compatible con export estático.
 *
 * Pageviews + Web Vitals de campo: Cloudflare Web Analytics (beacon liviano).
 * Para activarlo, pon el token del beacon en NEXT_PUBLIC_CF_BEACON (una constante
 * en el build). Sin token, no se inyecta nada y el sitio funciona igual.
 *
 * Eventos de conversión: se emiten vía `track()`. Hoy quedan registrados en
 * window.__boltEvents (inspeccionables) y, si algún día se conecta un endpoint
 * o Cloudflare Zaraz, se reenvían sin tocar los componentes — solo esta función.
 */

export const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON ?? "";

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
  const w = window as unknown as { __boltEvents?: unknown[] };
  (w.__boltEvents ??= []).push({ event, detail, t: Date.now(), path: location.pathname });
}
