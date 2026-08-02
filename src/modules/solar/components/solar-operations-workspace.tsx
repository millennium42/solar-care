import {
  FileText,
  Gauge,
  HardHat,
  LogOut,
  Zap,
} from "lucide-react";

import type { DemoUser } from "@/modules/auth";
import { listAccounts, listOpportunities } from "@/modules/crm";
import { Button } from "@/modules/shared/ui/button";
import {
  getSolarOperationsSnapshot,
  listEquipment,
  listInstallationMilestones,
  listProposals,
  listSiteSurveys,
  listSolarProjects,
} from "@/modules/solar";
import type {
  InstallationMilestoneStatus,
  SolarProjectStatus,
} from "@/modules/solar";

const projectStatusLabels: Record<SolarProjectStatus, string> = {
  comissionamento: "Comissionamento",
  homologacao: "Homologacao",
  instalacao: "Instalacao",
  "pos-venda": "Pos-venda",
  projeto: "Projeto",
  vistoria: "Vistoria",
};

const milestoneStatusLabels: Record<InstallationMilestoneStatus, string> = {
  bloqueado: "Bloqueado",
  concluido: "Concluido",
  "em-andamento": "Em andamento",
  pendente: "Pendente",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function SolarOperationsWorkspace({ user }: { user: DemoUser }) {
  const accounts = listAccounts();
  const opportunities = listOpportunities();
  const projects = listSolarProjects();
  const surveys = listSiteSurveys();
  const proposals = listProposals();
  const equipment = listEquipment();
  const milestones = listInstallationMilestones();
  const snapshot = getSolarOperationsSnapshot();
  const accountsById = new Map(accounts.map((account) => [account.id, account]));
  const opportunitiesById = new Map(
    opportunities.map((opportunity) => [opportunity.id, opportunity]),
  );

  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--line)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--solar-soft)] text-[#6c4a08]">
              <Zap aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-normal text-[color:var(--field)]">
                Solar Care ERP
              </p>
              <h1 className="truncate text-2xl font-bold">
                Operacoes solares
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
            {[
              ["Dashboard", "/app"],
              ["CRM", "/app/crm"],
              ["Projetos solares", "/app/solar"],
              ["Operacoes", "/app/solar"],
            ].map(([label, href]) => (
              <a
                className="rounded-md px-2 py-2 text-sm font-medium hover:bg-[color:var(--field-soft)]"
                href={href}
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-4">
            {[
              {
                Icon: HardHat,
                label: "Projetos ativos",
                value: String(snapshot.activeProjectsCount),
              },
              {
                Icon: Gauge,
                label: "Capacidade",
                value: `${snapshot.totalCapacityKw.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1,
                })} kWp`,
              },
              {
                Icon: FileText,
                label: "Receita aprovada",
                value: snapshot.approvedRevenue,
              },
              {
                Icon: Zap,
                label: "Economia mensal",
                value: snapshot.monthlySavings,
              },
            ].map(({ Icon, label, value }) => (
              <div
                className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm"
                key={label}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[color:var(--muted)]">
                    {label}
                  </p>
                  <Icon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-[color:var(--sky)]"
                  />
                </div>
                <p className="mt-3 truncate text-2xl font-bold">{value}</p>
              </div>
            ))}
          </section>

          <section>
            <div className="mb-3">
              <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                Projetos solares
              </p>
              <h2 className="text-xl font-bold">
                Oportunidades convertidas em operacao
              </h2>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {projects.map((project) => {
                const account = accountsById.get(project.accountId);
                const opportunity = opportunitiesById.get(project.opportunityId);
                const proposal = proposals.find(
                  (item) => item.projectId === project.id,
                );

                return (
                  <article
                    className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm"
                    key={project.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold">
                          {account?.name}
                        </p>
                        <p className="truncate text-xs text-[color:var(--muted)]">
                          {project.name}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-[color:var(--field-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--field)]">
                        {projectStatusLabels[project.status]}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-[color:var(--muted)]">kWp</p>
                        <p className="font-bold">
                          {project.capacityKw.toLocaleString("pt-BR", {
                            maximumFractionDigits: 1,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[color:var(--muted)]">
                          Progresso
                        </p>
                        <p className="font-bold">{project.progress}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-[color:var(--muted)]">
                          Proposta
                        </p>
                        <p className="font-bold">
                          {proposal ? formatCurrency(proposal.value) : "-"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[color:var(--surface-muted)]">
                      <div
                        className="h-full rounded-full bg-[color:var(--field)]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="mt-4 line-clamp-2 text-xs leading-5 text-[color:var(--muted)]">
                      {opportunity?.title}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-3">
                <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                  Vistorias e propostas
                </p>
                <h2 className="text-xl font-bold">Preparacao tecnica</h2>
              </div>
              <div className="grid gap-3">
                {surveys.map((survey) => {
                  const project = projects.find(
                    (item) => item.id === survey.projectId,
                  );
                  const proposal = proposals.find(
                    (item) => item.projectId === survey.projectId,
                  );
                  const account = project
                    ? accountsById.get(project.accountId)
                    : undefined;

                  return (
                    <article
                      className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm"
                      key={survey.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {account?.name}
                          </p>
                          <p className="truncate text-xs text-[color:var(--muted)]">
                            Telhado: {survey.roofType}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-md bg-[color:var(--sky-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--sky)]">
                          {survey.status}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">
                        {survey.notes}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                        <span className="font-semibold">
                          Payback {proposal?.paybackMonths} meses
                        </span>
                        <span className="text-[color:var(--muted)]">
                          {proposal ? formatCurrency(proposal.monthlySavings) : "-"}
                          /mes
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3">
                <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                  Instalacao
                </p>
                <h2 className="text-xl font-bold">Marcos operacionais</h2>
              </div>
              <div className="grid gap-3">
                {milestones.map((milestone) => {
                  const project = projects.find(
                    (item) => item.id === milestone.projectId,
                  );
                  const account = project
                    ? accountsById.get(project.accountId)
                    : undefined;

                  return (
                    <article
                      className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm"
                      key={milestone.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {milestone.title}
                          </p>
                          <p className="truncate text-xs text-[color:var(--muted)]">
                            {account?.name} - {milestone.owner}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-md bg-[color:var(--solar-soft)] px-2 py-1 text-xs font-semibold text-[#6c4a08]">
                          {milestoneStatusLabels[milestone.status]}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-[color:var(--muted)]">
                        Prazo {milestone.dueAt}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3">
              <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                Equipamentos
              </p>
              <h2 className="text-xl font-bold">Lista tecnica seedada</h2>
            </div>
            <div className="overflow-x-auto rounded-lg border border-[color:var(--line)] bg-white">
              <div className="grid min-w-[720px] grid-cols-[1fr_1fr_88px_1fr] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
                <span>Projeto</span>
                <span>Equipamento</span>
                <span className="text-right">Qtd.</span>
                <span>Modelo</span>
              </div>
              {equipment.map((item) => {
                const project = projects.find(
                  (projectItem) => projectItem.id === item.projectId,
                );

                return (
                  <div
                    className="grid min-w-[720px] grid-cols-[1fr_1fr_88px_1fr] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-sm last:border-b-0"
                    key={item.id}
                  >
                    <span className="truncate font-medium">{project?.name}</span>
                    <span className="truncate">{item.manufacturer}</span>
                    <span className="text-right font-semibold">
                      {item.quantity} {item.unit}
                    </span>
                    <span className="truncate text-[color:var(--muted)]">
                      {item.model}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
