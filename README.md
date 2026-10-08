# BOLT Golf Cars — boltgolfcars.com

Sitio oficial de BOLT (renta y venta de golf carts premium en Punta Cana).
Next.js 16 · Tailwind 4 · export estático · bilingüe ES (raíz) + EN (/en) · 68 páginas.

## Comandos

```bash
npm run dev                  # desarrollo en localhost:3000
npm run build                # build de PRODUCCIÓN (indexable, dominio raíz)
```

**Publicar:** el sitio se publica solo con cada `git push` a `main`, después de pasar
las pruebas (GitHub Actions, `.github/workflows/deploy.yml`). Push únicamente con el OK
de Kenny.

- **NO usar** `./scripts/deploy-prod.sh`: publica en boltgolfcars.com sin pasar las pruebas.
- **NO usar** `./scripts/deploy-preview.sh`: hoy reemplazaría el sitio en vivo por el
  preview (sin dominio y oculto a Google).

El entorno se decide solo: `BASE_PATH=/bolt-web` = preview (noindex, robots
Disallow, URLs del preview); sin `BASE_PATH` = producción (indexable, URLs de
boltgolfcars.com). No hay que tocar código para lanzar.

## Runbook de lanzamiento (F4)

1. **DNS en Hostinger (hPanel → Dominios → boltgolfcars.com → DNS):**
   - Cambiar el registro **A** de `@` (hoy 212.85.28.106, el WordPress) por
     los 4 de GitHub Pages: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`.
   - Cambiar el **CNAME** de `www` para que apunte a
     `kennyrosario18-max.github.io` (hoy apunta al dominio raíz).
   - **NO tocar** el CNAME de `reservas` (sitio legado, sigue vivo).
2. **Dominio en GitHub Pages:** `gh api -X PUT repos/kennyrosario18-max/bolt-web/pages -f cname=boltgolfcars.com`
3. **Deploy:** `git push` a `main` (solo con el OK de Kenny): GitHub Actions corre las
   pruebas y publica solo si todo pasa. No usar `./scripts/deploy-prod.sh`.
4. **HTTPS:** esperar el certificado (~15-60 min tras propagar el DNS) y
   activar "Enforce HTTPS": `gh api -X PUT repos/kennyrosario18-max/bolt-web/pages -F https_enforced=true`
5. **Google Search Console:** agregar propiedad `boltgolfcars.com` (verificación
   por DNS TXT en Hostinger), enviar `https://boltgolfcars.com/sitemap.xml`.
6. **Redirecciones del sitio legado** (cuando Kenny lo ordene): en el repo
   `kennyrosario18-max/bolt`, reemplazar páginas por redirects 301/meta-refresh
   a las equivalentes del sitio nuevo. Los QR impresos siguen funcionando.

## Estructura

- `src/content/` — datos de negocio (modelos, precios, zonas, blog). Editar aquí.
- `src/views/` — páginas bilingües compartidas (about, faq, support, policy…).
- `src/app/(es)/` — rutas en español (raíz) · `src/app/en/` — rutas en inglés.
- `src/lib/site-url.ts` — detección preview/producción.
- Fuente de verdad de marca: memoria del asistente + reservas.boltgolfcars.com/brand.

Construido con Claude Code. Tres auditorías multi-agente aplicadas (jul/2026).
