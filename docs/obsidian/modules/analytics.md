# Modulo Analytics

## Codigo

- Dashboard placeholder: [../../../src/modules/analytics/components/dashboard-placeholder.tsx](../../../src/modules/analytics/components/dashboard-placeholder.tsx)
- Rota protegida: [../../../src/app/app/page.tsx](../../../src/app/app/page.tsx)

## Responsabilidade

Mostrar a primeira area interna do ERP/CRM apos o login demo.

No Commit 04, o dashboard ainda e um placeholder operacional com dados estaticos, mas ja representa a direcao do MVP:

- KPIs de receita prevista, projetos ativos, leads e pendencias;
- fila operacional de clientes solares;
- indicacao de que login demo, guard de rota e area ERP estao ativos.

## Fronteiras

O dashboard pode receber sessao do modulo `auth` e componentes de `shared`. Dados reais de CRM, Solar e Operacoes entram nos proximos commits, evitando acoplamento prematuro.

## Proximos incrementos

- Substituir dados estaticos por seeds CRM e Solar.
- No Commit 09, evoluir para dashboard ERP completo com KPIs e graficos leves.
