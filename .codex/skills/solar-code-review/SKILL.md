---
name: solar-code-review
description: Rigorous code review workflow for the Solar Care ERP/CRM project. Use when reviewing Solar Care commits, pre-deploy changes, pull requests, architecture changes, security-sensitive changes, auth/session changes, data model changes, UI regressions, or every 4 commits as required by codex.md.
---

# Solar Code Review

## Overview

Review Solar Care changes as a blocking engineering gate. Prioritize correctness, deployability, security, data integrity, maintainability, and demo reliability.

## Workflow

1. Read `codex.md`, `memory.md`, and the relevant `docs/obsidian` files.
2. Inspect `git status`, the diff, and recent commits under review.
3. Run the strongest available local validation: lint, typecheck, tests, build, and smoke tests.
4. Review architecture boundaries against the Ponytail policy.
5. Classify findings as P0, P1, P2, or P3.
6. Block progress when any P0 or P1 exists.
7. Update `memory.md` when accepting any P2 risk.

## Severity

- P0: build cannot run, production deploy impossible, secret exposed, data loss, critical auth bypass, total demo failure.
- P1: primary user flow broken, high-risk security bug, serious responsive breakage, seeds/login unreliable, migration or data contract unsafe.
- P2: important issue with limited impact or workaround.
- P3: polish, cleanup, naming, minor test/docs improvement.

## Required Checks

- Each commit keeps the software installable, testable, and runnable.
- Landing -> demo login -> dashboard works.
- No credentials or private tokens are committed.
- Auth-required tools are not introduced without explicit credentials.
- Render build/start commands stay valid.
- Domain modules do not leak unnecessary dependencies into each other.
- UI remains operational and scannable, not a marketing-only shell.
- Documentation changes match code behavior.

## Output Format

Lead with findings ordered by severity. Include file and line when available. Then list open questions, test coverage gaps, and a short verdict.

If there are no P0/P1 findings, state that clearly. Do not bury blocking findings in a summary.

## Peer Review

For broad or risky changes, use subagents for independent review when available. Give them the raw diff and ask for findings only. Merge their findings into one severity-ranked review.
