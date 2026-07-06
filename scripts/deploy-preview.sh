#!/bin/zsh
# Deploy del PREVIEW a GitHub Pages (kennyrosario18-max.github.io/bolt-web).
# El BASE_PATH activa automáticamente: noindex, robots Disallow, URLs del preview.
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$HOME/.nvm/versions/node/v24.18.0/bin:$PATH"

BASE_PATH=/bolt-web npm run build
touch out/.nojekyll

cd out
git init -qb gh-pages
git config user.name "Kenny Rosario"
git config user.email "kennyrosario18@gmail.com"
git add -A
git commit -qm "Deploy preview $(date +%Y-%m-%d)"
git push -qf https://github.com/kennyrosario18-max/bolt-web.git gh-pages
rm -rf .git
echo "PREVIEW OK → https://kennyrosario18-max.github.io/bolt-web/"
