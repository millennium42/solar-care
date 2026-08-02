# Codex Operating Policy - Solar Care

## Missao

Construir o Solar Care, um CRM e ERP para empresas de energia solar, com uma landing page de empresa ficticia de energia solar e login simples para demonstracao do ERP/CRM.

## Politica Ponytail

A politica Ponytail prevalece sobre todas as outras preferencias:

1. Entregar uma unica trilha vertical funcionando de ponta a ponta antes de abrir frentes paralelas.
2. Cada commit deve manter o software instalavel, testavel e executavel.
3. Nao instalar ferramentas, servicos ou SDKs que exijam autenticacao ate existir credencial explicitamente fornecida.
4. Preferir o menor download necessario para o proximo commit verificavel.
5. Nao adicionar Kubernetes, microservicos reais, filas externas, Sentry, Upstash, HyperFrames, Glif, Context7 remoto, Strix SaaS ou qualquer ferramenta autenticada como dependencia do MVP demo.
6. Manter o desenho Kubernetes-ready e nao-monolitico por fronteiras de modulo, contratos e documentacao, mas fazer o deploy inicial como um web service simples no Render.
7. Smoke test obrigatorio antes de cada commit.
8. Revisao rigorosa a cada bloco de evolucao; P0 = 0 e P1 = 0 para avancar.

## Stack alvo do MVP

- Next.js com App Router e TypeScript.
- UI com Tailwind, shadcn/ui e lucide-react.
- Animacoes leves com CSS/Motion apenas quando melhorarem a demonstracao.
- Banco inicial com SQLite local e seeds automaticos; preparar adaptacao para Postgres via `DATABASE_URL`.
- Autenticacao demo com um usuario unico e botao de login automatico. Better-auth pode entrar se nao exigir servico externo.
- Testes minimos: lint, typecheck, unitarios quando houver logica, build e smoke de rota critica.
- Deploy inicial no Render como web service Node.

## Produto MVP

O primeiro MVP deve demonstrar:

1. Landing page da empresa ficticia "Solar Care Energia" com CTA de login.
2. Login automatico de demo.
3. Dashboard do ERP/CRM.
4. CRM inspirado em Twenty: contas, contatos, oportunidades, atividades e funil.
5. Operacoes solares: projetos de instalacao, vistorias, propostas, equipamentos, instaladores, documentos e ordens de servico.
6. Ferramentas uteis e criativas: calculadora solar simples, estimativa de economia, checklist de vistoria, mapa/status de instalacoes e alertas de pendencia.
7. Seeds automaticos para demo consistente.

## Modularidade

Usar arquitetura por dominios:

- `marketing`: landing page e conteudo publico.
- `auth`: sessao demo e politicas de acesso.
- `crm`: contas, contatos, oportunidades, atividades.
- `solar`: projetos, vistorias, propostas, equipamentos, instalacao.
- `operations`: tarefas, ordens de servico, calendario e status.
- `analytics`: indicadores e relatorios.
- `rag`: busca local sobre documentacao e dados seedados, sem servico externo no MVP.
- `shared`: UI, validacao, componentes e utilitarios.

Cada modulo deve ter fronteiras claras e documentacao propria em `docs/obsidian`.

## Documentacao

Atualizar documentacao junto com codigo:

- `codex.md`: politicas vivas do agente e do projeto.
- `memory.md`: decisoes, estado atual, atalhos e pendencias.
- `docs/obsidian/index.md`: mapa de navegacao.
- Um arquivo por modulo explicando como o codigo funciona.
- Guias separados para usuario e dev quando uma funcionalidade ficar demonstravel.

Usar links wiki/markdown entre documentos para facilitar Obsidian e RAG local.

## Regras de commits

- Um commit por incremento pequeno e funcional.
- Mensagem no formato `tipo(escopo): resumo`.
- Antes do commit: smoke test documentado no corpo da resposta.
- A cada 4 commits: revisao completa com `$solar-code-review`.
- Nunca deixar P0 ou P1 aberto.

## Ferramentas externas

Sem credenciais, tratar como inspiracao ou etapa futura:

- Sentry, Upstash, HyperFrames, Glif, 21st.dev, Strix SaaS, Context7 remoto, integracoes Google, Slack, GitHub remoto e qualquer ferramenta autenticada.

Permitido sem autenticacao:

- Pacotes npm publicos estritamente necessarios.
- Render connector quando houver repositorio remoto e workspace disponivel.
- Ferramentas locais de lint, test, build, smoke, auditoria estatica e documentacao.

## Render

O deploy demo deve usar Render Blueprint no workspace Render `Demos`, criando um Web Service Node e um Environment Group versionados em `render.yaml`:

- Build command esperado: `npm ci && npm run build`.
- Start command esperado: `npm start`.
- Auto deploy ligado na branch `main`.
- Variaveis devem vir de `.env.example`, sem segredos reais no repo.
- Environment Group inicial: `solar-care-production`.

Nao criar servico Render ate existir URL de repositorio remoto que o Render possa clonar.
