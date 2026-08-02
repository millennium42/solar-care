# Desenvolvimento Local

## Caminho ativo

O desenvolvimento foi movido para `/home/millennium42/solar-care` em WSL porque a instalacao de `node_modules` em `/mnt/c/Users/Admin/Documents/Solar Care` ficou muito lenta.

O caminho Windows original pode ser sincronizado a partir do WSL quando houver commit novo.

## Runtime

- Node: `24.18.1`
- npm: `11.16.0`
- Versao fixada em [.nvmrc](../../.nvmrc)
- Variaveis locais em [.env.example](../../.env.example)

## Comandos

```bash
source "$HOME/.nvm/nvm.sh"
nvm use
npm install
npm run dev
```

## Checks obrigatorios

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke
```

O smoke local inicia `next start`, valida a landing, executa `/demo-login`, captura o cookie de sessao e valida o dashboard protegido em `/app`.

## Dependencias

O bootstrap usa apenas dependencias publicas necessarias para o proximo incremento:

- `next`
- `react`
- `react-dom`
- `lucide-react`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `@radix-ui/react-slot`
- `tailwindcss`
- `@tailwindcss/postcss`
- `typescript`
- `eslint`
- `eslint-config-next`

`package.json` usa `overrides` para manter `postcss` e `sharp` em versoes corrigidas enquanto o Next atualiza suas dependencias transitivas.

## Build

O script `npm run build` usa `next build --webpack`.

Motivo: no bootstrap, o build padrao do Next 16 com Turbopack falhou com erro interno ao processar `src/app/globals.css`. Webpack manteve o build de producao previsivel para o MVP e para o Render.
