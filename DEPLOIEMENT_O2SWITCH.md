# Déploiement sur o2switch

Le site est une application **React Router v7** prérendue, servie par un serveur
**Express** (`server/index.js`) qui sert *tout* : documents HTML, assets, API,
administration.

> Express sert aussi les assets, volontairement. Mélanger Apache (assets en
> symlink) et Passenger (document) provoquait des **421 Misdirected Request** en
> HTTP/2. Ne pas réintroduire de symlinks vers `public_html`.

## Architecture

On ne build **pas** sur o2switch : les outils natifs (esbuild, moteur Tailwind)
n'y sont pas compatibles. GitHub Actions construit le bundle et le publie sur une
branche prête à l'emploi ; o2switch ne fait que la récupérer.

| Branche source | Branche publiée | Application | Domaine |
|---|---|---|---|
| `main` | `deploy` | `~/mb74-site` | `staging.motorboat74.com` |
| `production` | `deploy-prod` | `~/mb74-prod` | `motorboat74.com` |

**Le code est identique dans les deux environnements.** Ce sont uniquement les
variables d'environnement de chaque application cPanel qui les distinguent. Une
préprod qui tourne sur un code différent de la prod ne prouve rien.

## Cycle de travail

```bash
# 1. Publier en préprod
git push origin main
# → attendre la fin du workflow, puis en SSH :
cd ~/mb74-site && git fetch origin && git reset --hard origin/deploy && mkdir -p tmp && touch tmp/restart.txt

# 2. Valider sur staging.motorboat74.com

# 3. Mettre en ligne
git push origin main:production
# → puis en SSH :
cd ~/mb74-prod && git fetch origin && git reset --hard origin/deploy-prod && mkdir -p tmp && touch tmp/restart.txt
```

La commande exacte est aussi affichée en fin de workflow, dans l'annotation
GitHub Actions.

**Quand les dépendances ont changé** (`package.json` modifié), intercaler avant
le `touch` :

```bash
source ~/nodevenv/mb74-site/22/bin/activate   # ou mb74-prod
npm install --omit=dev
```

`node` et `npm` n'existent qu'à l'intérieur de ce venv.

### Pourquoi `git reset --hard` et jamais `git pull`

Le workflow fait un `git init` à chaque publication : l'historique des branches
`deploy` / `deploy-prod` est **réécrit en force** à chaque fois. `git pull` ne
peut structurellement pas réconcilier deux historiques sans ancêtre commun — il
échoue avec « Besoin de spécifier comment réconcilier des branches divergentes ».

Corollaire : on ne peut pas figer la prod sur un ancien commit de `deploy`, il
n'existe plus après la publication suivante. D'où deux branches distinctes.

`git reset --hard` ne touche pas aux fichiers non suivis : **`.env` et
`uploads/` survivent** à chaque déploiement.

## Configuration d'une application (cPanel → Setup Node.js App)

| Champ | Préprod | Production |
|---|---|---|
| Node.js version | 22 | 22 |
| Application mode | Production | Production |
| Application root | `mb74-site` | `mb74-prod` |
| Application URL | `staging.motorboat74.com` | `motorboat74.com` |
| Application startup file | `server/index.js` | `server/index.js` |

### Variables d'environnement

À saisir dans *Setup Node.js App* → *Environment variables*, ou dans un `.env` à
la racine de l'application (voir `.env.example`).

> **cPanel gagne sur le fichier.** `dotenv` n'écrase jamais une variable déjà
> présente dans l'environnement. Si une variable est définie dans l'interface
> cPanel, la modifier dans `.env` n'a **aucun effet**. Choisir un seul endroit.

**Propres à chaque environnement — ne jamais partager :**

| Variable | Préprod | Production |
|---|---|---|
| `DB_NAME`, `DB_USER`, `DB_PASSWORD` | base de préprod | base de production |
| `SESSION_SECRET` | clé A | clé B, **différente** |
| `STAGING_PROTECT` | `1` | **absente** |
| `STAGING_USER`, `STAGING_PASS` | renseignés | absents |

`SESSION_SECRET` se génère avec `openssl rand -hex 32`. Sans elle, la clé est
dérivée du mot de passe admin : sûr, mais changer le mot de passe déconnecte
toutes les sessions. Elle ne doit jamais entrer dans le dépôt.

`STAGING_PROTECT=1` déclenche `noindex` + Basic Auth. **En production, cette
variable doit être absente** — sinon le site entier reste bloqué aux robots.

**Communes** : `SMTP_*`, `MAIL_TO`, `MAIL_FROM`, `SITE_URL`.

### Base de données

Créer la base dans cPanel → *Bases de données MySQL* (moteur MariaDB), puis
charger le schéma :

```bash
mysql -u <user> -p <base> < db/schema.sql
```

Sans base configurée, le site tourne sur les données statiques du build et les
formulaires partent seulement par e-mail (non persistés).

Copier le contenu de la préprod vers la production :

```bash
mysqldump -u <user_staging> -p <base_staging> > /tmp/mb74.sql
mysql -u <user_prod> -p <base_prod> < /tmp/mb74.sql
rm /tmp/mb74.sql
```

## Vérifications après déploiement

```bash
curl -s https://motorboat74.com/api/health          # {"ok":true,...}
curl -s https://motorboat74.com/robots.txt          # ne doit PAS contenir Disallow: /
curl -s https://motorboat74.com/sitemap.xml | grep -c '<loc>'
curl -sI https://motorboat74.com/services/depannage/ | head -1   # 301
```

Puis se connecter à `/admin`, redémarrer l'application, recharger : si la session
tient, `SESSION_SECRET` est bien lue.

---

## Développement local

```bash
npm install
npm run dev         # front Vite sur http://localhost:3000
npm run dev:server  # (autre terminal) API Express sur http://localhost:8787
```

Le proxy Vite relaie `/api/*` vers Express.

Pour reproduire exactement la production — c'est `build:ssr` qui produit le HTML
prérendu, pas `build` :

```bash
npm run build:ssr   # génère build/client (pages prérendues)
node server/index.js
```
