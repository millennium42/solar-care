"use client";

import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  FileCheck2,
  ListChecks,
} from "lucide-react";
import { useMemo, useState } from "react";

import type {
  DocumentChecklistItem,
  SolarProject,
  SurveyChecklistItem,
} from "@/modules/solar";
import { Input } from "@/modules/shared/ui/input";

type InstallerProductivityToolsProps = {
  checklistItems: SurveyChecklistItem[];
  documentItems: DocumentChecklistItem[];
  projects: SolarProject[];
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function parseNumber(value: string) {
  const sanitized = value.replace(/[^\d,.-]/g, "");
  const normalized = sanitized.includes(",")
    ? sanitized.replace(/\./g, "").replace(",", ".")
    : sanitized;
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function InstallerProductivityTools({
  checklistItems,
  documentItems,
  projects,
}: InstallerProductivityToolsProps) {
  const [monthlyBill, setMonthlyBill] = useState("850");
  const [tariff, setTariff] = useState("0,92");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(checklistItems.map((item) => [item.id, item.checked])),
  );
  const projectNames = new Map(
    projects.map((project) => [project.id, project.name]),
  );
  const pendingDocuments = documentItems.filter(
    (documentItem) => documentItem.status === "pendente",
  );
  const sentDocuments = documentItems.filter(
    (documentItem) => documentItem.status !== "pendente",
  );
  const completedChecklistItems = checklistItems.filter(
    (item) => checkedItems[item.id],
  ).length;
  const estimate = useMemo(() => {
    const bill = parseNumber(monthlyBill);
    const energyTariff = Math.max(parseNumber(tariff), 0.1);
    const monthlyKwh = bill / energyTariff;
    const systemKw = monthlyKwh / 140;
    const panels = Math.max(Math.ceil((systemKw * 1000) / 550), 1);
    const investment = systemKw * 4200;
    const monthlySavings = bill * 0.82;
    const paybackMonths = investment / Math.max(monthlySavings, 1);

    return {
      investment,
      monthlySavings,
      panels,
      paybackMonths,
      systemKw,
    };
  }, [monthlyBill, tariff]);

  function toggleChecklistItem(itemId: string) {
    setCheckedItems((currentItems) => ({
      ...currentItems,
      [itemId]: !currentItems[itemId],
    }));
  }

  return (
    <section>
      <div className="mb-3">
        <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
          Ferramentas de instaladora
        </p>
        <h2 className="text-xl font-bold">
          Calculadora, vistoria e documentos pendentes
        </h2>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--solar-soft)] text-[#6c4a08]">
              <Calculator aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold">Calculadora solar</h3>
              <p className="text-sm text-[color:var(--muted)]">
                Estimativa rapida para triagem comercial.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="monthly-bill">
                Conta mensal
              </label>
              <Input
                id="monthly-bill"
                inputMode="decimal"
                onChange={(event) => setMonthlyBill(event.target.value)}
                value={monthlyBill}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="tariff">
                Tarifa por kWh
              </label>
              <Input
                id="tariff"
                inputMode="decimal"
                onChange={(event) => setTariff(event.target.value)}
                value={tariff}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              {
                label: "Sistema estimado",
                value: `${estimate.systemKw.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1,
                })} kWp`,
              },
              { label: "Modulos 550 W", value: String(estimate.panels) },
              {
                label: "Investimento",
                value: formatCurrency(estimate.investment),
              },
              {
                label: "Payback",
                value: `${Math.round(estimate.paybackMonths)} meses`,
              },
            ].map((item) => (
              <div
                className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-3"
                key={item.label}
              >
                <p className="text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--field-soft)] text-[color:var(--field)]">
                  <ListChecks aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold">
                    Checklist de vistoria
                  </h3>
                  <p className="text-sm text-[color:var(--muted)]">
                    {completedChecklistItems}/{checklistItems.length} itens
                  </p>
                </div>
              </div>
              <CheckCircle2
                aria-hidden="true"
                className="size-5 shrink-0 text-[color:var(--field)]"
              />
            </div>

            <div className="mt-4 grid gap-2">
              {checklistItems.map((item) => (
                <label
                  className="flex items-start gap-3 rounded-lg border border-[color:var(--line)] p-3 text-sm"
                  key={item.id}
                >
                  <input
                    checked={Boolean(checkedItems[item.id])}
                    className="mt-1 size-4"
                    onChange={() => toggleChecklistItem(item.id)}
                    type="checkbox"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold">{item.title}</span>
                    <span className="text-xs text-[color:var(--muted)]">
                      {item.group}
                      {item.required ? " - obrigatorio" : ""}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--sky-soft)] text-[color:var(--sky)]">
                <FileCheck2 aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold">Documentos pendentes</h3>
                <p className="text-sm text-[color:var(--muted)]">
                  {pendingDocuments.length} pendentes, {sentDocuments.length} em
                  andamento ou aprovados.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {pendingDocuments.length > 0 ? (
                pendingDocuments.map((documentItem) => (
                  <div
                    className="rounded-lg border border-[color:var(--line)] p-3"
                    key={documentItem.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {documentItem.title}
                        </p>
                        <p className="truncate text-xs text-[color:var(--muted)]">
                          {projectNames.get(documentItem.projectId)} -{" "}
                          {documentItem.owner}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-[color:var(--solar-soft)] px-2 py-1 text-xs font-semibold text-[#6c4a08]">
                        {documentItem.dueLabel}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-3 text-sm text-[color:var(--muted)]">
                  Nenhum documento pendente.
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-3 text-sm text-[color:var(--muted)]">
              <AlertTriangle
                aria-hidden="true"
                className="size-4 shrink-0 text-[color:var(--risk)]"
              />
              Sem bloqueios documentais criticos nos seeds atuais.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
