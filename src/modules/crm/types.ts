export type AccountSegment = "residencial" | "empresarial" | "rural" | "condominio";

export type AccountStatus = "lead" | "ativo" | "pos-venda";

export type OpportunityStage =
  | "lead"
  | "qualificacao"
  | "proposta"
  | "negociacao"
  | "ganho"
  | "perdido";

export type ActivityStatus = "aberta" | "agendada" | "concluida";

export type ActivityType =
  | "ligacao"
  | "email"
  | "vistoria"
  | "proposta"
  | "tarefa";

export type Account = {
  city: string;
  createdAt: string;
  estimatedSystemKw: number;
  id: string;
  monthlyBill: number;
  name: string;
  ownerId: string;
  segment: AccountSegment;
  state: string;
  status: AccountStatus;
};

export type Contact = {
  accountId: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  primary: boolean;
  role: string;
};

export type Opportunity = {
  accountId: string;
  contactId: string;
  createdAt: string;
  estimatedCloseDate: string;
  id: string;
  probability: number;
  source: string;
  stage: OpportunityStage;
  title: string;
  value: number;
};

export type Activity = {
  accountId: string;
  dueAt: string;
  dueLabel: string;
  id: string;
  notes: string;
  opportunityId?: string;
  status: ActivityStatus;
  title: string;
  type: ActivityType;
};
