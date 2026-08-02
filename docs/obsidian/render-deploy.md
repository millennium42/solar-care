# Deploy no Render

## Estado

O conector Render esta disponivel nesta sessao. Nenhum servico foi criado ainda porque o workspace nao possui repositorio remoto Git configurado.

## Pre-requisitos

- Repositorio remoto Git acessivel pelo Render.
- Branch `main` enviada para o remoto.
- App com scripts:
  - `npm run build`
  - `npm start`
- `.env.example` sem segredos reais.

## Configuracao alvo

- Tipo: Web Service
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Auto deploy: `yes`
- Branch: `main`

## Variaveis esperadas

Comecar sem segredos. Quando o app existir, documentar em `.env.example`.

Possiveis variaveis futuras:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`

## Processo

1. Confirmar remoto Git.
2. Criar Web Service pelo conector Render.
3. Aguardar deploy terminal.
4. Rodar smoke test contra a URL publicada.
5. Registrar URL em `memory.md`.
