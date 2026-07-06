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
  metaTitleEn: string;
  metaDescriptionEn: string;
  intro: string;
  introEn: string;
  bullets: { es: string; en: string }[];
  recommendedIds: string[];
  faqs: { q: string; a: string }[];
  faqsEn: { q: string; a: string }[];
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
    metaTitleEn: "Golf carts in Puntacana Resort & Club",
    metaDescriptionEn: "Golf cart rental with villa delivery inside Puntacana Resort & Club. 4 and 6-seat fleet, insured vehicles and 24/7 bilingual support.",
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
    faqsEn: [
      { q: "Do you deliver inside Puntacana Resort & Club?", a: "Yes, to villas and residences across the resort. We coordinate delivery with your host, concierge or property manager for access." },
      { q: "Can I drive anywhere in the resort?", a: "The golf cart is for use inside residential areas, villas and permitted resort areas, following the resort's internal rules and BOLT's 25 km/h limit in residential zones." },
      { q: "How far in advance should I book?", a: "We recommend requesting availability as soon as you have your dates — in high season the fleet sells out. We confirm on WhatsApp as soon as possible." },
    ],
  },
  {
    zone: byId("cap-cana"),
    heroTitle: "Renta de golf carts en Cap Cana",
    heroTitleEn: "Golf cart rental in Cap Cana",
    metaTitle: "Golf carts en Cap Cana desde US$50/día",
    metaDescription:
      "Golf carts de 4 y 6 plazas entregados en tu villa en Cap Cana desde US$50/día. Entrega incluida en rentas de 2+ días y soporte bilingüe 24/7.",
    metaTitleEn: "Golf carts in Cap Cana from US$50/day",
    metaDescriptionEn: "4 and 6-seat golf carts delivered to your villa in Cap Cana from US$50/day. Free delivery on 2+ day rentals and 24/7 bilingual support.",
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
    faqsEn: [
      { q: "Do you deliver to any community in Cap Cana?", a: "We deliver to villas and residences inside Cap Cana. Tell us the name of your community or villa in your request and we coordinate access." },
      { q: "Which model is best for a large group?", a: "For 5 or 6 people we recommend the 6-seat ECO line (4+2). For maximum comfort, the premium ECO Cross with long-range lithium (150 Ah) does up to 95 km per charge." },
      { q: "Is delivery free?", a: "For rentals of 2+ days, delivery and pickup are included. For 1-day rentals a US$40 + tax transport fee applies." },
    ],
  },
  {
    zone: byId("bavaro"),
    heroTitle: "Renta de golf carts en Bávaro",
    heroTitleEn: "Golf cart rental in Bávaro",
    metaTitle: "Golf carts en Bávaro desde US$50/día",
    metaDescription:
      "Nuestra base está en Bávaro: entrega rápida de golf carts en residenciales y complejos de la zona desde US$50/día. Tarifas semanales y mensuales.",
    metaTitleEn: "Golf carts in Bávaro from US$50/day",
    metaDescriptionEn: "Our base is in Bávaro: fast golf cart delivery to residential communities and resorts from US$50/day. Weekly and monthly rates available.",
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
    faqsEn: [
      { q: "Where are you located?", a: "Our base is at Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro. The whole fleet dispatches from there." },
      { q: "Can I pick up the cart myself?", a: "Our standard service is home delivery within the area. If you'd rather arrange something different, message us on WhatsApp and we'll look into it." },
      { q: "Do you rent by the week or month?", a: "Yes. For 7+ nights we offer discounted weekly and monthly rates — ask on WhatsApp when you send your request." },
    ],
  },
  {
    zone: byId("casa-de-campo"),
    heroTitle: "Renta de golf carts en Casa de Campo",
    heroTitleEn: "Golf cart rental in Casa de Campo",
    metaTitle: "Golf carts en Casa de Campo — 7+ días",
    metaDescription:
      "Llevamos golf carts a Casa de Campo en reservas de 7 días o más, con transporte cotizado según tu villa. Flota premium de 4 y 6 plazas.",
    metaTitleEn: "Golf carts in Casa de Campo — 7+ days",
    metaDescriptionEn: "We bring golf carts to Casa de Campo for rentals of 7 days or more, with transport quoted by villa. Premium 4 and 6-seat fleet.",
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
    faqsEn: [
      { q: "Why is there a 7-day minimum?", a: "Casa de Campo is outside our home base in Punta Cana. Transporting the cart only makes sense for longer stays — hence the 7-day minimum." },
      { q: "How much does transport to Casa de Campo cost?", a: "It's quoted based on your villa and dates. Send your request and we'll include the exact transport cost in the confirmation — no surprises." },
      { q: "Is the daily rate the same?", a: "Yes, the model's daily rate is the same. Only the quoted transport is added and, for 7+ nights, our discounted weekly rate applies." },
    ],
  },
  {
    zone: byId("la-romana"),
    heroTitle: "Renta de golf carts en La Romana",
    heroTitleEn: "Golf cart rental in La Romana",
    metaTitle: "Golf carts en La Romana — 7+ días",
    metaDescription:
      "Renta de golf carts en La Romana para estadías de 7 días o más. Entrega en tu villa con transporte cotizado y soporte 24/7 por WhatsApp.",
    metaTitleEn: "Golf carts in La Romana — 7+ days",
    metaDescriptionEn: "Golf cart rental in La Romana for stays of 7 days or more. Villa delivery with quoted transport and 24/7 WhatsApp support.",
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
    faqsEn: [
      { q: "Do you serve villas across La Romana?", a: "We serve villas and residences in the area for rentals of 7 days or more. Give us the exact location in your request and we'll confirm coverage and transport." },
      { q: "What's the minimum rental?", a: "7 days. Being outside our Punta Cana home base, the transfer only makes sense for longer stays." },
      { q: "How is transport quoted?", a: "Based on your villa's location and your dates. Send the request and you'll get the exact cost in your WhatsApp confirmation." },
    ],
  },
];

export function getZoneLanding(zonaId: string): ZoneLanding | undefined {
  return ZONE_LANDINGS.find((l) => l.zone.id === zonaId);
}
