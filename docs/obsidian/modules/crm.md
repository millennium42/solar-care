# Modulo CRM

## Codigo

- Tipos de dominio: [../../../src/modules/crm/types.ts](../../../src/modules/crm/types.ts)
- Seeds automaticos: [../../../src/modules/crm/data/seed.ts](../../../src/modules/crm/data/seed.ts)
- Repositorio read-only: [../../../src/modules/crm/repositories/crm-repository.ts](../../../src/modules/crm/repositories/crm-repository.ts)
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

## Fronteiras

`crm` nao depende de `analytics`, `marketing` ou `auth`. Outros modulos podem ler dados CRM pelo repositorio exportado em `src/modules/crm/index.ts`.

## Proximos incrementos

- Commit 06: criar telas CRM usando estes seeds.
- Substituir o repositorio in-memory por SQLite quando a persistencia real entrar, preservando os contratos de dominio.
