/** Datos de negocio de BOLT — fuente de verdad para todo el sitio. */

export const CONTACT = {
  /** WhatsApp ÚNICO de BOLT, 24/7 (Kenny, 18/oct/2026): el bot de reservas. Cotiza, revisa
   *  disponibilidad y aparta; ventas, aliados, soporte y comprobantes de depósito los pasa al equipo.
   *  Número solo de WhatsApp (API de Meta): NO recibe llamadas (BOLT no atiende llamadas). */
  whatsapp: "18292027849",
  phoneDisplay: "+1 829 202 7849",
  email: "info@krexpert.com",
  address: "Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro, La Altagracia, R.D.",
  legal: "KR Experts and Management SRL · RNC 132-22400-2",
  // Sin Instagram (Kenny, 18/oct/2026): BOLT no tiene cuenta; el enlace llevaba a una que no es suya.
} as const;

export const SLOGAN = "Your ride in paradise.";

/** Web3Forms — respaldo por email de cada solicitud (F6-B). La access key es
 *  pública por diseño (va en el HTML del formulario). El correo destino se
 *  configura en el panel de web3forms.com, no aquí. */
export const WEB3FORMS_ACCESS_KEY = "62ee470e-1f4c-460c-89b9-6e63082e9b3c";

/** Bot de reservas (Railway): cada solicitud de los formularios entra también al CRM de Odoo, y si el
 *  cliente no le escribe al bot en 20 min se avisa al equipo (Kenny, 20/oct/2026: Teresita Bou llenó el
 *  formulario, no tocó "enviar" en WhatsApp y solo quedó el correo). Solo se llama desde boltgolfcars.com
 *  (en localhost/CI no, para no crear oportunidades de prueba). */
export const BOT_FORM_URL = "https://bolt-whatsapp-bot-production.up.railway.app/formulario";

export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Zonas de servicio. PCRC SIEMPRE primero (regla de marca). */
export interface Zone {
  id: string;
  name: string;
  /** Nombre en inglés cuando no es un nombre propio. */
  nameEn?: string;
  short: string;
  blurb: string;
  blurbEn: string;
  /** Mínimo de días de reserva (Casa de Campo = 7). */
  minDays?: number;
  note?: string;
  noteEn?: string;
  /** Transporte (entrega + recogida) por viaje de tráiler, US$ + ITBIS 18%.
   *  Sin valor = se cotiza (fuera de ruta). Lista oficial 16/oct/2026. */
  transport?: number;
  /** Reservas de N días o más: transporte gratis (por reserva, todos los viajes). */
  transportFreeFrom?: number;
  /** Puntos de referencia que acompañan al nombre en la tabla de transporte. */
  landmarks?: string;
  /** Sin landing propia: no sale en sitemap, home ni footer (sí en los formularios). */
  noLanding?: true;
}

