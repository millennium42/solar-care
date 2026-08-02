import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { listAccounts, listActivities, listOpportunities } from "@/modules/crm";
import {
  listDocumentChecklistItems,
  listSolarProjects,
} from "@/modules/solar";
import type {
  KnowledgeAnswer,
  KnowledgeResult,
  KnowledgeSource,
} from "@/modules/rag/types";

const docsRoot = path.join(process.cwd(), "docs", "obsidian");
const stopWords = new Set([
  "com",
  "como",
  "das",
  "dos",
  "para",
  "por",
  "que",
  "uma",
]);

function walkMarkdownFiles(root: string): string[] {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root).flatMap((entry) => {
    const fullPath = path.join(root, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return walkMarkdownFiles(fullPath);
    }

    return entry.endsWith(".md") ? [fullPath] : [];
  });
}

function titleFromMarkdown(filePath: string, content: string) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1];

  if (heading) {
    return heading;
  }

  return path.basename(filePath, ".md");
}

function tokenize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function excerptFor(content: string, tokens: string[]) {
  const normalizedContent = content.replace(/\s+/g, " ").trim();
  const lowerContent = normalizedContent.toLowerCase();
  const firstToken = tokens.find((token) => lowerContent.includes(token));
  const start = firstToken
    ? Math.max(lowerContent.indexOf(firstToken) - 80, 0)
    : 0;

  return normalizedContent.slice(start, start + 260);
}

function buildDocSources(): KnowledgeSource[] {
  return walkMarkdownFiles(docsRoot).map((filePath) => {
    const content = readFileSync(filePath, "utf8");
    const relativePath = path.relative(process.cwd(), filePath);

    return {
      content,
      id: relativePath,
      title: titleFromMarkdown(filePath, content),
      type: "doc",
    };
  });
}

function buildSeedSources(): KnowledgeSource[] {
  const accounts = listAccounts().map((account) => ({
    content: `${account.name} fica em ${account.city}, ${account.state}. Segmento ${account.segment}, conta mensal ${account.monthlyBill}, sistema estimado ${account.estimatedSystemKw} kWp.`,
    id: account.id,
    title: `Conta CRM: ${account.name}`,
    type: "crm" as const,
  }));
  const opportunities = listOpportunities().map((opportunity) => ({
    content: `${opportunity.title}. Estagio ${opportunity.stage}, origem ${opportunity.source}, valor ${opportunity.value}, probabilidade ${Math.round(opportunity.probability * 100)}%.`,
    id: opportunity.id,
    title: `Oportunidade: ${opportunity.title}`,
    type: "crm" as const,
  }));
  const activities = listActivities().map((activity) => ({
    content: `${activity.title}. Status ${activity.status}, prazo ${activity.dueLabel}. ${activity.notes}`,
    id: activity.id,
    title: `Atividade: ${activity.title}`,
    type: "crm" as const,
  }));
  const projects = listSolarProjects().map((project) => ({
    content: `${project.name}. Status ${project.status}, capacidade ${project.capacityKw} kWp, progresso ${project.progress}%, local ${project.location}.`,
    id: project.id,
    title: `Projeto solar: ${project.name}`,
    type: "solar" as const,
  }));
  const documents = listDocumentChecklistItems().map((documentItem) => ({
    content: `${documentItem.title}. Status ${documentItem.status}, responsavel ${documentItem.owner}, prazo ${documentItem.dueLabel}.`,
    id: documentItem.id,
    title: `Documento: ${documentItem.title}`,
    type: "solar" as const,
  }));

  return [...accounts, ...opportunities, ...activities, ...projects, ...documents];
}

export function buildKnowledgeSources(): KnowledgeSource[] {
  return [
    ...buildDocSources(),
    ...buildSeedSources(),
    {
      content:
        "O Solar Care MVP usa login demo, dashboard ERP, CRM, operacoes solares, calculadora, checklist e documentos pendentes sem servico externo.",
      id: "system-summary",
      title: "Resumo do sistema",
      type: "system",
    },
  ];
}

export function searchLocalKnowledge(query: string): KnowledgeAnswer {
  const trimmedQuery = query.trim();
  const tokens = tokenize(trimmedQuery);

  if (!trimmedQuery || tokens.length === 0) {
    return {
      answer:
        "Pergunte sobre CRM, projetos solares, documentos, dashboard, login demo ou processo de vistoria.",
      query: trimmedQuery,
      results: [],
    };
  }

  const results = buildKnowledgeSources()
    .map((source): KnowledgeResult => {
      const sourceTokens = tokenize(`${source.title} ${source.content}`);
      const score = tokens.reduce(
        (sum, token) =>
          sum + sourceTokens.filter((sourceToken) => sourceToken === token).length,
        0,
      );

      return {
        ...source,
        excerpt: excerptFor(source.content, tokens),
        score,
      };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);

  if (results.length === 0) {
    return {
      answer:
        "Nao encontrei uma resposta direta no conhecimento local. Tente termos como CRM, vistoria, proposta, documentos ou dashboard.",
      query: trimmedQuery,
      results: [],
    };
  }

  return {
    answer: `Encontrei ${results.length} fonte(s) local(is) relevantes para "${trimmedQuery}".`,
    query: trimmedQuery,
    results,
  };
}
