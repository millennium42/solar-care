# Modulo Auth

## Codigo

- Usuario demo: [../../../src/modules/auth/config/demo-user.ts](../../../src/modules/auth/config/demo-user.ts)
- Sessao e guardas: [../../../src/modules/auth/session.ts](../../../src/modules/auth/session.ts)
- Rota de login demo: [../../../src/app/demo-login/route.ts](../../../src/app/demo-login/route.ts)
- Rota de logout demo: [../../../src/app/demo-logout/route.ts](../../../src/app/demo-logout/route.ts)
- Area protegida: [../../../src/app/app/page.tsx](../../../src/app/app/page.tsx)
- Layout protegido: [../../../src/app/app/layout.tsx](../../../src/app/app/layout.tsx)

## Responsabilidade

Entregar login automatico de demonstracao sem provedor externo.

O fluxo atual:

1. O visitante clica em `Entrar no ERP`.
2. `/demo-login` cria o cookie HTTP-only `solar-care-demo-session`.
3. A rota redireciona para `/app`.
4. `requireDemoSession` protege o segmento `/app`, incluindo `/app/crm`, pelo layout e redireciona para `/` quando nao ha sessao valida.
5. `/demo-logout` remove o cookie e volta para a landing.

## Decisoes

- O MVP usa um unico usuario demo: `demo@solarcare.local`.
- A sessao dura 8 horas e nao depende de banco, provedor OAuth nem ferramenta autenticada.
- Este modulo pode importar `shared/config`, mas nao deve depender de CRM, Solar ou Analytics.
- O valor fixo do cookie e aceito somente porque `/demo-login` e publico e ainda nao ha dados sensiveis no MVP; auth real deve substituir esse contrato antes de permissoes reais.
- Redirecionamentos usam `NEXT_PUBLIC_APP_URL` ou headers `x-forwarded-*` para nao apontar para host interno do Render.

## Proximos incrementos

- Quando a camada de dados existir, associar seeds ao usuario demo.
- Quando auth real entrar, substituir o cookie demo por provider ou credenciais locais sem quebrar o fluxo de demonstracao.
