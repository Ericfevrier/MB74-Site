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
| `main` | `deploy` | `~/mb74-site` | `motorboat74.com` |

**Un seul environnement, depuis le 2026-08-07.** La préprod a été retirée :
`staging.motorboat74.com` ne sert plus l'application, et le domaine de
production a été basculé sur l'application `~/mb74-site`. C'est donc `main` qui
part directement en ligne.

> Les branches `production` et `deploy-prod` existent encore dans le dépôt et
> l'application `~/mb74-prod` sur le serveur, mais **plus rien ne les sert**.
> Elles sont figées sur l'état d'avant la bascule. Ne pas s'en servir comme
> référence de ce qui est en ligne.

## Cycle de travail

```bash
git push origin main
# → attendre la fin du workflow GitHub Actions, puis en SSH :
cd ~/mb74-site && git fetch origin && git reset --hard origin/deploy && mkdir -p tmp && touch tmp/restart.txt
```

Sans préprod, `main` **est** la production : ce qui est poussé est ce que voient
les visiteurs dès la commande SSH lancée. Le garde-fou qui reste est celui du
build — typecheck, puis contrôle qu'aucune page n'est prérendue vide (voir
`publish.sh`). Vérifier localement avec `npm run build:ssr && node server/index.js`
avant de pousser.

La commande exacte est aussi affichée en fin de workflow, dans l'annotation
GitHub Actions.

**Quand les dépendances ont changé** (`package.json` modifié), intercaler avant
le `touch` :

```bash
source ~/nodevenv/mb74-site/22/bin/activate
npm install --omit=dev
```

`node` et `npm` n'existent qu'à l'intérieur de ce venv.

### Pourquoi `git reset --hard` et jamais `git pull`

Le workflow fait un `git init` à chaque publication : l'historique de la branche
`deploy` est **réécrit en force** à chaque fois. `git pull` ne peut
structurellement pas réconcilier deux historiques sans ancêtre commun — il
échoue avec « Besoin de spécifier comment réconcilier des branches divergentes ».

Corollaire : `deploy` ne garde aucun historique. Pour revenir en arrière, on
revient sur `main` (`git revert`) et on republie — il n'existe pas d'ancien
bundle à récupérer sur `deploy`.

`git reset --hard` ne touche pas aux fichiers non suivis : **`.env` et
`uploads/` survivent** à chaque déploiement.

## Configuration d'une application (cPanel → Setup Node.js App)

| Champ | Valeur |
|---|---|
| Node.js version | 22 |
| Application mode | Production |
| Application root | `mb74-site` |
| Application URL | `motorboat74.com` |
| Application startup file | `server/index.js` |

### Variables d'environnement

À saisir dans *Setup Node.js App* → *Environment variables*, ou dans un `.env` à
la racine de l'application (voir `.env.example`).

> **cPanel gagne sur le fichier.** `dotenv` n'écrase jamais une variable déjà
> présente dans l'environnement. Si une variable est définie dans l'interface
> cPanel, la modifier dans `.env` n'a **aucun effet**. Choisir un seul endroit.

**À vérifier sur l'application en ligne :**

| Variable | Valeur attendue |
|---|---|
| `DB_NAME`, `DB_USER`, `DB_PASSWORD` | base de production |
| `SESSION_SECRET` | clé propre, générée |
| `STAGING_PROTECT` | **absente** |
| `STAGING_USER`, `STAGING_PASS` | absentes |

`SESSION_SECRET` se génère avec `openssl rand -hex 32`. Sans elle, la clé est
dérivée du mot de passe admin : sûr, mais changer le mot de passe déconnecte
toutes les sessions. Elle ne doit jamais entrer dans le dépôt.

`STAGING_PROTECT=1` déclenche `noindex` + Basic Auth. Le mécanisme reste dans le
code, mais l'application servant désormais le domaine public, **cette variable
doit être absente** — sinon le site entier est bloqué aux robots. C'est le point
à contrôler en premier si le trafic organique s'effondre.

**Communes** : `SMTP_*`, `MAIL_TO`, `MAIL_FROM`, `SITE_URL`.

### Base de données

Créer la base dans cPanel → *Bases de données MySQL* (moteur MariaDB), puis
charger le schéma :

```bash
mysql -u <user> -p <base> < db/schema.sql
```

Sans base configurée, le site tourne sur les données statiques du build et les
formulaires partent seulement par e-mail (non persistés).

Il n'y a plus qu'une base. Sauvegarde avant toute opération dessus :

```bash
mysqldump -u <user> -p <base> > ~/sauvegardes/mb74-$(date +%F).sql
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
