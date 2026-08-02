---
name: solar-component-builder
description: Build Solar Care UI components and screens consistently. Use when creating or changing Next.js, React, shadcn/ui, Tailwind, lucide-react, dashboard, CRM, ERP, landing page, forms, tables, kanban, charts, or responsive UI components for the Solar Care project.
---

# Solar Component Builder

## Overview

Create production-shaped UI for Solar Care without bloating the project. Favor useful operational screens over decorative pages.

## Workflow

1. Read `codex.md`, `memory.md`, and the relevant module docs.
2. Inspect existing components and styles before adding new patterns.
3. Add only the shadcn/ui components and npm packages needed for the current task.
4. Use lucide-react icons for icon buttons and tool actions.
5. Keep page sections unframed; reserve cards for repeated items, tools, modals, and bounded records.
6. Validate mobile and desktop layout.
7. Add or update focused tests when behavior changes.
8. Run `$solar-smoke-test` or equivalent local scripts before commit.

## Design Rules

- Build the real app screen first, not a generic landing placeholder.
- CRM/ERP surfaces should be dense, quiet, scannable, and fast for repeated work.
- Avoid one-note palettes and oversized marketing composition inside the app.
- Avoid nested cards.
- Do not use visible helper text to explain obvious UI mechanics.
- Text must fit its containers on mobile and desktop.
- Use stable dimensions for boards, tables, tiles, counters, and icon buttons.
- Keep accessibility basics: labels, keyboard focus, color contrast, semantic controls.

## Solar Care Patterns

- Landing page: fictitious solar company, clear CTA to ERP login, real service/product signals.
- Dashboard: KPIs, work queues, status, alerts, and next actions.
- CRM: accounts, contacts, opportunities, activities, timeline, pipeline.
- Solar ERP: proposals, site surveys, installation projects, equipment, documents, work orders.
- Tools: calculator, checklist, estimator, document tracker, kanban.

## Constraints

- Do not add auth-required integrations without credentials.
- Do not add heavy charting, animation, or 3D libraries unless the current screen demonstrably needs them.
- Prefer simple CSS or existing dependencies before adding animation libraries.
- Update docs when creating a reusable component or new screen pattern.
