import {
  documentChecklistItems,
  equipment,
  installationMilestones,
  proposals,
  siteSurveys,
  solarProjects,
  surveyChecklistItems,
} from "@/modules/solar/data/seed";
import { listAccounts, listOpportunities } from "@/modules/crm";
import type {
  DocumentChecklistItem,
  Equipment,
  InstallationMilestone,
  Proposal,
  SiteSurvey,
  SolarProject,
  SurveyChecklistItem,
} from "@/modules/solar/types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  style: "currency",
});

const relativeDateFormatter = new Intl.RelativeTimeFormat("pt-BR", {
  numeric: "auto",
});

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

export function validateSolarSeedIntegrity() {
  const accountIds = new Set(listAccounts().map((account) => account.id));
  const opportunityIds = new Set(
    listOpportunities().map((opportunity) => opportunity.id),
  );
  const projectIds = new Set(solarProjects.map((project) => project.id));
  const missingRelations = [
    ...solarProjects.flatMap((project) => [
      accountIds.has(project.accountId)
        ? null
        : `${project.id}: missing account ${project.accountId}`,
      opportunityIds.has(project.opportunityId)
        ? null
        : `${project.id}: missing opportunity ${project.opportunityId}`,
    ]),
    ...siteSurveys.map((survey) =>
      projectIds.has(survey.projectId)
        ? null
        : `${survey.id}: missing project ${survey.projectId}`,
    ),
    ...proposals.map((proposal) =>
      projectIds.has(proposal.projectId)
        ? null
        : `${proposal.id}: missing project ${proposal.projectId}`,
    ),
    ...equipment.map((item) =>
      projectIds.has(item.projectId)
        ? null
        : `${item.id}: missing project ${item.projectId}`,
    ),
    ...installationMilestones.map((milestone) =>
      projectIds.has(milestone.projectId)
        ? null
        : `${milestone.id}: missing project ${milestone.projectId}`,
    ),
    ...documentChecklistItems.map((item) =>
      projectIds.has(item.projectId)
        ? null
        : `${item.id}: missing project ${item.projectId}`,
    ),
  ].filter((message): message is string => Boolean(message));

  if (missingRelations.length > 0) {
    throw new Error(`Invalid solar seeds: ${missingRelations.join("; ")}`);
  }
}

export function listSolarProjects(): SolarProject[] {
  return [...solarProjects];
}

export function listSiteSurveys(): SiteSurvey[] {
  return [...siteSurveys];
}

export function listProposals(): Proposal[] {
  return [...proposals];
}

export function listEquipment(): Equipment[] {
  return [...equipment];
}

export function listInstallationMilestones(): InstallationMilestone[] {
  return [...installationMilestones];
}

export function listSurveyChecklistItems(): SurveyChecklistItem[] {
  return [...surveyChecklistItems];
}

export function listDocumentChecklistItems(): DocumentChecklistItem[] {
  validateSolarSeedIntegrity();

  return documentChecklistItems.map((item) => ({
    ...item,
    dueLabel: formatDueLabel(item.dueAt),
  }));
}

export function getSolarOperationsSnapshot() {
  validateSolarSeedIntegrity();
  const activeProjects = solarProjects.filter(
    (project) => project.status !== "pos-venda",
  );
  const approvedRevenue = proposals
    .filter((proposal) => proposal.status === "aprovada")
    .reduce((sum, proposal) => sum + proposal.value, 0);
  const monthlySavings = proposals.reduce(
    (sum, proposal) => sum + proposal.monthlySavings,
    0,
  );
  const blockedMilestones = installationMilestones.filter(
    (milestone) => milestone.status === "bloqueado",
  ).length;
  const pendingDocuments = documentChecklistItems.filter(
    (item) => item.status === "pendente",
  ).length;

  return {
    activeProjectsCount: activeProjects.length,
    approvedRevenue: formatCurrency(approvedRevenue),
    averageProgress: Math.round(
      activeProjects.reduce((sum, project) => sum + project.progress, 0) /
        Math.max(activeProjects.length, 1),
    ),
    blockedMilestones,
    monthlySavings: formatCurrency(monthlySavings),
    pendingDocuments,
    totalCapacityKw: activeProjects.reduce(
      (sum, project) => sum + project.capacityKw,
      0,
    ),
  };
}
