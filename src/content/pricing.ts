/** Tarifas oficiales de renta — migradas de reservas.boltgolfcars.com/precios (confirmadas jun/2026).
    Siempre US$; el ITBIS 18% se muestra por fila, nunca oculto. */

export interface PriceTier {
  name: string;
  nameEn: string;
  config: string;
  usd: number;
  withItbis: string;
  tag?: string;
  tagEn?: string;
  note?: string;
  noteEn?: string;
}

export interface PriceGroup {
  group: string;
  groupEn: string;
  tiers: PriceTier[];
}

export const PRICE_GROUPS: PriceGroup[] = [
  {
    group: "Hasta 4 personas",
    groupEn: "Up to 4 people",
    tiers: [
      {
        name: "4 plazas · Budget",
        nameEn: "4 seats · Budget",
        config: "2+2 · hasta 4 personas",
        usd: 50,
        withItbis: "US$59.00",
        tag: "El más económico",
        tagEn: "Best value",
      },
      {
        name: "4 plazas · Estándar",
        nameEn: "4 seats · Standard",
        config: "2+2 · hasta 4 personas",
        usd: 65,
        withItbis: "US$76.70",
      },
    ],
  },
  {
    group: "Hasta 6 personas",
    groupEn: "Up to 6 people",
    tiers: [
      {
        name: "6 plazas · Budget",
        nameEn: "6 seats · Budget",
        config: "4+2 · hasta 6 personas",
        usd: 65,
        withItbis: "US$76.70",
      },
      {
        name: "6 plazas · Estándar",
        nameEn: "6 seats · Standard",
        config: "4+2 · hasta 6 personas",
        usd: 70,
        withItbis: "US$82.60",
      },
      {
        name: "6 plazas · Premium — ECO Cross",
        nameEn: "6 seats · Premium — ECO Cross",
        config: "4+2 · hasta 6 personas",
        usd: 85,
        withItbis: "US$100.30",
        note: "🔋 Litio · hasta 95 km · asientos de lujo",
        noteEn: "Lithium · up to 95 km · luxury seats",
      },
    ],
  },
];

export const DELIVERY_POLICY = {
  es: [
    { b: "2 días o más:", rest: " entrega y recogida incluidas sin costo." },
    { b: "1 día:", rest: " US$40 + ITBIS (US$47.20) por transporte." },
    { b: "7 noches o más:", rest: " pregunta por tarifa semanal y mensual con descuento." },
  ],
  en: "2+ days: delivery included free. 1 day: US$40 + tax (US$47.20). 7+ nights: ask about discounted weekly & monthly rates.",
};

export const PRICING_FOOTNOTE = {
  es: "Precios en US$ por día. No incluyen ITBIS; se agrega 18% (mostrado en cada modelo). Disponibilidad sujeta a flota.",
  en: "Prices in US$ per day. Tax (ITBIS 18%) not included; shown per model. Subject to fleet availability.",
};
