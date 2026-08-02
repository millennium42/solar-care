# Modulo CRM

## Codigo

- Tipos de dominio: [../../../src/modules/crm/types.ts](../../../src/modules/crm/types.ts)
- Seeds automaticos: [../../../src/modules/crm/data/seed.ts](../../../src/modules/crm/data/seed.ts)
- Repositorio read-only: [../../../src/modules/crm/repositories/crm-repository.ts](../../../src/modules/crm/repositories/crm-repository.ts)
- Workspace CRM: [../../../src/modules/crm/components/pipeline-workspace.tsx](../../../src/modules/crm/components/pipeline-workspace.tsx)
- Rota protegida: [../../../src/app/app/crm/page.tsx](../../../src/app/app/crm/page.tsx)
- Barrel do modulo: [../../../src/modules/crm/index.ts](../../../src/modules/crm/index.ts)

## Responsabilidade

Concentrar os dados comerciais iniciais do MVP:

- contas;
- contatos;
- oportunidades;
- atividades.

No Commit 05, os dados ficam em memoria, tipados e seedados no codigo. Essa escolha evita instalar banco/ORM antes de existir fluxo visual de CRM, mas cria uma fronteira clara para substituir por SQLite.

## Seeds atuais

As contas demo representam a instaladora ficticia Solar Care Energia atendendo:

- `Condominio Aurora`;
- `Padaria Central`;
- `Agro Sol Noroeste`;
- `Residencia Martins`.

Cada conta tem contato principal, oportunidade comercial e atividades de acompanhamento. O dashboard protegido consome `getCrmDashboardSnapshot` para exibir KPIs, fila operacional e pipeline seedado.

## Tela CRM

A rota `/app/crm` entrega:

- resumo de contas, contatos, oportunidades e atividades abertas;
- funil comercial em colunas de lead, qualificacao, proposta e negociacao;
- timeline de atividades por conta/oportunidade;
- carteira de contas com contato principal, conta de luz e kWp estimado;
- lista de contatos com telefone e email.

## Fronteiras

`crm` nao depende de `analytics`, `marketing` ou `auth`. Outros modulos podem ler dados CRM pelo repositorio exportado em `src/modules/crm/index.ts`.

## Proximos incrementos

- Conectar oportunidades CRM a projetos solares no Commit 07.
- Substituir o repositorio in-memory por SQLite quando a persistencia real entrar, preservando os contratos de dominio.
