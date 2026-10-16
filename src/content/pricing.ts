import { MODELS, type Model } from "./models";
import { ZONES } from "./site";

/** Tarifas oficiales de renta — POR MODELO (confirmadas por Kenny, jul/2026).
 *  Siempre US$/día; el ITBIS 18% se calcula desde aquí, nunca a mano. Fuente
 *  única: cada precio se define una vez y se propaga a fichas, /precios, el
 *  formulario, el schema y las OG cards. */

/** Precio base US$/día por id de modelo. */
export const MODEL_PRICES: Record<string, number> = {
  "eco-cross-4": 65,
  "eco-cross-4-2": 85,
  "eco-plus-2-2": 60,
  "eco-plus-4-2": 75,
  "eco-track-4-2": 100,
  "eco-sport-4-2": 75,
  "cc-limo-4-2": 65,
  "cc-precedent-2-2": 50,
  "cc-tempo-2-2": 60,
  "zycar-4": 65,
  "zycar-4-2": 100,
};

/** Precio base US$/día de un modelo. */
export function modelPrice(id: string): number {
  return MODEL_PRICES[id] ?? 0;
}

/** ITBIS 18% incluido, formateado "US$XX.XX". */
export function withItbis(usd: number): string {
  return `US$${(usd * 1.18).toFixed(2)}`;
}

const PRICES = Object.values(MODEL_PRICES);
export const MIN_PRICE = Math.min(...PRICES);
export const MAX_PRICE = Math.max(...PRICES);

/** "Desde" por capacidad = el modelo más barato de esas plazas (4→50, 6→65). */
export function priceFromPax(pax: number): number {
  const of = MODELS.filter((m) => m.pax === pax).map((m) => modelPrice(m.id));
  return of.length ? Math.min(...of) : MIN_PRICE;
}

export interface PricedModel {
  id: string;
  name: string;
  line: Model["line"];
  price: number;
}

/** Modelos con su precio, ordenados por precio — para la página /precios. */
export function pricedModels(pax: 4 | 6): PricedModel[] {
  return MODELS.filter((m) => m.pax === pax)
    .map((m) => ({ id: m.id, name: m.name, line: m.line, price: modelPrice(m.id) }))
    .sort((a, b) => a.price - b.price);
}

/** Transporte (entrega + recogida, ida y vuelta) — lista oficial del 16/oct/2026.
 *  Se cobra POR VIAJE de tráiler (2 carritos de 4 plazas, o 1 de 6 + 1 de 4), en
 *  US$ + ITBIS 18%. La exención es POR RESERVA: si cumple los días de la zona,
 *  todos los viajes van gratis. Tarifas y umbrales viven en ZONES (site.ts). */
export const TRANSPORT_ZONES = ZONES.filter((z) => z.transport);

export const TRANSPORT_RULES = {
  es: [
    "Se cobra por viaje de tráiler, no por carrito: en un viaje van 2 carritos de 4 plazas, o 1 de 6 y 1 de 4. Dos de 6 plazas son 2 viajes.",
    "Entrega gratis por reserva: si tu reserva cumple los días de la zona, todos los viajes van gratis (ej. 3 carritos a Bávaro por 12 días = US$0).",
    "Uvero Alto / Macao y las zonas fuera de ruta no tienen exención.",
    "Se paga con la reserva y sigue la misma política de cancelación de la renta.",
    "Incluye gas o batería lista y el carrito limpio y listo para rodar.",
  ],
  en: [
    "Charged per trailer trip, not per cart: one trip carries 2 four-seaters, or 1 six-seater and 1 four-seater. Two six-seaters are 2 trips.",
    "Free delivery is per reservation: if your rental meets the zone's days, every trip is free (e.g. 3 carts to Bávaro for 12 days = US$0).",
    "Uvero Alto / Macao and out-of-route areas are never exempt.",
    "Paid with the reservation and subject to the same cancellation policy as the rental.",
    "Includes gas or a charged battery and a clean cart, ready to drive.",
  ],
};

export const PRICING_FOOTNOTE = {
  es: "Precios en US$ por día. No incluyen ITBIS; se agrega 18% (mostrado en cada modelo). Transporte por zona aparte. Disponibilidad sujeta a flota.",
  en: "Prices in US$ per day. Tax (ITBIS 18%) not included; shown per model. Zone transport billed separately. Subject to fleet availability.",
};
