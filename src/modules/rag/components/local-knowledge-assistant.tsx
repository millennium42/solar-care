import { BookOpenText, FileText, LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";

import { searchLocalKnowledge } from "@/modules/rag";
import { Button } from "@/modules/shared/ui/button";
import { Input } from "@/modules/shared/ui/input";

const modules = [
  ["Dashboard", "/app"],
  ["CRM", "/app/crm"],
  ["Projetos solares", "/app/solar"],
  ["Assistente", "/app/assistant"],
];

export function LocalKnowledgeAssistant({
  icon,
  query,
}: {
  icon: ReactNode;
  query: string;
}) {
  const answer = searchLocalKnowledge(query);

  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--line)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--sky-soft)] text-[color:var(--sky)]">
              {icon}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-normal text-[color:var(--field)]">
                Solar Care ERP
              </p>
              <h1 className="truncate text-2xl font-bold">
                Assistente local
              </h1>
            </div>
          </div>
          <Button asChild size="sm" variant="secondary">
            <a href="/demo-logout">
              <LogOut aria-hidden="true" />
              Sair
            </a>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[220px_1fr]">
        <nav className="rounded-lg border border-[color:var(--line)] bg-white p-3">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
            Modulos
          </p>
          <div className="grid gap-1">
            {modules.map(([moduleName, href]) => (
              <a
                className="rounded-md px-2 py-2 text-sm font-medium hover:bg-[color:var(--field-soft)]"
                href={href}
                key={moduleName}
              >
                {moduleName}
              </a>
            ))}
          </div>
        </nav>

        <div className="grid gap-6">
          <section className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpenText
                aria-hidden="true"
                className="size-5 text-[color:var(--field)]"
              />
              <div>
                <h2 className="text-lg font-semibold">Busca local do MVP</h2>
                <p className="text-sm text-[color:var(--muted)]">
                  Docs Obsidian e dados seedados, sem servico externo.
                </p>
              </div>
            </div>

            <form action="/app/assistant" className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Input
                defaultValue={query}
                name="q"
                placeholder="Ex.: documentos pendentes, vistoria, dashboard"
              />
              <Button type="submit" variant="primary">
                <Search aria-hidden="true" />
                Buscar
              </Button>
            </form>
          </section>

          <section className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--sky)]">
              Resposta
            </p>
            <p className="mt-2 text-base leading-7">{answer.answer}</p>
          </section>

          <section className="grid gap-3">
            {answer.results.map((result) => (
              <article
                className="rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-sm"
                key={result.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {result.title}
                    </p>
                    <p className="truncate text-xs text-[color:var(--muted)]">
                      {result.id}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-[color:var(--field-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--field)]">
                    {result.type}
                  </span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[color:var(--muted)]">
                  {result.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[color:var(--muted)]">
                  <FileText aria-hidden="true" className="size-4" />
                  Score local {result.score}
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
