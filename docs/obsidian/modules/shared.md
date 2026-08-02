# Modulo Shared

## Codigo

- Configuracao de site: [../../../src/modules/shared/config/site.ts](../../../src/modules/shared/config/site.ts)
- Utilitarios: [../../../src/modules/shared/lib/utils.ts](../../../src/modules/shared/lib/utils.ts)
- Componentes UI: [../../../src/modules/shared/ui](../../../src/modules/shared/ui)
- Estilos globais: [../../../src/app/globals.css](../../../src/app/globals.css)

## Responsabilidade

Concentrar configuracoes, utilitarios e componentes reutilizaveis que nao pertencem a um dominio especifico.

No Commit 02, o modulo contem:

- nome da empresa ficticia;
- nome do produto;
- email do usuario demo sugerido.
- `cn` para combinar classes Tailwind com seguranca;
- `Button` com variantes operacionais e suporte a `asChild`;
- `Card` e partes de card para listas, ferramentas e registros;
- `Input` e `Textarea` para formularios simples;
- tokens visuais em `globals.css` para base SaaS operacional.

Ver tambem [[../design-system|Design system base]].

## Fronteiras

`shared` nao deve importar modulos de dominio. Modulos de dominio podem importar `shared` quando precisarem de configuracao ou componentes base.

## Proximos incrementos

- Adicionar componentes shadcn/ui apenas quando uma tela concreta precisar deles.
- No Commit 03, reaproveitar `Button` e `Card` na captura de lead demo.
