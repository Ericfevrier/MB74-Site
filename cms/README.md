# CMS Directus — Motor Boat 74

Back-office headless : auth, rôles, gestion de contenu, SEO, médias, formulaires.
Le site React reste **statique prerendu** ; il est régénéré à chaque publication.

## 1. Dev local

```bash
cd cms
cp .env.example .env        # remplir les secrets (openssl rand -hex 32 pour KEY/SECRET)
docker compose up -d        # nécessite Docker Desktop
# Admin : http://localhost:8055
```

Première connexion = ADMIN_EMAIL / ADMIN_PASSWORD du .env.
On crée ensuite les collections de [CONTENT-MODEL.md](./CONTENT-MODEL.md), puis on
exporte le schéma (`directus schema snapshot ./snapshot.yml`) pour le versionner.

## Scripts (schéma + import)
Les scripts lisent les identifiants depuis l'environnement (jamais en dur).
Charger `cms/.env` avant de les lancer :
```bash
cd cms
export $(grep -v '^#' .env | xargs)        # charge ADMIN_EMAIL / ADMIN_PASSWORD / DIRECTUS_URL
node bootstrap-schema.mjs                   # crée les collections (idempotent)
npx tsx import-data.ts                      # importe le contenu de src/data/*
```

## 2. Migration du contenu existant
Les données aujourd'hui en dur (`src/data/*.ts`) seront importées dans Directus via un
script d'amorçage (collections used_boats, boat_models, hivernage_cities, blog…).
Le site garde un **fallback statique** pendant la transition : aucune régression.

## 3. Intégration côté site
- Un client CMS (`src/lib/cms.ts`) lit l'API Directus (lecture seule, contenu publié).
- Au build, on récupère le contenu → prerendering → HTML statique (SEO).
- Formulaires → POST vers une collection `contact_submissions` + email (nodemailer).

## 4. Déploiement o2switch
> ⚠️ À CONFIRMER : ton offre o2switch doit autoriser une **app Node.js persistante**
> (cPanel « Setup Node.js App »). Sinon : Directus sur un petit VPS, front sur o2switch.

1. **Base** : créer une base MariaDB + utilisateur dans cPanel.
2. **App Node** : cPanel → Setup Node.js App → Node 20 → `npx directus start`
   (ou un `app.js` qui démarre Directus), variables d'env = celles du .env (DB cPanel,
   KEY/SECRET, PUBLIC_URL = https://cms.motorboat74.com).
3. **Sous-domaine** : `cms.motorboat74.com` (admin + API).
4. **Migrations** : `directus database migrate:latest` + appliquer le snapshot.
5. **Rebuild auto** : Flow Directus (on publish) → webhook → script de build du site.

## 5. Ce dont j'ai besoin de toi (je n'ai pas accès à o2switch)
- [ ] Confirmer : ton offre supporte une app Node.js qui tourne en continu ?
- [ ] Créer une base MariaDB (nom + utilisateur) — mot de passe à ne PAS coller ici.
- [ ] Accès SSH activé sur o2switch ?
- [ ] Sous-domaine souhaité pour le CMS (`cms.` ? `admin.` ?).
- [ ] Docker Desktop installé en local (pour le dev) — ou je prépare une variante sans Docker.
