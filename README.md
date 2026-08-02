# Solar Care

CRM e ERP para empresas de energia solar.

Este repositorio comeca como um pacote de governanca e prompts para conduzir a entrega ponta a ponta de um MVP demonstravel no Render. A regra operacional principal esta em [codex.md](codex.md).

## Estado atual

- Git inicializado na branch `main`.
- Node LTS instalado via `nvm`; versao fixada em [.nvmrc](.nvmrc).
- App Next.js minimo criado com TypeScript, App Router e Tailwind.
- Caminho ativo de desenvolvimento WSL: `/home/millennium42/solar-care`.
- O caminho Windows original em `/mnt/c/Users/Admin/Documents/Solar Care` deve ser sincronizado a partir do WSL quando houver commit novo.
- Documentacao modular em estilo Obsidian em [docs/obsidian/index.md](docs/obsidian/index.md).
- Skills do Codex versionadas em [.codex/skills](.codex/skills) e sincronizaveis para `${CODEX_HOME:-$HOME/.codex}/skills`:
  - `$solar-code-review`
  - `$solar-component-builder`
  - `$solar-smoke-test`

## Sincronizar skills

Para ativar as skills versionadas nesta maquina:

```bash
./scripts/sync-codex-skills.sh
```

## Proximo passo recomendado

Executar o Prompt 02 em [docs/obsidian/prompts/01-commit-sequence.md](docs/obsidian/prompts/01-commit-sequence.md) para adicionar o design system base.

## Desenvolvimento local

```bash
source "$HOME/.nvm/nvm.sh"
nvm use
npm install
npm run dev
```

Checks do bootstrap:

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke
```
