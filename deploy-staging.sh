#!/bin/sh
# ============================================================
#  Déploiement STAGING — Motor Boat 74
#  Construit le site en local puis synchronise dist/ vers o2switch.
#
#  Usage :  ./deploy-staging.sh
#           ./deploy-staging.sh --build-only    (construit sans envoyer)
#           ./deploy-staging.sh --dry-run       (montre ce qui serait envoyé)
#
#  La configuration serveur vit dans .deploy.env (non versionné).
# ============================================================
set -e

ROOT=$(cd "$(dirname "$0")" && pwd)
cd "$ROOT"

# ---- 1. Configuration ----
if [ ! -f "$ROOT/.deploy.env" ]; then
  echo "ERREUR : $ROOT/.deploy.env introuvable."
  echo "Cree-le a partir de .deploy.env.example :"
  echo "  cp .deploy.env.example .deploy.env  puis renseigne les valeurs."
  exit 1
fi
. "$ROOT/.deploy.env"

for v in SSH_USER SSH_HOST SSH_PORT STAGING_PATH; do
  eval "val=\$$v"
  if [ -z "$val" ]; then echo "ERREUR : $v non defini dans .deploy.env"; exit 1; fi
done

MODE="$1"

# ---- 2. Garde-fou : rien ne part sur le staging sans etre d'abord dans GitHub ----
# (contournable avec --no-git-check, a n'utiliser qu'en depannage)
if [ "$MODE" != "--no-git-check" ]; then
  echo "=== Controle : le code est-il bien dans GitHub ? ==="
  GIT="$ROOT/git.sh"

  DIRTY=$("$GIT" status --porcelain 2>/dev/null | grep -v 'public/sitemap.xml' || true)
  if [ -n "$DIRTY" ]; then
    echo "ARRET : des modifications ne sont pas committees :"
    echo "$DIRTY" | sed 's/^/    /'
    echo ""
    echo "  Committe-les d'abord, puis relance :"
    echo "    ./git.sh add -A && ./git.sh commit -m \"...\" && ./git.sh push"
    exit 3
  fi

  "$GIT" fetch -q origin 2>/dev/null || true
  AHEAD=$("$GIT" rev-list --count 'origin/main..HEAD' 2>/dev/null || echo 0)
  if [ "$AHEAD" != "0" ]; then
    echo "ARRET : $AHEAD commit(s) local(aux) non pousse(s) sur GitHub."
    echo "  Lance d'abord :  ./git.sh push"
    exit 3
  fi
  echo "  OK : le code local est identique a GitHub."
  echo ""
fi

# ---- 3. Build ----
echo "=== Build statique + prerender ==="
npm run build:static

if [ ! -f "$ROOT/dist/index.html" ]; then
  echo "ERREUR : dist/index.html absent, le build a echoue."
  exit 1
fi

# Le prebuild reecrit public/sitemap.xml (toutes les dates lastmod du jour).
# dist/ a deja recu la version fraiche : on restaure le fichier versionne
# pour ne pas salir le depot a chaque deploiement.
"$ROOT/git.sh" checkout -- public/sitemap.xml 2>/dev/null || true

# Garde-fou : on refuse d'envoyer un build ou des pages sont vides.
echo ""
echo "=== Controle qualite du prerender ==="
node -e '
const fs=require("fs"),path=require("path");
let bad=[],total=0;
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
 if(e.isDirectory())walk(p);
 else if(e.name==="index.html"){total++;const s=fs.readFileSync(p,"utf8");
  const m=s.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if(!m||m[1].length<200)bad.push("/"+path.relative("dist",path.dirname(p)));}}})("dist");
console.log(`  ${total-bad.length}/${total} pages avec contenu`);
if(bad.length){console.log("  PAGES VIDES :");bad.forEach(b=>console.log("   -",b));process.exit(2);}
' || { echo ""; echo "ARRET : des pages sont prerendues vides, deploiement annule."; exit 2; }

if [ "$MODE" = "--build-only" ]; then
  echo ""
  echo "Build pret dans dist/ (non deploye)."
  exit 0
fi

# ---- 3. Envoi ----
RSYNC_OPTS="-az --delete --exclude=.well-known --exclude=cgi-bin --exclude=.htpasswd"
[ "$MODE" = "--dry-run" ] && RSYNC_OPTS="$RSYNC_OPTS --dry-run -v"

echo ""
echo "=== Synchronisation vers $SSH_HOST:$STAGING_PATH ==="
rsync $RSYNC_OPTS \
  -e "ssh -p $SSH_PORT" \
  "$ROOT/dist/" \
  "$SSH_USER@$SSH_HOST:$STAGING_PATH/"

echo ""
if [ "$MODE" = "--dry-run" ]; then
  echo "Simulation terminee (rien n'a ete modifie)."
else
  echo "Deploiement termine -> https://staging.motorboat74.com"
fi
