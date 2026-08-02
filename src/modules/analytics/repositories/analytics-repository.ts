import {
  listActivities,
  listOpportunities,
  validateCrmSeedIntegrity,
} from "@/modules/crm";
import {
  getSolarOperationsSnapshot,
  listDocumentChecklistItems,
  listInstallationMilestones,
  listProposals,
  listSolarProjects,
  validateSolarSeedIntegrity,
} from "@/modules/solar";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function getErpDashboardSnapshot() {
  validateCrmSeedIntegrity();
  validateSolarSeedIntegrity();

  const opportunities = listOpportunities();
  const activities = listActivities();
  const solarSnapshot = getSolarOperationsSnapshot();
  const projects = listSolarProjects();
  const proposals = listProposals();
  const documents = listDocumentChecklistItems();
  const milestones = listInstallationMilestones();
  const openOpportunities = opportunities.filter(
    (opportunity) =>
      opportunity.stage !== "ganho" && opportunity.stage !== "perdido",
  );
  const pipelineValue = openOpportunities.reduce(
    (sum, opportunity) => sum + opportunity.value,
    0,
  );
  const expectedRevenue = openOpportunities.reduce(
    (sum, opportunity) => sum + opportunity.value * opportunity.probability,
    0,
  );
  const conversionRate =
    opportunities.length > 0 ? projects.length / opportunities.length : 0;
  const pendingDocuments = documents.filter(
    (documentItem) => documentItem.status === "pendente",
  );
  const openActivities = activities.filter(
    (activity) => activity.status !== "concluida",
  );
  const pendingMilestones = milestones.filter(
    (milestone) => milestone.status !== "concluido",
  );

  return {
    capacityKw: solarSnapshot.totalCapacityKw,
    conversionRate: `${Math.round(conversionRate * 100)}%`,
    expectedRevenue: formatCurrency(expectedRevenue),
    openActivities: openActivities.length,
    pendingDocuments: pendingDocuments.length,
    pendingMilestones: pendingMilestones.length,
    pipelineValue: formatCurrency(pipelineValue),
    projectsActive: projects.length,
    revenueApproved: solarSnapshot.approvedRevenue,
    savingsEstimated: solarSnapshot.monthlySavings,
    utilization: solarSnapshot.averageProgress,
    workQueues: {
      activities: openActivities.slice(0, 4),
      documents: pendingDocuments,
      milestones: pendingMilestones.slice(0, 4),
      proposals: proposals.slice(0, 3),
    },
  };
}
