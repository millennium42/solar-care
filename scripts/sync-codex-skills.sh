#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$repo_root/.codex/skills"
target_dir="${CODEX_HOME:-$HOME/.codex}/skills"

mkdir -p "$target_dir"

for skill_dir in "$source_dir"/*; do
  [ -d "$skill_dir" ] || continue
  skill_name="$(basename "$skill_dir")"
  rm -rf "$target_dir/$skill_name"
  cp -R "$skill_dir" "$target_dir/$skill_name"
done

echo "Synced Solar Care skills to $target_dir"
