---
name: solar-smoke-test
description: Smoke-test workflow for the Solar Care ERP/CRM project. Use before every commit, after dependency changes, before Render deploys, after fixing review findings, or whenever landing, demo login, dashboard, CRM, ERP modules, seeds, build, or start commands change.
---

# Solar Smoke Test

## Overview

Validate that Solar Care still works as a demonstrable product after a change. Prefer the strongest checks available in the repo, but do not invent heavyweight infrastructure.

## Workflow

1. Read `package.json` scripts if present.
2. Run dependency install only when dependencies changed or `node_modules` is absent.
3. Run available checks in this order:
   - `npm run lint`
   - `npm run typecheck`
   - `npm test`
   - `npm run build`
4. Start the app when a route-level smoke test is needed.
5. Exercise the critical path:
   - landing page loads;
   - top login button is visible;
   - demo login succeeds;
   - dashboard renders seeded data;
   - one CRM or Solar ERP page renders.
6. Stop any dev server started for the test.
7. Report exact commands, pass/fail status, and any skipped checks.

## If Scripts Are Missing

For early commits, scripts may not exist. In that case:

- State what is missing.
- Add the smallest useful script if the current commit owns project setup.
- Otherwise report the gap and avoid pretending validation passed.

## Render Checks

Before deploy:

- Confirm `.env.example` exists and contains no real secrets.
- Confirm `npm ci && npm run build` works from a clean dependency graph when practical.
- Confirm `npm start` serves the production build.
- Confirm healthcheck route returns success if implemented.

After deploy:

- Test the public URL.
- Exercise landing -> demo login -> dashboard.
- Record failures with reproduction steps.
