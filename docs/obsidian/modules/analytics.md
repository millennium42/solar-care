# Modulo Analytics

## Codigo

- Dashboard placeholder: [../../../src/modules/analytics/components/dashboard-placeholder.tsx](../../../src/modules/analytics/components/dashboard-placeholder.tsx)
- Rota protegida: [../../../src/app/app/page.tsx](../../../src/app/app/page.tsx)

## Responsabilidade

Mostrar a primeira area interna do ERP/CRM apos o login demo.

No Commit 05, o dashboard ainda e uma primeira area operacional, mas ja consome os seeds CRM:

- KPIs de receita prevista, projetos ativos, leads e pendencias;
- fila operacional de clientes solares;
- pipeline seedado de oportunidades;
- indicacao de que login demo, guard de rota e area ERP estao ativos.

## Fronteiras

O dashboard pode receber sessao do modulo `auth`, componentes de `shared` e snapshots read-only do modulo `crm`. Dados reais de Solar e Operacoes entram nos proximos commits, evitando acoplamento prematuro.

## Proximos incrementos

- Substituir dados in-memory por repositorio SQLite quando persistencia entrar.
- No Commit 09, evoluir para dashboard ERP completo com KPIs e graficos leves.
