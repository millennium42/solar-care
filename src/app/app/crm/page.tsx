import { requireDemoSession } from "@/modules/auth";
import { CrmPipelineWorkspace } from "@/modules/crm/components/pipeline-workspace";

export default async function CrmPage() {
  const session = await requireDemoSession();

  return <CrmPipelineWorkspace user={session} />;
}
