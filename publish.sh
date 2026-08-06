#!/bin/sh
# ============================================================
#  Publication STAGING — Motor Boat 74
#
#  Construit le site sur cette machine puis pousse le resultat sur la
#  branche `deploy` de GitHub. Le serveur o2switch n'a plus qu'a tirer :
#  il ne construit rien (pas de Chromium possible sur un mutualise).
#
#  Usage :  ./publish.sh
#           ./publish.sh --no-git-check   (depannage uniquement)
#
#  Contenu de la branche `deploy` :
#     dist/          le site construit et prerendu
#     server/        le serveur Express qui le sert
#     package.json   dependances d'execution uniquement
# ============================================================
set -e

ROOT=$(cd "$(dirname "$0")" && pwd)
cd "$ROOT"
GIT="$ROOT/git.sh"
WORK=".deploy-work"   # arbre de travail de la branche deploy (dans le depot, ignore)

MODE="$1"

# ---- 1. Rien ne part sur le staging sans etre d'abord dans GitHub ----
if [ "$MODE" != "--no-git-check" ]; then
  echo "=== Controle : le code est-il bien dans GitHub ? ==="
  DIRTY=$("$GIT" status --porcelain 2>/dev/null | grep -v 'public/sitemap.xml' || true)
  if [ -n "$DIRTY" ]; then
    echo "ARRET : des modifications ne sont pas committees :"
    echo "$DIRTY" | sed 's/^/    /'
    echo "  Committe puis pousse d'abord."
    exit 3
  fi
  "$GIT" fetch -q origin 2>/dev/null || true
  AHEAD=$("$GIT" rev-list --count 'origin/main..HEAD' 2>/dev/null || echo 0)
  if [ "$AHEAD" != "0" ]; then
    echo "ARRET : $AHEAD commit(s) non pousse(s). Lance : ./git.sh push"
    exit 3
  fi
  echo "  OK : le code local est identique a GitHub."
  echo ""
fi

# ---- 2. Build ----
echo "=== Build statique + prerender ==="
npm run build:static
[ -f "$ROOT/dist/index.html" ] || { echo "ERREUR : build echoue."; exit 1; }

# Le prebuild reecrit public/sitemap.xml : on restaure la version versionnee.
"$GIT" checkout -- public/sitemap.xml 2>/dev/null || true

# ---- 3. Garde-fou : aucune page vide ne part en ligne ----
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
' || { echo ""; echo "ARRET : des pages sont prerendues vides, publication annulee."; exit 2; }

# ---- 4. Preparation de la branche deploy ----
echo ""
echo "=== Preparation de la branche deploy ==="
if [ ! -d "$ROOT/$WORK/.git" ] && [ ! -f "$ROOT/$WORK/.git" ]; then
  rm -rf "$ROOT/$WORK"
  "$GIT" worktree prune
  "$GIT" worktree add -f "$WORK" deploy
fi
"$GIT" -C "$WORK" fetch -q origin deploy 2>/dev/null || true
"$GIT" -C "$WORK" reset -q --hard origin/deploy 2>/dev/null || true

# Table rase : la branche deploy ne contient QUE le site publiable.
find "$ROOT/$WORK" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

cp -R "$ROOT/dist" "$ROOT/$WORK/dist"
cp -R "$ROOT/server" "$ROOT/$WORK/server"

# package.json minimal : uniquement les dependances d'execution.
# On evite ainsi que le serveur tente d'installer puppeteer/vite.
node -e '
const p=require("./package.json");
const keep=["express","dotenv","nodemailer"];
const deps={};
for(const k of keep) deps[k]=p.dependencies[k];
require("fs").writeFileSync(".deploy-work/package.json", JSON.stringify({
  name:p.name, private:true, version:p.version, type:p.type,
  engines:p.engines, scripts:{start:"node server/index.js"}, dependencies:deps
},null,2)+"\n");
'

cat > "$ROOT/$WORK/README.md" <<'TXT'
# MB74-Site — branche `deploy`

Contenu **généré automatiquement** par `./publish.sh` depuis la branche `main`.
Ne rien modifier ici à la main : tout commit direct sera écrasé.

Cette branche contient le site déjà construit (`dist/`) et le serveur qui le
sert (`server/`). Le serveur o2switch se contente de la tirer, il ne construit
rien — Chromium, nécessaire au prerender, ne tourne pas sur un mutualisé.
TXT

# ---- 5. Publication ----
SHA=$("$GIT" rev-parse --short HEAD)
"$GIT" -C "$WORK" add -A
if "$GIT" -C "$WORK" diff --cached --quiet 2>/dev/null; then
  echo "  Rien de nouveau a publier (le site construit est identique)."
else
  "$GIT" -C "$WORK" commit -q -m "Publication du site construit depuis main ($SHA)"
  GIT_TERMINAL_PROMPT=0 "$GIT" -C "$WORK" push -q origin HEAD:deploy
  echo "  Branche deploy mise a jour ($SHA)."
fi

echo ""
echo "============================================================"
echo " A COLLER SUR LE TERMINAL o2switch :"
echo ""
echo "   cd ~/mb74-site && git pull && touch tmp/restart.txt"
echo ""
echo "============================================================"
