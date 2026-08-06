#!/bin/sh
# ============================================================
#  Publication STAGING — Motor Boat 74
#
#  Construit le bundle SSR sur cette machine et le publie sur la branche
#  `deploy`, que le serveur o2switch tire ensuite. Reproduit ce que fait
#  .github/workflows/deploy.yml, en s'en passant quand Actions est indisponible.
#
#  o2switch ne construit jamais : ses outils natifs (esbuild, Tailwind) sont
#  incompatibles avec le mutualise.
#
#  Usage :  ./publish.sh
#           ./publish.sh --no-git-check   (depannage uniquement)
# ============================================================
set -e

ROOT=$(cd "$(dirname "$0")" && pwd)
cd "$ROOT"
GIT="$ROOT/git.sh"
WORK=".deploy-work"

MODE="$1"

# ---- 1. Rien ne part en ligne sans etre d'abord sur GitHub ----
if [ "$MODE" != "--no-git-check" ]; then
  echo "=== Controle : le code est-il bien sur GitHub ? ==="
  DIRTY=$("$GIT" status --porcelain 2>/dev/null || true)
  if [ -n "$DIRTY" ]; then
    echo "ARRET : des modifications ne sont pas committees :"
    echo "$DIRTY" | sed 's/^/    /'
    exit 3
  fi
  "$GIT" fetch -q origin 2>/dev/null || true
  AHEAD=$("$GIT" rev-list --count 'origin/main..HEAD' 2>/dev/null || echo 0)
  if [ "$AHEAD" != "0" ]; then
    echo "ARRET : $AHEAD commit(s) non pousse(s). Lance : ./git.sh push"
    exit 3
  fi
  echo "  OK"
  echo ""
fi

# ---- 2. Typecheck puis build ----
echo "=== Typecheck ==="
npm run lint

echo ""
echo "=== Build SSR + prerender ==="
npm run build:ssr
[ -f "$ROOT/build/client/index.html" ] || { echo "ERREUR : build echoue."; exit 1; }

# ---- 3. Garde-fou : aucune page vide ne part en ligne ----
# C'est le controle qui aurait evite les 53 pages vides livrees pendant des semaines.
echo ""
echo "=== Controle qualite du prerender ==="
node -e '
const fs=require("fs"),path=require("path");
const root="build/client";let bad=[],ok=0;
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
 if(e.isDirectory())walk(p);
 else if(e.name==="index.html"){
  const s=fs.readFileSync(p,"utf8");
  const m=s.match(/<div id="root"[^>]*>([\s\S]*)<\/div>\s*<script/)||s.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const t=(m?m[1]:"").replace(/<script[\s\S]*?<\/script>/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const r="/"+path.relative(root,path.dirname(p));
  // /admin est un shell de connexion volontairement vide (noindex).
  if(t.length<300){ if(r!=="/admin") bad.push(r); } else ok++;
 }}})(root);
console.log(`  ${ok} pages avec contenu`);
if(bad.length){console.log("  PAGES VIDES :");bad.forEach(b=>console.log("   -",b));process.exit(2);}
' || { echo ""; echo "ARRET : des pages sont prerendues vides, publication annulee."; exit 2; }

# ---- 4. Assemblage du bundle sur la branche deploy ----
echo ""
echo "=== Publication sur la branche deploy ==="
if [ ! -e "$ROOT/$WORK/.git" ]; then
  rm -rf "$ROOT/$WORK"
  "$GIT" worktree prune
  "$GIT" worktree add -f "$WORK" deploy
fi
"$GIT" -C "$WORK" fetch -q origin deploy 2>/dev/null || true
"$GIT" -C "$WORK" reset -q --hard origin/deploy 2>/dev/null || true

find "$ROOT/$WORK" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R "$ROOT/build" "$ROOT/$WORK/build"
cp -R "$ROOT/server" "$ROOT/$WORK/server"
cp "$ROOT/package.json" "$ROOT/package-lock.json" "$ROOT/$WORK/"
cp "$ROOT/.env.example" "$ROOT/$WORK/" 2>/dev/null || true

# node_modules et tmp/ (redemarrage Passenger) appartiennent au serveur.
printf 'node_modules/\ntmp/\n.env\n.env.local\n' > "$ROOT/$WORK/.gitignore"

SHA=$("$GIT" rev-parse --short HEAD)
"$GIT" -C "$WORK" add -A
if "$GIT" -C "$WORK" diff --cached --quiet 2>/dev/null; then
  echo "  Rien de nouveau a publier."
else
  "$GIT" -C "$WORK" commit -q -m "deploy: bundle SSR depuis $SHA"
  GIT_TERMINAL_PROMPT=0 "$GIT" -C "$WORK" push -q -f origin HEAD:deploy
  echo "  Branche deploy mise a jour ($SHA)."
fi

# Les dependances d'execution ont-elles change ? Determine si npm install est requis.
NEEDS_INSTALL=$("$GIT" -C "$WORK" diff --name-only HEAD~1 HEAD 2>/dev/null | grep -c 'package.json\|package-lock.json' || echo 0)

echo ""
echo "============================================================"
echo " A COLLER SUR LE TERMINAL o2switch :"
echo ""
if [ "$NEEDS_INSTALL" != "0" ]; then
  echo "   cd ~/mb74-site && git pull && source ~/nodevenv/mb74-site/22/bin/activate \\"
  echo "     && npm install --omit=dev && mkdir -p tmp && touch tmp/restart.txt"
  echo ""
  echo " (les dependances ont change -> npm install necessaire)"
else
  echo "   cd ~/mb74-site && git pull && mkdir -p tmp && touch tmp/restart.txt"
fi
echo "============================================================"
