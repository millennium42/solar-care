# Revisao 01 - Commits 01-04

## Escopo

Revisao dos commits de bootstrap, design system, landing institucional e login demo:

- `chore(app): bootstrap next solar care`
- `feat(ui): add base design system`
- `feat(marketing): add solar company landing page`
- `feat(auth): add demo login flow`

## Checks executados

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- `npm run smoke`: passou.
- Varredura simples de segredos: sem credenciais reais encontradas; apenas texto de politica/documentacao.

## Findings

- P0: nenhum.
- P1: nenhum.
- P2 corrigido: protecao de `/app` movida tambem para layout do segmento, reduzindo risco de futuras rotas internas sem guard.
- P2 corrigido: smoke passou a validar flags do cookie demo e logout.
- P2 aceito: cookie demo tem valor fixo e previsivel. Risco aceito apenas porque o login demo e publico, sem dados sensiveis nem permissoes reais.
- P3 aceito: smoke pressupoe build recente quando executado isolado; a cadencia do projeto continua exigindo `npm run build` antes de `npm run smoke`.

## Veredito

P0=0 e P1=0. O bloco 01-04 esta liberado para o Commit 05.
