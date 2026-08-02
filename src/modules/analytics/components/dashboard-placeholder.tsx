import {
  ChartNoAxesColumn,
  ClipboardList,
  Clock3,
  FolderKanban,
  LogOut,
  PanelsTopLeft,
  ShieldCheck,
  SunMedium,
  UsersRound,
} from "lucide-react";

import type { DemoUser } from "@/modules/auth";
import { Button } from "@/modules/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/ui/card";

const kpis = [
  {
    label: "Receita prevista",
    value: "R$ 684 mil",
    hint: "Pipeline comercial",
    Icon: ChartNoAxesColumn,
  },
  {
    label: "Projetos ativos",
    value: "18",
    hint: "Vistoria ate pos-venda",
    Icon: SunMedium,
  },
  {
    label: "Leads novos",
    value: "27",
    hint: "Triagem da landing",
    Icon: UsersRound,
  },
  {
    label: "Pendencias",
    value: "9",
    hint: "Documentos e instalacao",
    Icon: ClipboardList,
  },
];

const workQueue = [
  ["Condominio Aurora", "Agendar vistoria", "Hoje"],
  ["Padaria Central", "Enviar proposta revisada", "Amanha"],
  ["Agro Sol Noroeste", "Confirmar equipe tecnica", "2 dias"],
];

const modules = [
  "CRM",
  "Projetos solares",
  "Operacoes",
  "Documentos",
  "Ferramentas",
];

const verticalStatus = [
  {
    description: "Cookie HTTP-only",
    Icon: ShieldCheck,
    title: "Sessao demo",
  },
  {
    description: "Rota /app protegida",
    Icon: FolderKanban,
    title: "Area ERP",
  },
  {
    description: "Revisao rigorosa 01",
    Icon: Clock3,
    title: "Proximo commit",
  },
];

export function DashboardPlaceholder({ user }: { user: DemoUser }) {
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
                Dashboard Solar Care
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
            {modules.map((moduleName) => (
              <a
                className="rounded-md px-2 py-2 text-sm font-medium hover:bg-[color:var(--field-soft)]"
                href="/app"
                key={moduleName}
              >
                {moduleName}
              </a>
            ))}
          </div>
        </nav>

        <div className="grid gap-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

          <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Fila operacional</CardTitle>
                <CardDescription>
                  Primeiras tarefas seedadas para a demonstracao.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-[color:var(--line)]">
                  <div className="grid grid-cols-[minmax(0,1fr)_120px_80px] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
                    <span>Cliente</span>
                    <span>Acao</span>
                    <span className="text-right">Prazo</span>
                  </div>
                  {workQueue.map(([client, action, deadline]) => (
                    <div
                      className="grid grid-cols-[minmax(0,1fr)_120px_80px] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-sm last:border-b-0"
                      key={client}
                    >
                      <span className="truncate font-medium">{client}</span>
                      <span className="truncate text-[color:var(--muted)]">
                        {action}
                      </span>
                      <span className="text-right font-semibold">
                        {deadline}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado da fatia vertical</CardTitle>
                <CardDescription>
                  Login demo, guard de rota e dashboard base estao ativos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {verticalStatus.map(({ Icon, description, title }) => (
                    <div
                      className="flex items-center gap-3 rounded-lg border border-[color:var(--line)] p-3"
                      key={title}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-[color:var(--field)]"
                      />
                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-xs text-[color:var(--muted)]">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </section>
    </main>
  );
}
