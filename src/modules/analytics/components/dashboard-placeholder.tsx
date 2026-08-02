import {
  BadgePercent,
  BatteryCharging,
  CircleDollarSign,
  Clock3,
  FileWarning,
  Gauge,
  LogOut,
  PanelsTopLeft,
  SunMedium,
  TrendingUp,
} from "lucide-react";

import { getErpDashboardSnapshot } from "@/modules/analytics";
import type { DemoUser } from "@/modules/auth";
import { Button } from "@/modules/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/ui/card";

const modules = [
  ["Dashboard", "/app"],
  ["CRM", "/app/crm"],
  ["Projetos solares", "/app/solar"],
  ["Operacoes", "/app/solar"],
  ["Documentos", "/app/solar#documentos"],
  ["Ferramentas", "/app/solar#ferramentas"],
  ["Assistente", "/app/assistant"],
];

export function ErpDashboard({ user }: { user: DemoUser }) {
  const dashboard = getErpDashboardSnapshot();
  const kpis = [
    {
      Icon: CircleDollarSign,
      hint: "Pipeline ponderado",
      label: "Receita prevista",
      value: dashboard.expectedRevenue,
    },
    {
      Icon: BadgePercent,
      hint: "Projetos solares / oportunidades",
      label: "Taxa de conversao",
      value: dashboard.conversionRate,
    },
    {
      Icon: SunMedium,
      hint: `${dashboard.capacityKw.toLocaleString("pt-BR", {
        maximumFractionDigits: 1,
      })} kWp ativos`,
      label: "Projetos ativos",
      value: String(dashboard.projectsActive),
    },
    {
      Icon: BatteryCharging,
      hint: "Economia estimada nos projetos",
      label: "Economia mensal",
      value: dashboard.savingsEstimated,
    },
    {
      Icon: FileWarning,
      hint: "Documentos dos projetos",
      label: "Pendencias",
      value: String(dashboard.pendingDocuments),
    },
    {
      Icon: Gauge,
      hint: "Progresso medio dos projetos",
      label: "Capacidade",
      value: `${dashboard.utilization}%`,
    },
  ];

  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--line)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--field-soft)] text-[color:var(--field)]">
              <PanelsTopLeft aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-normal text-[color:var(--field)]">
                Solar Care ERP
              </p>
              <h1 className="truncate text-2xl font-bold">
                Dashboard ERP Solar
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0 text-sm">
              <p className="truncate font-semibold">{user.name}</p>
              <p className="truncate text-[color:var(--muted)]">
                {user.email}
              </p>
            </div>
            <Button asChild size="sm" variant="secondary">
              <a href="/demo-logout">
                <LogOut aria-hidden="true" />
                Sair
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[220px_1fr]">
        <nav className="rounded-lg border border-[color:var(--line)] bg-white p-3">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
            Modulos
          </p>
          <div className="grid gap-1">
            {modules.map(([moduleName, href]) => (
              <a
                className="rounded-md px-2 py-2 text-sm font-medium hover:bg-[color:var(--field-soft)]"
                href={href}
                key={moduleName}
              >
                {moduleName}
              </a>
            ))}
          </div>
        </nav>

        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {kpis.map(({ Icon, ...kpi }) => (
              <Card key={kpi.label}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-[color:var(--muted)]">
                      {kpi.label}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-[color:var(--sky)]"
                    />
                  </div>
                  <CardTitle className="text-3xl">{kpi.value}</CardTitle>
                  <CardDescription>{kpi.hint}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Radar comercial</CardTitle>
                <CardDescription>
                  Receita, propostas e proximas atividades.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {dashboard.workQueues.proposals.map((proposal) => (
                    <div
                      className="rounded-lg border border-[color:var(--line)] p-3"
                      key={proposal.id}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">
                          Proposta {proposal.status}
                        </span>
                        <span className="text-sm font-bold">
                          {proposal.value.toLocaleString("pt-BR", {
                            currency: "BRL",
                            maximumFractionDigits: 0,
                            style: "currency",
                          })}
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[color:var(--surface-muted)]">
                        <div
                          className="h-full rounded-full bg-[color:var(--field)]"
                          style={{
                            width: `${Math.max(
                              Math.min(
                                Math.round(100 - proposal.paybackMonths),
                                100,
                              ),
                              0,
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-[color:var(--muted)]">
                        Payback {proposal.paybackMonths} meses
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacidade de instalacao</CardTitle>
                <CardDescription>
                  Marcos pendentes e progresso medio operacional.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">
                      Progresso medio
                    </span>
                    <span className="text-sm font-bold">
                      {dashboard.utilization}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-[color:var(--sky)]"
                      style={{ width: `${dashboard.utilization}%` }}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  {dashboard.workQueues.milestones.map((milestone) => (
                    <div
                      className="flex items-start gap-3 rounded-lg border border-[color:var(--line)] p-3"
                      key={milestone.id}
                    >
                      <Clock3
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-[color:var(--field)]"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {milestone.title}
                        </p>
                        <p className="truncate text-xs text-[color:var(--muted)]">
                          {milestone.owner} - {milestone.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Fila operacional</CardTitle>
                <CardDescription>
                  Atividades abertas do CRM e operacao solar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-[color:var(--line)]">
                  <div className="grid grid-cols-[minmax(0,1fr)_120px_80px] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
                    <span>Atividade</span>
                    <span>Status</span>
                    <span className="text-right">Prazo</span>
                  </div>
                  {dashboard.workQueues.activities.map((activity) => (
                    <div
                      className="grid grid-cols-[minmax(0,1fr)_120px_80px] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-sm last:border-b-0"
                      key={activity.id}
                    >
                      <span className="truncate font-medium">
                        {activity.title}
                      </span>
                      <span className="truncate text-[color:var(--muted)]">
                        {activity.status}
                      </span>
                      <span className="text-right font-semibold">
                        {activity.dueLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pendencias documentais</CardTitle>
                <CardDescription>
                  Itens que podem atrasar homologacao ou instalacao.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {dashboard.workQueues.documents.length > 0 ? (
                    dashboard.workQueues.documents.map((documentItem) => (
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
                      Nenhuma pendencia documental critica.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                  Saude da operacao
                </p>
                <h2 className="text-xl font-bold">
                  Receita aprovada: {dashboard.revenueApproved}
                </h2>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-[color:var(--field)]">
                <TrendingUp aria-hidden="true" className="size-5" />
                {dashboard.pipelineValue} em pipeline aberto
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
