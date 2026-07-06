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

export const LINE_NAMES_EN: Record<Model["line"], string> = {
  eco: "ECO Line",
  clubcar: "Club Car",
  zycar: "Zycar",
};

export function lineName(line: Model["line"], locale: "es" | "en"): string {
  return locale === "es" ? LINE_NAMES[line] : LINE_NAMES_EN[line];
}

/** Traducciones EN de las descripciones (el JSON original solo trae ES). */
export const DESC_EN: Record<string, string> = {
  "eco-cross-4": "Compact ECO Cross for 4 passengers with all seats facing forward.",
  "eco-cross-4-2": "ECO Cross 4+2: the extended 6-passenger version of the ECO Cross.",
  "eco-plus-2-2": "ECO Plus in a 2+2 layout with rear-facing seats for 4 passengers.",
  "eco-plus-4-2": "6-passenger ECO Plus — maximum comfort for families and groups.",
  "eco-track-4-2": "All-terrain ECO with reinforced suspension and 150 Ah lithium. Seats 6.",
  "eco-sport-4-2": "Extended ECO Sport with a sporty look. Seats 6, up to 540 kg.",
  "cc-limo-4-2": "Club Car limo configuration — the most spacious, ideal for events.",
  "cc-precedent-2-2": "Classic Precedent 2+2 with rear-facing seats for 4 passengers.",
  "cc-tempo-2-2": "Club Car Tempo: modern design, smooth quiet ride, 2+2 seats for 4.",
  "zycar-4": "The Zycar line — a modern build with tech details. Seats 4 passengers in comfort.",
  "zycar-4-2": "Extended Zycar for 6 passengers with contemporary design.",
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
