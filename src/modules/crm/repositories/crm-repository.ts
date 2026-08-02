import {
  accounts,
  activities,
  contacts,
  opportunities,
} from "@/modules/crm/data/seed";
import type {
  Account,
  Activity,
  Contact,
  Opportunity,
  OpportunityStage,
} from "@/modules/crm/types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  style: "currency",
});

const stageLabels: Record<OpportunityStage, string> = {
  ganho: "Ganho",
  lead: "Lead",
  negociacao: "Negociacao",
  perdido: "Perdido",
  proposta: "Proposta",
  qualificacao: "Qualificacao",
};

function byDueDate(left: Activity, right: Activity) {
  return new Date(left.dueAt).getTime() - new Date(right.dueAt).getTime();
}

function getAccountName(accountId: string) {
  return accounts.find((account) => account.id === accountId)?.name ?? "Conta";
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function listAccounts(): Account[] {
  return [...accounts];
}

export function listContacts(): Contact[] {
  return [...contacts];
}

export function listOpportunities(): Opportunity[] {
  return [...opportunities];
}

export function listActivities(): Activity[] {
  return [...activities];
}

export function getCrmDashboardSnapshot() {
  const openOpportunities = opportunities.filter(
    (opportunity) =>
      opportunity.stage !== "ganho" && opportunity.stage !== "perdido",
  );
  const openActivities = activities.filter(
    (activity) => activity.status !== "concluida",
  );
  const expectedRevenue = openOpportunities.reduce(
    (sum, opportunity) => sum + opportunity.value * opportunity.probability,
    0,
  );
  const pipelineValue = openOpportunities.reduce(
    (sum, opportunity) => sum + opportunity.value,
    0,
  );
  const pipelineStages = openOpportunities.map((opportunity) => ({
    accountName: getAccountName(opportunity.accountId),
    id: opportunity.id,
    label: stageLabels[opportunity.stage],
    title: opportunity.title,
    value: formatCurrency(opportunity.value),
  }));
  const workQueue = [...openActivities].sort(byDueDate).slice(0, 4).map(
    (activity) => ({
      accountName: getAccountName(activity.accountId),
      action: activity.title,
      deadline: activity.dueLabel,
      id: activity.id,
    }),
  );

  return {
    accountsCount: accounts.length,
    expectedRevenue: formatCurrency(expectedRevenue),
    newLeadsCount: opportunities.filter(
      (opportunity) =>
        opportunity.stage === "lead" || opportunity.stage === "qualificacao",
    ).length,
    openActivitiesCount: openActivities.length,
    pipelineStages,
    pipelineValue: formatCurrency(pipelineValue),
    primaryContactsCount: contacts.filter((contact) => contact.primary).length,
    workQueue,
  };
}
