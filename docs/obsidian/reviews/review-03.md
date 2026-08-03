# Revisao 03 - Pre-deploy

## Escopo

Revisao completa do MVP antes do deploy/registro de producao:

- landing institucional;
- login demo;
- dashboard ERP;
- CRM;
- operacoes solares;
- ferramentas de instaladora;
- assistente local;
- Render readiness;
- docs e segredos.

## Findings

- P0: nenhum.
- P1 corrigido: `/demo-login` e `/demo-logout` usavam `request.url` para montar redirect e podiam apontar para host interno do Render. Agora usam `NEXT_PUBLIC_APP_URL` ou headers `x-forwarded-*`.
- P2 corrigido: seeds CRM e documentos solares deixaram de depender de datas fixas de agosto de 2026 para prazos relativos.
- P2 em observacao: smoke Render antigo era anterior ao fluxo completo. Deve ser repetido apos novo deploy.

## Checks locais

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm audit --omit=dev`: passou.
- `npm ci && npm run build`: passou.
- `npm run build`: passou apos correcoes desta revisao.
- `npm run smoke`: passou apos correcoes desta revisao, incluindo simulacao local de `x-forwarded-host` e `x-forwarded-proto`.

## Veredito

P0=0. P1=0 apos correcoes locais. Avancar para deploy Render e smoke publico.
