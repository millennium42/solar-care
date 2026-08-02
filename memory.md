# Solar Care Memory

## Estado em 2026-08-02

- Workspace inicial Windows: `/mnt/c/Users/Admin/Documents/Solar Care`.
- Workspace ativo WSL: `/home/millennium42/solar-care`.
- Repositorio Git local inicializado na branch `main`.
- Node instalado via `nvm`: `v24.18.1`; npm: `11.16.0`.
- Arquivo [.nvmrc](.nvmrc) fixa `24.18.1`.
- App Next.js minimo criado com TypeScript, App Router, Tailwind CSS e estrutura `src/modules`.
- Dependencias npm instaladas no WSL para evitar gargalo de `node_modules` em `/mnt/c`.
- [.env.example](.env.example) criado sem segredos reais para refletir as variaveis do Environment Group.
- Conector Render foi localizado e esta disponivel na sessao, mas nenhum servico foi criado porque ainda nao existe repositorio remoto Git.
- Workspace Render alvo: `Demos`.
- Deploy Render deve ser criado via Blueprint `render.yaml`, com Environment Group `solar-care-production` e Web Service `solar-care-web`.
- Skills canonicas versionadas em `.codex/skills` e sincronizadas para `${CODEX_HOME:-$HOME/.codex}/skills`.

## Decisoes

- Ponytail prevalece: entregar uma fatia vertical funcionando antes de expandir.
- Politicas e skills devem permanecer versionadas no Git para que agentes usem as mesmas regras em todas as maquinas.
- MVP no Render sera um web service Node simples, com arquitetura modular interna e caminho Kubernetes-ready documentado.
- Ferramentas que exigem autenticacao ficam fora ate o usuario fornecer credenciais.
- CRM deve ser fortemente inspirado nos fluxos de Twenty, mas sem copiar codigo, marca ou assets.
- Seeds automaticos e login demo facil sao requisitos de demonstracao.
- `render.yaml` e a documentacao devem permanecer alinhados; o workspace `Demos` e selecionado no Render na criacao/sync do Blueprint, nao dentro do YAML.
- `next@16.2.12` fixa transitivamente `postcss@8.4.31` e `sharp@0.34.5`; usar `overrides` npm para `postcss@8.5.25` e `sharp@0.35.3`, mantendo `npm audit --omit=dev` limpo.
- `next build` padrao do Next 16 usa Turbopack e falhou no bootstrap com panic interno ao processar `globals.css`; o MVP usa `next build --webpack` ate Turbopack ficar estavel neste ambiente.

## Proximas acoes

1. Commitar `chore(app): bootstrap next solar care`.
2. Sincronizar o commit WSL de volta para o caminho Windows se necessario.
3. Seguir o Prompt 02 para design system base.
4. Fazer revisao rigorosa no primeiro checkpoint apos o Commit 04.

## Ultima validacao local

Executada em 2026-08-02 no workspace WSL:

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm audit --omit=dev`: passou, 0 vulnerabilidades.
- `npm run build`: passou com `next build --webpack`.
- `npm run smoke`: passou em `http://127.0.0.1:3100`.

## Usuario demo sugerido

- Nome: Demo Solar Care
- Email: `demo@solarcare.local`
- Senha: dispensada no botao "Entrar como demo"
