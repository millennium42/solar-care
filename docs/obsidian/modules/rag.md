# Modulo RAG

## Codigo

- Tipos: [../../../src/modules/rag/types.ts](../../../src/modules/rag/types.ts)
- Busca local: [../../../src/modules/rag/repositories/local-knowledge.ts](../../../src/modules/rag/repositories/local-knowledge.ts)
- Tela do assistente: [../../../src/modules/rag/components/local-knowledge-assistant.tsx](../../../src/modules/rag/components/local-knowledge-assistant.tsx)
- Rota protegida: [../../../src/app/app/assistant/page.tsx](../../../src/app/app/assistant/page.tsx)
- Barrel do modulo: [../../../src/modules/rag/index.ts](../../../src/modules/rag/index.ts)

## Responsabilidade

Oferecer uma busca local simples sobre:

- Markdown em `docs/obsidian`;
- contas, oportunidades e atividades CRM seedadas;
- projetos solares e documentos seedados;
- resumo do sistema.

## Decisao

O Commit 10 usa busca lexical com tokens e pontuacao simples. Nao usa vector DB, embeddings, LLM externo nem servico autenticado.

## Tela

A rota `/app/assistant` recebe `q` por query string e renderiza:

- formulario de busca;
- resposta curta;
- fontes locais ranqueadas com tipo, caminho/id e trecho.

## Proximos incrementos

- Melhorar ranking quando houver mais documentos.
- No futuro, trocar para embeddings locais ou Postgres/SQLite FTS sem quebrar o contrato `searchLocalKnowledge`.

## Guias relacionados

- [[../guides/user-demo-guide|Guia de usuario]]
- [[../guides/developer-guide|Guia dev]]
