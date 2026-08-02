# Skills Codex

As skills canonicas ficam versionadas em `.codex/skills`. O diretorio `${CODEX_HOME:-$HOME/.codex}/skills` e apenas a copia local usada pelo Codex na maquina atual.

## Sincronizacao

Rode:

```bash
./scripts/sync-codex-skills.sh
```

Depois de alterar qualquer skill versionada, rode o script novamente para atualizar a copia local.

## `$solar-code-review`

Use para revisao rigorosa por severidade P0/P1/P2/P3, especialmente a cada 4 commits e antes de deploy.

## `$solar-component-builder`

Use para criar componentes UI consistentes com Solar Care, shadcn/ui, lucide-react, responsividade e testes.

## `$solar-smoke-test`

Use para validar que landing, login demo, dashboard, build e rotas criticas continuam funcionando.

## Observacao

As skills entram como apoio ao processo. A fonte de verdade versionada e composta por [codex.md](../../codex.md), [memory.md](../../memory.md) e `.codex/skills`.
