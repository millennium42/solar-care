# Modulo Marketing

## Codigo

- Entrada publica: [../../../src/app/page.tsx](../../../src/app/page.tsx)
- Componente principal: [../../../src/modules/marketing/components/landing-page.tsx](../../../src/modules/marketing/components/landing-page.tsx)
- Barrel do modulo: [../../../src/modules/marketing/index.ts](../../../src/modules/marketing/index.ts)

## Responsabilidade

Renderizar a primeira tela publica da empresa ficticia `Solar Care Energia`.

No Commit 01, o modulo entrega uma landing simples com:

- barra superior com CTA `Entrar no ERP`;
- hero do MVP demonstravel;
- preview estatico de painel ERP/CRM;
- lista curta de modulos planejados.

## Fronteiras

O modulo `marketing` pode importar configuracoes de `shared`, mas nao deve depender de `auth`, `crm`, `solar` ou `analytics` enquanto esses modulos nao existirem como contratos estaveis.

## Proximos incrementos

- No Commit 03, trocar o preview inicial por uma landing mais completa da empresa ficticia.
- No Commit 04, conectar o CTA ao fluxo real de login demo.
