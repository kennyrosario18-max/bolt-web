import raw from "./models.json";

/** Datos migrados programáticamente del catálogo actual (reservas.boltgolfcars.com/catalogo). */
export interface BatteryOption {
  name: string;
  nameEn: string;
  range: string;
}

export interface Model {
  id: string;
  name: string;
  line: "eco" | "clubcar" | "zycar";
  pax: 4 | 6;
  speed: string;
  cap: string;
  range_lead: string;
  range_li: string;
  desc: string;
  /** Opciones de batería confirmadas por Kenny (jul/2026); si existe,
      reemplaza las celdas genéricas plomo/litio en la ficha. */
  batteries?: BatteryOption[];
}

export const MODELS = raw as Model[];

export const LINE_NAMES: Record<Model["line"], string> = {
  eco: "Línea ECO",
  clubcar: "Club Car",
  zycar: "Zycar",
};

/** Traducciones EN de las descripciones (el JSON original solo trae ES). */
export const DESC_EN: Record<string, string> = {
  "eco-cross-4": "Compact ECO line for 4 passengers. Ideal for residential communities and resorts.",
  "eco-cross-4-2": "Extended ECO Cross for groups of up to 6 passengers, with premium lithium battery options for all-day range around the resort.",
  "eco-plus-2-2": "ECO Plus in a 2+2 layout with rear-facing seats for 4 passengers \u2014 comfortable, easy to drive and ideal for couples and small families.",
  "eco-plus-4-2": "6-passenger ECO Plus — maximum comfort for families and groups.",
  "eco-track-4-2": "All-terrain ECO variant with reinforced suspension and long-range 150 Ah lithium battery. Seats 6 with room for the whole crew.",
  "eco-sport-4-2": "Extended ECO Sport for groups. Sporty look, 6 seats and up to 540 kg of capacity for families and friends on the move.",
  "cc-limo-4-2": "Club Car limo configuration — the most spacious, ideal for events.",
  "cc-precedent-2-2": "Classic Precedent 2+2 with rear-facing seats for 4 passengers.",
  "cc-tempo-2-2": "Club Car Tempo with modern design and a smooth, quiet ride. Seats 4 passengers in a comfortable 2+2 layout.",
  "zycar-4": "The Zycar line — a modern build with tech details.",
  "zycar-4-2": "Extended Zycar for 6 passengers with contemporary design and tech details \u2014 a modern ride for larger groups.",
};

/** Qué incluye cada renta (aplica a toda la flota). */
export const INCLUDED = [
  { es: "Entrega y recogida en tu villa o residencial", en: "Delivery & pickup at your villa" },
  { es: "Cargador y orientación de uso incluidos", en: "Charger and usage briefing included" },
  { es: "Vehículo asegurado", en: "Insured vehicle" },
  { es: "Soporte por WhatsApp 24/7 en español e inglés", en: "24/7 bilingual WhatsApp support" },
];

export function getModel(id: string): Model | undefined {
  return MODELS.find((m) => m.id === id);
}

/** Relacionados: misma línea primero, luego mismas plazas. */
export function relatedModels(model: Model, count = 3): Model[] {
  const others = MODELS.filter((m) => m.id !== model.id);
  const sameLine = others.filter((m) => m.line === model.line);
  const samePax = others.filter((m) => m.line !== model.line && m.pax === model.pax);
  return [...sameLine, ...samePax].slice(0, count);
}

export function modelImage(id: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/models/${id}.jpg`;
}
