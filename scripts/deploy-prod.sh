#!/bin/zsh
# Deploy de PRODUCCIÓN a boltgolfcars.com (GitHub Pages con dominio propio).
# Sin BASE_PATH el build sale indexable: robots index/follow, robots.txt Allow,
# canonicals/og/sitemap apuntando a https://boltgolfcars.com.
# REQUISITO: el DNS de boltgolfcars.com debe apuntar a GitHub Pages (ver README).
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$HOME/.nvm/versions/node/v24.18.0/bin:$PATH"

npm run build
touch out/.nojekyll
# CNAME: le dice a GitHub Pages qué dominio sirve este contenido.
echo "boltgolfcars.com" > out/CNAME

cd out
git init -qb gh-pages
git config user.name "Kenny Rosario"
git config user.email "kennyrosario18@gmail.com"
git add -A
git commit -qm "Deploy producción $(date +%Y-%m-%d)"
git push -qf https://github.com/kennyrosario18-max/bolt-web.git gh-pages
rm -rf .git
echo "PRODUCCIÓN OK → https://boltgolfcars.com"
echo "Nota: el preview kennyrosario18-max.github.io/bolt-web redirige al dominio desde ahora."
