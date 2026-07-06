/** Datos de negocio de BOLT — fuente de verdad para todo el sitio. */

export const CONTACT = {
  whatsapp: "18098398515",
  phoneDisplay: "+1 809 839 8515",
  email: "info@krexpert.com",
  address: "Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro, La Altagracia, R.D.",
  legal: "KR Experts and Management SRL · RNC 132-22400-2",
  instagram: "https://www.instagram.com/boltgolfcars",
} as const;

export const SLOGAN = "Your ride in paradise.";

/** Web3Forms — respaldo por email de cada solicitud (F6-B). La access key es
 *  pública por diseño (va en el HTML del formulario). El correo destino se
 *  configura en el panel de web3forms.com, no aquí. */
export const WEB3FORMS_ACCESS_KEY = "62ee470e-1f4c-460c-89b9-6e63082e9b3c";

export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Zonas de servicio. PCRC SIEMPRE primero (regla de marca). */
export interface Zone {
  id: string;
  name: string;
  short: string;
  blurb: string;
  blurbEn: string;
  /** Mínimo de días de reserva (Casa de Campo / La Romana = 7). */
  minDays?: number;
  note?: string;
  noteEn?: string;
}

export const ZONES: Zone[] = [
  {
    id: "puntacana-resort",
    name: "Puntacana Resort & Club",
    short: "PCRC",
    blurb: "Nuestra base principal. Entrega en villas y residenciales de todo el resort.",
    blurbEn: "Our home base. Delivery to villas and residences across the resort.",
  },
  {
    id: "cap-cana",
    name: "Cap Cana",
    short: "Cap Cana",
    blurb: "Cobertura completa: marina, campos de golf y comunidades privadas.",
    blurbEn: "Full coverage: marina, golf courses and gated communities.",
  },
  {
    id: "bavaro",
    name: "Bávaro",
    short: "Bávaro",
    blurb: "Residenciales y complejos turísticos de la zona de Bávaro.",
    blurbEn: "Residential communities and resorts across Bávaro.",
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
    id: "la-romana",
    name: "La Romana",
    short: "La Romana",
    blurb: "Disponible para reservas de 7 días o más.",
    blurbEn: "Available for rentals of 7 days or more.",
    minDays: 7,
    note: "Transporte sujeto a cotización.",
    noteEn: "Transport quoted separately.",
  },
];

/** Tarifas oficiales (confirmadas jun/2026). Siempre en US$; ITBIS 18% aparte. */
export const PRICING = {
  from4pax: 50,
  from6pax: 65,
  itbisNote: "Tarifas por día en US$. ITBIS 18% no incluido.",
  itbisNoteEn: "Daily rates in US$. 18% ITBIS tax not included.",
} as const;

export function priceFrom(pax: number): number {
  return pax >= 6 ? PRICING.from6pax : PRICING.from4pax;
}
