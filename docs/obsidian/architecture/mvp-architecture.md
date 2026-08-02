# Arquitetura MVP

## Principio

Ponytail primeiro: uma fatia vertical demonstravel, simples de deployar no Render, mantendo fronteiras de dominio para evoluir depois para servicos separados ou Kubernetes.

## Estrutura alvo

```text
apps/
  web/
    src/app/
    src/modules/
      marketing/
      auth/
      crm/
      solar/
      operations/
      analytics/
      rag/
      shared/
docs/
  obsidian/
```

Se o primeiro commit usar um unico app Next.js sem monorepo, preservar a mesma separacao dentro de `src/modules`. So criar workspace/monorepo quando houver necessidade real.

## Modulos

- `marketing`: landing page, lead capture fake/demo.
- `auth`: sessao demo, seed de usuario unico, guardas de rota.
- `crm`: contas, contatos, oportunidades, pipeline e atividades.
- `solar`: propostas, projetos, vistorias, equipamentos e instalacoes.
- `operations`: ordens de servico, tarefas, calendario e status.
- `analytics`: metricas, graficos e cards do dashboard.
- `rag`: busca local sobre docs e dados seedados.
- `shared`: UI base, validacao, formatadores e utilitarios.

## Banco

Comecar com SQLite para desenvolvimento e demo sem dependencia externa. Preparar o adaptador para Postgres quando `DATABASE_URL` existir.

Entidades iniciais:

- User
- Account
- Contact
- Opportunity
- Activity
- SolarProject
- SiteSurvey
- Proposal
- Equipment
- WorkOrder
- DocumentChecklistItem

## Deploy

Render Blueprint no workspace `Demos`, com Web Service Node e Environment Group:

- `npm ci && npm run build`
- `npm start`
- `render.yaml` na raiz do repositorio
- Project `solar-care`, environment `production`
- Environment Group `solar-care-production`
- Healthcheck `/api/health`
- Branch `main`
- Auto deploy ligado

## Kubernetes-ready sem Kubernetes no MVP

Documentar:

- variaveis de ambiente;
- healthcheck;
- limites de modulo;
- comandos de build/start;
- contratos de dados.

Criar manifests Kubernetes somente depois do MVP publicado, revisado e demonstravel.

## Rotas atuais

- `/`: landing institucional da Solar Care Energia.
- `/demo-login`: cria sessao demo e redireciona para `/app`.
- `/demo-logout`: remove sessao demo e redireciona para `/`.
- `/app`: area ERP/CRM protegida por `requireDemoSession`.
- `/api/health`: healthcheck do Web Service.
