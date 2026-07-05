"use client";

import { useState } from "react";
import { LINE_NAMES, MODELS, type Model } from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { PRICING } from "@/content/site";

type Filter =
  | { kind: "all" }
  | { kind: "line"; line: Model["line"] }
  | { kind: "pax"; pax: 4 | 6 };

const FILTERS: { label: string; filter: Filter }[] = [
  { label: `Todos (${MODELS.length})`, filter: { kind: "all" } },
  ...(["eco", "clubcar", "zycar"] as const).map((line) => ({
    label: `${LINE_NAMES[line]} (${MODELS.filter((m) => m.line === line).length})`,
    filter: { kind: "line", line } as Filter,
  })),
  ...([4, 6] as const).map((pax) => ({
    label: `${pax} plazas (${MODELS.filter((m) => m.pax === pax).length})`,
    filter: { kind: "pax", pax } as Filter,
  })),
];

function applyFilter(models: Model[], f: Filter): Model[] {
  if (f.kind === "line") return models.filter((m) => m.line === f.line);
  if (f.kind === "pax") return models.filter((m) => m.pax === f.pax);
  return models;
}

export function FleetGrid() {
  const [active, setActive] = useState(0);
  const visible = applyFilter(MODELS, FILTERS[active].filter);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar modelos">
        {FILTERS.map((f, i) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              i === active
                ? "bg-ink text-volt"
                : "border border-line bg-white text-inktext hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => (
          <ModelCard key={m.id} model={m} />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-steel">{PRICING.itbisNote}</p>
    </section>
  );
}
