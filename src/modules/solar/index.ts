export {
  getSolarOperationsSnapshot,
  listEquipment,
  listInstallationMilestones,
  listProposals,
  listSiteSurveys,
  listSolarProjects,
} from "@/modules/solar/repositories/solar-repository";
export type {
  Equipment,
  EquipmentCategory,
  InstallationMilestone,
  InstallationMilestoneStatus,
  Proposal,
  ProposalStatus,
  SiteSurvey,
  SiteSurveyStatus,
  SolarProject,
  SolarProjectStatus,
} from "@/modules/solar/types";
