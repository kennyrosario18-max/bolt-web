import type { Locale } from "@/lib/i18n";

/** Artículos del blog (ES) — redactados y auditados contra los hechos de marca (jul/2026). */
export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogArticle {
  slug: string;
  /** Slug del artículo equivalente en el otro idioma (para hreflang + switcher). */
  pairSlug: string;
  published: string;
  updated: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readMinutes: number;
  sections: BlogSection[];
  faq?: { q: string; a: string }[];
  locale: Locale;
}

export const ARTICLES: BlogArticle[] = [
  {
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "golf-cart-puntacana-resort-club",
    "pairSlug": "golf-cart-puntacana-resort-club-guide",
    "title": "Guía para moverte en golf cart por Puntacana Resort & Club",
    "metaTitle": "Golf cart en Puntacana Resort & Club",
    "metaDescription": "Guía práctica para moverte en golf cart por Puntacana Resort & Club: entrega en tu villa, modelos, reglas de circulación y cómo pedir disponibilidad.",
    "excerpt": "Todo lo que un huésped de villa necesita saber para moverse en golf cart dentro de Puntacana Resort & Club: entrega, modelos, reglas y reservas con BOLT.",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "Por qué el golf cart es el vehículo natural de Puntacana Resort & Club",
        "paragraphs": [
          "Puntacana Resort & Club es un entorno de villas, calles internas tranquilas, campos de golf, clubes de playa y áreas comunes pensadas para moverse sin prisa. En ese escenario, el golf cart no es un lujo opcional: es la forma más cómoda, silenciosa y práctica de recorrerlo. Con un carrito en la puerta de tu villa te olvidas de esperar transporte, cargas lo de la playa sin esfuerzo y llegas a cenar en minutos.",
          "En BOLT, Puntacana Resort & Club es nuestra zona principal, donde más entregamos, así que conocemos bien cómo se vive dentro del complejo. También operamos en Cap Cana y mantenemos nuestra base de operaciones en Bávaro. Cuando reservas para tu villa, todo está pensado para que empieces a disfrutar desde el primer día. Your ride in paradise."
        ]
      },
      {
        "heading": "Cómo llega tu BOLT a la villa",
        "paragraphs": [
          "Una de las mayores comodidades es que no tienes que ir a buscar el carrito a ningún lado: nosotros te lo llevamos y lo recogemos en la villa. Antes de entregártelo te damos una orientación rápida de uso, para que salgas a rodar con confianza aunque nunca hayas manejado un golf cart.",
          "Cada renta con BOLT incluye lo esencial para que solo te ocupes de disfrutar:",
          "El transporte (entrega + recogida, ida y vuelta) dentro de Puntacana Resort & Club es US$60 + ITBIS por viaje de tráiler, y es gratis en reservas de 5 días o más. Un detalle que conviene saber: tu día de renta son 24 horas contadas desde la entrega, no el día de calendario, así que aprovechas el tiempo completo."
        ],
        "bullets": [
          "Entrega y recogida directamente en tu villa (transporte fijo por zona, gratis desde 5 días)",
          "Cargador incluido para la carga nocturna",
          "Orientación de uso al momento de la entrega",
          "Unidad revisada antes de entregar",
          "Soporte por WhatsApp 24/7 en español e inglés"
        ]
      },
      {
        "heading": "Qué modelo conviene según tu grupo",
        "paragraphs": [
          "Nuestra flota tiene 11 modelos en tres líneas —ECO (Cross, Plus, Sport y Track), Club Car (Precedent, Tempo y Limo) y Zycar— con dos configuraciones principales de capacidad. La elección correcta depende de cuántos viajan y de cuánto piensan moverse.",
          "Todos los precios son en US$ por día y el ITBIS (18%) se suma aparte:",
          "Si piensas dar muchas vueltas al día, fíjate también en la batería, porque de ella depende la autonomía:",
          "Para un grupo activo que sale temprano y regresa de noche, un modelo de litio te da tranquilidad de sobra. Si no estás seguro, dinos cuántos son y qué planes tienen: te recomendamos el modelo que mejor encaje."
        ],
        "bullets": [
          "4 plazas (2+2 o todos mirando hacia adelante, hasta 360 kg): ideal para parejas o familias pequeñas. Desde US$50/día según el modelo.",
          "6 plazas (4+2, hasta 540 kg): la mejor opción para familias grandes o grupos de amigos. Desde US$75/día según el modelo — el ECO Cross premium, con batería de litio 150 Ah y asientos de lujo, va a US$90/día.",
          "Plomo-ácido: 25–40 km por carga.",
          "Litio estándar (105 Ah): 60–70 km por carga.",
          "Litio de largo alcance (150 Ah): 85–95 km por carga, disponible en los ECO Cross (4 y 6 plazas) y el ECO Track."
        ]
      },
      {
        "heading": "Reglas de circulación, velocidad y seguridad",
        "paragraphs": [
          "El golf cart es fácil y seguro de manejar dentro del resort, siempre que respetes unas reglas básicas. En zonas residenciales, en BOLT mantenemos un límite de 25 km/h para la seguridad de todos. Para que tengas referencia, estas son las velocidades por línea:",
          "Y estas son las reglas de uso que pedimos cumplir en todo momento:"
        ],
        "bullets": [
          "Modelos ECO y Zycar: 30–35 km/h.",
          "Modelos Club Car: 20–31 km/h.",
          "Límite BOLT en zonas residenciales: 25 km/h.",
          "El conductor debe ser mayor de 18 años y tener licencia vigente.",
          "Uso solo dentro de residenciales, villas y resorts.",
          "Prohibido circular por la playa, la arena y carreteras públicas.",
          "Todos los pasajeros deben ir sentados.",
          "No sobrecargar el carrito por encima de su capacidad."
        ]
      },
      {
        "heading": "Carga nocturna: amanece con el carro listo",
        "paragraphs": [
          "Para que cada mañana empieces con el carrito a tope, la rutina es simple: al terminar el día, lo conectas a un tomacorriente estándar con el cargador que te dejamos incluido. Una carga completa toma entre 8 y 10 horas, así que si lo enchufas al llegar en la noche, amanece listo para tu próxima salida. No necesitas instalaciones especiales ni equipos extra."
        ]
      },
      {
        "heading": "Cómo solicitar disponibilidad",
        "paragraphs": [
          "Reservar con BOLT es por solicitud de disponibilidad: no es una confirmación automática. Nos escribes con tus fechas y detalles, revisamos la flota y te confirmamos. Así nos aseguramos de tener el modelo correcto listo para tu villa. Estas son las condiciones de reserva:",
          "Para pedir disponibilidad, escríbenos por WhatsApp al +1 829 202 7849 con las fechas de tu estadía, cuántos viajan y el nombre de tu villa o residencial dentro de Puntacana Resort & Club. Te ayudamos a elegir el modelo ideal y coordinamos la entrega. Your ride in paradise."
        ],
        "bullets": [
          "Depósito del 50% para asegurar tu reserva.",
          "Depósito de garantía de US$200, reembolsable.",
          "Cambio de fecha gratis avisando con 48 horas de anticipación."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Necesito licencia para manejar el golf cart?",
        "a": "Sí. El conductor debe ser mayor de 18 años y tener licencia de conducir vigente. El uso es solo dentro de residenciales, villas y resorts; no está permitido circular por la playa, la arena ni por carreteras públicas."
      },
      {
        "q": "¿La entrega en la villa tiene costo?",
        "a": "El transporte (entrega + recogida) en Puntacana Resort & Club es US$60 + ITBIS por viaje de tráiler y es gratis en reservas de 5 días o más; se paga con la reserva."
      },
      {
        "q": "¿Cuánto tarda en cargar y cómo lo hago?",
        "a": "Con el cargador incluido, lo conectas a un tomacorriente estándar y una carga completa toma de 8 a 10 horas. Enchúfalo en la noche y amanece listo. La autonomía va de 25–40 km (plomo-ácido) hasta 85–95 km (litio de largo alcance), según el modelo."
      }
    ],
    "locale": "es"
  },
  {
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "golf-cart-cap-cana-guia",
    "pairSlug": "golf-cart-cap-cana-guide",
    "title": "Renta de golf cart en Cap Cana: la guía completa de BOLT",
    "metaTitle": "Renta de Golf Cart en Cap Cana: Guía",
    "metaDescription": "Renta un golf cart en Cap Cana con BOLT: entrega en tu villa, modelos de 4 y 6 plazas, litio de largo alcance y precios desde US$50/día más ITBIS.",
    "excerpt": "Todo para rentar un golf cart en Cap Cana: entrega en tu villa, modelos de 4 y 6 plazas, reglas de las comunidades privadas y precios desde US$50/día.",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "Por qué un golf cart es la mejor forma de moverte en Cap Cana",
        "paragraphs": [
          "En una comunidad privada como Cap Cana las distancias engañan: lo que en el mapa parece cerca, a pie puede tomar bastante más de lo que planificaste. Por eso el golf cart se ha convertido en el vehículo natural dentro de la comunidad: te mueves entre la villa, las áreas comunes y las amenidades a tu ritmo, sin depender de nadie y sin complicarte con un carro de alquiler tradicional.",
          "En esta guía te contamos cómo funciona la renta con BOLT dentro de Cap Cana: qué cubre el servicio, cómo elegir el modelo correcto para tu familia o grupo, cuánto cuesta, qué reglas aplican y cómo solicitar disponibilidad. Sirve igual si vienes de vacaciones o si eres property manager y quieres resolver la movilidad de tus huéspedes."
        ]
      },
      {
        "heading": "Cobertura de BOLT en Cap Cana y entrega en tu villa",
        "paragraphs": [
          "BOLT renta golf carts premium en las tres zonas principales de Punta Cana: Puntacana Resort & Club (su zona principal, donde más entrega), Cap Cana y Bávaro, donde está la base de operaciones (Av. Barceló Km 3 1/2, Naves Montolio #17). En Cap Cana el servicio funciona con entrega directa: el equipo lleva el golf cart hasta tu villa, te da una orientación de uso y lo recoge en el mismo punto al final de la renta. No tienes que salir de la comunidad ni coordinar nada más.",
          "El transporte a Cap Cana (entrega y recogida, ida y vuelta) cuesta US$60 más ITBIS por viaje de tráiler y es gratis en reservas de 5 días o más; se paga junto con la reserva. Un detalle que muchos agradecen: el día de renta se cuenta como 24 horas desde la entrega, no como día calendario. Si recibes el carro a las 3 de la tarde, es tuyo hasta las 3 de la tarde del día siguiente."
        ]
      },
      {
        "heading": "Qué modelo elegir: familias, grupos y el ECO Cross premium",
        "paragraphs": [
          "La flota de BOLT tiene 11 modelos en 3 líneas — ECO (Cross, Plus, Sport, Track), Club Car (Precedent, Tempo, Limo) y Zycar — en dos formatos: 4 plazas (2+2 o todos mirando hacia adelante, hasta 360 kg) y 6 plazas (4+2, hasta 540 kg). La regla práctica es simple: si viajan más de 4 personas, o son 4 adultos con niños y bolsos, ve directo al de 6 plazas. Dentro de las comunidades todos deben ir sentados, así que conviene contar los asientos antes de reservar, no después.",
          "Para familias y grupos en Cap Cana, la opción tope es el ECO Cross premium: 6 plazas, batería de litio de largo alcance de 150 Ah con 85 a 95 km de autonomía por carga y asientos de lujo. Es una opción pensada para huéspedes exigentes, porque prácticamente elimina la preocupación por la batería incluso en días de mucho movimiento.",
          "La autonomía varía según el tipo de batería, y vale la pena tenerla clara al elegir:"
        ],
        "bullets": [
          "Plomo-ácido: 25–40 km por carga, suficiente para uso tranquilo dentro de la comunidad.",
          "Litio estándar 105 Ah: 60–70 km por carga.",
          "Litio de largo alcance 150 Ah: 85–95 km por carga (ECO Cross de 4 y 6 plazas, y ECO Track).",
          "Carga completa en 8–10 horas en un tomacorriente estándar de la villa; el cargador va incluido."
        ]
      },
      {
        "heading": "Precios: desde US$50 por día",
        "paragraphs": [
          "Las tarifas de BOLT son por día en dólares, con el ITBIS del 18% aparte:"
        ],
        "bullets": [
          "4 plazas: desde US$50/día según el modelo.",
          "6 plazas: desde US$75/día según el modelo (el ECO Cross premium, de litio 150 Ah con asientos de lujo, US$90/día).",
          "Rentas de un mes o más: cotización por WhatsApp."
        ]
      },
      {
        "heading": "Qué incluye la renta y qué reglas aplican en las comunidades",
        "paragraphs": [
          "Toda renta incluye cargador, orientación de uso y soporte por WhatsApp 24/7 en español e inglés; la entrega y recogida en la villa van como transporte fijo por zona (US$60 más ITBIS en Cap Cana, gratis en reservas de 5 días o más). No hay que comprar nada aparte ni buscar estación de carga: el tomacorriente de la villa es suficiente.",
          "Las comunidades privadas como Cap Cana cuidan mucho la seguridad y la tranquilidad de sus residentes, y las reglas de BOLT van en la misma línea:"
        ],
        "bullets": [
          "El conductor debe tener 18 años o más y licencia de conducir vigente.",
          "El golf cart se usa solo dentro de residenciales, villas y resorts; está prohibido llevarlo a la playa, la arena o carreteras públicas.",
          "Velocidad máxima de 25 km/h en zonas residenciales, aunque los modelos ECO y Zycar alcanzan 30–35 km/h y los Club Car entre 20 y 31 km/h.",
          "Todos los pasajeros van sentados y no se debe exceder la capacidad del vehículo (360 kg en 4 plazas, 540 kg en 6 plazas)."
        ]
      },
      {
        "heading": "Cómo solicitar tu golf cart en Cap Cana",
        "paragraphs": [
          "BOLT trabaja por solicitud de disponibilidad, nunca con confirmación automática: cada reserva se verifica contra la flota real para que el carro que te prometen sea el que llega a tu villa. El proceso es directo:"
        ],
        "bullets": [
          "Escribe por WhatsApp al +1 829 202 7849 con tus fechas, la comunidad o villa dentro de Cap Cana y cuántas personas viajan.",
          "Recibes las opciones de modelo disponibles y la cotización (tarifa más transporte por zona, más ITBIS 18%).",
          "Confirmas con un depósito del 50%; al entregar el carro se toma un depósito de garantía de US$200, reembolsable al devolverlo.",
          "Si cambian tus planes, puedes mover la fecha gratis avisando con 48 horas de antelación."
        ]
      },
      {
        "heading": "Un último consejo antes de reservar",
        "paragraphs": [
          "Como BOLT trabaja por solicitud de disponibilidad, conviene escribir apenas tengas fechas de viaje confirmadas, sobre todo si necesitas un modelo de 6 plazas o el ECO Cross premium. Si eres property manager, el mismo canal de WhatsApp te sirve para coordinar entregas para tus huéspedes; conoce nuestro Programa de Aliados en boltgolfcars.com/aliados. Your ride in paradise: escríbenos y te confirmamos qué hay disponible para tus fechas."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿La entrega del golf cart en mi villa de Cap Cana tiene costo?",
        "a": "Sí: el transporte (entrega y recogida, ida y vuelta) a Cap Cana es US$60 más ITBIS por viaje de tráiler y se paga con la reserva. En reservas de 5 días o más el transporte es gratis. Recuerda que el día de renta son 24 horas desde la entrega, no un día calendario."
      },
      {
        "q": "¿Dónde y cómo cargo el golf cart?",
        "a": "En cualquier tomacorriente estándar de tu villa: el cargador va incluido en la renta. Una carga completa toma entre 8 y 10 horas, así que lo habitual es conectarlo de noche y amanecer con batería llena. El ECO Cross premium de litio 150 Ah rinde entre 85 y 95 km por carga."
      },
      {
        "q": "¿Qué necesito para reservar y qué pasa si cambian mis fechas?",
        "a": "Se solicita disponibilidad por WhatsApp (+1 829 202 7849), se confirma con un depósito del 50% y a la entrega se toma un depósito de garantía de US$200 reembolsable. El cambio de fecha es gratis si avisas con al menos 48 horas de antelación."
      }
    ],
    "locale": "es"
  },
  {
    "excerpt": "¿4 plazas o 6? Te ayudamos a decidir según tu grupo, el equipaje y tu presupuesto, con los precios reales de BOLT y consejos para la temporada alta en Punta Cana.",
    "faq": [
      {
        "q": "¿Los niños cuentan como pasajeros en el golf cart?",
        "a": "Sí. En BOLT cada persona ocupa un asiento, sin importar la edad: la regla es que todos viajen sentados y que nunca se sobrecargue el cart. Si son 5 personas contando niños, necesitas un 6 plazas. Recuerda además que el conductor debe ser mayor de 18 años con licencia vigente."
      },
      {
        "q": "¿El precio por día incluye la entrega en mi villa?",
        "a": "No, el transporte (entrega + recogida) va aparte y se cobra por viaje de tráiler: US$60 en Puntacana Resort & Club, Cap Cana y Bávaro, gratis en reservas de 5 o más días (10 o más en Bávaro); US$120 en Uvero Alto / Macao. Ten en cuenta que todos los precios son en US$ por día y el ITBIS del 18% se cobra aparte."
      },
      {
        "q": "¿Qué hago si el 6 plazas ya no está disponible en mis fechas?",
        "a": "Escríbenos igual por WhatsApp al +1 829 202 7849: toda reserva funciona por solicitud de disponibilidad y el equipo te confirma qué hay para tus fechas. Si el grupo es grande y no queda 6 plazas, una alternativa práctica es combinar dos carts de 4 plazas. Y si tus planes cambian, puedes mover la fecha gratis avisando con 48 horas."
      }
    ],
    "metaDescription": "Guía práctica para elegir entre golf cart de 4 o 6 plazas en Punta Cana: capacidad, equipaje, precios desde US$50 y disponibilidad en temporada alta.",
    "metaTitle": "Golf cart de 4 o 6 plazas: ¿cuál elegir?",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "La pregunta que define tu reserva",
        "paragraphs": [
          "Si ya decidiste moverte en golf cart durante tu estadía en Punta Cana —buena decisión—, la siguiente pregunta llega sola: ¿de 4 plazas o de 6? En BOLT la escuchamos todos los días, y la respuesta casi nunca depende de un solo factor. Influyen cuántos son, cuánto equipaje cargan, si viajan con niños o abuelos, tu presupuesto y hasta la fecha del viaje.",
          "Lo primero es entender la diferencia básica. El golf cart de 4 plazas suele ser 2+2 (dos asientos mirando al frente y dos hacia atrás) o, en modelos como el ECO Cross 4 y el Zycar 4, con los cuatro asientos mirando hacia adelante; carga hasta 360 kg. El de 6 plazas es 4+2: cuatro asientos al frente y dos atrás, con capacidad de 540 kg. Esos 180 kg de diferencia importan más de lo que parece, y aquí te explicamos por qué."
        ]
      },
      {
        "heading": "Capacidad real: personas, peso y espacio",
        "paragraphs": [
          "La capacidad de carga no es solo para las personas: incluye todo lo que sube al cart. Coolers con hielo, bolsos de playa, compras del supermercado, sillas plegables... todo suma. Un 4 plazas con cuatro adultos ya va cerca de su límite de 360 kg, así que queda poco margen para carga adicional. Con dos o tres personas, en cambio, sobra espacio y los asientos traseros se convierten en tu zona de equipaje.",
          "El 6 plazas respira distinto: con sus 540 kg de capacidad, una familia de cuatro o cinco viaja cómoda y todavía queda margen para el cooler y los bultos del día. Un detalle importante: en BOLT los niños cuentan como pasajeros. La regla es clara —todos sentados, siempre— así que si son cinco personas, aunque dos sean pequeños, necesitas un 6 plazas. Sobrecargar el cart no es opción: es un tema de seguridad y de cuidado del equipo."
        ]
      },
      {
        "heading": "Presupuesto: qué cuesta cada opción",
        "paragraphs": [
          "Aquí van los precios reales de BOLT, en US$ por día (el ITBIS del 18% se cobra aparte):"
        ],
        "bullets": [
          "Golf cart de 4 plazas: desde US$50/día según el modelo.",
          "Golf cart de 6 plazas: desde US$75/día según el modelo (el ECO Cross premium, con batería de litio de 150 Ah y asientos de lujo, US$90/día).",
          "Transporte (entrega + recogida) por viaje de tráiler: US$60 en Puntacana Resort & Club, Cap Cana y Bávaro — gratis en reservas de 5+ días (10+ en Bávaro); US$120 en Uvero Alto / Macao. ITBIS aparte.",
          "Estadías de un mes o más: cotización por WhatsApp."
        ]
      },
      {
        "heading": "Temporada alta: los 6 plazas vuelan primero",
        "paragraphs": [
          "Hay un dato que conviene saber antes de dejar la decisión para última hora: en fechas festivas y semanas de temporada alta, los 6 plazas son los primeros en agotarse. Tiene lógica: las familias grandes y los grupos los buscan primero, y la flota de 6 plazas no es infinita.",
          "En BOLT toda reserva funciona por solicitud de disponibilidad —nunca por confirmación automática—, así que mientras antes escribas, más opciones tendrás. La reserva se asegura con un depósito del 50%. En temporada alta (20 dic – 6 ene y Semana Santa) la renta mínima es de 5 días y ese anticipo no es reembolsable; si avisas con 30 días o más, queda como crédito. Fuera de esas fechas puedes mover la fecha gratis con 48 horas de aviso."
        ]
      },
      {
        "heading": "¿Cuál te toca? Recomendaciones por escenario",
        "paragraphs": [
          "Cada grupo es distinto, pero después de entregar carts en Puntacana Resort & Club, Cap Cana y Bávaro, estos son los patrones que mejor funcionan:"
        ],
        "bullets": [
          "Pareja: 4 plazas Budget desde US$50/día. Los asientos traseros quedan libres para el cooler, las toallas y las compras. Es la opción más eficiente en precio y espacio.",
          "Familia de 4: puede funcionar el 4 plazas si viajan ligeros, pero si cargan cooler, juguetes de playa y compras a diario, el 6 plazas Budget (US$75/día) da un margen que se agradece cada día del viaje.",
          "Familia con abuelos (5–6 personas): 6 plazas sin dudarlo. Todos deben ir sentados, así que cinco personas ya descartan el 4 plazas. Los asientos delanteros amplios del 4+2 son más cómodos para los mayores.",
          "Grupo de amigos: 6 plazas Budget desde US$75/día. Si son más de seis, lo correcto es combinar dos carts; sobrecargar no está permitido y arruina la experiencia.",
          "Dato útil: un 4 plazas con todos los asientos al frente cuesta US$75/día, lo mismo que un 6 plazas Budget. Si dudas entre ambos, por el mismo precio puedes llevar dos asientos extra."
        ]
      },
      {
        "heading": "Asegura el tuyo antes de aterrizar",
        "paragraphs": [
          "Sea cual sea tu elección, la renta con BOLT incluye lo mismo: cargador (una carga completa toma 8–10 horas en un tomacorriente estándar), orientación de uso y soporte por WhatsApp 24/7 en español e inglés; el transporte a tu villa es fijo por zona: gratis en reservas de 5+ días (10+ en Bávaro) y, en estadías más cortas, US$60 ida y vuelta por viaje de tráiler + ITBIS. El día de renta cuenta como 24 horas desde la entrega, no como día calendario, así que aprovechas cada hora que pagas.",
          "Para reservar, escríbenos por WhatsApp al +1 829 202 7849 con tus fechas, tu zona (Puntacana Resort & Club, Cap Cana o Bávaro) y cuántas personas son. Te confirmamos disponibilidad, apartas con el 50% de depósito y dejas un depósito de garantía de US$200 reembolsable. Si te hospedas en Casa de Campo, aplica solo para reservas de 7+ días con transporte cotizado aparte. Solicita tu disponibilidad hoy y llega a Punta Cana con el cart resuelto. Your ride in paradise."
        ]
      }
    ],
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "golf-cart-4-o-6-plazas",
    "pairSlug": "golf-cart-4-or-6-seats",
    "title": "Golf cart de 4 o 6 plazas en Punta Cana: cómo elegir el ideal para tu grupo",
    "locale": "es"
  },
  {
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "bateria-plomo-o-litio-golf-cart",
    "pairSlug": "lead-acid-or-lithium-golf-cart",
    "title": "¿Plomo-ácido o litio? La autonomía real de tu golf cart en Punta Cana",
    "metaTitle": "Plomo-ácido vs litio en golf carts",
    "metaDescription": "Compara autonomías reales: plomo-ácido 25–40 km, litio 60–95 km por carga. Descubre qué batería te conviene para tu golf cart de renta en Punta Cana.",
    "excerpt": "El plomo-ácido rinde 25–40 km; el litio de BOLT llega hasta 95 km por carga. Te explicamos sin rodeos cuál te basta y cuándo vale la pena el tier premium.",
    "readMinutes": 5,
    "sections": [
      {
        "heading": "Por qué la batería importa más que el modelo",
        "paragraphs": [
          "Cuando comparas tiers de golf carts, lo primero que llama la atención son los asientos, el color o el tamaño. Pero en el día a día, lo que realmente define tu experiencia es la batería: cuántos kilómetros recorres por carga y qué tan pendiente tienes que estar del enchufe.",
          "En BOLT trabajamos con dos tecnologías en nuestra flota de 11 modelos: plomo-ácido y litio. Las dos funcionan bien, cada una tiene su lugar, y no todo el mundo necesita pagar por la más cara. Aquí te lo explicamos con números reales para que elijas con calma."
        ]
      },
      {
        "heading": "Autonomías reales: los números sin maquillaje",
        "paragraphs": [
          "Estos son los rangos que manejamos en nuestra flota, medidos en uso real dentro de los resorts:"
        ],
        "bullets": [
          "Plomo-ácido: 25–40 km por carga.",
          "Litio estándar (105 Ah): 60–70 km por carga.",
          "Litio de largo alcance (150 Ah): 85–95 km por carga, disponible en el ECO Cross premium y el ECO Track."
        ]
      },
      {
        "heading": "¿Qué significa esto en un día típico de resort?",
        "paragraphs": [
          "Dentro de Puntacana Resort & Club, Cap Cana o Bávaro, los trayectos suelen ser cortos: de la villa a la piscina, al restaurante del residencial, ida y vuelta varias veces al día. Además, el límite de BOLT en zonas residenciales es 25 km/h, así que en la práctica recorres menos distancia de la que imaginas.",
          "Por eso damos rangos y no una cifra exacta: la autonomía real depende de cuántas personas van a bordo, el calor y cómo conduces. Un carro de 6 plazas lleno (4+2, hasta 540 kg) consume más que un 4 plazas con dos personas.",
          "La conclusión honesta: para un día normal de idas y venidas dentro del mismo residencial, el plomo-ácido alcanza, siempre que cargues cada noche. El litio te da margen para días largos, grupos completos o simplemente para no pensar en la batería en toda tu estadía."
        ]
      },
      {
        "heading": "Carga nocturna: 8–10 horas y amaneces al 100%",
        "paragraphs": [
          "Todos nuestros carros cargan en un tomacorriente estándar y el cargador va incluido en la renta, junto con una orientación de uso al momento de la entrega. Una carga completa toma entre 8 y 10 horas: enchufas al llegar en la noche y amaneces con batería llena.",
          "La rutina recomendada es simple: conecta el carro todas las noches. Con plomo-ácido, esto no es negociable; su autonomía de 25–40 km está pensada para un día a la vez. Con litio de 150 Ah tienes más colchón si un día usaste poco el carro, aunque igual te recomendamos cargar de noche para empezar cada día al máximo."
        ]
      },
      {
        "heading": "¿A quién le basta el plomo-ácido?",
        "paragraphs": [
          "A más huéspedes de los que crees. Si tu plan encaja con esto, no tienes por qué pagar más:"
        ],
        "bullets": [
          "Te mueves dentro de un mismo residencial o villa, con trayectos cortos.",
          "Son 2 a 4 personas y no van cargados al límite todo el día.",
          "No te molesta enchufar el carro cada noche (toma segundos)."
        ]
      },
      {
        "heading": "Cuándo conviene el tier premium ECO Cross (US$90/día)",
        "paragraphs": [
          "El ECO Cross premium es nuestro 6 plazas con litio de 150 Ah: 85–95 km por carga y asientos de lujo, a US$90/día + ITBIS. Frente a un 6 plazas estándar de US$85/día, hablamos de US$5 diarios de diferencia. ¿Cuándo vale la pena? Cuando viajan en grupo completo (4+2), cuando tu día es de movimiento constante de la mañana a la noche, o cuando sencillamente no quieres calcular kilómetros en vacaciones: con casi el triple de autonomía que el plomo-ácido, la batería deja de ser un tema.",
          "Para comparar, nuestros 4 plazas arrancan en US$50/día (hasta US$75 según el modelo); los 6 plazas van desde US$75/día (hasta US$100 el ECO Track todoterreno), siempre + ITBIS 18%. Toda renta incluye cargador, orientación de uso y soporte por WhatsApp 24/7 en español e inglés; el transporte (entrega y recogida en tu villa) es fijo por zona: gratis en reservas de 5+ días (10+ en Bávaro) y, en estadías más cortas, US$60 ida y vuelta por viaje de tráiler + ITBIS en Puntacana Resort & Club, Cap Cana y Bávaro. El día de renta son 24 horas desde la entrega, no día calendario.",
          "¿No estás seguro de cuál te conviene? Escríbenos por WhatsApp al +1 829 202 7849 y cuéntanos tu plan: cuántas personas son, dónde se hospedan y cuántos días. Trabajamos por solicitud de disponibilidad —nunca confirmación automática—, así que mientras antes nos escribas, mejor. Your ride in paradise."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Necesito una instalación especial para cargar el golf cart?",
        "a": "No. Todos los modelos de BOLT cargan en un tomacorriente estándar de tu villa y el cargador va incluido en la renta. Una carga completa toma entre 8 y 10 horas, así que basta con enchufarlo cada noche."
      },
      {
        "q": "¿Puedo quedarme sin batería a mitad del día?",
        "a": "Si cargas cada noche y te mueves dentro del residencial, es muy poco probable: hasta el plomo-ácido rinde 25–40 km por carga y los trayectos en resort son cortos. Si algo pasa, tienes soporte por WhatsApp 24/7 en español e inglés durante toda tu renta."
      },
      {
        "q": "¿El precio del ECO Cross premium incluye impuestos y entrega?",
        "a": "El tier premium cuesta US$90/día + ITBIS 18%. El transporte (entrega y recogida en tu villa) va aparte, por viaje de tráiler: US$60 + ITBIS en Puntacana Resort & Club, Cap Cana y Bávaro, gratis en reservas de 5+ días (10+ en Bávaro); US$120 en Uvero Alto / Macao. Recuerda que el día de renta son 24 horas desde la entrega."
      }
    ],
    "locale": "es"
  },
  {
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "golf-cart-puntacana-resort-club-guide",
    "pairSlug": "golf-cart-puntacana-resort-club",
    "title": "How to get around Puntacana Resort & Club by golf cart",
    "metaTitle": "Golf cart in Puntacana Resort & Club",
    "metaDescription": "A practical guide to getting around Puntacana Resort & Club by golf cart: villa delivery, models, driving rules and how to request availability.",
    "excerpt": "Everything a villa guest needs to know to get around Puntacana Resort & Club by golf cart: delivery, models, rules and booking with BOLT.",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "Why the golf cart is the natural vehicle of Puntacana Resort & Club",
        "paragraphs": [
          "Puntacana Resort & Club is a setting of villas, quiet internal streets, golf courses, beach clubs and common areas built for getting around unhurried. In that context the golf cart isn't an optional luxury: it's the most comfortable, quiet and practical way to move through it. With a cart at your villa door you stop waiting for rides, load your beach gear effortlessly and make it to dinner in minutes.",
          "At BOLT, Puntacana Resort & Club is our main zone, where we deliver the most, so we know the community well. We also operate in Cap Cana and keep our operations base in Bávaro. When you book for your villa, everything is set up so you start enjoying from day one. Your ride in paradise."
        ]
      },
      {
        "heading": "How your BOLT arrives at the villa",
        "paragraphs": [
          "One of the biggest conveniences is that you don't have to go pick the cart up anywhere: we bring it to and collect it from your villa. Before handing it over we give you a quick usage briefing, so you head out with confidence even if you've never driven a golf cart.",
          "Every BOLT rental includes the essentials so you only have to enjoy:",
          "Transport to Puntacana Resort & Club (round trip, delivery + pickup) is US$60 per trailer trip + 18% tax, charged with your booking — and it's free on bookings of 5 days or more. One detail worth knowing: your rental day is 24 hours counted from delivery, not the calendar day, so you get the full time."
        ],
        "bullets": [
          "Delivery and pickup directly at your villa (transport by zone; free on 5+ day bookings)",
          "Charger included for overnight charging",
          "Usage briefing at the moment of delivery",
          "Inspected before delivery",
          "24/7 WhatsApp support in English and Spanish"
        ]
      },
      {
        "heading": "Which model suits your group",
        "paragraphs": [
          "Our fleet has 11 models across three lines — ECO (Cross, Plus, Sport and Track), Club Car (Precedent, Tempo and Limo) and Zycar — in two main capacity configurations. The right choice depends on how many are travelling and how much you plan to move around.",
          "All prices are in US$ per day and tax (18%) is added separately:",
          "If you plan to make a lot of trips a day, also look at the battery, because range depends on it:",
          "For an active group that heads out early and returns at night, a lithium model gives you plenty of peace of mind. If you're not sure, tell us how many you are and what your plans are: we'll recommend the model that fits best."
        ],
        "bullets": [
          "4 seats (2+2 or all forward-facing, up to 360 kg): ideal for couples or small families. From US$50/day depending on the model.",
          "6 seats (4+2, up to 540 kg): the best option for large families or groups of friends. From US$75/day depending on the model — the premium ECO Cross, with a 150 Ah lithium battery and luxury seats, is US$90/day.",
          "Lead-acid: 25–40 km per charge.",
          "Standard lithium (105 Ah): 60–70 km per charge.",
          "Long-range lithium (150 Ah): 85–95 km per charge, available in the ECO Cross (4 and 6 seats) and the ECO Track."
        ]
      },
      {
        "heading": "Driving rules, speed and safety",
        "paragraphs": [
          "The golf cart is easy and safe to drive inside the resort, as long as you follow a few basic rules. In residential zones, at BOLT we keep a 25 km/h limit for everyone's safety. For reference, these are the speeds by line:",
          "And these are the usage rules we ask you to follow at all times:"
        ],
        "bullets": [
          "ECO and Zycar models: 30–35 km/h.",
          "Club Car models: 20–31 km/h.",
          "BOLT limit in residential zones: 25 km/h.",
          "The driver must be over 18 and hold a valid license.",
          "Use only inside residential areas, villas and resorts.",
          "No driving on the beach, the sand or public roads.",
          "All passengers must be seated.",
          "Do not overload the cart beyond its capacity."
        ]
      },
      {
        "heading": "Overnight charging: wake up with the cart ready",
        "paragraphs": [
          "So every morning starts with a full cart, the routine is simple: at the end of the day, plug it into a standard outlet with the charger we include. A full charge takes 8 to 10 hours, so if you plug it in when you get back at night, it's ready for your next outing by morning. You don't need special installations or extra equipment."
        ]
      },
      {
        "heading": "How to request availability",
        "paragraphs": [
          "Booking with BOLT is by availability request: it's not an automatic confirmation. You write to us with your dates and details, we check the fleet and confirm. That way we make sure we have the right model ready for your villa. These are the booking terms:",
          "To request availability, message us on WhatsApp at +1 829 202 7849 with your stay dates, how many are travelling and the name of your villa or residence inside Puntacana Resort & Club. We help you pick the ideal model and coordinate delivery. Your ride in paradise."
        ],
        "bullets": [
          "50% deposit to secure your booking.",
          "US$200 refundable damage deposit.",
          "Free date change with 48 hours' notice."
        ]
      }
    ],
    "faq": [
      {
        "q": "Do I need a license to drive the golf cart?",
        "a": "Yes. The driver must be over 18 and hold a valid driver's license. Use is only inside residential areas, villas and resorts; driving on the beach, the sand or public roads is not allowed."
      },
      {
        "q": "Is there a villa delivery fee?",
        "a": "In Puntacana Resort & Club it's free on bookings of 5 days or more. On shorter bookings, transport (round trip, delivery + pickup) is US$60 per trailer trip + 18% tax, charged with your booking."
      },
      {
        "q": "How long does it take to charge and how do I do it?",
        "a": "With the included charger, you plug it into a standard outlet and a full charge takes 8 to 10 hours. Plug it in at night and it's ready by morning. Range goes from 25–40 km (lead-acid) up to 85–95 km (long-range lithium), depending on the model."
      }
    ],
    "locale": "en"
  },
  {
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "golf-cart-cap-cana-guide",
    "pairSlug": "golf-cart-cap-cana-guia",
    "title": "Golf cart rental in Cap Cana: the complete BOLT guide",
    "metaTitle": "Golf Cart Rental in Cap Cana: Guide",
    "metaDescription": "Rent a golf cart in Cap Cana with BOLT: villa delivery, 4 and 6-seat models, long-range lithium and prices from US$50/day plus tax.",
    "excerpt": "Everything to rent a golf cart in Cap Cana: villa delivery, 4 and 6-seat models, private-community rules and prices from US$50/day.",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "Why a golf cart is the best way to get around Cap Cana",
        "paragraphs": [
          "In a private community like Cap Cana distances are deceiving: what looks close on the map can take a lot longer on foot than you planned. That's why the golf cart has become the natural vehicle inside the community: you move between the villa, the common areas and the amenities at your own pace, without depending on anyone and without the hassle of a traditional rental car.",
          "In this guide we explain how renting with BOLT works inside Cap Cana: what the service covers, how to choose the right model for your family or group, what it costs, what rules apply and how to request availability. It works whether you're on holiday or you're a property manager wanting to solve mobility for your guests."
        ]
      },
      {
        "heading": "BOLT coverage in Cap Cana and villa delivery",
        "paragraphs": [
          "BOLT rents premium golf carts in the three main areas of Punta Cana: Puntacana Resort & Club (its main zone, where it delivers the most), Cap Cana and Bávaro, where the operations base is (Av. Barceló Km 3 1/2, Naves Montolio #17). In Cap Cana the service runs on direct delivery: the team brings the golf cart to your villa, gives you a usage briefing and picks it up at the same spot at the end of the rental. You don't have to leave the community or arrange anything else.",
          "Transport to Cap Cana (round trip, delivery + pickup) is US$60 per trailer trip plus 18% tax, charged with your booking, and it's free on bookings of 5 days or more. A detail many appreciate: the rental day counts as 24 hours from delivery, not a calendar day. If you get the cart at 3 pm, it's yours until 3 pm the next day."
        ]
      },
      {
        "heading": "Which model to choose: families, groups and the premium ECO Cross",
        "paragraphs": [
          "BOLT's fleet has 11 models across 3 lines — ECO (Cross, Plus, Sport, Track), Club Car (Precedent, Tempo, Limo) and Zycar — in two formats: 4 seats (2+2 or all forward-facing, up to 360 kg) and 6 seats (4+2, up to 540 kg). The practical rule is simple: if more than 4 people are travelling, or you're 4 adults with kids and bags, go straight for the 6-seater. Inside the communities everyone must be seated, so it's worth counting seats before booking, not after.",
          "For families and groups in Cap Cana, the top option is the premium ECO Cross: 6 seats, a 150 Ah long-range lithium battery with 85 to 95 km of range per charge and luxury seats. It's built for demanding guests, because it practically removes any worry about the battery even on busy days.",
          "Range varies by battery type, and it's worth being clear on it when choosing:"
        ],
        "bullets": [
          "Lead-acid: 25–40 km per charge, enough for relaxed use inside the community.",
          "Standard lithium 105 Ah: 60–70 km per charge.",
          "Long-range lithium 150 Ah: 85–95 km per charge (ECO Cross 4 and 6 seats, and ECO Track).",
          "Full charge in 8–10 hours on a standard villa outlet; the charger is included."
        ]
      },
      {
        "heading": "Prices: from US$50 per day",
        "paragraphs": [
          "BOLT rates are per day in dollars, with 18% tax on top:"
        ],
        "bullets": [
          "4 seats: from US$50/day depending on the model.",
          "6 seats: from US$75/day depending on the model (the premium ECO Cross, 150 Ah lithium with luxury seats, US$90/day).",
          "Rentals of a month or more: quote on WhatsApp."
        ]
      },
      {
        "heading": "What the rental includes and what rules apply in the communities",
        "paragraphs": [
          "Every rental includes a charger, usage briefing and 24/7 WhatsApp support in English and Spanish; delivery and pickup at your villa are charged as fixed zone transport (US$60 + 18% tax in Cap Cana, free on bookings of 5 days or more). There's nothing extra to buy and no charging station to find: the villa outlet is enough.",
          "Private communities like Cap Cana take the safety and quiet of their residents seriously, and BOLT's rules are in the same spirit:"
        ],
        "bullets": [
          "The driver must be 18 or older and hold a valid driver's license.",
          "The golf cart is used only inside residential areas, villas and resorts; taking it to the beach, the sand or public roads is prohibited.",
          "Maximum speed of 25 km/h in residential zones, though ECO and Zycar models reach 30–35 km/h and Club Cars between 20 and 31 km/h.",
          "All passengers stay seated and you must not exceed the vehicle's capacity (360 kg on 4 seats, 540 kg on 6 seats)."
        ]
      },
      {
        "heading": "How to request your golf cart in Cap Cana",
        "paragraphs": [
          "BOLT works by availability request, never by automatic confirmation: every booking is checked against the real fleet so the cart you're promised is the one that arrives at your villa. The process is straightforward:"
        ],
        "bullets": [
          "Message on WhatsApp at +1 829 202 7849 with your dates, the community or villa inside Cap Cana and how many people are travelling.",
          "You receive the available model options and the quote (rate plus transport by zone, plus 18% tax).",
          "You confirm with a 50% deposit; on delivery a US$200 damage deposit is taken, refundable on return.",
          "If your plans change, you can move the date for free with 48 hours' notice."
        ]
      },
      {
        "heading": "One last tip before booking",
        "paragraphs": [
          "Since BOLT works by availability request, it's best to write as soon as you have confirmed travel dates, especially if you need a 6-seater or the premium ECO Cross. If you're a property manager, the same WhatsApp channel works to coordinate deliveries for your guests; learn about our Partner Program at boltgolfcars.com/en/partners. Your ride in paradise: write to us and we'll confirm what's available for your dates."
        ]
      }
    ],
    "faq": [
      {
        "q": "Is golf cart delivery to my Cap Cana villa free?",
        "a": "On bookings of 5 days or more, yes: transport is free for the whole booking. On shorter bookings, transport to Cap Cana (round trip, delivery + pickup) is US$60 per trailer trip plus 18% tax, charged with your booking. Remember the rental day is 24 hours from delivery, not a calendar day."
      },
      {
        "q": "Where and how do I charge the golf cart?",
        "a": "In any standard outlet at your villa: the charger is included in the rental. A full charge takes 8 to 10 hours, so the usual routine is to plug it in overnight and wake up with a full battery. The premium ECO Cross with 150 Ah lithium does 85 to 95 km per charge."
      },
      {
        "q": "What do I need to book and what if my dates change?",
        "a": "You request availability on WhatsApp (+1 829 202 7849), confirm with a 50% deposit and on delivery a refundable US$200 damage deposit is taken. Date changes are free with at least 48 hours' notice."
      }
    ],
    "locale": "en"
  },
  {
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "golf-cart-4-or-6-seats",
    "pairSlug": "golf-cart-4-o-6-plazas",
    "title": "4 or 6-seat golf cart in Punta Cana: how to choose the right one for your group",
    "metaTitle": "4 or 6-seat golf cart: which to pick?",
    "metaDescription": "A practical guide to choosing between a 4 or 6-seat golf cart in Punta Cana: capacity, luggage, prices from US$50 and high-season availability.",
    "excerpt": "4 seats or 6? We help you decide based on your group, luggage and budget, with BOLT's real prices and tips for high season in Punta Cana.",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "The question that defines your booking",
        "paragraphs": [
          "If you've already decided to get around by golf cart during your stay in Punta Cana — good call — the next question arrives on its own: 4 seats or 6? At BOLT we hear it every day, and the answer almost never comes down to a single factor. It's shaped by how many you are, how much luggage you carry, whether you're travelling with kids or grandparents, your budget and even the travel date.",
          "First, understand the basic difference. The 4-seat golf cart is usually 2+2 (two forward-facing seats and two rear-facing) or, on models like the ECO Cross 4 and Zycar 4, has all four seats facing forward; it carries up to 360 kg. The 6-seater is 4+2: four seats up front and two in the back, with 540 kg capacity. Those 180 kg of difference matter more than they seem, and here's why."
        ]
      },
      {
        "heading": "Real capacity: people, weight and space",
        "paragraphs": [
          "Load capacity isn't just for people: it includes everything that goes on the cart. Coolers with ice, beach bags, groceries, folding chairs... it all adds up. A 4-seater with four adults is already close to its 360 kg limit, leaving little room for extra cargo. With two or three people, on the other hand, there's plenty of space and the rear seats become your luggage area.",
          "The 6-seater breathes differently: with its 540 kg capacity, a family of four or five rides comfortably and there's still room for the cooler and the day's bags. One important detail: at BOLT kids count as passengers. The rule is clear — everyone seated, always — so if you're five people, even if two are little ones, you need a 6-seater. Overloading the cart is not an option: it's about safety and taking care of the equipment."
        ]
      },
      {
        "heading": "Budget: what each option costs",
        "paragraphs": [
          "Here are BOLT's real prices, in US$ per day (18% tax charged separately):"
        ],
        "bullets": [
          "4-seat golf cart: from US$50/day depending on the model.",
          "6-seat golf cart: from US$75/day depending on the model (the premium ECO Cross, with a 150 Ah lithium battery and luxury seats, US$90/day).",
          "Transport (round trip, delivery + pickup): US$60 per trailer trip + 18% tax to Puntacana Resort & Club, Cap Cana and Bávaro — free on longer stays (5+ days nearby, 10+ days in Bávaro). US$120 to Uvero Alto / Macao; other areas, ask for a quote.",
          "Stays of a month or more: quote on WhatsApp."
        ]
      },
      {
        "heading": "High season: the 6-seaters go first",
        "paragraphs": [
          "There's one thing worth knowing before leaving the decision to the last minute: on holidays and high-season weeks, the 6-seaters are the first to sell out. It makes sense: large families and groups look for them first, and the 6-seat fleet isn't infinite.",
          "At BOLT every booking works by availability request — never automatic confirmation — so the sooner you write, the more options you'll have. The booking is secured with a 50% deposit. In high season (Dec 20 – Jan 6 and Holy Week) the minimum rental is 5 days and that advance is non-refundable; with 30+ days' notice it is kept as credit. Outside those dates you can move the date for free with 48 hours' notice."
        ]
      },
      {
        "heading": "Which one is yours? Recommendations by scenario",
        "paragraphs": [
          "Every group is different, but after delivering carts in Puntacana Resort & Club, Cap Cana and Bávaro, these are the patterns that work best:"
        ],
        "bullets": [
          "Couple: 4-seater from US$50/day. The rear seats stay free for the cooler, towels and shopping. It's the most efficient option in price and space.",
          "Family of 4: a 4-seater can work if you travel light, but if you carry a cooler, beach toys and daily shopping, the 6-seater (US$75/day) gives welcome margin every day of the trip.",
          "Family with grandparents (5–6 people): 6-seater, no question. Everyone must be seated, so five people already rule out the 4-seater. The wide front seats of the 4+2 are more comfortable for older travellers.",
          "Group of friends: 6-seater from US$75/day. If you're more than six, the right move is to combine two carts; overloading isn't allowed and ruins the experience.",
          "Useful fact: a 4-seater with all seats facing forward costs US$75/day, the same as an entry 6-seater. If you're torn between the two, for the same price you can take two extra seats."
        ]
      },
      {
        "heading": "Secure yours before you land",
        "paragraphs": [
          "Whatever you choose, the BOLT rental includes the same: charger (a full charge takes 8–10 hours on a standard outlet), usage briefing and 24/7 WhatsApp support in English and Spanish, with delivery and pickup at your villa charged as fixed transport by zone: free on 5+ day bookings (10+ in Bávaro) and, on shorter stays, US$60 round trip per trailer trip + tax. The rental day counts as 24 hours from delivery, not a calendar day, so you make the most of every hour you pay for.",
          "To book, message us on WhatsApp at +1 829 202 7849 with your dates, your area (Puntacana Resort & Club, Cap Cana or Bávaro) and how many people you are. Transport (delivery + pickup) is US$60 per trailer trip + 18% tax in Puntacana Resort & Club, Cap Cana and Bávaro, free from 5 days (10 in Bávaro). We confirm availability, you hold it with a 50% deposit and leave a refundable US$200 damage deposit. If you're staying in Casa de Campo, it applies only to bookings of 7+ days with transport quoted separately. Request your availability today and arrive in Punta Cana with the cart sorted. Your ride in paradise."
        ]
      }
    ],
    "faq": [
      {
        "q": "Do children count as passengers on the golf cart?",
        "a": "Yes. At BOLT each person takes a seat, regardless of age: the rule is that everyone rides seated and the cart is never overloaded. If you're 5 people counting children, you need a 6-seater. Remember too that the driver must be over 18 with a valid license."
      },
      {
        "q": "Does the daily price include delivery to my villa?",
        "a": "Not in the daily rate: transport (round trip, delivery + pickup) is a separate line charged with your booking — US$60 per trailer trip to Puntacana Resort & Club, Cap Cana and Bávaro, free on longer stays (5+ days nearby, 10+ days in Bávaro); US$120 to Uvero Alto / Macao. Note that all prices are in US$ per day and the 18% tax is charged separately."
      },
      {
        "q": "What if the 6-seater is no longer available for my dates?",
        "a": "Write to us anyway on WhatsApp at +1 829 202 7849: every booking works by availability request and the team confirms what's available for your dates. If the group is large and no 6-seater is left, a practical alternative is combining two 4-seaters. And if your plans change, you can move the date for free with 48 hours' notice."
      }
    ],
    "locale": "en"
  },
  {
    "published": "2026-07-05",
    "updated": "2026-10-16",
    "slug": "lead-acid-or-lithium-golf-cart",
    "pairSlug": "bateria-plomo-o-litio-golf-cart",
    "title": "Lead-acid or lithium? The real range of your golf cart in Punta Cana",
    "metaTitle": "Lead-acid vs lithium in golf carts",
    "metaDescription": "Compare real ranges: lead-acid 25–40 km, lithium 60–95 km per charge. Find out which battery suits your rental golf cart in Punta Cana.",
    "excerpt": "Lead-acid does 25–40 km; BOLT's lithium reaches up to 95 km per charge. We explain plainly which one is enough and when the premium tier is worth it.",
    "readMinutes": 5,
    "sections": [
      {
        "heading": "Why the battery matters more than the model",
        "paragraphs": [
          "When you compare golf cart tiers, the first things that catch your eye are the seats, the color or the size. But day to day, what really defines your experience is the battery: how many kilometers you cover per charge and how much you have to watch the plug.",
          "At BOLT we work with two technologies across our fleet of 11 models: lead-acid and lithium. Both work well, each has its place, and not everyone needs to pay for the more expensive one. Here we explain it with real numbers so you can choose calmly."
        ]
      },
      {
        "heading": "Real range: the numbers with no makeup",
        "paragraphs": [
          "These are the ranges we handle across our fleet, measured in real use inside the resorts:"
        ],
        "bullets": [
          "Lead-acid: 25–40 km per charge.",
          "Standard lithium (105 Ah): 60–70 km per charge.",
          "Long-range lithium (150 Ah): 85–95 km per charge, available on the premium ECO Cross and the ECO Track."
        ]
      },
      {
        "heading": "What does this mean on a typical resort day?",
        "paragraphs": [
          "Inside Puntacana Resort & Club, Cap Cana or Bávaro, trips tend to be short: from the villa to the pool, to the community restaurant, back and forth several times a day. On top of that, BOLT's limit in residential zones is 25 km/h, so in practice you cover less distance than you'd imagine.",
          "That's why we give ranges and not an exact figure: real range depends on how many people are on board, the heat and how you drive. A full 6-seater (4+2, up to 540 kg) uses more than a 4-seater with two people.",
          "The honest conclusion: for a normal day of back-and-forth within the same residential area, lead-acid is enough, as long as you charge every night. Lithium gives you margin for long days, full groups or simply not thinking about the battery for your whole stay."
        ]
      },
      {
        "heading": "Overnight charging: 8–10 hours and you wake up at 100%",
        "paragraphs": [
          "All our carts charge on a standard outlet and the charger is included in the rental, along with a usage briefing at the moment of delivery. A full charge takes 8 to 10 hours: plug it in when you get back at night and wake up with a full battery.",
          "The recommended routine is simple: plug the cart in every night. With lead-acid, this isn't negotiable; its 25–40 km range is built for one day at a time. With 150 Ah lithium you have more cushion if you used the cart little on a given day, though we still recommend charging overnight to start each day at full."
        ]
      },
      {
        "heading": "Who is lead-acid enough for?",
        "paragraphs": [
          "More guests than you'd think. If your plan fits this, there's no reason to pay more:"
        ],
        "bullets": [
          "You move within a single residential area or villa, with short trips.",
          "You're 2 to 4 people and not loaded to the limit all day.",
          "You don't mind plugging the cart in every night (it takes seconds)."
        ]
      },
      {
        "heading": "When the premium ECO Cross tier is worth it (US$90/day)",
        "paragraphs": [
          "The premium ECO Cross is our 6-seater with 150 Ah lithium: 85–95 km per charge and luxury seats, at US$90/day + tax. Against a standard 6-seater at US$85/day, we're talking about US$5 a day of difference. When is it worth it? When you travel as a full group (4+2), when your day is constant movement from morning to night, or when you simply don't want to count kilometers on holiday: with nearly triple the range of lead-acid, the battery stops being a concern.",
          "For comparison, our 4-seaters start at US$50/day (up to US$75 depending on the model); 6-seaters go from US$75/day (up to US$100 for the all-terrain ECO Track), always + 18% tax. Every rental includes charger and 24/7 WhatsApp support in English and Spanish; delivery and pickup at your villa are charged as fixed transport by zone (US$60 per trailer trip + 18% tax to Puntacana Resort & Club, Cap Cana and Bávaro, free on longer stays: 5+ days nearby, 10+ days in Bávaro). The rental day is 24 hours from delivery, not a calendar day.",
          "Not sure which suits you? Message us on WhatsApp at +1 829 202 7849 and tell us your plan: how many people, where you're staying and how many days. We work by availability request — never automatic confirmation — so the sooner you write, the better. Your ride in paradise."
        ]
      }
    ],
    "faq": [
      {
        "q": "Do I need a special installation to charge the golf cart?",
        "a": "No. Every BOLT model charges on a standard outlet at your villa and the charger is included in the rental. A full charge takes 8 to 10 hours, so plugging it in every night is enough."
      },
      {
        "q": "Could I run out of battery mid-day?",
        "a": "If you charge every night and stay within the residential area, it's very unlikely: even lead-acid does 25–40 km per charge and resort trips are short. If anything happens, you have 24/7 WhatsApp support in English and Spanish throughout your rental."
      },
      {
        "q": "Does the premium ECO Cross price include tax and delivery?",
        "a": "The premium tier is US$90/day + 18% tax. Transport (round trip, delivery + pickup) is charged separately with your booking: US$60 per trailer trip to Puntacana Resort & Club, Cap Cana and Bávaro + 18% tax, free on longer stays (5+ days nearby, 10+ days in Bávaro); US$120 to Uvero Alto / Macao. Remember the rental day is 24 hours from delivery."
      }
    ],
    "locale": "en"
  },
  {
    "published": "2026-10-17",
    "updated": "2026-10-17",
    "slug": "golf-cart-bavaro",
    "pairSlug": "golf-cart-bavaro-guide",
    "title": "Golf cart en Bávaro: Cocotal, Vista Cana y residenciales de la zona",
    "metaTitle": "Golf cart en Bávaro: Cocotal y Vista Cana",
    "metaDescription": "Renta un golf cart en Bávaro con BOLT: entrega en Cocotal, Vista Cana y residenciales de la zona, transporte gratis desde 10 días; menos días, US$60 ida y vuelta por viaje de tráiler.",
    "excerpt": "Bávaro es la casa de BOLT: entrega rápida en Cocotal, Vista Cana y los residenciales de la zona, con toda la flota disponible y soporte 24/7 por WhatsApp.",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "Bávaro es la casa de BOLT",
        "paragraphs": [
          "Si te hospedas en Bávaro, estás más cerca de nosotros que en ninguna otra zona. Nuestra base de operaciones está en la Av. Barceló Km 3½, Naves Montolio, Local #17, en pleno Bávaro: desde aquí salen los tráilers cada mañana y aquí vuelve cada carrito al final de su renta. Para ti, eso se traduce en dos ventajas muy concretas: la entrega más rápida de todas nuestras zonas y la asistencia más ágil si algo surge durante tu estadía.",
          "También significa que tienes toda la flota a mano. Los 11 modelos de BOLT —las líneas ECO, Club Car y Zycar, en 4 y 6 plazas— viven en Bávaro, así que cuando pides disponibilidad para un residencial de la zona no dependes de que un carrito regrese de otro punto: revisamos lo que hay en la nave y te confirmamos el mismo día."
        ]
      },
      {
        "heading": "Dónde entregamos en Bávaro: Cocotal, Vista Cana y más",
        "paragraphs": [
          "En Bávaro entregamos en residencias, apartamentos y resorts de toda la zona. Los dos sectores donde más carritos tenemos rodando son Cocotal, con sus calles internas y su campo de golf, y Vista Cana, una comunidad amplia donde el golf cart es la manera natural de ir de la casa a las áreas comunes. Si tu residencial no es uno de estos dos, escríbenos igual: la regla es que el carrito se use dentro de un complejo privado, y en Bávaro hay muchos que cumplen esa condición.",
          "La entrega funciona igual que en el resto de nuestras zonas: te llevamos el carrito hasta la puerta de tu villa o apartamento, lo recibes con la batería cargada y te damos una orientación rápida de uso antes de que salgas a rodar. Al terminar la renta lo recogemos en el mismo lugar. No tienes que venir a la base ni coordinar nada más."
        ],
        "bullets": [
          "Cocotal: villas y apartamentos dentro del complejo.",
          "Vista Cana: casas y áreas comunes de la comunidad.",
          "Otros residenciales, apartamentos y resorts de Bávaro: consulta por WhatsApp y te decimos si entregamos ahí."
        ]
      },
      {
        "heading": "Transporte, renta mínima y estadías largas",
        "paragraphs": [
          "El transporte en Bávaro (entrega + recogida, ida y vuelta) cuesta US$60 por viaje de tráiler más ITBIS 18%, y se paga junto con la reserva. En un viaje van dos carritos de 4 plazas, o uno de 6 y uno de 4. Lo mejor viene en las estadías largas: en reservas de 10 días o más el transporte es gratis para toda la reserva, sin importar cuántos viajes haga falta hacer.",
          "La renta mínima para clientes directos es de 2 días durante el año y de 5 días en temporada alta (del 20 de diciembre al 6 de enero y Semana Santa). Tu día de renta son 24 horas contadas desde la entrega, no el día calendario: si recibes el carrito a las 2 de la tarde, es tuyo hasta las 2 de la tarde del día siguiente. Y si tu plan es quedarte un mes o más, escríbenos por WhatsApp y te preparamos una cotización a la medida de tus fechas."
        ],
        "bullets": [
          "Transporte: US$60 por viaje de tráiler + ITBIS 18%.",
          "Gratis en reservas de 10 días o más (toda la reserva).",
          "Renta mínima: 2 días; 5 días en temporada alta.",
          "Rentas de un mes o más: cotización por WhatsApp."
        ]
      },
      {
        "heading": "Reglas de uso dentro de los residenciales",
        "paragraphs": [
          "El golf cart es fácil de manejar y seguro dentro de un residencial, siempre que se respeten unas reglas básicas que cuidan a todos: a tu familia, a los vecinos y al carrito. En BOLT mantenemos un límite de 25 km/h en zonas residenciales, y el uso es exclusivamente dentro de comunidades privadas y resorts. Bávaro tiene carreteras públicas muy transitadas a pocos metros de casi cualquier residencial, y ahí el golf cart no puede circular, igual que en la playa o la arena."
        ],
        "bullets": [
          "El conductor debe ser mayor de 18 años y tener licencia de conducir vigente.",
          "Uso solo dentro de residenciales, villas y resorts; nunca en carreteras públicas ni en la playa.",
          "Límite BOLT de 25 km/h en zonas residenciales.",
          "Todos los pasajeros van sentados y no se excede la capacidad del carrito (360 kg en 4 plazas, 540 kg en 6 plazas)."
        ]
      },
      {
        "heading": "Cómo reservar tu golf cart en Bávaro",
        "paragraphs": [
          "Toda reserva con BOLT es por solicitud de disponibilidad: no es una confirmación automática, una persona de nuestro equipo revisa la flota y te responde el mismo día. Escríbenos por WhatsApp al +1 829 202 7849 con tus fechas, el nombre de tu residencial en Bávaro y cuántas personas viajan, o envía tu solicitud desde boltgolfcars.com. Te proponemos el modelo que mejor encaja y la cotización completa: tarifa por día, transporte e ITBIS, sin sorpresas.",
          "Para asegurar la reserva se paga un depósito del 50%, y a la entrega se toma un depósito de garantía de US$200 que se devuelve al recibir el carrito en buen estado. Durante toda la renta tienes soporte por WhatsApp 24/7 en español e inglés, y en Bávaro ese soporte está literalmente a pocos minutos de tu puerta. Your ride in paradise."
        ],
        "bullets": [
          "Depósito del 50% para confirmar.",
          "Depósito de garantía de US$200, reembolsable.",
          "Confirmación el mismo día por una persona del equipo.",
          "Cambio de fecha gratis con 48 horas de aviso (fuera de temporada alta)."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Entregan en mi residencial de Bávaro aunque no sea Cocotal ni Vista Cana?",
        "a": "Sí, siempre que el carrito se use dentro de un complejo privado: residenciales, apartamentos y resorts de la zona de Bávaro. Escríbenos por WhatsApp con el nombre del residencial y te confirmamos la entrega."
      },
      {
        "q": "¿Cuánto cuesta el transporte en Bávaro y cuándo es gratis?",
        "a": "US$60 por viaje de tráiler más ITBIS 18% (entrega y recogida, ida y vuelta). En reservas de 10 días o más el transporte es gratis para toda la reserva."
      },
      {
        "q": "¿Cuál es la renta mínima en Bávaro?",
        "a": "2 días durante el año y 5 días en temporada alta (20 de diciembre al 6 de enero y Semana Santa). Cada día de renta son 24 horas desde la entrega. Para un mes o más, pide tu cotización por WhatsApp."
      },
      {
        "q": "¿Puedo salir del residencial con el golf cart?",
        "a": "No. El golf cart se usa solo dentro de comunidades privadas y resorts, a un máximo de 25 km/h en zonas residenciales. Está prohibido circular por carreteras públicas, la playa o la arena. El conductor debe ser mayor de 18 años con licencia vigente."
      }
    ],
    "locale": "es"
  },
  {
    "published": "2026-10-17",
    "updated": "2026-10-17",
    "slug": "golf-cart-bavaro-guide",
    "pairSlug": "golf-cart-bavaro",
    "title": "Golf cart in Bávaro: Cocotal, Vista Cana and the area's residential communities",
    "metaTitle": "Golf cart in Bávaro: Cocotal & Vista Cana",
    "metaDescription": "Rent a golf cart in Bávaro with BOLT: delivery to Cocotal, Vista Cana and residential communities in the area, transport free from 10 days; shorter stays, US$60 round trip per trailer trip.",
    "excerpt": "Bávaro is BOLT's home: fast delivery to Cocotal, Vista Cana and the area's residential communities, with the full fleet on hand and 24/7 WhatsApp support.",
    "readMinutes": 4,
    "sections": [
      {
        "heading": "Bávaro is BOLT's home",
        "paragraphs": [
          "If you're staying in Bávaro, you're closer to us than in any other area. Our operations base is at Av. Barceló Km 3½, Naves Montolio, Local #17, right in Bávaro: the trailers leave from here every morning and every cart comes back here at the end of its rental. For you, that means two very concrete advantages: the fastest delivery of all our zones and the quickest assistance if anything comes up during your stay.",
          "It also means you have the whole fleet within reach. BOLT's 11 models — the ECO, Club Car and Zycar lines, in 4 and 6 seats — live in Bávaro, so when you request availability for a residential community in the area you don't depend on a cart coming back from somewhere else: we check what's in the warehouse and confirm the same day."
        ]
      },
      {
        "heading": "Where we deliver in Bávaro: Cocotal, Vista Cana and more",
        "paragraphs": [
          "In Bávaro we deliver to residences, apartments and resorts across the area. The two sectors where we have the most carts rolling are Cocotal, with its internal streets and golf course, and Vista Cana, a large community where the golf cart is the natural way to get from the house to the common areas. If your residential community isn't one of these two, write to us anyway: the rule is that the cart is used inside a private community, and Bávaro has plenty that meet that condition.",
          "Delivery works the same as in the rest of our zones: we bring the cart to the door of your villa or apartment, you receive it with the battery charged and we give you a quick usage briefing before you head out. At the end of the rental we pick it up at the same spot. You don't have to come to the base or arrange anything else."
        ],
        "bullets": [
          "Cocotal: villas and apartments inside the complex.",
          "Vista Cana: houses and common areas of the community.",
          "Other residential communities, apartments and resorts in Bávaro: ask on WhatsApp and we'll tell you if we deliver there."
        ]
      },
      {
        "heading": "Transport, minimum rental and long stays",
        "paragraphs": [
          "Transport in Bávaro (delivery + pickup, round trip) is US$60 per trailer trip plus 18% tax, paid with your booking. One trip carries two 4-seaters, or one 6-seater and one 4-seater. The best part comes with long stays: on bookings of 10 days or more, transport is free for the whole booking, no matter how many trips it takes.",
          "The minimum rental for direct customers is 2 days through the year and 5 days in high season (December 20 to January 6 and Holy Week). Your rental day is 24 hours counted from delivery, not the calendar day: if you receive the cart at 2 pm, it's yours until 2 pm the next day. And if your plan is to stay a month or more, message us on WhatsApp and we'll prepare a quote tailored to your dates."
        ],
        "bullets": [
          "Transport: US$60 per trailer trip + 18% tax.",
          "Free on bookings of 10 days or more (the whole booking).",
          "Minimum rental: 2 days; 5 days in high season.",
          "Rentals of a month or more: quote on WhatsApp."
        ]
      },
      {
        "heading": "Usage rules inside the residential communities",
        "paragraphs": [
          "The golf cart is easy to drive and safe inside a residential community, as long as a few basic rules are followed that look after everyone: your family, the neighbours and the cart. At BOLT we keep a 25 km/h limit in residential zones, and use is exclusively inside private communities and resorts. Bávaro has busy public roads a few metres from almost any residential community, and the golf cart cannot drive there, just as it can't on the beach or the sand."
        ],
        "bullets": [
          "The driver must be over 18 and hold a valid driver's license.",
          "Use only inside residential communities, villas and resorts; never on public roads or the beach.",
          "BOLT limit of 25 km/h in residential zones.",
          "All passengers ride seated and the cart's capacity is never exceeded (360 kg on 4 seats, 540 kg on 6 seats)."
        ]
      },
      {
        "heading": "How to book your golf cart in Bávaro",
        "paragraphs": [
          "Every booking with BOLT is by availability request: it's not an automatic confirmation, a person on our team checks the fleet and replies the same day. Message us on WhatsApp at +1 829 202 7849 with your dates, the name of your residential community in Bávaro and how many people are travelling, or send your request from boltgolfcars.com. We propose the model that fits best and the full quote: daily rate, transport and tax, with no surprises.",
          "To secure the booking you pay a 50% deposit, and on delivery a US$200 damage deposit is taken, returned when the cart comes back in good condition. Throughout the rental you have 24/7 WhatsApp support in English and Spanish, and in Bávaro that support is literally a few minutes from your door. Your ride in paradise."
        ],
        "bullets": [
          "50% deposit to confirm.",
          "US$200 refundable damage deposit.",
          "Same-day confirmation by a person on the team.",
          "Free date change with 48 hours' notice (outside high season)."
        ]
      }
    ],
    "faq": [
      {
        "q": "Do you deliver to my residential community in Bávaro even if it isn't Cocotal or Vista Cana?",
        "a": "Yes, as long as the cart is used inside a private community: residential communities, apartments and resorts across the Bávaro area. Message us on WhatsApp with the name of the community and we'll confirm delivery."
      },
      {
        "q": "How much is transport in Bávaro and when is it free?",
        "a": "US$60 per trailer trip plus 18% tax (delivery and pickup, round trip). On bookings of 10 days or more, transport is free for the whole booking."
      },
      {
        "q": "What is the minimum rental in Bávaro?",
        "a": "2 days through the year and 5 days in high season (December 20 to January 6 and Holy Week). Each rental day is 24 hours from delivery. For a month or more, ask for your quote on WhatsApp."
      },
      {
        "q": "Can I leave the residential community with the golf cart?",
        "a": "No. The golf cart is used only inside private communities and resorts, at a maximum of 25 km/h in residential zones. Driving on public roads, the beach or the sand is prohibited. The driver must be over 18 with a valid license."
      }
    ],
    "locale": "en"
  },
  {
    "published": "2026-10-17",
    "updated": "2026-10-17",
    "slug": "golf-cart-casa-de-campo-7-dias",
    "pairSlug": "golf-cart-casa-de-campo-7-days",
    "title": "Golf cart en Casa de Campo para estadías de 7 días o más",
    "metaTitle": "Golf cart en Casa de Campo: 7 días o más",
    "metaDescription": "Golf cart en Casa de Campo en estadías de 7 días o más: la misma tarifa por día que en Punta Cana, transporte cotizado por villa y soporte 24/7 por WhatsApp.",
    "excerpt": "Casa de Campo queda fuera de nuestra zona habitual, pero en estadías de 7 días o más llevamos el golf cart hasta tu villa con el transporte cotizado y la misma tarifa por día.",
    "readMinutes": 5,
    "sections": [
      {
        "heading": "Una comunidad hecha para moverse en golf cart",
        "paragraphs": [
          "Casa de Campo es una de las comunidades residenciales más extensas del Caribe. Villas amplias, varios campos de golf, marina, playa y grandes áreas verdes, todo separado por distancias que a pie no se recorren. Dentro, el golf cart no es un capricho: es el vehículo con el que se vive la comunidad. De la villa a la playa por la mañana, al golf al mediodía, a cenar en la noche, y de vuelta sin depender de nadie.",
          "Si tu estadía es de una semana o más, tener tu propio carrito desde el primer día cambia el ritmo de las vacaciones. No esperas traslados, cargas lo de la playa sin esfuerzo y cada salida corta deja de ser una logística. En esta guía te contamos cómo funciona la renta con BOLT en Casa de Campo, qué condiciones son distintas y qué modelo conviene para una estadía larga."
        ]
      },
      {
        "heading": "Por qué el mínimo es de 7 días",
        "paragraphs": [
          "Casa de Campo está fuera de nuestra zona habitual: nuestras entregas diarias se concentran en Puntacana Resort & Club, Cap Cana y Bávaro, y trasladar un carrito hasta allá implica un viaje de tráiler considerablemente más largo. Por eso solo tiene sentido en estadías largas, y el mínimo de renta en Casa de Campo es de 7 días. No es una regla para complicarte: es lo que permite que el servicio llegue con la misma calidad que en el resto de nuestras zonas.",
          "Para ti, el mínimo de 7 días encaja con lo que de todas formas suele ser una estadía en Casa de Campo: una semana, dos semanas o una temporada completa. Y como tu día de renta son 24 horas desde la entrega, los siete días se cuentan completos desde el momento en que recibes el carrito en tu villa."
        ]
      },
      {
        "heading": "Transporte cotizado, tarifa por día igual que en todas partes",
        "paragraphs": [
          "En nuestras tres zonas de Punta Cana el transporte tiene una tarifa fija por viaje de tráiler. En Casa de Campo, en cambio, se cotiza para cada solicitud según tres datos: tu villa (la ubicación exacta dentro de la comunidad), tus fechas y la cantidad de carritos, porque cada viaje de tráiler lleva dos carritos de 4 plazas o uno de 6 y uno de 4. Con esos tres datos te devolvemos el costo exacto del transporte y lo incluimos en la confirmación de tu solicitud, de modo que sabes el total completo antes de pagar nada.",
          "Lo que no cambia es la tarifa por día del modelo: es la misma que en Puntacana Resort & Club, Cap Cana o Bávaro. Los 4 plazas van desde US$50/día y los 6 plazas desde US$75/día, siempre más ITBIS 18%. No hay recargo por zona en la tarifa del carrito; la única línea que se cotiza aparte es el transporte."
        ],
        "bullets": [
          "Mínimo de renta en Casa de Campo: 7 días.",
          "Transporte: cotizado según villa, fechas y número de carritos (viajes de tráiler).",
          "Tarifa por día del modelo: la misma que en el resto de nuestras zonas, más ITBIS 18%.",
          "El costo exacto del transporte llega en la confirmación de tu solicitud."
        ]
      },
      {
        "heading": "Qué modelo conviene para una estadía larga",
        "paragraphs": [
          "Para una semana o más en una comunidad tan extensa, te recomendamos ir a las líneas premium. En 4 plazas, el ECO Cross 4 y el Zycar 4 tienen todos los asientos mirando hacia adelante, cómodos para una pareja o una familia pequeña que va a usar el carrito todos los días. En 6 plazas, el ECO Cross 4+2 y el ECO Track 4+2 dan el espacio y la capacidad (hasta 540 kg) que piden una familia completa o un grupo de amigos con cooler, bolsos de playa y compras.",
          "Si tu plan incluye muchas vueltas al día —golf por la mañana, playa por la tarde, cena en la marina— vale la pena considerar un modelo con batería de litio de largo alcance (150 Ah), disponible en el ECO Cross y el ECO Track: entre 85 y 95 km por carga, frente a los 25–40 km del plomo-ácido. Sea cual sea el modelo, el cargador va incluido: lo conectas de noche a un tomacorriente estándar de la villa y en 8 a 10 horas amanece lleno."
        ],
        "bullets": [
          "4 plazas premium: ECO Cross 4 y Zycar 4 (asientos hacia adelante).",
          "6 plazas premium: ECO Cross 4+2 y ECO Track 4+2 (hasta 540 kg).",
          "Opcional: litio de largo alcance 150 Ah, 85–95 km por carga.",
          "Cargador incluido; carga completa en 8–10 horas en un tomacorriente estándar."
        ]
      },
      {
        "heading": "Soporte 24/7 y cómo reservar",
        "paragraphs": [
          "Aunque Casa de Campo quede fuera de nuestra zona habitual, el servicio durante la renta es exactamente el mismo: soporte por WhatsApp 24/7 en español e inglés, el carrito entregado con carga completa y una orientación de uso en la puerta de tu villa. Si en algún momento necesitas asistencia, una sola conversación de WhatsApp lo resuelve.",
          "Reservar es por solicitud de disponibilidad, nunca confirmación automática: escríbenos por WhatsApp al +1 829 202 7849 o desde boltgolfcars.com con el nombre de tu villa en Casa de Campo, tus fechas y cuántas personas viajan. Una persona del equipo te responde el mismo día con los modelos disponibles y el total claro: tarifa por día, transporte cotizado e ITBIS. Confirmas con un depósito del 50% y a la entrega se toma un depósito de garantía de US$200, reembolsable al devolver el carrito. Your ride in paradise."
        ],
        "bullets": [
          "Escribe con villa, fechas y número de personas.",
          "Recibes los modelos disponibles y el total con el transporte ya cotizado.",
          "Depósito del 50% para confirmar; US$200 de garantía reembolsable a la entrega.",
          "Soporte 24/7 por WhatsApp durante toda la estadía."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Por qué el mínimo es de 7 días en Casa de Campo?",
        "a": "Porque Casa de Campo está fuera de nuestra zona habitual y el traslado del carrito solo se justifica en estadías largas. Los 7 días se cuentan como 24 horas cada uno desde la entrega."
      },
      {
        "q": "¿Cuánto cuesta llevar el golf cart a Casa de Campo?",
        "a": "Se cotiza para cada solicitud según tu villa, tus fechas y la cantidad de carritos (viajes de tráiler). Te enviamos el costo exacto en la confirmación, antes de que pagues el depósito."
      },
      {
        "q": "¿La tarifa por día es distinta en Casa de Campo?",
        "a": "No. La tarifa por día del modelo es la misma que en el resto de nuestras zonas: 4 plazas desde US$50/día y 6 plazas desde US$75/día, más ITBIS 18%. Solo el transporte se cotiza aparte."
      },
      {
        "q": "¿Qué modelo me recomiendan para dos semanas con la familia?",
        "a": "Un 6 plazas premium: el ECO Cross 4+2 con litio de largo alcance (85–95 km por carga) es la opción más cómoda para una familia que va a usar el carrito todos los días. Si son hasta 4 personas, el ECO Cross 4 o el Zycar 4."
      }
    ],
    "locale": "es"
  },
  {
    "published": "2026-10-17",
    "updated": "2026-10-17",
    "slug": "golf-cart-casa-de-campo-7-days",
    "pairSlug": "golf-cart-casa-de-campo-7-dias",
    "title": "Golf cart in Casa de Campo for stays of 7 days or more",
    "metaTitle": "Golf cart in Casa de Campo: 7+ days",
    "metaDescription": "Golf cart in Casa de Campo for stays of 7 days or more: the same daily rate as in Punta Cana, transport quoted by villa and 24/7 WhatsApp support.",
    "excerpt": "Casa de Campo is outside our usual area, but for stays of 7 days or more we bring the golf cart to your villa with transport quoted and the same daily rate.",
    "readMinutes": 5,
    "sections": [
      {
        "heading": "A community built for getting around by golf cart",
        "paragraphs": [
          "Casa de Campo is one of the largest residential communities in the Caribbean. Spacious villas, several golf courses, a marina, beach and big green areas, all separated by distances you don't cover on foot. Inside, the golf cart isn't a whim: it's the vehicle the community is lived with. From the villa to the beach in the morning, to the golf at midday, to dinner at night, and back without depending on anyone.",
          "If your stay is a week or more, having your own cart from day one changes the pace of the holiday. You don't wait for rides, you load your beach gear effortlessly and every short outing stops being a logistics exercise. In this guide we explain how renting with BOLT works in Casa de Campo, which terms are different and which model suits a long stay."
        ]
      },
      {
        "heading": "Why the minimum is 7 days",
        "paragraphs": [
          "Casa de Campo is outside our usual area: our daily deliveries are concentrated in Puntacana Resort & Club, Cap Cana and Bávaro, and moving a cart there means a considerably longer trailer trip. That's why it only makes sense for long stays, and the minimum rental in Casa de Campo is 7 days. It isn't a rule to complicate things: it's what allows the service to arrive with the same quality as in the rest of our zones.",
          "For you, the 7-day minimum fits what a stay in Casa de Campo usually is anyway: a week, two weeks or a full season. And since your rental day is 24 hours from delivery, the seven days are counted in full from the moment you receive the cart at your villa."
        ]
      },
      {
        "heading": "Transport quoted, the same daily rate as everywhere",
        "paragraphs": [
          "In our three Punta Cana zones, transport has a fixed rate per trailer trip. In Casa de Campo, instead, it's quoted for each request based on three things: your villa (the exact location inside the community), your dates and the number of carts, because each trailer trip carries two 4-seaters or one 6-seater and one 4-seater. With those three details we come back with the exact transport cost and include it in the confirmation of your request, so you know the full total before paying anything.",
          "What doesn't change is the model's daily rate: it's the same as in Puntacana Resort & Club, Cap Cana or Bávaro. 4-seaters go from US$50/day and 6-seaters from US$75/day, always plus 18% tax. There's no zone surcharge on the cart's rate; the only line quoted separately is transport."
        ],
        "bullets": [
          "Minimum rental in Casa de Campo: 7 days.",
          "Transport: quoted by villa, dates and number of carts (trailer trips).",
          "Model's daily rate: the same as in the rest of our zones, plus 18% tax.",
          "The exact transport cost comes in the confirmation of your request."
        ]
      },
      {
        "heading": "Which model suits a long stay",
        "paragraphs": [
          "For a week or more in such a large community, we recommend going for the premium lines. In 4 seats, the ECO Cross 4 and the Zycar 4 have all seats facing forward, comfortable for a couple or a small family that will use the cart every day. In 6 seats, the ECO Cross 4+2 and the ECO Track 4+2 give the space and capacity (up to 540 kg) that a full family or a group of friends with a cooler, beach bags and shopping needs.",
          "If your plan includes many trips a day — golf in the morning, beach in the afternoon, dinner at the marina — it's worth considering a model with a long-range lithium battery (150 Ah), available on the ECO Cross and the ECO Track: between 85 and 95 km per charge, against the 25–40 km of lead-acid. Whatever the model, the charger is included: plug it in at night to a standard villa outlet and in 8 to 10 hours it wakes up full."
        ],
        "bullets": [
          "Premium 4 seats: ECO Cross 4 and Zycar 4 (forward-facing seats).",
          "Premium 6 seats: ECO Cross 4+2 and ECO Track 4+2 (up to 540 kg).",
          "Optional: 150 Ah long-range lithium, 85–95 km per charge.",
          "Charger included; full charge in 8–10 hours on a standard outlet."
        ]
      },
      {
        "heading": "24/7 support and how to book",
        "paragraphs": [
          "Even though Casa de Campo is outside our usual area, the service during the rental is exactly the same: 24/7 WhatsApp support in English and Spanish, the cart delivered fully charged and a usage briefing at your villa door. If you ever need assistance, a single WhatsApp conversation sorts it out.",
          "Booking is by availability request, never automatic confirmation: message us on WhatsApp at +1 829 202 7849 or from boltgolfcars.com with the name of your villa in Casa de Campo, your dates and how many people are travelling. A person on the team replies the same day with the available models and the clear total: daily rate, quoted transport and tax. You confirm with a 50% deposit and on delivery a US$200 damage deposit is taken, refundable when the cart is returned. Your ride in paradise."
        ],
        "bullets": [
          "Write with villa, dates and number of people.",
          "You receive the available models and the total with transport already quoted.",
          "50% deposit to confirm; US$200 refundable damage deposit on delivery.",
          "24/7 WhatsApp support throughout the stay."
        ]
      }
    ],
    "faq": [
      {
        "q": "Why is the minimum 7 days in Casa de Campo?",
        "a": "Because Casa de Campo is outside our usual area and moving the cart only makes sense for long stays. The 7 days are counted as 24 hours each from delivery."
      },
      {
        "q": "How much does it cost to bring the golf cart to Casa de Campo?",
        "a": "It's quoted for each request based on your villa, your dates and the number of carts (trailer trips). We send you the exact cost in the confirmation, before you pay the deposit."
      },
      {
        "q": "Is the daily rate different in Casa de Campo?",
        "a": "No. The model's daily rate is the same as in the rest of our zones: 4 seats from US$50/day and 6 seats from US$75/day, plus 18% tax. Only transport is quoted separately."
      },
      {
        "q": "Which model do you recommend for two weeks with the family?",
        "a": "A premium 6-seater: the ECO Cross 4+2 with long-range lithium (85–95 km per charge) is the most comfortable option for a family that will use the cart every day. If you're up to 4 people, the ECO Cross 4 or the Zycar 4."
      }
    ],
    "locale": "en"
  },
  {
    "published": "2026-10-17",
    "updated": "2026-10-17",
    "slug": "temporada-alta-punta-cana-2027",
    "pairSlug": "high-season-punta-cana-2027",
    "title": "Temporada alta en Punta Cana: Navidad, Año Nuevo y Semana Santa 2027 en golf cart",
    "metaTitle": "Temporada alta 2027: golf cart Punta Cana",
    "metaDescription": "Fechas, tarifas por modelo y condiciones de BOLT en temporada alta: Navidad, Año Nuevo y Semana Santa 2027. Mínimo 5 días y entrega incluida desde 5 días.",
    "excerpt": "Qué cambia en temporada alta: fechas, tarifas por modelo, mínimo de 5 días y la política de anticipo. Y por qué Semana Santa 2027 y enero–marzo son la mejor ventana para rodar.",
    "readMinutes": 5,
    "sections": [
      {
        "heading": "Qué fechas cuentan como temporada alta",
        "paragraphs": [
          "En BOLT la temporada alta tiene fechas exactas y públicas: del 20 de diciembre al 6 de enero, y Semana Santa, que en 2027 cae del jueves 25 al domingo 28 de marzo. Fuera de esas ventanas, el resto del año es temporada regular, con las tarifas y condiciones de siempre.",
          "La regla es por noche, no por reserva: solo las noches que caen dentro de esas fechas se cobran a la tarifa de temporada alta de cada modelo, más ITBIS 18%. Si tu estadía empieza el 15 de diciembre y termina el 23, las noches del 15 al 19 van a tarifa regular y las del 20 al 22 a tarifa de temporada alta. Así no pagas de más por los días que quedan fuera."
        ]
      },
      {
        "heading": "Tarifas de temporada alta por modelo",
        "paragraphs": [
          "Las tarifas de temporada alta son por día, en US$, con el ITBIS 18% aparte. Los 4 plazas van desde US$70/día y los 6 plazas desde US$95/día. Este es el detalle por modelo:",
          "El cargador, la orientación de uso en la entrega y el soporte por WhatsApp 24/7 en español e inglés van incluidos igual que el resto del año."
        ],
        "bullets": [
          "Club Car Precedent 2+2 (4 plazas): US$70/día.",
          "Club Car Tempo 2+2 y ECO Plus 2+2 (4 plazas): US$75/día.",
          "ECO Cross 4 y Zycar 4 (4 plazas, asientos hacia adelante): US$90/día.",
          "Club Car Precedent Limo 4+2 (6 plazas): US$95/día.",
          "ECO Plus 4+2 y ECO Sport 4+2 (6 plazas): US$105/día.",
          "ECO Cross 4+2 (6 plazas, litio de largo alcance): US$110/día.",
          "ECO Track 4+2 y Zycar 4+2 (6 plazas): US$125/día."
        ]
      },
      {
        "heading": "Condiciones que cambian en temporada alta",
        "paragraphs": [
          "Tres cosas cambian en esas fechas, y conviene tenerlas claras antes de reservar. Primero, la renta mínima: 5 días en temporada alta, frente a 2 días el resto del año. Segundo, el anticipo: el depósito del 50% con el que confirmas no es reembolsable en esas fechas; si avisas con 30 días o más de anticipación, queda como crédito a tu favor, válido por 12 meses para una próxima renta. Tercero, la renta es continua: se cuenta de corrido desde la entrega hasta la recogida, sin pausas en medio.",
          "Fuera de temporada alta las condiciones son las de siempre: renta mínima de 2 días y un cambio de fecha gratis avisando con 48 horas de anticipación. El depósito de garantía de US$200 es igual todo el año, y se devuelve al recibir el carrito en buen estado."
        ],
        "bullets": [
          "Renta mínima: 5 días en temporada alta (2 el resto del año).",
          "Anticipo del 50%: no reembolsable en esas fechas; con 30 días o más de aviso queda como crédito válido por 12 meses.",
          "Renta continua, sin pausas, desde la entrega hasta la recogida.",
          "Fuera de esas fechas: un cambio de fecha gratis con 48 horas de aviso."
        ]
      },
      {
        "heading": "Transporte: el mínimo de 5 noches ya incluye la entrega",
        "paragraphs": [
          "Aquí hay una buena noticia que a veces pasa desapercibida. El transporte (entrega + recogida, ida y vuelta) cuesta US$60 por viaje de tráiler más ITBIS, pero es gratis en reservas de 5 días o más en Puntacana Resort & Club y Cap Cana, y de 10 días o más en Bávaro. Como la renta mínima de temporada alta es de 5 días, toda reserva de temporada alta en Puntacana Resort & Club o Cap Cana lleva la entrega y la recogida en la villa sin costo. En Bávaro, nuestra base, la entrega es gratis a partir de 10 días."
        ]
      },
      {
        "heading": "Navidad y Año Nuevo: cupo muy limitado",
        "paragraphs": [
          "Entre el 20 de diciembre y el 3 de enero el cupo es muy limitado y los 6 plazas son los primeros en agotarse. Para esas fechas no prometemos nada que no podamos cumplir: consulta disponibilidad por WhatsApp y te decimos con honestidad qué hay para tus fechas. Si hay carrito, lo confirmamos el mismo día; si no lo hay, te lo decimos igual de rápido y, si te sirve, te proponemos fechas de enero con toda la flota disponible."
        ]
      },
      {
        "heading": "Semana Santa 2027 y enero–marzo: la ventana que recomendamos",
        "paragraphs": [
          "Si tienes flexibilidad, nuestra recomendación es clara: del 7 de enero al 24 de marzo, y la propia Semana Santa del 25 al 28 de marzo de 2027. Es la época más tranquila y soleada del año en Punta Cana: días despejados, poca lluvia, temperatura perfecta para rodar en golf cart y, sobre todo, la mejor disponibilidad de modelos. En enero, febrero y marzo encuentras el 6 plazas que quieres, en la fecha que quieres, a tarifa regular. En Semana Santa aplican las tarifas y el mínimo de 5 días de temporada alta, pero la disponibilidad sigue siendo mucho más amplia que en diciembre.",
          "Para pedir disponibilidad, escríbenos por WhatsApp al +1 829 202 7849 o desde boltgolfcars.com con tus fechas, tu zona (Puntacana Resort & Club, Cap Cana o Bávaro) y cuántas personas viajan. Una persona del equipo revisa la flota y te responde el mismo día con los modelos disponibles y el total claro: tarifa por noche según la temporada, transporte e ITBIS. Confirmas con el depósito del 50% y listo. Your ride in paradise."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Qué pasa si mi estadía cae solo en parte en temporada alta?",
        "a": "Solo las noches dentro del 20 de diciembre al 6 de enero o de Semana Santa (25 al 28 de marzo de 2027) se cobran a tarifa de temporada alta; el resto de las noches van a tarifa regular. Todo más ITBIS 18%."
      },
      {
        "q": "¿Puedo cancelar o cambiar una reserva de Navidad o Año Nuevo?",
        "a": "En temporada alta el anticipo del 50% no es reembolsable. Si avisas con 30 días o más de anticipación, queda como crédito a tu favor válido por 12 meses. Fuera de esas fechas tienes un cambio de fecha gratis con 48 horas de aviso."
      },
      {
        "q": "¿Cuál es la renta mínima en Semana Santa 2027?",
        "a": "5 días, igual que en Navidad y Año Nuevo. Las noches del 25 al 28 de marzo de 2027 van a tarifa de temporada alta y el resto a tarifa regular. El resto del año la renta mínima es de 2 días."
      },
      {
        "q": "¿El transporte es gratis en temporada alta?",
        "a": "El transporte es gratis en reservas de 5 días o más en Puntacana Resort & Club y Cap Cana, y de 10 días o más en Bávaro. Como el mínimo de temporada alta es de 5 días, en Puntacana Resort & Club y Cap Cana la entrega y la recogida van incluidas; en reservas más cortas fuera de temporada son US$60 por viaje de tráiler más ITBIS."
      }
    ],
    "locale": "es"
  },
  {
    "published": "2026-10-17",
    "updated": "2026-10-17",
    "slug": "high-season-punta-cana-2027",
    "pairSlug": "temporada-alta-punta-cana-2027",
    "title": "High season in Punta Cana: Christmas, New Year and Holy Week 2027 by golf cart",
    "metaTitle": "Golf cart in high season: Punta Cana 2027",
    "metaDescription": "BOLT's dates, per-model rates and terms for high season: Christmas, New Year and Holy Week 2027. 5-day minimum and delivery included from 5 days.",
    "excerpt": "What changes in high season: dates, per-model rates, 5-day minimum and the deposit policy. And why Holy Week 2027 and January–March are the best window to ride.",
    "readMinutes": 5,
    "sections": [
      {
        "heading": "Which dates count as high season",
        "paragraphs": [
          "At BOLT, high season has exact, public dates: December 20 to January 6, and Holy Week, which in 2027 falls from Thursday March 25 to Sunday March 28. Outside those windows, the rest of the year is regular season, with the usual rates and terms.",
          "The rule is per night, not per booking: only the nights that fall within those dates are charged at each model's high-season rate, plus 18% tax. If your stay starts on December 15 and ends on the 23rd, the nights of the 15th to the 19th go at the regular rate and those of the 20th to the 22nd at the high-season rate. That way you don't overpay for the days that fall outside."
        ]
      },
      {
        "heading": "High-season rates by model",
        "paragraphs": [
          "High-season rates are per day, in US$, with 18% tax on top. 4-seaters go from US$70/day and 6-seaters from US$95/day. Here is the detail by model:",
          "The charger, the usage briefing at delivery and 24/7 WhatsApp support in English and Spanish are included just like the rest of the year."
        ],
        "bullets": [
          "Club Car Precedent 2+2 (4 seats): US$70/day.",
          "Club Car Tempo 2+2 and ECO Plus 2+2 (4 seats): US$75/day.",
          "ECO Cross 4 and Zycar 4 (4 seats, forward-facing seats): US$90/day.",
          "Club Car Precedent Limo 4+2 (6 seats): US$95/day.",
          "ECO Plus 4+2 and ECO Sport 4+2 (6 seats): US$105/day.",
          "ECO Cross 4+2 (6 seats, long-range lithium): US$110/day.",
          "ECO Track 4+2 and Zycar 4+2 (6 seats): US$125/day."
        ]
      },
      {
        "heading": "Terms that change in high season",
        "paragraphs": [
          "Three things change on those dates, and it's worth having them clear before booking. First, the minimum rental: 5 days in high season, against 2 days the rest of the year. Second, the advance: the 50% deposit you confirm with is non-refundable on those dates; if you give 30 days' notice or more, it is kept as credit in your favour, valid for 12 months towards a future rental. Third, the rental is continuous: it runs straight through from delivery to pickup, with no pauses in between.",
          "Outside high season the terms are the usual ones: 2-day minimum rental and one free date change with 48 hours' notice. The US$200 damage deposit is the same all year round, and it's returned when the cart comes back in good condition."
        ],
        "bullets": [
          "Minimum rental: 5 days in high season (2 the rest of the year).",
          "50% advance: non-refundable on those dates; with 30 days' notice or more it is kept as credit valid for 12 months.",
          "Continuous rental, no pauses, from delivery to pickup.",
          "Outside those dates: one free date change with 48 hours' notice."
        ]
      },
      {
        "heading": "Transport: the 5-night minimum already includes delivery",
        "paragraphs": [
          "Here's some good news that sometimes goes unnoticed. Transport (delivery + pickup, round trip) is US$60 per trailer trip plus tax, but it's free on bookings of 5 days or more in Puntacana Resort & Club and Cap Cana, and of 10 days or more in Bávaro. Since the high-season minimum rental is 5 days, every high-season booking in Puntacana Resort & Club or Cap Cana comes with delivery and pickup at the villa at no cost. In Bávaro, our home base, delivery is free from 10 days."
        ]
      },
      {
        "heading": "Christmas and New Year: very limited availability",
        "paragraphs": [
          "Between December 20 and January 3, availability is very limited and the 6-seaters are the first to sell out. For those dates we don't promise anything we can't deliver: ask about availability on WhatsApp and we'll tell you honestly what there is for your dates. If there's a cart, we confirm it the same day; if there isn't, we tell you just as quickly and, if it helps, we propose January dates with the whole fleet available."
        ]
      },
      {
        "heading": "Holy Week 2027 and January–March: the window we recommend",
        "paragraphs": [
          "If you have flexibility, our recommendation is clear: from January 7 to March 24, and Holy Week itself from March 25 to 28, 2027. It's the calmest, sunniest time of year in Punta Cana: clear days, little rain, perfect temperature for riding a golf cart and, above all, the best availability of models. In January, February and March you find the 6-seater you want, on the date you want, at the regular rate. In Holy Week the high-season rates and 5-day minimum apply, but availability is still far wider than in December.",
          "To request availability, message us on WhatsApp at +1 829 202 7849 or from boltgolfcars.com with your dates, your area (Puntacana Resort & Club, Cap Cana or Bávaro) and how many people are travelling. A person on the team checks the fleet and replies the same day with the available models and the clear total: rate per night by season, transport and tax. You confirm with the 50% deposit and that's it. Your ride in paradise."
        ]
      }
    ],
    "faq": [
      {
        "q": "What if only part of my stay falls in high season?",
        "a": "Only the nights within December 20 to January 6 or Holy Week (March 25 to 28, 2027) are charged at the high-season rate; the remaining nights go at the regular rate. All plus 18% tax."
      },
      {
        "q": "Can I cancel or change a Christmas or New Year booking?",
        "a": "In high season the 50% advance is non-refundable. If you give 30 days' notice or more, it is kept as credit in your favour valid for 12 months. Outside those dates you have one free date change with 48 hours' notice."
      },
      {
        "q": "What is the minimum rental in Holy Week 2027?",
        "a": "5 days, the same as at Christmas and New Year. The nights of March 25 to 28, 2027 go at the high-season rate and the rest at the regular rate. The rest of the year the minimum rental is 2 days."
      },
      {
        "q": "Is transport free in high season?",
        "a": "Transport is free on bookings of 5 days or more in Puntacana Resort & Club and Cap Cana, and of 10 days or more in Bávaro. Since the high-season minimum is 5 days, in Puntacana Resort & Club and Cap Cana delivery and pickup are included; on shorter bookings outside the season it's US$60 per trailer trip plus tax."
      }
    ],
    "locale": "en"
  }
];

/** Artículos de un idioma, en el orden definido arriba. */
export function articlesByLocale(locale: Locale): BlogArticle[] {
  return ARTICLES.filter((a) => a.locale === locale);
}

/** Mapa bidireccional slug ↔ slug del par en el otro idioma (switcher + hreflang
    del cliente). Fuente única: el propio ARTICLES. */
export const BLOG_SLUG_PAIRS: Record<string, string> = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a.pairSlug])
);

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
