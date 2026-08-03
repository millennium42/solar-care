# Guia de Usuario - Demo Solar Care

## Entrada publica

Abra a landing institucional da `Solar Care Energia` em `/`.

Use esta tela para demonstrar:

- empresa ficticia de energia solar, nao venda do ERP;
- servicos solares residenciais, empresariais e rurais;
- captura de lead local em `Solicitar diagnostico solar`;
- CTA `Entrar no ERP` para a equipe interna.

## Login demo

Clique em `Entrar no ERP`.

O fluxo:

1. `/demo-login` cria a sessao demo.
2. O navegador e redirecionado para `/app`.
3. O dashboard ERP aparece com dados seedados.

Usuario exibido:

- Nome: `Demo Solar Care`
- Email: `demo@solarcare.local`

## Dashboard ERP

Rota: `/app`

Use para apresentar:

- receita prevista;
- taxa de conversao;
- projetos ativos e capacidade;
- pendencias documentais;
- economia mensal estimada;
- radar comercial;
- fila operacional.

## CRM

Rota: `/app/crm`

Use para apresentar:

- contas e contatos;
- funil de oportunidades;
- timeline de atividades;
- carteira comercial;
- relacao entre lead, oportunidade e operacao solar.

## Operacoes solares

Rota: `/app/solar`

Use para apresentar:

- projetos solares conectados a oportunidades CRM;
- propostas, vistorias e equipamentos;
- marcos de instalacao;
- calculadora solar;
- checklist de vistoria;
- documentos pendentes.

## Assistente local

Rota: `/app/assistant`

Use perguntas como:

- `documento`
- `vistoria`
- `dashboard`
- `Condominio Aurora`

O assistente busca apenas em docs locais e seeds do MVP, sem servico externo.
