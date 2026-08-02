import {
  equipment,
  installationMilestones,
  proposals,
  siteSurveys,
  solarProjects,
} from "@/modules/solar/data/seed";
import type {
  Equipment,
  InstallationMilestone,
  Proposal,
  SiteSurvey,
  SolarProject,
} from "@/modules/solar/types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
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

export function getSolarOperationsSnapshot() {
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

  return {
    activeProjectsCount: activeProjects.length,
    approvedRevenue: formatCurrency(approvedRevenue),
    averageProgress: Math.round(
      activeProjects.reduce((sum, project) => sum + project.progress, 0) /
        Math.max(activeProjects.length, 1),
    ),
    blockedMilestones,
    monthlySavings: formatCurrency(monthlySavings),
    totalCapacityKw: activeProjects.reduce(
      (sum, project) => sum + project.capacityKw,
      0,
    ),
  };
}
