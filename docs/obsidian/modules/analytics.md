# Modulo Analytics

## Codigo

- Dashboard placeholder: [../../../src/modules/analytics/components/dashboard-placeholder.tsx](../../../src/modules/analytics/components/dashboard-placeholder.tsx)
- Rota protegida: [../../../src/app/app/page.tsx](../../../src/app/app/page.tsx)

## Responsabilidade

Mostrar a primeira area interna do ERP/CRM apos o login demo.

No bloco 05-08, o dashboard ainda e uma primeira area operacional, mas ja consome os seeds CRM e aponta para modulos operacionais:

- KPIs de receita prevista, pipeline aberto, leads e atividades abertas;
- fila operacional de clientes solares;
- pipeline seedado de oportunidades;
- indicacao de que login demo, guard de rota e area ERP estao ativos.
- navegacao para CRM, Solar, documentos e ferramentas.

## Fronteiras

O dashboard pode receber sessao do modulo `auth`, componentes de `shared` e snapshots read-only do modulo `crm`. Dados reais de Solar e Operacoes entram nos proximos commits, evitando acoplamento prematuro.

## Proximos incrementos

- Substituir dados in-memory por repositorio SQLite quando persistencia entrar.
- No Commit 09, evoluir para dashboard ERP completo com KPIs e graficos leves.
