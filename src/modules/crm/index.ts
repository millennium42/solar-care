export {
  getCrmDashboardSnapshot,
  getActivityDueLabel,
  listAccounts,
  listActivities,
  listContacts,
  listOpportunities,
  validateCrmSeedIntegrity,
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
