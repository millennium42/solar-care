# Design System Base

## Objetivo

O design system base do MVP define tokens visuais e componentes pequenos para manter marketing, login e ERP consistentes sem criar uma biblioteca grande antes da necessidade.

## Tokens

Os tokens vivos ficam em [../../src/app/globals.css](../../src/app/globals.css):

- `--background`, `--surface` e `--surface-muted` para fundos;
- `--foreground`, `--muted` e `--line` para texto e bordas;
- `--field`, `--sky`, `--solar` e seus tons suaves para a paleta operacional;
- `--risk` para alertas futuros;
- `--ring` para foco acessivel.

A paleta combina verde operacional, azul tecnico e amarelo solar. A regra e evitar telas dominadas por uma unica familia de cor.

## Componentes

Componentes reutilizaveis ficam em [../../src/modules/shared/ui](../../src/modules/shared/ui):

- `Button`: variantes `default`, `primary`, `secondary`, `ghost` e `warning`; suporta `asChild` para links sem duplicar estilos.
- `Card`: recipiente simples para itens repetidos, ferramentas, registros ou estados resumidos.
- `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`: partes pequenas para manter espacamento consistente.

O utilitario [../../src/modules/shared/lib/utils.ts](../../src/modules/shared/lib/utils.ts) expoe `cn`, combinando `clsx` e `tailwind-merge`.

## shadcn/ui

O arquivo [../../components.json](../../components.json) registra o contrato shadcn/ui com aliases para `src/modules/shared`. O projeto usa apenas componentes copiados e mantidos localmente, adicionados sob demanda.
