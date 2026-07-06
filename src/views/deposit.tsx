import { CONTACT, waLink } from "@/content/site";
import { BoltIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

/** Datos de depósito — migrados 1:1 de reservas.boltgolfcars.com/deposito. */
const T = {
  es: {
    kicker: "Pago",
    h1: "Datos para tu depósito",
    lead: "Depósito de confirmación: 30% del total — confirma tu reserva.",
    usd: "Cuenta en dólares · USD",
    dop: "¿Prefieres pagar en pesos? · Cuenta en DOP",
    bank: "Banco",
    holder: "Beneficiario",
    account: "Número de cuenta",
    after: "Después de transferir, envía tu comprobante por WhatsApp para confirmar tu reserva.",
    keep: "Conserva tu comprobante de transferencia.",
    fraudTitle: "Protege tu pago",
    fraud:
      "Estos son los ÚNICOS datos de pago de BOLT y solo se publican en esta página. Nunca te pediremos depositar a otra cuenta por chat, correo ni llamada. Ante cualquier duda, verifica aquí en boltgolfcars.com/deposito y confirma únicamente al WhatsApp oficial +1 809 839 8515.",
    cta: "Enviar comprobante",
    waMsg: "Hola BOLT, aquí está mi comprobante de depósito.",
  },
  en: {
    kicker: "Payment",
    h1: "Deposit details",
    lead: "Confirmation deposit: 30% of the total — confirms your booking.",
    usd: "US dollar account · USD",
    dop: "Prefer to pay in DOP? · DOP account",
    bank: "Bank",
    holder: "Account name",
    account: "Account number",
    after: "After transferring, send your receipt via WhatsApp to confirm your booking.",
    keep: "Keep your transfer receipt.",
    fraudTitle: "Protect your payment",
    fraud:
      "These are BOLT's ONLY payment details and they are published exclusively on this page. We will never ask you to pay into a different account via chat, email or phone. If in doubt, verify here at boltgolfcars.com/deposit and confirm only through our official WhatsApp +1 809 839 8515.",
    cta: "Send receipt",
    waMsg: "Hi BOLT, here is my deposit receipt.",
  },
} as const;

const BANK = {
  name: "Banco López de Haro",
  holder: "KR Experts and Management, SRL",
  usd: "4010315659",
  dop: "4040035848",
  rnc: "132-22400-2",
};

export function DepositView({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-4 text-white/70">{t.lead}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { label: t.usd, number: BANK.usd, highlight: true },
            { label: t.dop, number: BANK.dop, highlight: false },
          ].map((acc) => (
            <div
              key={acc.number}
              className={`rounded-card p-7 ${acc.highlight ? "bg-ink text-white" : "border border-line bg-white"}`}
            >
              <p className={`text-xs font-bold uppercase tracking-wider ${acc.highlight ? "text-volt" : "text-volt-dark"}`}>
                {acc.label}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className={acc.highlight ? "text-white/50" : "text-steel"}>{t.bank}</dt>
                  <dd className="font-semibold">{BANK.name}</dd>
                </div>
                <div>
                  <dt className={acc.highlight ? "text-white/50" : "text-steel"}>{t.holder}</dt>
                  <dd className="font-semibold">{BANK.holder}</dd>
                </div>
                <div>
                  <dt className={acc.highlight ? "text-white/50" : "text-steel"}>{t.account}</dt>
                  <dd className="font-display text-2xl font-extrabold tracking-wide">{acc.number}</dd>
                </div>
                <div>
                  <dt className={acc.highlight ? "text-white/50" : "text-steel"}>RNC</dt>
                  <dd className="font-semibold">{BANK.rnc}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-card border-2 border-danger/30 bg-white p-7">
          <h2 className="font-display text-lg font-extrabold text-danger">⚠ {t.fraudTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-inktext">{t.fraud}</p>
        </div>

        <div className="mt-6 rounded-card bg-cream p-7">
          <p className="font-semibold text-ink">{t.after}</p>
          <p className="mt-1 text-sm text-steel">{t.keep}</p>
          <a
            href={waLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.cta} — WhatsApp {CONTACT.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
