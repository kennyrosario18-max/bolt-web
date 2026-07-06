import { MODELS, type Model } from "./models";

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
  "zycar-4-2": 75,
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

export const DELIVERY_POLICY = {
  es: [
    { b: "2 días o más:", rest: " entrega y recogida incluidas sin costo." },
    { b: "1 día:", rest: " US$40 + ITBIS (US$47.20) por transporte." },
    { b: "7 noches o más:", rest: " pregunta por tarifa semanal y mensual con descuento." },
  ],
  en: "2+ days: delivery included free. 1 day: US$40 + tax (US$47.20). 7+ nights: ask about discounted weekly & monthly rates.",
};

export const PRICING_FOOTNOTE = {
  es: "Precios en US$ por día. No incluyen ITBIS; se agrega 18% (mostrado en cada modelo). Disponibilidad sujeta a flota.",
  en: "Prices in US$ per day. Tax (ITBIS 18%) not included; shown per model. Subject to fleet availability.",
};
