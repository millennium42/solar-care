# Modulo Analytics

## Codigo

- Dashboard ERP: [../../../src/modules/analytics/components/dashboard-placeholder.tsx](../../../src/modules/analytics/components/dashboard-placeholder.tsx)
- Snapshot de analytics: [../../../src/modules/analytics/repositories/analytics-repository.ts](../../../src/modules/analytics/repositories/analytics-repository.ts)
- Rota protegida: [../../../src/app/app/page.tsx](../../../src/app/app/page.tsx)

## Responsabilidade

Mostrar o dashboard ERP/CRM apos o login demo.

No Commit 09, o dashboard agrega seeds CRM e Solar:

- receita prevista ponderada;
- taxa de conversao entre oportunidades e projetos solares;
- projetos ativos, capacidade e progresso medio;
- pendencias documentais;
- economia mensal estimada;
- fila operacional e radar comercial.

## Fronteiras

O dashboard pode receber sessao do modulo `auth`, componentes de `shared` e snapshots read-only dos modulos `crm` e `solar`.

## Proximos incrementos

- Substituir dados in-memory por repositorio SQLite quando persistencia entrar.
- Adicionar graficos leves somente se o dashboard precisar de comparacao temporal real.
