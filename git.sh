#!/bin/sh
# git via Docker — aucun git natif n'est installé sur cette machine.
# Usage : ./git.sh status | ./git.sh add -A | ./git.sh commit -m "msg" | ./git.sh push
REPO=$(cd "$(dirname "$0")" && pwd)
# -t seulement si on est dans un vrai terminal (sinon docker refuse)
if [ -t 0 ]; then TTY="-it"; else TTY="-i"; fi
exec docker run --rm $TTY \
  -v "$REPO":/repo \
  -w /repo \
  alpine/git "$@"
