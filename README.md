# Solar Care

CRM e ERP para empresas de energia solar.

Este repositorio comeca como um pacote de governanca e prompts para conduzir a entrega ponta a ponta de um MVP demonstravel no Render. A regra operacional principal esta em [codex.md](codex.md).

## Estado atual

- Git inicializado na branch `main`.
- Node LTS instalado via `nvm`; versao fixada em [.nvmrc](.nvmrc).
- Documentacao modular em estilo Obsidian em [docs/obsidian/index.md](docs/obsidian/index.md).
- Skills locais do Codex criadas em `~/.codex/skills`:
  - `$solar-code-review`
  - `$solar-component-builder`
  - `$solar-smoke-test`

## Proximo passo recomendado

Executar o Prompt 01 em [docs/obsidian/prompts/01-commit-sequence.md](docs/obsidian/prompts/01-commit-sequence.md) para criar o app Next.js minimo, com smoke test e primeiro deploy-ready build.
