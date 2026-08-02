# Cadencia de Revisao

## Regra

A cada 4 commits ou antes de deploy, executar revisao rigorosa com `$solar-code-review`.

## Severidade

- P0: quebra build, perda de dados, credencial exposta, falha total de login/demo, vulnerabilidade critica.
- P1: fluxo principal quebrado, deploy impossivel, bug de dados relevante, rota protegida acessivel sem sessao, regressao responsiva severa.
- P2: problema importante, mas com workaround ou impacto limitado.
- P3: melhoria, limpeza, polish ou teste adicional.

## Politica de aceite

- P0 = 0
- P1 = 0
- P2 permitido apenas se documentado em `memory.md` com plano.
- P3 pode seguir para backlog.

## Checklist

- `git status` limpo ou mudancas entendidas.
- Lint, typecheck, build e smoke test executados.
- Landing -> login demo -> dashboard funcionando.
- Seeds previsiveis.
- Modulos com fronteiras claras.
- Documentacao atualizada junto com mudancas.
- Nenhuma ferramenta autenticada adicionada sem credencial explicita.
- Nenhum segredo em arquivos versionados.
