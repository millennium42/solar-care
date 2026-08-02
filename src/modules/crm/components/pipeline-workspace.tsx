import {
  Activity,
  Building2,
  CircleDollarSign,
  Columns3,
  LogOut,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import type { DemoUser } from "@/modules/auth";
import {
  listAccounts,
  listActivities,
  listContacts,
  listOpportunities,
  validateCrmSeedIntegrity,
} from "@/modules/crm";
import type { OpportunityStage } from "@/modules/crm";
import { Button } from "@/modules/shared/ui/button";

const stageColumns: Array<{ label: string; stage: OpportunityStage }> = [
  { label: "Lead", stage: "lead" },
  { label: "Qualificacao", stage: "qualificacao" },
  { label: "Proposta", stage: "proposta" },
  { label: "Negociacao", stage: "negociacao" },
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function CrmPipelineWorkspace({ user }: { user: DemoUser }) {
  validateCrmSeedIntegrity();

  const accounts = listAccounts();
  const contacts = listContacts();
  const opportunities = listOpportunities();
  const activities = listActivities();
  const contactsByAccount = new Map(
    contacts.map((contact) => [contact.accountId, contact]),
  );
  const accountsById = new Map(accounts.map((account) => [account.id, account]));
  const opportunitiesById = new Map(
    opportunities.map((opportunity) => [opportunity.id, opportunity]),
  );

  function requireAccount(accountId: string) {
    const account = accountsById.get(accountId);

    if (!account) {
      throw new Error(`Missing CRM account: ${accountId}`);
    }

    return account;
  }

  function requireOpportunity(opportunityId: string) {
    const opportunity = opportunitiesById.get(opportunityId);

    if (!opportunity) {
      throw new Error(`Missing CRM opportunity: ${opportunityId}`);
    }

    return opportunity;
  }

  function requirePrimaryContact(accountId: string) {
    const contact = contactsByAccount.get(accountId);

    if (!contact) {
      throw new Error(`Missing primary CRM contact for account: ${accountId}`);
    }

    return contact;
  }

  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--line)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--field-soft)] text-[color:var(--field)]">
              <Columns3 aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-normal text-[color:var(--field)]">
                Solar Care ERP
              </p>
              <h1 className="truncate text-2xl font-bold">CRM Workspace</h1>
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
                Icon: Building2,
                label: "Contas",
                value: String(accounts.length),
              },
              {
                Icon: UserRound,
                label: "Contatos",
                value: String(contacts.length),
              },
              {
                Icon: CircleDollarSign,
                label: "Oportunidades",
                value: formatCurrency(
                  opportunities.reduce(
                    (total, opportunity) => total + opportunity.value,
                    0,
                  ),
                ),
              },
              {
                Icon: Activity,
                label: "Atividades",
                value: String(
                  activities.filter(
                    (activity) => activity.status !== "concluida",
                  ).length,
                ),
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

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                    Funil comercial
                  </p>
                  <h2 className="text-xl font-bold">Pipeline de oportunidades</h2>
                </div>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="grid min-w-[920px] grid-cols-4 gap-3">
                  {stageColumns.map((column) => {
                    const columnOpportunities = opportunities.filter(
                      (opportunity) => opportunity.stage === column.stage,
                    );

                    return (
                      <div
                        className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-3"
                        key={column.stage}
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold">
                            {column.label}
                          </p>
                          <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-[color:var(--muted)]">
                            {columnOpportunities.length}
                          </span>
                        </div>
                        <div className="grid gap-3">
                          {columnOpportunities.map((opportunity) => {
                            const account = requireAccount(
                              opportunity.accountId,
                            );

                            return (
                              <article
                                className="rounded-lg border border-[color:var(--line)] bg-white p-3 shadow-sm"
                                key={opportunity.id}
                              >
                                <p className="truncate text-sm font-semibold">
                                  {account.name}
                                </p>
                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[color:var(--muted)]">
                                  {opportunity.title}
                                </p>
                                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                                  <span className="font-semibold">
                                    {formatCurrency(opportunity.value)}
                                  </span>
                                  <span className="text-[color:var(--muted)]">
                                    {Math.round(opportunity.probability * 100)}%
                                  </span>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3">
                <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                  Timeline
                </p>
                <h2 className="text-xl font-bold">Atividades recentes</h2>
              </div>
              <div className="grid gap-3">
                {activities.map((activity) => {
                  const account = requireAccount(activity.accountId);
                  const opportunity = activity.opportunityId
                    ? requireOpportunity(activity.opportunityId)
                    : undefined;

                  return (
                    <article
                      className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm"
                      key={activity.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {activity.title}
                          </p>
                          <p className="truncate text-xs text-[color:var(--muted)]">
                            {account.name}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-md bg-[color:var(--sky-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--sky)]">
                          {activity.dueLabel}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">
                        {activity.notes}
                      </p>
                      <p className="mt-3 truncate text-xs font-medium text-[color:var(--field)]">
                        {opportunity?.title}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-3">
                <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                  Contas
                </p>
                <h2 className="text-xl font-bold">Carteira comercial</h2>
              </div>
              <div className="overflow-x-auto rounded-lg border border-[color:var(--line)] bg-white">
                <div className="grid min-w-[720px] grid-cols-[1.2fr_1fr_92px_92px] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
                  <span>Conta</span>
                  <span>Contato</span>
                  <span className="text-right">Conta luz</span>
                  <span className="text-right">kWp</span>
                </div>
                {accounts.map((account) => {
                  const contact = requirePrimaryContact(account.id);

                  return (
                    <div
                      className="grid min-w-[720px] grid-cols-[1.2fr_1fr_92px_92px] gap-3 border-b border-[color:var(--line)] px-3 py-3 text-sm last:border-b-0"
                      key={account.id}
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{account.name}</p>
                        <p className="truncate text-xs text-[color:var(--muted)]">
                          {account.city}, {account.state} - {account.segment}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{contact.name}</p>
                        <p className="truncate text-xs text-[color:var(--muted)]">
                          {contact.role}
                        </p>
                      </div>
                      <span className="text-right font-medium">
                        {formatCurrency(account.monthlyBill)}
                      </span>
                      <span className="text-right font-semibold">
                        {account.estimatedSystemKw.toLocaleString("pt-BR", {
                          maximumFractionDigits: 1,
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3">
                <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
                  Contatos
                </p>
                <h2 className="text-xl font-bold">Pontos de contato</h2>
              </div>
              <div className="grid gap-3">
                {contacts.map((contact) => (
                  <article
                    className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm"
                    key={contact.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {contact.name}
                        </p>
                        <p className="truncate text-xs text-[color:var(--muted)]">
                          {requireAccount(contact.accountId).name}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-[color:var(--field-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--field)]">
                        {contact.role}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 text-xs text-[color:var(--muted)]">
                      <p className="flex items-center gap-2 truncate">
                        <Mail aria-hidden="true" className="size-4 shrink-0" />
                        {contact.email}
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <Phone aria-hidden="true" className="size-4 shrink-0" />
                        {contact.phone}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
