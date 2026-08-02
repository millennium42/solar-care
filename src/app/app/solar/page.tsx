import { requireDemoSession } from "@/modules/auth";
import { SolarOperationsWorkspace } from "@/modules/solar/components/solar-operations-workspace";

export default async function SolarPage() {
  const session = await requireDemoSession();

  return <SolarOperationsWorkspace user={session} />;
}
