export type KnowledgeSourceType = "doc" | "crm" | "solar" | "system";

export type KnowledgeSource = {
  content: string;
  id: string;
  title: string;
  type: KnowledgeSourceType;
};

export type KnowledgeResult = KnowledgeSource & {
  excerpt: string;
  score: number;
};

export type KnowledgeAnswer = {
  answer: string;
  query: string;
  results: KnowledgeResult[];
};
