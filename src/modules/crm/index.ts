export {
  getCrmDashboardSnapshot,
  listAccounts,
  listActivities,
  listContacts,
  listOpportunities,
} from "@/modules/crm/repositories/crm-repository";
export type {
  Account,
  AccountSegment,
  AccountStatus,
  Activity,
  ActivityStatus,
  ActivityType,
  Contact,
  Opportunity,
  OpportunityStage,
} from "@/modules/crm/types";
