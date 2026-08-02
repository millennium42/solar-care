import type {
  Equipment,
  InstallationMilestone,
  Proposal,
  SiteSurvey,
  SolarProject,
} from "@/modules/solar/types";

export const solarProjects: SolarProject[] = [
  {
    accountId: "acc-aurora",
    capacityKw: 18.4,
    expectedCommissioningDate: "2026-09-06",
    id: "sp-aurora",
    location: "Ribeirao Preto, SP",
    name: "Aurora - areas comuns",
    opportunityId: "opp-aurora-18kw",
    progress: 42,
    startDate: "2026-08-05",
    status: "projeto",
  },
  {
    accountId: "acc-padaria-central",
    capacityKw: 9.8,
    expectedCommissioningDate: "2026-08-29",
    id: "sp-padaria",
    location: "Sertaozinho, SP",
    name: "Padaria Central - refrigeracao",
    opportunityId: "opp-padaria-9kw",
    progress: 18,
    startDate: "2026-08-03",
    status: "vistoria",
  },
  {
    accountId: "acc-agro-sol",
    capacityKw: 48.2,
    expectedCommissioningDate: "2026-10-02",
    id: "sp-agro",
    location: "Barretos, SP",
    name: "Agro Sol - usina rural",
    opportunityId: "opp-agro-48kw",
    progress: 64,
    startDate: "2026-07-30",
    status: "instalacao",
  },
];

export const siteSurveys: SiteSurvey[] = [
  {
    id: "sv-aurora",
    notes: "Telhado de ceramica com area comum para inversores.",
    projectId: "sp-aurora",
    roofType: "Ceramico",
    scheduledAt: "2026-08-04T09:00:00-03:00",
    status: "concluida",
  },
  {
    id: "sv-padaria",
    notes: "Validar carga dos fornos e sombreamento da fachada oeste.",
    projectId: "sp-padaria",
    roofType: "Fibrocimento",
    scheduledAt: "2026-08-03T14:00:00-03:00",
    status: "agendada",
  },
  {
    id: "sv-agro",
    notes: "Solo compactado e acesso bom para equipe de montagem.",
    projectId: "sp-agro",
    roofType: "Solo",
    scheduledAt: "2026-07-28T08:00:00-03:00",
    status: "concluida",
  },
];

export const proposals: Proposal[] = [
  {
    id: "pr-aurora",
    monthlySavings: 8750,
    paybackMonths: 46,
    projectId: "sp-aurora",
    status: "enviada",
    validUntil: "2026-08-16",
    value: 146000,
  },
  {
    id: "pr-padaria",
    monthlySavings: 4280,
    paybackMonths: 38,
    projectId: "sp-padaria",
    status: "rascunho",
    validUntil: "2026-08-12",
    value: 81000,
  },
  {
    id: "pr-agro",
    monthlySavings: 22100,
    paybackMonths: 34,
    projectId: "sp-agro",
    status: "aprovada",
    validUntil: "2026-08-26",
    value: 368000,
  },
];

export const equipment: Equipment[] = [
  {
    category: "modulo",
    id: "eq-agro-module",
    manufacturer: "Canadian Solar",
    model: "CS6W 550 W",
    projectId: "sp-agro",
    quantity: 88,
    unit: "un",
  },
  {
    category: "inversor",
    id: "eq-agro-inverter",
    manufacturer: "Fronius",
    model: "Eco 27 kW",
    projectId: "sp-agro",
    quantity: 2,
    unit: "un",
  },
  {
    category: "modulo",
    id: "eq-aurora-module",
    manufacturer: "JA Solar",
    model: "JAM72S30 545 W",
    projectId: "sp-aurora",
    quantity: 34,
    unit: "un",
  },
  {
    category: "estrutura",
    id: "eq-padaria-structure",
    manufacturer: "SolarFix",
    model: "Fibrocimento standard",
    projectId: "sp-padaria",
    quantity: 1,
    unit: "kit",
  },
];

export const installationMilestones: InstallationMilestone[] = [
  {
    dueAt: "2026-08-06",
    id: "im-aurora-homologacao",
    owner: "Engenharia",
    projectId: "sp-aurora",
    status: "em-andamento",
    title: "Enviar projeto para concessionaria",
  },
  {
    dueAt: "2026-08-03",
    id: "im-padaria-vistoria",
    owner: "Campo",
    projectId: "sp-padaria",
    status: "pendente",
    title: "Executar vistoria tecnica",
  },
  {
    dueAt: "2026-08-08",
    id: "im-agro-montagem",
    owner: "Instalacao",
    projectId: "sp-agro",
    status: "em-andamento",
    title: "Montagem de estrutura e modulos",
  },
  {
    dueAt: "2026-08-12",
    id: "im-agro-comissionamento",
    owner: "Engenharia",
    projectId: "sp-agro",
    status: "pendente",
    title: "Comissionamento e testes",
  },
];

export const solarSeeds = {
  equipment,
  installationMilestones,
  proposals,
  siteSurveys,
  solarProjects,
};
