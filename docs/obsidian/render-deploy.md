# Deploy no Render

## Estado

O conector Render esta disponivel nesta sessao. Nenhum servico foi criado ainda porque o workspace nao possui repositorio remoto Git configurado.

O workspace Render alvo e `Demos`. O deploy deve ser criado/sincronizado como Blueprint usando o arquivo [../../render.yaml](../../render.yaml).

## Pre-requisitos

- Repositorio remoto Git acessivel pelo Render.
- Branch `main` enviada para o remoto.
- App com scripts:
  - `npm run build`
  - `npm start`
- [.env.example](../../.env.example) sem segredos reais.
- `render.yaml` validado.

## Configuracao alvo

- Tipo: Blueprint com Web Service
- Project: `solar-care`
- Environment: `production`
- Environment Group: `solar-care-production`
- Service: `solar-care-web`
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Auto deploy: `yes`
- Branch: `main`
- Healthcheck: `/api/health`

O workspace `Demos` e escolhido no Dashboard ou conector Render durante a criacao/sync do Blueprint; o schema do `render.yaml` nao possui campo para gravar o workspace.

O script `npm run build` executa `next build --webpack` para evitar o panic interno do Turbopack observado no bootstrap.

## Variaveis esperadas

Comecar sem segredos. Quando o app existir, documentar em `.env.example`.

Variaveis iniciais no Environment Group:

- `APP_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`
- `DEMO_USER_EMAIL=demo@solarcare.local`

O arquivo [.env.example](../../.env.example) usa `APP_ENV=development` para uso local e nao contem segredos.

Possiveis variaveis futuras:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`

## Processo

1. Confirmar remoto Git.
2. Selecionar workspace Render `Demos`.
3. Criar/sincronizar Blueprint pelo conector Render usando `render.yaml`.
4. Aguardar deploy terminal.
5. Rodar smoke test contra a URL publicada.
6. Registrar URL em `memory.md`.
