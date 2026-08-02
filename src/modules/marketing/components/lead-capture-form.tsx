"use client";

import { Send, SunMedium } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/modules/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/ui/card";
import { Input } from "@/modules/shared/ui/input";
import { Textarea } from "@/modules/shared/ui/textarea";

type LeadFormState = {
  name: string;
  phone: string;
  city: string;
  monthlyBill: string;
  notes: string;
};

const initialLead: LeadFormState = {
  name: "",
  phone: "",
  city: "",
  monthlyBill: "",
  notes: "",
};

function parseCurrency(value: string) {
  const sanitized = value.replace(/[^\d,.-]/g, "");
  const normalized = sanitized.includes(",")
    ? sanitized.replace(/\./g, "").replace(",", ".")
    : sanitized;
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export function LeadCaptureForm() {
  const [lead, setLead] = useState<LeadFormState>(initialLead);
  const [submittedLead, setSubmittedLead] = useState<LeadFormState | null>(
    null,
  );

  const estimatedMonthlySavings = useMemo(() => {
    const monthlyBill = parseCurrency(lead.monthlyBill);

    if (monthlyBill <= 0) {
      return "Informe a conta mensal";
    }

    return formatCurrency(monthlyBill * 0.82);
  }, [lead.monthlyBill]);

  function updateLead(field: keyof LeadFormState, value: string) {
    setLead((currentLead) => ({
      ...currentLead,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedLead(lead);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--solar-soft)] text-[#6c4a08]">
            <SunMedium aria-hidden="true" className="size-5" />
          </span>
          <div>
            <CardTitle>Solicitar diagnostico solar</CardTitle>
            <CardDescription>
              Nossa equipe retorna com estimativa e proximos passos.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="lead-name">
              Nome
            </label>
            <Input
              id="lead-name"
              name="name"
              onChange={(event) => updateLead("name", event.target.value)}
              placeholder="Cliente ou empresa"
              required
              value={lead.name}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="lead-phone">
                Telefone
              </label>
              <Input
                id="lead-phone"
                inputMode="tel"
                name="phone"
                onChange={(event) => updateLead("phone", event.target.value)}
                placeholder="(11) 90000-0000"
                required
                value={lead.phone}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="lead-city">
                Cidade
              </label>
              <Input
                id="lead-city"
                name="city"
                onChange={(event) => updateLead("city", event.target.value)}
                placeholder="Ribeirao Preto"
                required
                value={lead.city}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="lead-bill">
              Conta mensal de energia
            </label>
            <Input
              id="lead-bill"
              inputMode="decimal"
              name="monthlyBill"
              onChange={(event) =>
                updateLead("monthlyBill", event.target.value)
              }
              placeholder="850"
              required
              value={lead.monthlyBill}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="lead-notes">
              Observacoes
            </label>
            <Textarea
              id="lead-notes"
              name="notes"
              onChange={(event) => updateLead("notes", event.target.value)}
              placeholder="Tipo de imovel, horario para contato ou detalhes do telhado."
              value={lead.notes}
            />
          </div>

          <div className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-3">
            <p className="text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
              Economia mensal estimada
            </p>
            <p className="mt-1 text-xl font-bold">{estimatedMonthlySavings}</p>
          </div>

          <Button type="submit" variant="primary">
            Enviar solicitacao
            <Send aria-hidden="true" />
          </Button>
        </form>

        <div aria-live="polite" className="mt-4">
          {submittedLead ? (
            <p className="rounded-lg border border-[color:var(--field)] bg-[color:var(--field-soft)] p-3 text-sm font-medium text-[color:var(--foreground)]">
              Solicitacao recebida: {submittedLead.name} em{" "}
              {submittedLead.city}.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
