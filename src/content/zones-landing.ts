import { ZONES, type Zone } from "./site";

/** Contenido único por zona para las landings /alquiler/[zona].
    El orden hereda la regla de marca: PCRC siempre primero. */

export interface ZoneLanding {
  zone: Zone;
  heroTitle: string;
  heroTitleEn: string;
  /** Title SEO corto (≤43 chars: el template añade " | BOLT Golf Cars"). */
  metaTitle: string;
  /** Description SEO redactada (~150 chars), sin cortes automáticos. */
  metaDescription: string;
  intro: string;
  introEn: string;
  bullets: { es: string; en: string }[];
  recommendedIds: string[];
  faqs: { q: string; a: string }[];
}

const byId = (id: string): Zone => {
  const z = ZONES.find((z) => z.id === id);
  if (!z) throw new Error(`Zona desconocida: ${id}`);
  return z;
};

export const ZONE_LANDINGS: ZoneLanding[] = [
  {
    zone: byId("puntacana-resort"),
    heroTitle: "Renta de golf carts en Puntacana Resort & Club",
    heroTitleEn: "Golf cart rental in Puntacana Resort & Club",
    metaTitle: "Golf carts en Puntacana Resort & Club",
    metaDescription:
      "Renta de golf carts con entrega en tu villa en Puntacana Resort & Club. Flota de 4 y 6 plazas, vehículos asegurados y soporte bilingüe 24/7.",
    intro:
      "Es nuestra base principal y donde más carritos entregamos cada semana. Llevamos tu golf cart con carga completa hasta tu villa, coordinando el acceso con tu anfitrión o property manager.",
    introEn:
      "Our home base — and where we deliver the most carts every week. We bring your golf cart fully charged to your villa and coordinate access with your host or property manager.",
    bullets: [
      { es: "Entrega en villas y residenciales de todo el resort", en: "Delivery to villas and residences across the resort" },
      { es: "Coordinación directa con concierges y property managers", en: "Direct coordination with concierges and property managers" },
      { es: "Asistencia y reposición si algo falla — soporte 24/7", en: "Swap or assistance if anything fails — 24/7 support" },
    ],
    recommendedIds: ["eco-cross-4-2", "eco-plus-4-2", "cc-precedent-2-2"],
    faqs: [
      {
        q: "¿Entregan dentro de Puntacana Resort & Club?",
        a: "Sí, en villas y residenciales de todo el resort. Coordinamos la entrega con tu anfitrión, concierge o property manager para el acceso.",
      },
      {
        q: "¿Puedo circular por todo el resort?",
        a: "El golf cart es para uso dentro de residenciales, villas y áreas permitidas del resort, respetando las normas internas del resort y nuestro límite BOLT de 25 km/h en zonas residenciales.",
      },
      {
        q: "¿Con cuánta anticipación debo reservar?",
        a: "Recomendamos solicitar disponibilidad apenas tengas tus fechas — en temporada alta la flota se agota. Te confirmamos por WhatsApp lo antes posible.",
      },
    ],
  },
  {
    zone: byId("cap-cana"),
    heroTitle: "Renta de golf carts en Cap Cana",
    heroTitleEn: "Golf cart rental in Cap Cana",
    metaTitle: "Golf carts en Cap Cana desde US$50/día",
    metaDescription:
      "Golf carts de 4 y 6 plazas entregados en tu villa en Cap Cana desde US$50/día. Entrega incluida en rentas de 2+ días y soporte bilingüe 24/7.",
    intro:
      "Cobertura completa dentro de Cap Cana: desde la zona de la marina hasta los campos de golf y las comunidades privadas. Entregamos en tu villa o apartamento con todo listo para rodar.",
    introEn:
      "Full coverage inside Cap Cana — from the marina area to the golf courses and private communities. We deliver to your villa or apartment, ready to ride.",
    bullets: [
      { es: "Entrega en comunidades y residenciales privados de Cap Cana", en: "Delivery to Cap Cana's private communities" },
      { es: "Modelos de 6 plazas ideales para familias y grupos", en: "6-seaters ideal for families and groups" },
      { es: "Soporte 24/7 por WhatsApp en español e inglés", en: "24/7 bilingual WhatsApp support" },
    ],
    recommendedIds: ["eco-cross-4-2", "eco-sport-4-2", "zycar-4-2"],
    faqs: [
      {
        q: "¿Entregan en cualquier comunidad de Cap Cana?",
        a: "Entregamos en villas y residenciales dentro de Cap Cana. Al enviar tu solicitud indícanos el nombre de tu comunidad o villa y coordinamos el acceso.",
      },
      {
        q: "¿Qué modelo me conviene para un grupo grande?",
        a: "Para 5 o 6 personas recomendamos la línea ECO de 6 plazas (4+2). Si buscan máximo confort, el ECO Cross premium con batería de litio de largo alcance (150 Ah) rinde hasta 95 km por carga.",
      },
      {
        q: "¿La entrega tiene costo?",
        a: "En rentas de 2 días o más la entrega y recogida están incluidas. Para rentas de 1 día aplica un cargo de transporte de US$40 + ITBIS.",
      },
    ],
  },
  {
    zone: byId("bavaro"),
    heroTitle: "Renta de golf carts en Bávaro",
    heroTitleEn: "Golf cart rental in Bávaro",
    metaTitle: "Golf carts en Bávaro desde US$50/día",
    metaDescription:
      "Nuestra base está en Bávaro: entrega rápida de golf carts en residenciales y complejos de la zona desde US$50/día. Tarifas semanales y mensuales.",
    intro:
      "Bávaro es nuestra casa: aquí está nuestra base de operaciones. Eso significa entrega rápida, asistencia inmediata y toda la flota disponible para residenciales y complejos turísticos de la zona.",
    introEn:
      "Bávaro is home — our operations base is here. That means fast delivery, immediate assistance and the full fleet available for residential communities and resorts in the area.",
    bullets: [
      { es: "Base de operaciones en Bávaro: la respuesta más rápida", en: "Operations base in Bávaro — our fastest response" },
      { es: "Entrega en residenciales y complejos turísticos de la zona", en: "Delivery to residential communities and resorts" },
      { es: "Ideal para estadías largas: pregunta por tarifa semanal y mensual", en: "Great for long stays — ask about weekly & monthly rates" },
    ],
    recommendedIds: ["eco-plus-2-2", "eco-track-4-2", "cc-tempo-2-2"],
    faqs: [
      {
        q: "¿Dónde están ubicados?",
        a: "Nuestra base está en Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro. Desde ahí despachamos toda la flota.",
      },
      {
        q: "¿Puedo recoger el carrito yo mismo?",
        a: "Nuestro servicio estándar es entrega a domicilio dentro de la zona. Si prefieres coordinar diferente, escríbenos por WhatsApp y lo evaluamos.",
      },
      {
        q: "¿Rentan por semanas o meses?",
        a: "Sí. Para 7 noches o más tenemos tarifa semanal y mensual con descuento — pregunta por WhatsApp al enviar tu solicitud.",
      },
    ],
  },
  {
    zone: byId("casa-de-campo"),
    heroTitle: "Renta de golf carts en Casa de Campo",
    heroTitleEn: "Golf cart rental in Casa de Campo",
    metaTitle: "Golf carts en Casa de Campo — 7+ días",
    metaDescription:
      "Llevamos golf carts a Casa de Campo en reservas de 7 días o más, con transporte cotizado según tu villa. Flota premium de 4 y 6 plazas.",
    intro:
      "Llevamos nuestra flota hasta Casa de Campo para reservas de 7 días o más. El transporte del carrito se cotiza según tu villa y fechas — lo incluimos en la confirmación de tu solicitud.",
    introEn:
      "We bring our fleet to Casa de Campo for rentals of 7 days or more. Cart transport is quoted based on your villa and dates — included in your request confirmation.",
    bullets: [
      { es: "Disponible para reservas de 7 días o más", en: "Available for rentals of 7 days or more" },
      { es: "Transporte sujeto a cotización según villa y fechas", en: "Transport quoted by villa and dates" },
      { es: "Ideal para estadías largas y villas familiares", en: "Ideal for long stays and family villas" },
    ],
    recommendedIds: ["eco-cross-4-2", "eco-plus-4-2", "cc-limo-4-2"],
    faqs: [
      {
        q: "¿Por qué el mínimo es de 7 días?",
        a: "Casa de Campo está fuera de nuestra zona base en Punta Cana. El traslado del carrito solo se justifica en estadías largas — por eso el mínimo de 7 días.",
      },
      {
        q: "¿Cuánto cuesta el transporte hasta Casa de Campo?",
        a: "Se cotiza según tu villa y fechas. Envía tu solicitud y te incluimos el costo exacto de transporte en la confirmación, sin sorpresas.",
      },
      {
        q: "¿La tarifa diaria es la misma?",
        a: "Sí, la tarifa por día del modelo es la misma. Solo se suma el transporte cotizado y, para 7+ noches, aplica nuestra tarifa semanal con descuento.",
      },
    ],
  },
  {
    zone: byId("la-romana"),
    heroTitle: "Renta de golf carts en La Romana",
    heroTitleEn: "Golf cart rental in La Romana",
    metaTitle: "Golf carts en La Romana — 7+ días",
    metaDescription:
      "Renta de golf carts en La Romana para estadías de 7 días o más. Entrega en tu villa con transporte cotizado y soporte 24/7 por WhatsApp.",
    intro:
      "Atendemos la zona de La Romana con reservas de 7 días o más. Tu golf cart llega a tu villa o residencial con carga completa; el transporte se cotiza según la ubicación exacta.",
    introEn:
      "We serve the La Romana area with rentals of 7 days or more. Your golf cart arrives fully charged at your villa; transport is quoted by exact location.",
    bullets: [
      { es: "Disponible para reservas de 7 días o más", en: "Available for rentals of 7 days or more" },
      { es: "Transporte sujeto a cotización según ubicación", en: "Transport quoted by location" },
      { es: "La misma flota y el mismo soporte 24/7 de Punta Cana", en: "Same fleet, same 24/7 support" },
    ],
    recommendedIds: ["eco-plus-4-2", "eco-track-4-2", "zycar-4"],
    faqs: [
      {
        q: "¿Atienden villas en toda La Romana?",
        a: "Atendemos villas y residenciales de la zona para reservas de 7 días o más. Indícanos la ubicación exacta en tu solicitud y te confirmamos cobertura y transporte.",
      },
      {
        q: "¿Cuál es el mínimo de reserva?",
        a: "7 días. Al estar fuera de nuestra zona base en Punta Cana, el traslado solo se justifica en estadías largas.",
      },
      {
        q: "¿Cómo se cotiza el transporte?",
        a: "Según la ubicación de tu villa y las fechas. Envía la solicitud y recibirás el costo exacto en la confirmación por WhatsApp.",
      },
    ],
  },
];

export function getZoneLanding(zonaId: string): ZoneLanding | undefined {
  return ZONE_LANDINGS.find((l) => l.zone.id === zonaId);
}
