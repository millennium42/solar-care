# Modulo Shared

## Codigo

- Configuracao de site: [../../../src/modules/shared/config/site.ts](../../../src/modules/shared/config/site.ts)
- Estilos globais: [../../../src/app/globals.css](../../../src/app/globals.css)

## Responsabilidade

Concentrar configuracoes, utilitarios e componentes reutilizaveis que nao pertencem a um dominio especifico.

No Commit 01, o modulo contem apenas `siteConfig` com:

- nome da empresa ficticia;
- nome do produto;
- email do usuario demo sugerido.

## Fronteiras

`shared` nao deve importar modulos de dominio. Modulos de dominio podem importar `shared` quando precisarem de configuracao ou componentes base.

## Proximos incrementos

- No Commit 02, receber os primeiros componentes base do design system.
- Manter tokens visuais e componentes reutilizaveis pequenos, sem criar uma biblioteca paralela antes de haver repeticao real.
