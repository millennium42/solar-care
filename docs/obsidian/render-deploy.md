# Deploy no Render

## Estado

O conector Render foi usado para criar o Web Service inicial.

Repositorio GitHub remoto publico: [millennium42/solar-care](https://github.com/millennium42/solar-care).

O workspace Render alvo e `Demos`. O deploy deve ser criado/sincronizado como Blueprint usando o arquivo [../../render.yaml](../../render.yaml).

URL publicada atual: [https://solar-care-web.onrender.com](https://solar-care-web.onrender.com).

Service ID: `srv-d9nqk2vlk1mc738l13kg`.

Deploy inicial: `dep-d9nqk3vlk1mc738l15d0`, status `live`.

Deploy completo mais recente: `dep-d9nu5sijnfac73bpap1g`, status `live`, commit `7e5fd18`.

Observacao: o conector Render disponivel nesta sessao criou Web Service direto e nao expos criacao/sync de Blueprint nem Environment Group. As variaveis foram aplicadas diretamente no Web Service para a demo; o arquivo [../../render.yaml](../../render.yaml) permanece como contrato desejado para alinhar o servico quando essa capacidade estiver disponivel.

## Pre-requisitos

- Repositorio remoto Git acessivel pelo Render: `https://github.com/millennium42/solar-care`.
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
- `NEXT_PUBLIC_APP_URL=https://solar-care-web.onrender.com`

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

O repo esta publico, entao o Render pode clonar `https://github.com/millennium42/solar-care` para criar/sincronizar o Blueprint no workspace `Demos`.

## Smoke test Render

Smoke inicial executado em 2026-08-02, antes do fluxo completo atual:

- Deploy `dep-d9nqk3vlk1mc738l15d0`: `live`.
- Home: `https://solar-care-web.onrender.com` retornou HTTP 200.
- Conteudo verificado: `Solar Care Energia`, `Entrar no ERP`, `Solicitar diagnostico solar` e headline institucional.
- Healthcheck: `https://solar-care-web.onrender.com/api/health` retornou HTTP 200.
- Body do healthcheck inclui `ok`, `service`, `environment` e `uptime`.

Smoke completo executado em 2026-08-02 local / 2026-08-03 UTC:

- Deploy `dep-d9nu5sijnfac73bpap1g`: `live`.
- Comando: `SMOKE_TEST_URL=https://solar-care-web.onrender.com npm run smoke`.
- Resultado: passou.
- Cobertura: landing, redirect de login demo com destino publico, cookie de sessao, dashboard, CRM, Solar, assistente local e logout.

Smoke de polish final executado em 2026-08-02 local / 2026-08-03 UTC:

- Comando: `SMOKE_TEST_URL=https://solar-care-web.onrender.com npm run smoke`.
- Resultado: passou com comparacao exata de redirects por `pathname` e `search`.

## Rotas criticas atuais

- `/`
- `/demo-login`
- `/app`
- `/app/crm`
- `/app/solar`
- `/app/assistant?q=documento`
- `/api/health`

O smoke local exercita login, cookie, dashboard, CRM, Solar, assistente e logout. Ele valida redirects por `pathname` e `search`, incluindo simulacao de headers `x-forwarded-*` do Render. O smoke de producao deve usar:

```bash
SMOKE_TEST_URL=https://solar-care-web.onrender.com npm run smoke
```
