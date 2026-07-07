import { ZONES, type Zone } from "./site";

/** Contenido único por zona para las landings /alquiler/[zona].
    El orden hereda la regla de marca: PCRC siempre primero.
    F7-B: cada zona lleva `sections` (cuerpo largo SEO 700-900 palabras) además
    del intro corto del hero. Todo el contenido está anclado en hechos reales de
    la operación BOLT — sin inventar atracciones ni datos no verificables. */

export interface ContentSection {
  h: string;
  hEn: string;
  /** Párrafos del bloque (uno por elemento). */
  p: string[];
  pEn: string[];
}

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
  /** Cuerpo largo (F7-B): 3 secciones de ~150 palabras que llevan la página a
      700-900 palabras de contenido único e indexable. */
  sections: ContentSection[];
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
    sections: [
      {
        h: "Por qué necesitas un golf cart en Puntacana Resort & Club",
        hEn: "Why you need a golf cart in Puntacana Resort & Club",
        p: [
          "Puntacana Resort & Club es una comunidad enorme: entre las villas, los campos de golf, las playas, los clubes y los restaurantes hay distancias que a pie se hacen largas, sobre todo bajo el sol del Caribe y cargando bolsos de playa o palos de golf. El golf cart es el vehículo natural del resort — la forma en que los residentes y huéspedes se mueven todos los días.",
          "Con tu propio carrito no dependes de taxis internos ni de horarios: sales a desayunar, vuelves a la villa, bajas a la playa por la tarde y llegas a cenar sin coordinar traslados con nadie. Para familias es la diferencia entre pelear con el reloj y disfrutar el día a su ritmo. Por eso reservar con anticipación importa: es nuestra zona de mayor demanda y en temporada alta la flota se agota.",
        ],
        pEn: [
          "Puntacana Resort & Club is a large community: between the villas, golf courses, beaches, clubs and restaurants there are distances that get long on foot — especially under the Caribbean sun while carrying beach bags or golf clubs. The golf cart is the resort's natural vehicle, the way residents and guests get around every day.",
          "With your own cart you don't depend on internal taxis or schedules: you head out for breakfast, come back to the villa, go down to the beach in the afternoon and make it to dinner without coordinating rides with anyone. For families it's the difference between fighting the clock and enjoying the day at your own pace. That's why booking ahead matters: this is our highest-demand area, and in high season the fleet sells out.",
        ],
      },
      {
        h: "Entrega en tu villa, coordinada con tu anfitrión",
        hEn: "Delivery to your villa, coordinated with your host",
        p: [
          "Entregamos en villas y residenciales de todo el resort. Como el acceso a Puntacana Resort & Club es controlado, coordinamos directamente con tu anfitrión, concierge o property manager para que el carrito esté esperándote a tu llegada, con la batería completa y una breve orientación de uso.",
          "El servicio incluye entrega y recogida dentro de nuestras zonas en rentas de dos días o más. Si algo falla durante tu estadía, nuestro soporte 24/7 por WhatsApp responde y, cuando hace falta, reponemos la unidad — no queremos que pierdas ni una tarde de tus vacaciones. Todos los vehículos van asegurados y respetamos el límite BOLT de 25 km/h en zonas residenciales por la seguridad de todos.",
        ],
        pEn: [
          "We deliver to villas and residences across the resort. Since access to Puntacana Resort & Club is controlled, we coordinate directly with your host, concierge or property manager so the cart is waiting for you on arrival, fully charged and with a short usage briefing.",
          "The service includes delivery and pickup within our zones on rentals of two days or more. If anything fails during your stay, our 24/7 WhatsApp support answers and, when needed, we swap the unit — we don't want you to lose a single afternoon of your holiday. Every vehicle is insured, and we keep BOLT's 25 km/h limit in residential zones for everyone's safety.",
        ],
      },
      {
        h: "Qué modelo elegir según tu grupo",
        hEn: "Which model to choose for your group",
        p: [
          "Para dos o tres personas, un modelo de 4 plazas rinde de sobra y es el más económico, desde US$50 por día. Para familias o grupos de cinco y seis, los modelos de 4+2 plazas dan espacio real para todos más los bolsos, desde US$65 por día — el precio exacto depende del modelo y lo ves claro en cada ficha.",
          "Si buscan autonomía para moverse todo el día sin pensar en la carga, la línea ECO premium con batería de litio de largo alcance es la opción más cómoda. Si no estás seguro, en tu solicitud puedes pedir que te recomendemos según tu grupo y tus planes: te respondemos por WhatsApp el mismo día con la mejor opción disponible.",
        ],
        pEn: [
          "For two or three people, a 4-seat model is more than enough and the most affordable, from US$50 a day. For families or groups of five and six, the 4+2 models give real room for everyone plus the bags, from US$65 a day — the exact price depends on the model and is shown clearly on each spec page.",
          "If you want range to move around all day without thinking about charge, the premium ECO line with long-range lithium is the most comfortable choice. If you're unsure, in your request you can ask us to recommend one based on your group and plans: we reply on WhatsApp the same day with the best available option.",
        ],
      },
    ],
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
      {
        q: "¿La entrega tiene costo en el resort?",
        a: "En rentas de dos días o más, la entrega y la recogida dentro de nuestras zonas están incluidas. Para rentas de un solo día aplica un cargo de transporte de US$40 + ITBIS.",
      },
    ],
    faqsEn: [
      { q: "Do you deliver inside Puntacana Resort & Club?", a: "Yes, to villas and residences across the resort. We coordinate delivery with your host, concierge or property manager for access." },
      { q: "Can I drive anywhere in the resort?", a: "The golf cart is for use inside residential areas, villas and permitted resort areas, following the resort's internal rules and BOLT's 25 km/h limit in residential zones." },
      { q: "How far in advance should I book?", a: "We recommend requesting availability as soon as you have your dates — in high season the fleet sells out. We confirm on WhatsApp as soon as possible." },
      { q: "Is delivery free inside the resort?", a: "On rentals of two days or more, delivery and pickup within our zones are included. For single-day rentals a US$40 + tax transport fee applies." },
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
    sections: [
      {
        h: "Moverte por Cap Cana a tu ritmo",
        hEn: "Getting around Cap Cana at your own pace",
        p: [
          "Cap Cana es una comunidad amplia y de baja densidad: entre la zona de la marina, las playas, los campos de golf y los residenciales privados hay trayectos que a pie se hacen largos. Un golf cart convierte esas distancias en paseos de minutos y te da libertad total para organizar el día — bajar a la playa temprano, volver a la villa a media mañana, salir a almorzar y regresar sin depender de nadie.",
          "Es la forma más práctica y agradable de vivir Cap Cana en familia o en grupo. En lugar de coordinar traslados, tienes el vehículo estacionado en tu villa listo para salir cuando quieras. Y como la comunidad es tranquila y pensada para este tipo de movilidad, el carrito encaja de forma natural con el ritmo relajado de la zona.",
        ],
        pEn: [
          "Cap Cana is a large, low-density community: between the marina area, the beaches, the golf courses and the private residences there are trips that get long on foot. A golf cart turns those distances into a few minutes and gives you total freedom to plan your day — down to the beach early, back to the villa mid-morning, out for lunch and back without depending on anyone.",
          "It's the most practical and enjoyable way to experience Cap Cana with family or a group. Instead of coordinating rides, you have the vehicle parked at your villa ready to go whenever you like. And because the community is quiet and built for this kind of mobility, the cart fits naturally with the area's relaxed pace.",
        ],
      },
      {
        h: "Entrega en tu villa dentro de Cap Cana",
        hEn: "Delivery to your villa inside Cap Cana",
        p: [
          "Entregamos en villas, apartamentos y residenciales dentro de Cap Cana. Al enviar tu solicitud solo necesitas indicarnos el nombre de tu comunidad o villa y coordinamos el acceso para dejarte el carrito con la batería completa y una breve orientación de uso a tu llegada.",
          "En rentas de dos días o más, la entrega y la recogida están incluidas; para rentas de un solo día aplica un cargo de transporte de US$40 + ITBIS. Todos los vehículos van asegurados y cuentas con nuestro soporte 24/7 por WhatsApp en español e inglés durante toda tu estadía — si necesitas asistencia o una reposición, respondemos rápido.",
        ],
        pEn: [
          "We deliver to villas, apartments and residences inside Cap Cana. In your request you just tell us the name of your community or villa and we coordinate access to leave the cart fully charged, with a short usage briefing, on your arrival.",
          "On rentals of two days or more, delivery and pickup are included; for single-day rentals a US$40 + tax transport fee applies. Every vehicle is insured and you have our 24/7 WhatsApp support in English and Spanish throughout your stay — if you need assistance or a swap, we respond fast.",
        ],
      },
      {
        h: "El modelo indicado para tu grupo",
        hEn: "The right model for your group",
        p: [
          "Para parejas o grupos pequeños, un modelo de 4 plazas es cómodo y económico, desde US$50 por día. Para cinco o seis personas recomendamos la línea ECO de 6 plazas (4+2), con espacio real para todos y los bolsos, desde US$65 por día según el modelo.",
          "Si buscan máximo confort y autonomía para todo el día, el ECO Cross premium monta batería de litio de largo alcance (150 Ah) y rinde hasta 95 km por carga — ideal para grupos que se mueven mucho. ¿No sabes cuál elegir? Pide una recomendación al enviar tu solicitud y te orientamos por WhatsApp el mismo día según tu grupo y tus planes.",
        ],
        pEn: [
          "For couples or small groups, a 4-seat model is comfortable and affordable, from US$50 a day. For five or six people we recommend the 6-seat ECO line (4+2), with real room for everyone and the bags, from US$65 a day depending on the model.",
          "For maximum comfort and all-day range, the premium ECO Cross runs a long-range lithium battery (150 Ah) and does up to 95 km per charge — ideal for groups that move around a lot. Not sure which to pick? Ask for a recommendation in your request and we'll guide you on WhatsApp the same day based on your group and plans.",
        ],
      },
    ],
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
      {
        q: "¿Cuánto dura la carga de la batería?",
        a: "Depende del modelo y del uso, pero una carga completa cubre de sobra un día normal dentro de Cap Cana. Los modelos de litio de largo alcance rinden más; te entregamos el carrito con carga completa.",
      },
    ],
    faqsEn: [
      { q: "Do you deliver to any community in Cap Cana?", a: "We deliver to villas and residences inside Cap Cana. Tell us the name of your community or villa in your request and we coordinate access." },
      { q: "Which model is best for a large group?", a: "For 5 or 6 people we recommend the 6-seat ECO line (4+2). For maximum comfort, the premium ECO Cross with long-range lithium (150 Ah) does up to 95 km per charge." },
      { q: "Is delivery free?", a: "For rentals of 2+ days, delivery and pickup are included. For 1-day rentals a US$40 + tax transport fee applies." },
      { q: "How long does the battery last?", a: "It depends on the model and your usage, but a full charge easily covers a normal day inside Cap Cana. Long-range lithium models go further; we deliver the cart fully charged." },
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
    sections: [
      {
        h: "Bávaro es nuestra casa: la respuesta más rápida",
        hEn: "Bávaro is home: our fastest response",
        p: [
          "Nuestra base de operaciones está en Bávaro, en Av. Barceló Km 3½, Naves Montolio, Local #17. Desde ahí despachamos toda la flota, así que en esta zona tenemos la mayor disponibilidad de modelos y la entrega y la asistencia más rápidas de toda nuestra cobertura.",
          "Para ti eso se traduce en tranquilidad: si surge cualquier cosa durante tu renta, estamos cerca y respondemos de inmediato. Y como aquí concentramos la flota completa, es más fácil encontrar el modelo exacto que buscas incluso en fechas ocupadas — aunque en temporada alta siempre conviene reservar con anticipación.",
        ],
        pEn: [
          "Our operations base is in Bávaro, at Av. Barceló Km 3½, Naves Montolio, Local #17. The whole fleet dispatches from there, so in this area we have the widest model availability and the fastest delivery and assistance across our coverage.",
          "For you that means peace of mind: if anything comes up during your rental, we're close by and respond immediately. And because we keep the full fleet here, it's easier to find the exact model you want even on busy dates — though in high season it's always best to book ahead.",
        ],
      },
      {
        h: "Entrega en residenciales y complejos de la zona",
        hEn: "Delivery to residences and resorts in the area",
        p: [
          "Entregamos en residenciales, apartamentos y complejos turísticos de toda la zona de Bávaro. Llevamos el carrito hasta tu alojamiento con la batería completa y una orientación de uso rápida, y coordinamos el acceso donde haga falta. En rentas de dos días o más la entrega y la recogida están incluidas.",
          "Todos los vehículos van asegurados y respetamos el límite BOLT de 25 km/h en zonas residenciales. Durante toda tu estadía cuentas con soporte 24/7 por WhatsApp en español e inglés: una sola conversación para reservar, resolver dudas o pedir asistencia. Nunca confirmamos automáticamente — una persona real revisa cada solicitud y te responde el mismo día.",
        ],
        pEn: [
          "We deliver to residences, apartments and resorts across the Bávaro area. We bring the cart to your accommodation fully charged with a quick usage briefing, and coordinate access where needed. On rentals of two days or more, delivery and pickup are included.",
          "Every vehicle is insured and we keep BOLT's 25 km/h limit in residential zones. Throughout your stay you have 24/7 WhatsApp support in English and Spanish: one conversation to book, ask questions or request assistance. We never auto-confirm — a real person reviews every request and replies the same day.",
        ],
      },
      {
        h: "Ideal para estadías largas: tarifa semanal y mensual",
        hEn: "Great for long stays: weekly and monthly rates",
        p: [
          "Si te quedas una semana o más, Bávaro es la zona perfecta para una renta larga. Para siete noches o más tenemos tarifa semanal y mensual con descuento — pregunta al enviar tu solicitud y te preparamos una cotización a la medida de tus fechas.",
          "Los modelos de 4 plazas arrancan desde US$50 por día y los de 6 plazas desde US$65, con el precio exacto según el modelo. Para estadías largas, un modelo con buena autonomía marca la diferencia; si no estás seguro de cuál elegir, pídenos una recomendación y te orientamos según cuántas personas son y cómo piensan moverse.",
        ],
        pEn: [
          "If you're staying a week or more, Bávaro is the perfect area for a long rental. For seven nights or more we offer discounted weekly and monthly rates — ask when you send your request and we'll prepare a quote tailored to your dates.",
          "4-seat models start from US$50 a day and 6-seaters from US$65, with the exact price depending on the model. For long stays, a model with good range makes the difference; if you're unsure which to choose, ask us for a recommendation and we'll guide you based on how many you are and how you plan to get around.",
        ],
      },
    ],
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
      {
        q: "¿Cuál es la tarifa por día en Bávaro?",
        a: "Desde US$50 por día los modelos de 4 plazas y desde US$65 los de 6 plazas, con el precio exacto según el modelo. En rentas de 2+ días la entrega está incluida.",
      },
    ],
    faqsEn: [
      { q: "Where are you located?", a: "Our base is at Av. Barceló Km 3 1/2, Naves Montolio, Local #17, Bávaro. The whole fleet dispatches from there." },
      { q: "Can I pick up the cart myself?", a: "Our standard service is home delivery within the area. If you'd rather arrange something different, message us on WhatsApp and we'll look into it." },
      { q: "Do you rent by the week or month?", a: "Yes. For 7+ nights we offer discounted weekly and monthly rates — ask on WhatsApp when you send your request." },
      { q: "What's the daily rate in Bávaro?", a: "From US$50 a day for 4-seat models and from US$65 for 6-seaters, with the exact price depending on the model. On 2+ day rentals delivery is included." },
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
    sections: [
      {
        h: "Un golf cart para vivir Casa de Campo",
        hEn: "A golf cart to live Casa de Campo",
        p: [
          "Casa de Campo es una de las comunidades residenciales más extensas del Caribe: villas amplias, campos de golf y grandes áreas verdes separadas por trayectos considerables. Moverse cómodamente por dentro pide un vehículo propio, y el golf cart es exactamente eso — la manera relajada de ir de la villa a la playa, al golf o a cenar sin depender de traslados.",
          "Para una estadía en familia o con amigos, tener el carrito estacionado en tu villa cambia por completo la experiencia: organizas el día a tu ritmo y aprovechas cada rincón de la comunidad sin fricción. Por eso ofrecemos nuestra flota también aquí, con el mismo estándar de servicio de Punta Cana.",
        ],
        pEn: [
          "Casa de Campo is one of the largest residential communities in the Caribbean: spacious villas, golf courses and big green areas separated by considerable distances. Getting around comfortably calls for your own vehicle, and the golf cart is exactly that — the relaxed way to go from the villa to the beach, the golf or dinner without depending on rides.",
          "For a stay with family or friends, having the cart parked at your villa changes the whole experience: you plan the day at your own pace and enjoy every corner of the community without friction. That's why we offer our fleet here too, with the same service standard as Punta Cana.",
        ],
      },
      {
        h: "Cómo funciona la reserva de 7 días o más",
        hEn: "How the 7-day-plus rental works",
        p: [
          "Casa de Campo está fuera de nuestra zona base en Punta Cana, así que trasladar el carrito solo tiene sentido en estadías largas — por eso el mínimo es de siete días. El transporte de ida y vuelta se cotiza según la ubicación exacta de tu villa y tus fechas, y te lo incluimos en la confirmación de la solicitud, sin sorpresas de último momento.",
          "La tarifa por día del modelo es la misma que en el resto de nuestras zonas; solo se suma el transporte cotizado y, al ser 7 noches o más, aplica nuestra tarifa semanal con descuento. Envía tu solicitud con la villa y las fechas y te devolvemos por WhatsApp el costo total claro — carrito, transporte y depósito — para que decidas con toda la información.",
        ],
        pEn: [
          "Casa de Campo is outside our home base in Punta Cana, so moving the cart only makes sense for longer stays — hence the seven-day minimum. Round-trip transport is quoted based on your villa's exact location and your dates, and we include it in your request confirmation, with no last-minute surprises.",
          "The model's daily rate is the same as in the rest of our zones; only the quoted transport is added and, being seven nights or more, our discounted weekly rate applies. Send your request with the villa and dates and we'll get back to you on WhatsApp with the clear total — cart, transport and deposit — so you decide with full information.",
        ],
      },
      {
        h: "Flota premium y soporte durante toda la estadía",
        hEn: "Premium fleet and support throughout your stay",
        p: [
          "Para estadías largas conviene un modelo cómodo y con buena autonomía. Recomendamos las líneas premium de 4 y 6 plazas, con espacio de sobra para la familia y opción de batería de litio de largo alcance para moverte todo el día sin pensar en la carga. El precio exacto por día lo ves en cada ficha de modelo.",
          "Aunque estés en Casa de Campo, cuentas con el mismo soporte 24/7 por WhatsApp en español e inglés durante toda la renta. Los vehículos van asegurados y te entregamos el carrito con carga completa y una orientación de uso. Si en algún momento necesitas asistencia, una sola conversación de WhatsApp lo resuelve.",
        ],
        pEn: [
          "For long stays a comfortable model with good range is ideal. We recommend the premium 4 and 6-seat lines, with plenty of room for the family and an optional long-range lithium battery so you can move all day without thinking about charge. The exact daily price is shown on each model's spec page.",
          "Even in Casa de Campo, you have the same 24/7 WhatsApp support in English and Spanish throughout the rental. Vehicles are insured and we deliver the cart fully charged with a usage briefing. If you ever need assistance, a single WhatsApp conversation sorts it out.",
        ],
      },
    ],
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
      {
        q: "¿Tengo soporte durante la renta en Casa de Campo?",
        a: "Sí. Aunque estés fuera de nuestra zona base, cuentas con el mismo soporte 24/7 por WhatsApp en español e inglés durante toda la estadía, y los vehículos van asegurados.",
      },
    ],
    faqsEn: [
      { q: "Why is there a 7-day minimum?", a: "Casa de Campo is outside our home base in Punta Cana. Transporting the cart only makes sense for longer stays — hence the 7-day minimum." },
      { q: "How much does transport to Casa de Campo cost?", a: "It's quoted based on your villa and dates. Send your request and we'll include the exact transport cost in the confirmation — no surprises." },
      { q: "Is the daily rate the same?", a: "Yes, the model's daily rate is the same. Only the quoted transport is added and, for 7+ nights, our discounted weekly rate applies." },
      { q: "Do I have support during the rental in Casa de Campo?", a: "Yes. Even outside our home base, you have the same 24/7 WhatsApp support in English and Spanish throughout the stay, and the vehicles are insured." },
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
    sections: [
      {
        h: "Por qué un golf cart en La Romana",
        hEn: "Why a golf cart in La Romana",
        p: [
          "En las villas y comunidades residenciales de La Romana, un golf cart es la forma más cómoda de moverte por dentro: distancias que a pie se hacen largas se convierten en trayectos de minutos, y ganas libertad para organizar el día sin depender de traslados. Para una estadía larga en familia o en grupo, tener el vehículo en tu villa marca una diferencia real en el día a día.",
          "Ofrecemos la misma flota y el mismo estándar de servicio de Punta Cana para la zona de La Romana. Reservas de siete días o más, entrega en tu villa con carga completa y soporte durante toda la renta: la experiencia BOLT completa, también aquí.",
        ],
        pEn: [
          "In the villas and residential communities of La Romana, a golf cart is the most comfortable way to get around inside: distances that get long on foot become a few minutes, and you gain freedom to plan your day without depending on rides. For a long stay with family or a group, having the vehicle at your villa makes a real difference day to day.",
          "We offer the same fleet and the same service standard as Punta Cana for the La Romana area. Rentals of seven days or more, delivery to your villa fully charged and support throughout the rental: the full BOLT experience, here too.",
        ],
      },
      {
        h: "Reservas de 7 días con transporte cotizado",
        hEn: "7-day rentals with quoted transport",
        p: [
          "La Romana está fuera de nuestra zona base en Punta Cana, así que el traslado del carrito solo se justifica en estadías largas — por eso el mínimo es de siete días. El transporte se cotiza según la ubicación exacta de tu villa y tus fechas, y te lo confirmamos por WhatsApp junto con el resto del costo antes de que decidas.",
          "La tarifa por día del modelo es la misma que en nuestras demás zonas; solo se suma el transporte cotizado y, al ser 7 noches o más, aplica nuestra tarifa semanal con descuento. Indícanos la ubicación exacta en tu solicitud y te confirmamos cobertura, transporte y el total claro, sin sorpresas de último momento.",
        ],
        pEn: [
          "La Romana is outside our home base in Punta Cana, so moving the cart only makes sense for longer stays — hence the seven-day minimum. Transport is quoted based on your villa's exact location and your dates, and we confirm it on WhatsApp along with the rest of the cost before you decide.",
          "The model's daily rate is the same as in our other zones; only the quoted transport is added and, being seven nights or more, our discounted weekly rate applies. Give us the exact location in your request and we'll confirm coverage, transport and the clear total — no last-minute surprises.",
        ],
      },
      {
        h: "Qué modelo elegir y cómo reservar",
        hEn: "Which model to choose and how to book",
        p: [
          "Para una renta larga conviene un modelo cómodo y con buena autonomía. Los modelos de 4 plazas arrancan desde US$50 por día y los de 6 plazas desde US$65, con el precio exacto según el modelo; para grupos grandes, la opción de 4+2 plazas da espacio real para todos. Si no sabes cuál elegir, pídenos una recomendación y te orientamos según cuántas personas son.",
          "Reservar es simple: envías tu solicitud con la villa, las fechas y el grupo, y una persona real la revisa y te responde el mismo día por WhatsApp con la disponibilidad y el costo total. Nunca confirmamos automáticamente. Los vehículos van asegurados y cuentas con soporte 24/7 durante toda tu estadía en La Romana.",
        ],
        pEn: [
          "For a long rental a comfortable model with good range is ideal. 4-seat models start from US$50 a day and 6-seaters from US$65, with the exact price depending on the model; for large groups, the 4+2 option gives real room for everyone. If you're unsure which to choose, ask us for a recommendation and we'll guide you based on how many you are.",
          "Booking is simple: you send your request with the villa, dates and group, and a real person reviews it and replies the same day on WhatsApp with availability and the full cost. We never auto-confirm. Vehicles are insured and you have 24/7 support throughout your stay in La Romana.",
        ],
      },
    ],
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
      {
        q: "¿Qué tarifa por día aplica en La Romana?",
        a: "La misma que en el resto de nuestras zonas: desde US$50 los modelos de 4 plazas y desde US$65 los de 6 plazas, según el modelo. Para 7+ noches aplica la tarifa semanal con descuento, más el transporte cotizado.",
      },
    ],
    faqsEn: [
      { q: "Do you serve villas across La Romana?", a: "We serve villas and residences in the area for rentals of 7 days or more. Give us the exact location in your request and we'll confirm coverage and transport." },
      { q: "What's the minimum rental?", a: "7 days. Being outside our Punta Cana home base, the transfer only makes sense for longer stays." },
      { q: "How is transport quoted?", a: "Based on your villa's location and your dates. Send the request and you'll get the exact cost in your WhatsApp confirmation." },
      { q: "What daily rate applies in La Romana?", a: "The same as our other zones: from US$50 for 4-seat models and from US$65 for 6-seaters, depending on the model. For 7+ nights the discounted weekly rate applies, plus quoted transport." },
    ],
  },
];

export function getZoneLanding(zonaId: string): ZoneLanding | undefined {
  return ZONE_LANDINGS.find((l) => l.zone.id === zonaId);
}
