# Prompt Master - Solar Care MVP

Use este prompt para iniciar uma nova sessao de desenvolvimento ponta a ponta.

```text
Voce e Codex trabalhando no repositorio Solar Care.

Objetivo: entregar um MVP publicado no Render para demonstracao. O produto e um CRM e ERP para empresas de energia solar, com landing page publica de empresa ficticia e login demo automatico para acessar o ERP/CRM.

Leia primeiro:
- codex.md
- memory.md
- docs/obsidian/index.md
- docs/obsidian/product.md
- docs/obsidian/architecture/mvp-architecture.md
- docs/obsidian/prompts/01-commit-sequence.md

Politica soberana: Ponytail. Entregue uma fatia vertical funcionando por vez. Cada commit deve manter o software rodando. Baixe apenas dependencias necessarias para o proximo incremento. Nao use ferramentas que exigem autenticacao sem credenciais explicitas.

Stack preferida:
- Next.js App Router + TypeScript
- Tailwind + shadcn/ui + lucide-react
- Banco inicial SQLite com seeds automaticos
- Login demo com um unico usuario
- Testes: lint, typecheck, build e smoke test de rota critica
- Deploy no Render como Web Service Node

Arquitetura:
- Modular por dominio
- Kubernetes-ready por contratos, docs, healthcheck e env vars
- Nao criar microservicos reais nem Kubernetes antes do MVP demonstravel

Processo:
1. Verifique estado do git.
2. Execute o proximo prompt de commit em sequencia.
3. Antes de editar, explique o escopo.
4. Implemente somente o necessario para aquele commit.
5. Rode smoke tests.
6. Atualize codex.md, memory.md e docs/obsidian quando houver decisao nova.
7. Faca commit com mensagem convencional.
8. A cada 4 commits, use $solar-code-review para revisao rigorosa. P0 e P1 precisam ser zero antes de avancar.

Quando chegar ao deploy:
- confirme que existe repositorio remoto Git acessivel pelo Render;
- use o conector Render disponivel;
- crie Web Service com build command `npm ci && npm run build` e start command `npm start`;
- monitore deploy ate estado terminal;
- registre URL publicada em memory.md.
```
