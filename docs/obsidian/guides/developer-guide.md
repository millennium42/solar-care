# Guia Dev - Solar Care MVP

## Arquitetura

O app usa Next.js App Router com fronteiras de dominio em `src/modules`:

- `marketing`: landing institucional e captura local;
- `auth`: login demo e guardas;
- `analytics`: dashboard ERP;
- `crm`: dados, funil, contas, contatos e atividades;
- `solar`: projetos, propostas, vistorias, equipamentos e ferramentas;
- `rag`: busca lexical local;
- `shared`: UI, config e utilitarios.

## Dados

Os dados atuais sao seeds in-memory:

- CRM: [../../../src/modules/crm/data/seed.ts](../../../src/modules/crm/data/seed.ts)
- Solar: [../../../src/modules/solar/data/seed.ts](../../../src/modules/solar/data/seed.ts)

Repositorios read-only ficam em:

- [../../../src/modules/crm/repositories/crm-repository.ts](../../../src/modules/crm/repositories/crm-repository.ts)
- [../../../src/modules/solar/repositories/solar-repository.ts](../../../src/modules/solar/repositories/solar-repository.ts)
- [../../../src/modules/analytics/repositories/analytics-repository.ts](../../../src/modules/analytics/repositories/analytics-repository.ts)
- [../../../src/modules/rag/repositories/local-knowledge.ts](../../../src/modules/rag/repositories/local-knowledge.ts)

`validateCrmSeedIntegrity` e `validateSolarSeedIntegrity` devem falhar cedo se um seed referenciar uma entidade inexistente.

## UI

Componentes base ficam em [../../../src/modules/shared/ui](../../../src/modules/shared/ui):

- `Button`
- `Card`
- `Input`
- `Textarea`

Nao adicionar componentes shadcn/ui antes de existir uso real.

## Smoke test

O smoke em [../../../scripts/smoke-test.mjs](../../../scripts/smoke-test.mjs) valida:

- landing;
- redirect de `/app` sem sessao;
- login demo;
- `/app`;
- `/app/crm`;
- `/app/solar`;
- `/app/assistant`;
- logout.

Os redirects sao comparados por `pathname` e `search`, nao por sufixo textual, para detectar desvios como `/app/` quando o esperado e `/`. Em execucao local, o smoke tambem simula `x-forwarded-host` e `x-forwarded-proto` do Render.

## Comandos

```bash
source "$HOME/.nvm/nvm.sh"
nvm use
npm run lint
npm run typecheck
npm run build
npm run smoke
```

## Proximas migracoes

- Persistir CRM/Solar em SQLite.
- Substituir repositorios in-memory preservando os tipos de dominio.
- Manter Render como Web Service Node ate o MVP publicado e revisado.