export const ZONES: Zone[] = [
  {
    id: "puntacana-resort",
    name: "Puntacana Resort & Club",
    short: "PCRC",
    blurb: "Nuestra zona principal, donde más entregamos. Villas y residenciales de todo el resort.",
    blurbEn: "Our main zone, where we deliver the most. Villas and residences across the resort.",
    transport: 60,
    transportFreeFrom: 5,
  },
  {
    id: "cap-cana",
    name: "Cap Cana",
    short: "Cap Cana",
    blurb: "Cobertura completa: marina, campos de golf y comunidades privadas.",
    blurbEn: "Full coverage: marina, golf courses and gated communities.",
    transport: 60,
    transportFreeFrom: 5,
  },
  {
    id: "bavaro",
    name: "Bávaro",
    short: "Bávaro",
    blurb: "Residenciales y complejos turísticos de la zona de Bávaro.",
    blurbEn: "Residential communities and resorts across Bávaro.",
    transport: 60,
    transportFreeFrom: 10,
    landmarks: "Cocotal, Vista Cana",
  },
  {
    id: "uvero-alto-macao",
    name: "Uvero Alto / Macao",
    short: "Uvero Alto",
    blurb: "Caná Rock, Hard Rock, Bahía Príncipe y resorts de la costa norte.",
    blurbEn: "Caná Rock, Hard Rock, Bahía Príncipe and resorts along the north coast.",
    transport: 120,
    landmarks: "Caná Rock, Hard Rock, Bahía Príncipe",
    noLanding: true,
  },
  {
    id: "casa-de-campo",
    name: "Casa de Campo",
    short: "Casa de Campo",
    blurb: "Disponible para reservas de 7 días o más.",
    blurbEn: "Available for rentals of 7 days or more.",
    minDays: 7,
    note: "Transporte sujeto a cotización.",
    noteEn: "Transport quoted separately.",
  },
  {
    id: "otra-zona",
    name: "Otro complejo privado o evento (cotizar)",
    nameEn: "Other private community or event (quote)",
    short: "Otro",
    blurb: "Complejos privados de Bávaro, Punta Cana y Casa de Campo que no están en la lista, y eventos.",
    blurbEn: "Private communities in Bávaro, Punta Cana and Casa de Campo not listed above, and events.",
    note: "Solo rentamos para uso dentro de complejos privados (residenciales y resorts) y en eventos; el transporte se cotiza.",
    noteEn: "We only rent for use inside private communities (residences and resorts) and at events; transport is quoted.",
    noLanding: true,
  },
];

/** Lugares reales que atiende BOLT (para el schema); excluye la opción genérica de cotizar. */
export const SERVICE_AREAS = ZONES.filter((z) => z.id !== "otra-zona");

/** Zonas con landing propia (/alquiler/{id}) — sitemap, home y footer. */
export const LANDING_ZONES = ZONES.filter((z) => !z.noLanding);

/** Texto corto del transporte de una zona (pills de inicio y landings). Regla de redacción:
 *  primero lo gratis, y nunca "por viaje" a secas (se leía como "por tramo"): es ida y vuelta,
 *  por viaje de tráiler, hasta 2 carritos. */
export function transportLabel(z: Zone, locale: "es" | "en"): string {
  const es = locale === "es";
  if (!z.transport) return es ? "Transporte cotizado según tu villa y fechas" : "Transport quoted by villa and dates";
  const trip = es
    ? `US$${z.transport} ida y vuelta por viaje de tráiler (hasta 2 carritos) + ITBIS`
    : `US$${z.transport} round trip per trailer trip (up to 2 carts) + tax`;
  if (!z.transportFreeFrom) return es ? `${trip} · sin entrega gratis` : `${trip} · no free delivery`;
  return es
    ? `Entrega y recogida gratis desde ${z.transportFreeFrom} días · menos días: ${trip}`
    : `Free delivery & pickup on ${z.transportFreeFrom}+ day stays · shorter: ${trip}`;
}

/** Mínimo de días para CLIENTES DIRECTOS (Kenny, 16/oct/2026): una renta de 1 día puede tumbar
 *  una reserva de varios días de un aliado. A los aliados no les aplica. */
export const MIN_DAYS = { regular: 2, high: 5 } as const;

/** Temporada alta (noches, ISO inclusive): 20 dic – 6 ene y Semana Santa (jueves a domingo). */
export const HIGH_SEASON: ReadonlyArray<readonly [string, string]> = [
  ["2026-12-20", "2027-01-06"],
  ["2027-03-25", "2027-03-28"],
  ["2027-12-20", "2028-01-06"],
  ["2028-04-13", "2028-04-16"],
];

/** Tarifas oficiales (confirmadas jun/2026). Siempre en US$; ITBIS 18% aparte. */
export const PRICING = {
  from4pax: 50,
  from6pax: 75,
  itbisNote: "Tarifas por día en US$. ITBIS 18% no incluido.",
  itbisNoteEn: "Daily rates in US$. 18% ITBIS tax not included.",
} as const;

export function priceFrom(pax: number): number {
  return pax >= 6 ? PRICING.from6pax : PRICING.from4pax;
}
