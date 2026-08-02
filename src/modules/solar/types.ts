export type SolarProjectStatus =
  | "vistoria"
  | "projeto"
  | "homologacao"
  | "instalacao"
  | "comissionamento"
  | "pos-venda";

export type ProposalStatus = "rascunho" | "enviada" | "aprovada";

export type SiteSurveyStatus = "agendada" | "concluida" | "pendente";

export type InstallationMilestoneStatus =
  | "pendente"
  | "em-andamento"
  | "bloqueado"
  | "concluido";

export type EquipmentCategory =
  | "modulo"
  | "inversor"
  | "estrutura"
  | "protecao";

export type SolarProject = {
  accountId: string;
  capacityKw: number;
  expectedCommissioningDate: string;
  id: string;
  location: string;
  name: string;
  opportunityId: string;
  progress: number;
  startDate: string;
  status: SolarProjectStatus;
};

export type SiteSurvey = {
  id: string;
  notes: string;
  projectId: string;
  roofType: string;
  scheduledAt: string;
  status: SiteSurveyStatus;
};

export type Proposal = {
  id: string;
  monthlySavings: number;
  paybackMonths: number;
  projectId: string;
  status: ProposalStatus;
  validUntil: string;
  value: number;
};

export type Equipment = {
  category: EquipmentCategory;
  id: string;
  manufacturer: string;
  model: string;
  projectId: string;
  quantity: number;
  unit: string;
};

export type InstallationMilestone = {
  dueAt: string;
  id: string;
  owner: string;
  projectId: string;
  status: InstallationMilestoneStatus;
  title: string;
};
