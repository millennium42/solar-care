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

const relativeDateFormatter = new Intl.RelativeTimeFormat("pt-BR", {
  numeric: "auto",
});

function byDueDate(left: { dueAt: string }, right: { dueAt: string }) {
  return new Date(left.dueAt).getTime() - new Date(right.dueAt).getTime();
}

function getAccountName(accountId: string) {
  return accounts.find((account) => account.id === accountId)?.name ?? "Conta";
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatDueLabel(dueAt: string) {
  const dueDate = new Date(dueAt);
  const today = new Date();
  const dueDay = Date.UTC(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate(),
  );
  const todayDay = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const days = Math.round((dueDay - todayDay) / 86400000);

  return relativeDateFormatter.format(days, "day");
}

export function getActivityDueLabel(activity: Activity) {
  return formatDueLabel(activity.dueAt);
}

export function validateCrmSeedIntegrity() {
  const accountIds = new Set(accounts.map((account) => account.id));
  const contactIds = new Set(contacts.map((contact) => contact.id));
  const opportunityIds = new Set(
    opportunities.map((opportunity) => opportunity.id),
  );
  const missingRelations = [
    ...contacts.map((contact) =>
      accountIds.has(contact.accountId)
        ? null
        : `${contact.id}: missing account ${contact.accountId}`,
    ),
    ...opportunities.flatMap((opportunity) => [
      accountIds.has(opportunity.accountId)
        ? null
        : `${opportunity.id}: missing account ${opportunity.accountId}`,
      contactIds.has(opportunity.contactId)
        ? null
        : `${opportunity.id}: missing contact ${opportunity.contactId}`,
    ]),
    ...activities.flatMap((activity) => [
      accountIds.has(activity.accountId)
        ? null
        : `${activity.id}: missing account ${activity.accountId}`,
      !activity.opportunityId || opportunityIds.has(activity.opportunityId)
        ? null
        : `${activity.id}: missing opportunity ${activity.opportunityId}`,
    ]),
  ].filter((message): message is string => Boolean(message));

  if (missingRelations.length > 0) {
    throw new Error(`Invalid CRM seeds: ${missingRelations.join("; ")}`);
  }
}

export function listAccounts(): Account[] {
  validateCrmSeedIntegrity();

  return [...accounts];
}

export function listContacts(): Contact[] {
  validateCrmSeedIntegrity();

  return [...contacts];
}

export function listOpportunities(): Opportunity[] {
  validateCrmSeedIntegrity();

  return [...opportunities];
}

export function listActivities(): Activity[] {
  validateCrmSeedIntegrity();

  return activities.map((activity) => ({
    ...activity,
    dueLabel: formatDueLabel(activity.dueAt),
  }));
}

export function getCrmDashboardSnapshot() {
  validateCrmSeedIntegrity();

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
      deadline: formatDueLabel(activity.dueAt),
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
