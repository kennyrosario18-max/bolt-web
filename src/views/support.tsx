import { CONTACT, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Manual de operación migrado del manual interactivo (reservas.boltgolfcars.com/catalogo). */
const T = {
  es: {
    kicker: "Soporte y manual",
    h1: "Operación, seguridad y carga de tu BOLT",
    intro:
      "Todo lo que necesitas para manejar tu golf cart con confianza: encendido, frenos, batería, normas y emergencias — en un solo lugar.",
    onTitle: "Encender el vehículo",
    on: [
      "Levanta el asiento y coloca el switch principal en RUN",
      "Coloca la palanca de marcha en NEUTRO",
      "Inserta la llave y gírala a la posición de encendido",
      "Verifica el indicador de batería antes de iniciar",
      "Selecciona F (avanzar) o R (reversa)",
      "Presiona el acelerador suavemente para iniciar",
    ],
    offTitle: "Apagar el vehículo",
    off: [
      "Detén completamente el golf cart",
      "Coloca el selector en NEUTRO o parqueo",
      "Activa el freno de estacionamiento",
      "Gira la llave a OFF y retírala",
      "Coloca el switch debajo del asiento en OFF",
    ],
    pedalsTitle: "Pedales y marchas",
    pedals: [
      { k: "GO", t: "Acelerador", d: "Siempre el de la derecha. Presiona de manera gradual; evita aceleraciones bruscas y reduce velocidad en curvas." },
      { k: "STOP", t: "Freno", d: "Siempre el de la izquierda. Frena suavemente y con anticipación; usa el freno de parqueo al estacionar." },
      { k: "F·N·R", t: "Selector de marcha", d: "F avanza, N punto muerto, R reversa (emite señal acústica). En ECO y Zycar: switch + llave + F/R; en Club Car: llave + F/R." },
    ],
    chargeTitle: "Carga de batería",
    chargeStepsTitle: "Pasos de carga",
    charge: [
      "Verifica que el vehículo esté completamente OFF",
      "Conecta el cargador primero al vehículo",
      "Luego conecta el cargador al tomacorriente",
      "Verifica que el indicador de carga esté activo",
      "No desconectes el cargador mientras esté cargando",
    ],
    chargeNotes: [
      "Carga completa: 8–10 horas — ideal durante la noche.",
      "Indicador amarillo = cargando · verde = completo.",
      "No mover el vehículo mientras carga. No dejar descargar la batería completamente.",
    ],
    rulesOkTitle: "Permitido",
    rulesOk: [
      "Conductores mayores de 18 años con licencia vigente",
      "Uso exclusivo dentro de residenciales, villas y resorts",
      "Todos los pasajeros sentados durante la marcha",
      "Respetar capacidad: 4 plazas → 360 kg · 6 plazas → 540 kg",
      "Reportar fallas o accidentes de inmediato",
      "Conducción defensiva y respeto a normas internas",
    ],
    rulesNoTitle: "Prohibido",
    rulesNo: [
      "Conducir bajo efectos de alcohol, drogas o medicación",
      "Conducción por menores de edad o sin licencia válida",
      "Circular en playa, arena, carreteras o zonas no autorizadas",
      "Sobrecargar el vehículo o llevar pasajeros de pie",
      "Conducción temeraria, acrobacias o uso comercial",
      "Conducir descalzo o con calzado inadecuado",
    ],
    speedTitle: "Velocidades máximas",
    speeds: [
      ["Modelos Club Car (Precedent, Tempo, Limo)", "20–31 km/h"],
      ["Modelos Zycar", "30–35 km/h"],
      ["Modelos ECO (Plus, Sport, Cross, Track)", "30–35 km/h"],
      ["Zona residencial", "MAX 25 km/h"],
    ],
    emergencyTitle: "En caso de accidente",
    emergency: ["Notifica inmediatamente", "No muevas el vehículo", "Espera instrucciones"],
    penaltiesTitle: "Penalidades de referencia",
    penalties: [
      ["Pegatina añadida o removida sin autorización", "US$50"],
      ["Daños de pintura (raspones, daño superficial)", "Desde US$150"],
      ["Pérdida de llave", "US$100"],
      ["Devolución con batería < 30%", "US$20"],
      ["Devolución con batería totalmente descargada", "US$80"],
      ["Mora en devolución / daños mayores", "Según tarifa"],
    ],
    supportTitle: "Contacto 24/7",
    supportBody: "Emergencias, dudas de uso o asistencia en ruta — un WhatsApp y respondemos.",
    waMsg: "Hola BOLT, necesito asistencia con un golf cart.",
    cta: "⚡ WhatsApp 24/7",
  },
  en: {
    kicker: "Support & manual",
    h1: "Operating, safety and charging your BOLT",
    intro:
      "Everything you need to drive your golf cart with confidence: start-up, brakes, battery, rules and emergencies — in one place.",
    onTitle: "Start the vehicle",
    on: [
      "Lift the seat and set the main switch to RUN",
      "Set the gear lever to NEUTRAL",
      "Insert the key and turn to the on position",
      "Check the battery indicator before driving off",
      "Select F (forward) or R (reverse)",
      "Gently press the accelerator to begin",
    ],
    offTitle: "Turn off the vehicle",
    off: [
      "Bring the cart to a complete stop",
      "Set the selector to NEUTRAL or parking",
      "Engage the parking brake",
      "Turn the key to OFF and remove it",
      "Set the switch under the seat to OFF",
    ],
    pedalsTitle: "Pedals & gears",
    pedals: [
      { k: "GO", t: "Accelerator", d: "Always on the right. Press gradually; avoid sudden acceleration and slow down in curves." },
      { k: "STOP", t: "Brake", d: "Always on the left. Brake smoothly and with anticipation; use the parking brake when stopped." },
      { k: "F·N·R", t: "Gear selector", d: "F forward, N neutral, R reverse (beeps when moving). ECO & Zycar: switch + key + F/R; Club Car: key + F/R." },
    ],
    chargeTitle: "Battery charging",
    chargeStepsTitle: "Charging steps",
    charge: [
      "Verify the vehicle is fully OFF",
      "Connect the charger to the vehicle first",
      "Then plug the charger into the power outlet",
      "Verify the charging indicator is on",
      "Do not disconnect the charger while charging",
    ],
    chargeNotes: [
      "Full charge: 8–10 hours — perfect overnight.",
      "Yellow indicator = charging · green = complete.",
      "Do not move the vehicle while charging. Do not fully drain the battery.",
    ],
    rulesOkTitle: "Allowed",
    rulesOk: [
      "Drivers 18+ with a valid license",
      "Use only inside residential communities, villas and resorts",
      "All passengers seated while moving",
      "Respect capacity: 4 seats → 360 kg · 6 seats → 540 kg",
      "Report failures or accidents immediately",
      "Defensive driving and respect for internal rules",
    ],
    rulesNoTitle: "Forbidden",
    rulesNo: [
      "Driving under alcohol, drugs or impairing medication",
      "Minors or unlicensed drivers",
      "Driving on the beach, sand, public roads or unauthorized areas",
      "Overloading or standing passengers",
      "Reckless driving, stunts or commercial use",
      "Driving barefoot or in unsuitable footwear",
    ],
    speedTitle: "Maximum speeds",
    speeds: [
      ["Club Car models (Precedent, Tempo, Limo)", "20–31 km/h"],
      ["Zycar models", "30–35 km/h"],
      ["ECO models (Plus, Sport, Cross, Track)", "30–35 km/h"],
      ["Residential areas", "MAX 25 km/h"],
    ],
    emergencyTitle: "In case of an accident",
    emergency: ["Notify immediately", "Do not move the vehicle", "Wait for instructions"],
    penaltiesTitle: "Penalty reference",
    penalties: [
      ["Unauthorized sticker added or removed", "US$50"],
      ["Paint damage (scratches, surface damage)", "From US$150"],
      ["Lost key", "US$100"],
      ["Return with battery < 30%", "US$20"],
      ["Return with battery fully drained", "US$80"],
      ["Late return / major damage", "Per rate card"],
    ],
    supportTitle: "24/7 contact",
    supportBody: "Emergencies, usage questions or roadside assistance — one WhatsApp away.",
    waMsg: "Hi BOLT, I need assistance with a golf cart.",
    cta: "⚡ WhatsApp 24/7",
  },
} as const;

function Steps({
  title,
  steps,
  as: Heading = "h3",
}: {
  title: string;
  steps: readonly string[];
  as?: "h2" | "h3";
}) {
  return (
    <div className="rounded-card border border-line p-7">
      <Heading className="font-display text-lg font-extrabold">{title}</Heading>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-sm text-inktext">
            <span className="font-display text-sm font-extrabold text-volt-dark">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SupportView({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Steps title={t.onTitle} steps={t.on} as="h2" />
          <Steps title={t.offTitle} steps={t.off} as="h2" />
        </div>

        <h2 className="mt-12 font-display text-2xl font-extrabold sm:text-3xl">{t.pedalsTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {t.pedals.map((p) => (
            <div key={p.k} className="rounded-card bg-cream p-6">
              <span className="inline-block rounded-full bg-ink px-3 py-1 font-display text-sm font-extrabold text-volt">
                {p.k}
              </span>
              <h3 className="mt-3 font-display text-base font-extrabold">{p.t}</h3>
              <p className="mt-1 text-sm text-inktext">{p.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-extrabold sm:text-3xl">{t.chargeTitle}</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <Steps title={t.chargeStepsTitle} steps={t.charge} />
          <div className="rounded-card bg-ink p-7 text-white">
            <p className="font-display text-4xl font-extrabold text-volt">8–10h</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {t.chargeNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-card border-2 border-ok/30 bg-white p-7">
            <h2 className="font-display text-xl font-extrabold text-ok">✓ {t.rulesOkTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm text-inktext">
              {t.rulesOk.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="font-bold text-ok" aria-hidden="true">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border-2 border-danger/30 bg-white p-7">
            <h2 className="font-display text-xl font-extrabold text-danger">✕ {t.rulesNoTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm text-inktext">
              {t.rulesNo.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="font-bold text-danger" aria-hidden="true">✕</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mt-12 font-display text-2xl font-extrabold sm:text-3xl">{t.speedTitle}</h2>
        <div className="mt-5 overflow-hidden rounded-card border border-line">
          {t.speeds.map(([label, val]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-4 last:border-b-0">
              <span className="text-sm text-inktext">{label}</span>
              <span className="font-display text-lg font-extrabold">{val}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-cream p-7">
            <h2 className="font-display text-xl font-extrabold">{t.emergencyTitle}</h2>
            <ol className="mt-4 space-y-3">
              {t.emergency.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm text-inktext">
                  <span className="font-display font-extrabold text-volt-dark">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-card border border-line p-7">
            <h2 className="font-display text-xl font-extrabold">{t.penaltiesTitle}</h2>
            <div className="mt-4">
              {t.penalties.map(([label, val]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-sm last:border-b-0">
                  <span className="text-inktext">{label}</span>
                  <span className="whitespace-nowrap font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-card bg-ink p-8 text-center text-white">
          <h2 className="font-display text-2xl font-extrabold text-white">{t.supportTitle}</h2>
          <p className="mt-2 text-white/70">{t.supportBody}</p>
          <a
            href={waLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            {t.cta} · {CONTACT.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
