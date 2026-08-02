# Modulo Solar

## Codigo

- Tipos de dominio: [../../../src/modules/solar/types.ts](../../../src/modules/solar/types.ts)
- Seeds automaticos: [../../../src/modules/solar/data/seed.ts](../../../src/modules/solar/data/seed.ts)
- Repositorio read-only: [../../../src/modules/solar/repositories/solar-repository.ts](../../../src/modules/solar/repositories/solar-repository.ts)
- Workspace Solar: [../../../src/modules/solar/components/solar-operations-workspace.tsx](../../../src/modules/solar/components/solar-operations-workspace.tsx)
- Ferramentas de instaladora: [../../../src/modules/solar/components/installer-productivity-tools.tsx](../../../src/modules/solar/components/installer-productivity-tools.tsx)
- Rota protegida: [../../../src/app/app/solar/page.tsx](../../../src/app/app/solar/page.tsx)
- Barrel do modulo: [../../../src/modules/solar/index.ts](../../../src/modules/solar/index.ts)

## Responsabilidade

Modelar e demonstrar a operacao tecnica da instaladora solar:

- projetos solares;
- vistorias;
- propostas;
- equipamentos;
- marcos de instalacao.
- checklist de vistoria;
- documentos pendentes.

## Conexao CRM

Cada `SolarProject` referencia `accountId` e `opportunityId` dos seeds CRM. A tela `/app/solar` usa esses IDs para mostrar a oportunidade convertida em projeto operacional, sem mover dados CRM para dentro do modulo Solar.

## Tela Solar

A rota `/app/solar` entrega:

- KPIs de projetos ativos, capacidade, receita aprovada e economia mensal;
- cards de projetos com status, kWp, progresso e valor de proposta;
- bloco de vistorias e propostas;
- marcos de instalacao por responsavel;
- lista tecnica de equipamentos.
- calculadora solar simples;
- checklist de vistoria interativo;
- documentos pendentes com estado vazio para bloqueios criticos.

## Fronteiras

`solar` nao depende diretamente de `analytics` ou `marketing`. A tela de app pode compor dados Solar e CRM, mas os seeds de dominio continuam separados.

`validateSolarSeedIntegrity` falha cedo quando projeto, vistoria, proposta, equipamento, marco ou documento referencia uma entidade inexistente.

## Proximos incrementos

- Revisao 02 deve validar acoplamento CRM/Solar, utilidade das ferramentas e responsividade.
- Persistencia SQLite futura deve preservar os contratos de `SolarProject`, `SiteSurvey`, `Proposal`, `Equipment`, `InstallationMilestone`, `SurveyChecklistItem` e `DocumentChecklistItem`.
