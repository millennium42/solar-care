import { DashboardPlaceholder } from "@/modules/analytics/components/dashboard-placeholder";
import { requireDemoSession } from "@/modules/auth";

export default async function AppHomePage() {
  const session = await requireDemoSession();

  return <DashboardPlaceholder user={session} />;
}
