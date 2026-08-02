import { Search } from "lucide-react";

import { requireDemoSession } from "@/modules/auth";
import { LocalKnowledgeAssistant } from "@/modules/rag/components/local-knowledge-assistant";

type AssistantPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function AssistantPage({
  searchParams,
}: AssistantPageProps) {
  await requireDemoSession();

  const params = await searchParams;

  return (
    <LocalKnowledgeAssistant
      icon={<Search aria-hidden="true" className="size-5" />}
      query={params?.q ?? ""}
    />
  );
}
