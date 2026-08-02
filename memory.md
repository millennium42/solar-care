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
- Landing reestruturada para pagina institucional da instaladora ficticia `Solar Care Energia`, nao para vender o software ERP.
- Conector Render foi usado para criar o Web Service `solar-care-web` no workspace `Demos`.
- Repositorio GitHub publico: `https://github.com/millennium42/solar-care`.
- Remote local `origin`: `https://github.com/millennium42/solar-care.git`.
- Dependencias de UI do Commit 02 instaladas: `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge` e `@radix-ui/react-slot`.
- Workspace Render alvo: `Demos`.
- Render service ID: `srv-d9nqk2vlk1mc738l13kg`.
- Render deploy ID inicial: `dep-d9nqk3vlk1mc738l15d0`.
- URL publicada Render: `https://solar-care-web.onrender.com`.
- `render.yaml` continua como contrato desejado de Blueprint/Environment Group, mas o conector disponivel nesta sessao criou Web Service direto e nao expos criacao/sync de Blueprint nem Environment Group.
- Skills canonicas versionadas em `.codex/skills` e sincronizadas para `${CODEX_HOME:-$HOME/.codex}/skills`.

## Decisoes

- Ponytail prevalece: entregar uma fatia vertical funcionando antes de expandir.
- Politicas e skills devem permanecer versionadas no Git para que agentes usem as mesmas regras em todas as maquinas.
- MVP no Render sera um web service Node simples, com arquitetura modular interna e caminho Kubernetes-ready documentado.
- Ferramentas que exigem autenticacao ficam fora ate o usuario fornecer credenciais.
- CRM deve ser fortemente inspirado nos fluxos de Twenty, mas sem copiar codigo, marca ou assets.
- Seeds automaticos e login demo facil sao requisitos de demonstracao.
- O login demo usa cookie proprio de 8 horas, sem provider externo, banco ou senha.
- O valor fixo do cookie demo e risco P2 aceito apenas enquanto `/demo-login` for publico e nao houver dados sensiveis/permissoes reais.
- CRM usa repositorio read-only em memoria ate a persistencia SQLite ser introduzida; contratos de dominio ficam em `src/modules/crm`.
- A landing publica deve vender os servicos solares da empresa ficticia que usa o ERP; o ERP aparece apenas como area interna/login demo.
- `render.yaml` e a documentacao devem permanecer alinhados; o workspace `Demos` e selecionado no Render na criacao/sync do Blueprint, nao dentro do YAML.
- `next@16.2.12` fixa transitivamente `postcss@8.4.31` e `sharp@0.34.5`; usar `overrides` npm para `postcss@8.5.25` e `sharp@0.35.3`, mantendo `npm audit --omit=dev` limpo.
- `next build` padrao do Next 16 usa Turbopack e falhou no bootstrap com panic interno ao processar `globals.css`; o MVP usa `next build --webpack` ate Turbopack ficar estavel neste ambiente.
- Design system base criado em `src/modules/shared` com contrato shadcn/ui, `Button`, `Card`, `cn` e tokens sobrios em `globals.css`.
- A landing institucional agora consome `Button`, `Card` e icones `lucide-react`, mantendo o ERP apenas como area interna/demo.
- Landing institucional enriquecida com servicos, sinais de entrega tecnica e captura de lead local sem backend externo.
- Login demo criado em `/demo-login` com cookie HTTP-only e guard `requireDemoSession` protegendo `/app`.
- Dashboard placeholder criado em `/app` para validar a primeira area interna ERP/CRM.
- Revisao 01 encontrou P0=0/P1=0; P2 de layout protegido e smoke de auth foram corrigidos antes do Commit 05.
- Camada CRM in-memory criada com contas, contatos, oportunidades e atividades seedadas; dashboard consome `getCrmDashboardSnapshot`.

## Proximas acoes

1. Push da branch `main` para `origin`.
2. Quando o conector Render expuser Blueprint/Environment Group, alinhar o servico live ao `render.yaml` ou recriar via Blueprint.
3. Seguir o Prompt 06 para telas CRM inspiradas em Twenty.
4. Revisao 02 deve acontecer apos o Commit 08.

## Ultima validacao local

Executada em 2026-08-02 no workspace WSL:

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm audit --omit=dev`: passou, 0 vulnerabilidades.
- `npm run build`: passou com `next build --webpack`.
- `npm run smoke`: passou em `http://127.0.0.1:3100`.
- Revalidacao apos reestruturar a landing: `npm run lint`, `npm run typecheck`, `npm run build` e `npm run smoke` passaram.
- Commit 02 design system: `npm run lint`, `npm run typecheck`, `npm audit --omit=dev`, `npm run build` e `npm run smoke` passaram no workspace WSL.
- Commit 03 landing demo: `npm run lint`, `npm run typecheck`, `npm run build` e `npm run smoke` passaram; smoke agora valida CTA do ERP e captura de diagnostico solar.
- Commit 04 login demo: `npm run lint`, `npm run typecheck`, `npm run build` e `npm run smoke` passaram; smoke cobre landing, redirect sem sessao, `/demo-login` e dashboard `/app` com cookie.
- Revisao 01 hardening: `npm run lint`, `npm run typecheck`, `npm run build` e `npm run smoke` passaram apos adicionar layout protegido de `/app`, flags de cookie no smoke e logout no smoke.
- Commit 05 CRM seeds: `npm run lint`, `npm run typecheck`, `npm run build` e `npm run smoke` passaram; smoke valida dashboard com `Pipeline seedado`.
- Pre-deploy Render: `npm ci && npm run build` passou.
- Deploy Render `dep-d9nqk3vlk1mc738l15d0`: status `live`.
- Smoke Render em `https://solar-care-web.onrender.com`: passou.
- Healthcheck Render `https://solar-care-web.onrender.com/api/health`: HTTP 200 com `{"ok":true,"service":"solar-care-web"}`.

## Usuario demo sugerido

- Nome: Demo Solar Care
- Email: `demo@solarcare.local`
- Senha: dispensada no botao "Entrar como demo"
