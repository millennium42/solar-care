# Modulo Marketing

## Codigo

- Entrada publica: [../../../src/app/page.tsx](../../../src/app/page.tsx)
- Componente principal: [../../../src/modules/marketing/components/landing-page.tsx](../../../src/modules/marketing/components/landing-page.tsx)
- Barrel do modulo: [../../../src/modules/marketing/index.ts](../../../src/modules/marketing/index.ts)

## Responsabilidade

Renderizar a primeira tela publica institucional da empresa ficticia `Solar Care Energia`, que e uma instaladora de energia solar e usuaria do ERP/CRM.

Depois da reestruturacao, o modulo entrega uma landing institucional com:

- barra superior com marca da instaladora e CTA `Entrar no ERP` para equipe interna;
- hero de servicos solares para residencias, empresas e produtores rurais;
- bloco de indicadores comerciais e operacionais da instaladora;
- servicos reais de projeto, instalacao, homologacao, monitoramento e pos-venda;
- processo comercial/tecnico em quatro etapas.
- componentes base `Button` e `Card` do modulo `shared`;
- icones `lucide-react` para sinalizar servicos, operacao e etapas sem asset pesado.

Regra importante: a landing publica nao deve vender o software Solar Care ERP. Ela deve apresentar a empresa solar ficticia que usa o ERP.

## Fronteiras

O modulo `marketing` pode importar configuracoes de `shared`, mas nao deve depender de `auth`, `crm`, `solar` ou `analytics` enquanto esses modulos nao existirem como contratos estaveis.

## Proximos incrementos

- No Commit 03, enriquecer a landing institucional com captura de lead demo sem backend externo.
- No Commit 04, conectar o CTA ao fluxo real de login demo.
