import type { Locale } from "@/lib/i18n";

/** Artículos del blog (ES) — redactados y auditados contra los hechos de marca (jul/2026). */
export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogArticle {
  slug: string;
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
    "updated": "2026-07-06",
    "slug": "golf-cart-puntacana-resort-club",
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
          "En BOLT, Puntacana Resort & Club es nuestra base principal de clientes, así que conocemos bien cómo se vive dentro del complejo. También operamos en Cap Cana y mantenemos nuestra base de operaciones en Bávaro. Cuando reservas para tu villa, todo está pensado para que empieces a disfrutar desde el primer día. Your ride in paradise."
        ]
      },
      {
        "heading": "Cómo llega tu BOLT a la villa",
        "paragraphs": [
          "Una de las mayores comodidades es que no tienes que ir a buscar el carrito a ningún lado: nosotros te lo llevamos y lo recogemos en la villa. Antes de entregártelo te damos una orientación rápida de uso, para que salgas a rodar con confianza aunque nunca hayas manejado un golf cart.",
          "Cada renta con BOLT incluye lo esencial para que solo te ocupes de disfrutar:",
          "La entrega está incluida sin costo en rentas de 2 o más días. Si solo necesitas el carrito por 1 día, la entrega tiene un cargo de US$40 + ITBIS. Y si tu estadía es de 7 noches o más, manejamos tarifas semanales y mensuales con descuento; pregúntanos por tu caso. Un detalle que conviene saber: tu día de renta son 24 horas contadas desde la entrega, no el día de calendario, así que aprovechas el tiempo completo."
        ],
        "bullets": [
          "Entrega y recogida directamente en tu villa",
          "Cargador incluido para la carga nocturna",
          "Orientación de uso al momento de la entrega",
          "Seguro incluido",
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
          "4 plazas (2+2, hasta 360 kg): ideal para parejas o familias pequeñas. Desde US$50/día según el modelo.",
          "6 plazas (4+2, hasta 540 kg): la mejor opción para familias grandes o grupos de amigos. Desde US$65/día según el modelo — el ECO Cross premium, con batería de litio 150 Ah y asientos de lujo, va a US$85/día.",
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
          "Para pedir disponibilidad, escríbenos por WhatsApp al +1 809 839 8515 con las fechas de tu estadía, cuántos viajan y el nombre de tu villa o residencial dentro de Puntacana Resort & Club. Te ayudamos a elegir el modelo ideal y coordinamos la entrega. Your ride in paradise."
        ],
        "bullets": [
          "Depósito del 30% para asegurar tu reserva.",
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
        "a": "Está incluida sin costo en rentas de 2 o más días. Para rentas de 1 día, la entrega tiene un cargo de US$40 + ITBIS. En estadías de 7 noches o más manejamos tarifas semanales y mensuales con descuento; pregúntanos por tu caso."
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
    "updated": "2026-07-06",
    "slug": "golf-cart-cap-cana-guia",
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
          "BOLT renta golf carts premium en las tres zonas principales de Punta Cana: Puntacana Resort & Club (su base principal de clientes), Cap Cana y Bávaro, donde está la base de operaciones (Av. Barceló Km 3 1/2, Naves Montolio #17). En Cap Cana el servicio funciona con entrega directa: el equipo lleva el golf cart hasta tu villa, te da una orientación de uso y lo recoge en el mismo punto al final de la renta. No tienes que salir de la comunidad ni coordinar transporte adicional.",
          "La entrega y recogida en la villa están incluidas en rentas de 2 días o más; para rentas de 1 día tiene un costo de US$40 más ITBIS. Un detalle que muchos agradecen: el día de renta se cuenta como 24 horas desde la entrega, no como día calendario. Si recibes el carro a las 3 de la tarde, es tuyo hasta las 3 de la tarde del día siguiente."
        ]
      },
      {
        "heading": "Qué modelo elegir: familias, grupos y el ECO Cross premium",
        "paragraphs": [
          "La flota de BOLT tiene 11 modelos en 3 líneas — ECO (Cross, Plus, Sport, Track), Club Car (Precedent, Tempo, Limo) y Zycar — en dos formatos: 4 plazas (configuración 2+2, hasta 360 kg) y 6 plazas (4+2, hasta 540 kg). La regla práctica es simple: si viajan más de 4 personas, o son 4 adultos con niños y bolsos, ve directo al de 6 plazas. Dentro de las comunidades todos deben ir sentados, así que conviene contar los asientos antes de reservar, no después.",
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
          "6 plazas: desde US$65/día según el modelo (el ECO Cross premium, de litio 150 Ah con asientos de lujo, US$85/día).",
          "Rentas de 7 noches o más: tarifa semanal o mensual con descuento; pregunta al cotizar."
        ]
      },
      {
        "heading": "Qué incluye la renta y qué reglas aplican en las comunidades",
        "paragraphs": [
          "Toda renta incluye entrega y recogida en la villa, cargador, orientación de uso, seguro y soporte por WhatsApp 24/7 en español e inglés. No hay que comprar nada aparte ni buscar estación de carga: el tomacorriente de la villa es suficiente.",
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
          "Escribe por WhatsApp al +1 809 839 8515 con tus fechas, la comunidad o villa dentro de Cap Cana y cuántas personas viajan.",
          "Recibes las opciones de modelo disponibles y la cotización (tarifa más ITBIS 18%).",
          "Confirmas con un depósito del 30%; al entregar el carro se toma un depósito de garantía de US$200, reembolsable al devolverlo.",
          "Si cambian tus planes, puedes mover la fecha gratis avisando con 48 horas de antelación."
        ]
      },
      {
        "heading": "Un último consejo antes de reservar",
        "paragraphs": [
          "Como BOLT trabaja por solicitud de disponibilidad, conviene escribir apenas tengas fechas de viaje confirmadas, sobre todo si necesitas un modelo de 6 plazas o el ECO Cross premium. Si eres property manager, el mismo canal de WhatsApp te sirve para coordinar entregas para tus huéspedes y cotizar tarifas semanales con descuento. Your ride in paradise: escríbenos y te confirmamos qué hay disponible para tus fechas."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿La entrega del golf cart en mi villa de Cap Cana tiene costo?",
        "a": "En rentas de 2 días o más, la entrega y recogida en la villa están incluidas. Para rentas de 1 día tiene un costo de US$40 más ITBIS. Recuerda que el día de renta son 24 horas desde la entrega, no un día calendario."
      },
      {
        "q": "¿Dónde y cómo cargo el golf cart?",
        "a": "En cualquier tomacorriente estándar de tu villa: el cargador va incluido en la renta. Una carga completa toma entre 8 y 10 horas, así que lo habitual es conectarlo de noche y amanecer con batería llena. El ECO Cross premium de litio 150 Ah rinde entre 85 y 95 km por carga."
      },
      {
        "q": "¿Qué necesito para reservar y qué pasa si cambian mis fechas?",
        "a": "Se solicita disponibilidad por WhatsApp (+1 809 839 8515), se confirma con un depósito del 30% y a la entrega se toma un depósito de garantía de US$200 reembolsable. El cambio de fecha es gratis si avisas con al menos 48 horas de antelación."
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
        "a": "En rentas de 2 o más días, la entrega y recogida en tu villa están incluidas. Para rentas de 1 día, la entrega tiene un costo de US$40 + ITBIS. Ten en cuenta que todos los precios son en US$ por día y el ITBIS del 18% se cobra aparte."
      },
      {
        "q": "¿Qué hago si el 6 plazas ya no está disponible en mis fechas?",
        "a": "Escríbenos igual por WhatsApp al +1 809 839 8515: toda reserva funciona por solicitud de disponibilidad y el equipo te confirma qué hay para tus fechas. Si el grupo es grande y no queda 6 plazas, una alternativa práctica es combinar dos carts de 4 plazas. Y si tus planes cambian, puedes mover la fecha gratis avisando con 48 horas."
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
          "Lo primero es entender la diferencia básica. El golf cart de 4 plazas tiene configuración 2+2: dos asientos mirando al frente y dos hacia atrás, con capacidad de carga de 360 kg. El de 6 plazas es 4+2: cuatro asientos al frente y dos atrás, con capacidad de 540 kg. Esos 180 kg de diferencia importan más de lo que parece, y aquí te explicamos por qué."
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
          "Golf cart de 6 plazas: desde US$65/día según el modelo (el ECO Cross premium, con batería de litio de 150 Ah y asientos de lujo, US$85/día).",
          "Entrega y recogida en tu villa incluidas en rentas de 2+ días; para rentas de 1 día, la entrega cuesta US$40 + ITBIS.",
          "Estadías de 7+ noches: pregunta por la tarifa semanal o mensual con descuento."
        ]
      },
      {
        "heading": "Temporada alta: los 6 plazas vuelan primero",
        "paragraphs": [
          "Hay un dato que conviene saber antes de dejar la decisión para última hora: en fechas festivas y semanas de temporada alta, los 6 plazas son los primeros en agotarse. Tiene lógica: las familias grandes y los grupos los buscan primero, y la flota de 6 plazas no es infinita.",
          "En BOLT toda reserva funciona por solicitud de disponibilidad —nunca por confirmación automática—, así que mientras antes escribas, más opciones tendrás. La reserva se asegura con un depósito del 30%, y si tus planes cambian, puedes mover la fecha gratis avisando con 48 horas de anticipación. Es decir: reservar temprano no te amarra, te protege."
        ]
      },
      {
        "heading": "¿Cuál te toca? Recomendaciones por escenario",
        "paragraphs": [
          "Cada grupo es distinto, pero después de entregar carts en Puntacana Resort & Club, Cap Cana y Bávaro, estos son los patrones que mejor funcionan:"
        ],
        "bullets": [
          "Pareja: 4 plazas Budget desde US$50/día. Los asientos traseros quedan libres para el cooler, las toallas y las compras. Es la opción más eficiente en precio y espacio.",
          "Familia de 4: puede funcionar el 4 plazas si viajan ligeros, pero si cargan cooler, juguetes de playa y compras a diario, el 6 plazas Budget (US$65/día) da un margen que se agradece cada día del viaje.",
          "Familia con abuelos (5–6 personas): 6 plazas sin dudarlo. Todos deben ir sentados, así que cinco personas ya descartan el 4 plazas. Los asientos delanteros amplios del 4+2 son más cómodos para los mayores.",
          "Grupo de amigos: 6 plazas Budget desde US$65/día. Si son más de seis, lo correcto es combinar dos carts; sobrecargar no está permitido y arruina la experiencia.",
          "Dato útil: un 4 plazas Estándar cuesta US$65/día, lo mismo que un 6 plazas Budget. Si dudas entre ambos, por el mismo precio puedes llevar dos asientos extra."
        ]
      },
      {
        "heading": "Asegura el tuyo antes de aterrizar",
        "paragraphs": [
          "Sea cual sea tu elección, la renta con BOLT incluye lo mismo: entrega y recogida en tu villa, cargador (una carga completa toma 8–10 horas en un tomacorriente estándar), orientación de uso, seguro y soporte por WhatsApp 24/7 en español e inglés. El día de renta cuenta como 24 horas desde la entrega, no como día calendario, así que aprovechas cada hora que pagas.",
          "Para reservar, escríbenos por WhatsApp al +1 809 839 8515 con tus fechas, tu zona (Puntacana Resort & Club, Cap Cana o Bávaro) y cuántas personas son. Te confirmamos disponibilidad, apartas con el 30% de depósito y dejas un depósito de garantía de US$200 reembolsable. Si te hospedas en Casa de Campo o La Romana, aplica solo para reservas de 7+ días con transporte cotizado aparte. Solicita tu disponibilidad hoy y llega a Punta Cana con el cart resuelto. Your ride in paradise."
        ]
      }
    ],
    "published": "2026-07-05",
    "updated": "2026-07-06",
    "slug": "golf-cart-4-o-6-plazas",
    "title": "Golf cart de 4 o 6 plazas en Punta Cana: cómo elegir el ideal para tu grupo",
    "locale": "es"
  },
  {
    "published": "2026-07-05",
    "updated": "2026-07-06",
    "slug": "bateria-plomo-o-litio-golf-cart",
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
        "heading": "Cuándo conviene el tier premium ECO Cross (US$85/día)",
        "paragraphs": [
          "El ECO Cross premium es nuestro 6 plazas con litio de 150 Ah: 85–95 km por carga y asientos de lujo, a US$85/día + ITBIS. Frente a un 6 plazas estándar de US$75/día, hablamos de US$10 diarios de diferencia. ¿Cuándo vale la pena? Cuando viajan en grupo completo (4+2), cuando tu día es de movimiento constante de la mañana a la noche, o cuando sencillamente no quieres calcular kilómetros en vacaciones: con casi el triple de autonomía que el plomo-ácido, la batería deja de ser un tema.",
          "Para comparar, nuestros 4 plazas arrancan en US$50/día (hasta US$65 según el modelo); los 6 plazas van desde US$65/día (hasta US$100 el ECO Track todoterreno), siempre + ITBIS 18%. Toda renta incluye entrega y recogida en tu villa (incluida desde 2+ días de renta), cargador, seguro y soporte por WhatsApp 24/7 en español e inglés. El día de renta son 24 horas desde la entrega, no día calendario.",
          "¿No estás seguro de cuál te conviene? Escríbenos por WhatsApp al +1 809 839 8515 y cuéntanos tu plan: cuántas personas son, dónde se hospedan y cuántos días. Trabajamos por solicitud de disponibilidad —nunca confirmación automática—, así que mientras antes nos escribas, mejor. Your ride in paradise."
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
        "a": "El tier premium cuesta US$85/día + ITBIS 18%. La entrega y recogida en tu villa está incluida en rentas de 2+ días; para rentas de 1 día tiene un costo de US$40 + ITBIS. Recuerda que el día de renta son 24 horas desde la entrega."
      }
    ],
    "locale": "es"
  }
];

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
