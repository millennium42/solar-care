# Solar Care

CRM e ERP para empresas de energia solar, com landing institucional da instaladora ficticia Solar Care Energia e login demo para area interna.

Este repositorio comeca como um pacote de governanca e prompts para conduzir a entrega ponta a ponta de um MVP demonstravel no Render. A regra operacional principal esta em [codex.md](codex.md).

## Estado atual

- Git inicializado na branch `main`.
- Repositorio GitHub remoto: [millennium42/solar-care](https://github.com/millennium42/solar-care).
- Demo Render publicada: [solar-care-web.onrender.com](https://solar-care-web.onrender.com).
- Smoke publico completo aprovado contra a URL Render.
- Node LTS instalado via `nvm`; versao fixada em [.nvmrc](.nvmrc).
- App Next.js com landing, login demo, dashboard ERP, CRM, operacoes solares, ferramentas de instaladora e assistente local.
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

## Fluxo demo

1. Landing publica: `/`
2. Login demo: `/demo-login`
3. Dashboard ERP: `/app`
4. CRM: `/app/crm`
5. Operacoes solares e ferramentas: `/app/solar`
6. Assistente local: `/app/assistant`

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

## Render

Contrato de deploy em [render.yaml](render.yaml):

- build: `npm ci && npm run build`
- start: `npm start`
- healthcheck: `/api/health`
- service: `solar-care-web`
- environment group: `solar-care-production`
- url: [https://solar-care-web.onrender.com](https://solar-care-web.onrender.com)
