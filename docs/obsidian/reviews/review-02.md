# Revisao 02 - Commits 05-08

## Escopo

Revisao dos commits de dados CRM, workspace CRM, dominio Solar e ferramentas de instaladora:

- `feat(crm): add seeded crm data`
- `feat(crm): add pipeline workspace`
- `feat(solar): add project operations module`
- `feat(solar): add installer productivity tools`

## Checks executados

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- `npm run smoke`: passou.
- Varredura simples de segredos: sem credenciais reais encontradas; apenas texto de politica/documentacao.

## Findings

- P0: nenhum.
- P1: nenhum.
- P2 corrigido: calculadora solar agora limita conta mensal negativa a zero.
- P2 corrigido: menu do dashboard aponta `Documentos` e `Ferramentas` para ancoras reais em `/app/solar`.
- P2 corrigido: labels de prazo CRM e documentos solares passaram a ser calculados no repositorio, nao fixados no seed.
- P2 corrigido: integridade de seeds CRM/Solar agora falha cedo quando ha relacao orfa.
- P2 aceito: smoke ainda valida ferramentas por HTML/textos e nao executa interacoes client-side. Playwright fica para quando houver bateria E2E dedicada.
- P3 corrigido: status do dashboard atualizado para Revisao 02.
- P3 aceito: `contactsByAccount` usa o contato primario por conta nos seeds atuais.

## Veredito

P0=0 e P1=0. O bloco 05-08 esta liberado para o Commit 09.
