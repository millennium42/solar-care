# Sequencia de Prompts por Commit

Cada prompt abaixo deve gerar no maximo um commit. Se uma etapa ficar grande, dividir sem quebrar a regra: o software precisa continuar funcionando.

## Commit 01 - Bootstrap Next.js

```text
Leia codex.md e memory.md. Crie o app Next.js minimo para Solar Care usando TypeScript, App Router, Tailwind e estrutura modular. Baixe apenas as dependencias necessarias. Configure scripts `dev`, `build`, `start`, `lint`, `typecheck` e um smoke test minimo. A home deve renderizar uma landing page simples com CTA "Entrar no ERP". Rode lint/typecheck/build/smoke. Atualize memory.md. Commit: `chore(app): bootstrap next solar care`.
```

## Commit 02 - Design System Base

```text
Use $solar-component-builder. Adicione shadcn/ui apenas com componentes necessarios para layout, botoes, inputs, tabs/cards se realmente usados, e lucide-react para icones. Defina tokens visuais sobrios para SaaS operacional, sem paleta de uma unica cor. Garanta responsividade mobile/desktop. Rode smoke tests. Commit: `feat(ui): add base design system`.
```

## Commit 03 - Landing Page Demo

```text
Crie a landing page da empresa ficticia Solar Care Energia com valor claro para instaladoras solares, secoes reais de servico, CTA de login no topo e captura de lead demo sem backend externo. Use imagem/visual asset leve se necessario. Nada de landing generica vazia. Rode smoke tests. Commit: `feat(marketing): add solar company landing page`.
```

## Commit 04 - Login Demo

```text
Implemente modulo `auth` com usuario unico demo e botao de login automatico. Nao exigir provedor externo. Criar guardas simples para area ERP. Seeds automaticos devem existir ou ser preparados no app. Rode smoke tests cobrindo landing -> login -> dashboard placeholder. Commit: `feat(auth): add demo login flow`.
```

## Revisao 01

```text
Use $solar-code-review. Revise os commits 01-04 com severidade P0/P1/P2/P3. P0=0 e P1=0 sao obrigatorios. Verifique build, smoke, arquitetura modular, risco de dependencia desnecessaria, responsividade e docs. Corrija problemas bloqueantes em commits pequenos antes de continuar.
```

## Commit 05 - Dados e Seeds CRM

```text
Adicione camada de dados local minima com seeds automaticos para contas, contatos, oportunidades e atividades. Preferir SQLite se o app ja tiver ORM leve; caso contrario, iniciar com repositorios in-memory tipados e preparar migracao para SQLite no proximo commit. Rode smoke tests. Commit: `feat(crm): add seeded crm data`.
```

## Commit 06 - CRM Inspirado no Twenty

```text
Crie telas CRM: lista de contas, contatos, funil de oportunidades, detalhe com timeline de atividades. Inspiracao forte em padroes de CRM moderno tipo Twenty, sem copiar codigo/assets. UI densa, escaneavel e operacional. Rode smoke tests. Commit: `feat(crm): add pipeline workspace`.
```

## Commit 07 - Dominio Solar

```text
Adicione modulo `solar` com projetos, propostas, vistorias, equipamentos e status de instalacao. Conectar oportunidades a projetos solares seedados. Rode smoke tests. Commit: `feat(solar): add project operations module`.
```

## Commit 08 - Ferramentas de Instaladora

```text
Adicione calculadora solar simples, checklist de vistoria e painel de documentos pendentes. As ferramentas devem ser uteis em demonstracao, com dados seedados e estados vazios. Rode smoke tests. Commit: `feat(solar): add installer productivity tools`.
```

## Revisao 02

```text
Use $solar-code-review. Revise commits 05-08 com foco em modelo de dados, UX operacional, consistencia de componentes, acoplamento entre modulos, testes e riscos de demo. P0=0 e P1=0 antes de avancar.
```

## Commit 09 - Dashboard ERP

```text
Crie dashboard com KPIs: receita prevista, taxa de conversao, projetos ativos, capacidade de instalacao, pendencias documentais e economia estimada para clientes. Usar graficos leves sem dependencia pesada se possivel. Rode smoke tests. Commit: `feat(analytics): add erp dashboard`.
```

## Commit 10 - RAG Local Demo

```text
Crie modulo `rag` simples sem servico externo: indexar markdown de docs/obsidian e respostas curtas sobre como usar o sistema e processos solares. Pode ser busca lexical inicialmente. Evitar vector DB externo. Rode smoke tests. Commit: `feat(rag): add local knowledge assistant`.
```

## Commit 11 - Documentacao Usuario e Dev

```text
Atualize docs/obsidian com guias de usuario e dev por modulo existente. Cada tela demonstravel deve ter explicacao de funcionamento e links entre documentos. Atualize memory.md. Rode smoke tests. Commit: `docs(obsidian): add user and developer guides`.
```

## Commit 12 - Render Readiness

```text
Adicione `.env.example`, healthcheck, ajustes de start/build e documentacao de deploy Render. Validar `npm ci`, build e start local. Nao criar servico Render ainda se nao houver repo remoto Git. Rode smoke tests. Commit: `chore(render): prepare web service deployment`.
```

## Revisao 03

```text
Use $solar-code-review. Revisao completa pre-deploy. Confirmar P0=0/P1=0, rotas criticas, demo login, seeds, build limpo, docs atualizadas, nenhuma credencial no repo e dependencia externa justificada.
```

## Commit 13 - Deploy Render

```text
Se existir remoto Git acessivel pelo Render, use o conector Render para criar Web Service Node. Build command: `npm ci && npm run build`. Start command: `npm start`. Auto deploy na branch main. Monitore deploy ate estado terminal. Registre URL publicada em memory.md e docs/obsidian/render-deploy.md. Commit: `chore(render): record production demo deployment`.
```

## Commit 14 - Polish Demo

```text
Com a URL publicada, faca smoke test contra producao. Corrija problemas visuais ou funcionais pequenos. Nao expandir escopo. Atualize docs e memory. Commit: `fix(demo): polish render presentation flow`.
```
