#!/bin/bash
#
# A new cover, from the PDF to the live site, in one command.
#
#   lib/new-cover.sh "/path/to/State Not Situation - COVER vNN (NNN pages).pdf"
#
# It cuts every flat asset from the PDF at the trim, composes the mockup, the
# banners and the social images, rebuilds the press kit, type-checks, commits
# and pushes. Vercel deploys from the push.
#
# It stops at the first failure and it will not commit a build that does not
# pass. Nothing is pushed if the build fails.
#
# The push uses GitHub's port 443 endpoint. Outbound SSH on port 22 is blocked
# on this machine, and has been since 7 September 2026.

set -euo pipefail

COVER="${1:-}"
REPO="ssh://git@ssh.github.com:443/luxembourgpsychology-cyber/state-not-situation.git"
SITE="https://statenotsituation.com"
cd "$(dirname "$0")/.."

if [ -z "$COVER" ]; then
  echo "Which cover? Pass the KDP PDF:"
  echo "  lib/new-cover.sh \"~/Desktop/.../State Not Situation - COVER v51 (NNN pages).pdf\""
  exit 1
fi
if [ ! -f "$COVER" ]; then
  echo "Not found: $COVER"
  exit 1
fi

echo "── 1/5  Cutting and composing the assets"
python3 lib/make_cover_assets.py "$COVER"

echo
echo "── 2/5  Rebuilding the press kit"
node lib/make-press-kit.mjs

echo
echo "── 3/5  Building the site"
if ! npm run build; then
  echo
  echo "BUILD FAILED. Nothing committed, nothing pushed."
  exit 1
fi

echo
echo "── 4/5  Committing"
git add -A -- . ':!.claude'
if git diff --cached --quiet; then
  echo "No changes — the assets already match this cover."
  exit 0
fi
git commit -q -F - <<MSG
Regenerate the cover assets from $(basename "$COVER")

Cut and composed by lib/make_cover_assets.py, press kit by
lib/make-press-kit.mjs. The build passes.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
git log --oneline -1

echo
echo "── 5/5  Pushing"
export GIT_SSH_COMMAND="ssh -o ConnectTimeout=20 -o BatchMode=yes"
git push "$REPO" HEAD:main
git fetch -q "$REPO" main:refs/remotes/origin/main

echo
echo "Pushed. Vercel is building. Checking the live site…"
for i in $(seq 1 12); do
  sleep 15
  live=$(curl -sL --max-time 25 -o /dev/null -w '%{http_code}' "$SITE/images/cover-front.jpg" || true)
  if [ "$live" = "200" ]; then
    echo "  $SITE is serving. Hard-refresh (Cmd+Shift+R) to see it."
    break
  fi
done

cat <<'NOTE'

Check by eye before you tell anyone:
  public/press/render-1x1-1080.jpg     the mockup
  public/press/banner-web-2400x1000.jpg
  public/press/post-1x1-1080.jpg

And remember the two things a new cover does not change by itself:
  - hero.coverAlt in content/en|fr|de.ts, if the artwork looks different
  - press.facts extent, if the page count moved
NOTE
