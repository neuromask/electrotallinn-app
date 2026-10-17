#!/usr/bin/env bash
#
# Deploy/update script for electrotallinn.ee (Nuxt 2 app).
# Run it on the production server from a checkout of this repository:
#   ./deploy.sh
#
# Override defaults with env vars if the paths differ:
#   APP_DIR=/path/to/app APP_NAME=electroapp ./deploy.sh
# By default the project directory is the directory of this script.
#
set -euo pipefail

APP_NAME="${APP_NAME:-electroapp}"
# Directory of this script — the project root. Can be overridden: APP_DIR=/path ./deploy.sh
APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"

cd "$APP_DIR"

# nvm refuses to work when NPM_CONFIG_PREFIX is set (common on shared hosting,
# e.g. /data02/.../.npm-global), and npm fails if that prefix does not exist.
# Drop it for this script only — child processes get the clean environment.
unset NPM_CONFIG_PREFIX npm_config_prefix

# Node major version is pinned in .nvmrc. If the current `node` already matches it
# (e.g. the server already runs Node 24), nvm is not touched at all.
NODE_MAJOR=""
if [ -f .nvmrc ]; then
  NODE_MAJOR="$(tr -d 'v\r\n' < .nvmrc | cut -d. -f1)"
fi
CURRENT_NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"

if [ -n "$NODE_MAJOR" ] && [ "$CURRENT_NODE_MAJOR" != "$NODE_MAJOR" ]; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck disable=SC1090
    . "$NVM_DIR/nvm.sh"
    nvm install
    nvm use
  else
    echo "ERROR: Node ${NODE_MAJOR}.x is required (see .nvmrc), current is $(node -v)," >&2
    echo "       and nvm was not found in $NVM_DIR." >&2
    exit 1
  fi
fi

# webpack 4 (Nuxt 2) needs the legacy OpenSSL provider on Node 17+
export NODE_OPTIONS="--openssl-legacy-provider"

for cmd in node yarn pm2 curl; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: '$cmd' not found for Node $(node -v)." >&2
    echo "Install once: npm install -g yarn@1.22.22 pm2@5" >&2
    exit 1
  fi
done

echo "==> Node $(node -v), yarn $(yarn -v), pm2 $(pm2 -v)"

echo "==> git pull"
git pull --ff-only

echo "==> install dependencies"
# --ignore-engines: yarn 1 aborts on @nuxt/types transitive dependency,
# which declares support only up to Node 19.
yarn install --frozen-lockfile --ignore-engines

echo "==> rebuild native modules for this OS/CPU (sharp)"
# sharp ships platform-specific binaries; never copy node_modules from a dev machine.
npm rebuild sharp
node -e "require('sharp'); console.log('sharp ' + require('sharp/package.json').version + ' OK')"

echo "==> build"
yarn build

echo "==> restart pm2"
# startOrRestart re-applies ecosystem.config.js (script/interpreter/env) without
# `pm2 update`, which would restart the shared daemon and every other app on it.
echo "    app interpreter: $(node -e "console.log(require('./ecosystem.config.js').apps[0].interpreter)")"
pm2 startOrRestart ecosystem.config.js --update-env
pm2 save

echo "==> health check"
PORT="${SERVER_PORT:-}"
if [ -z "$PORT" ] && [ -f .env ]; then
  PORT="$(grep -E '^[[:space:]]*SERVER_PORT=' .env | tail -n 1 | cut -d= -f2- | tr -d '\r' | tr -d '"' | awk '{print $1}')"
fi
PORT="${PORT:-3000}"
for i in 1 2 3 4 5; do
  if curl -fsS "http://localhost:${PORT}/" > /dev/null; then
    echo "OK: application responds on port ${PORT}"
    exit 0
  fi
  sleep 2
done

echo "ERROR: application does not respond on port ${PORT}. Check: pm2 logs ${APP_NAME} --lines 100" >&2
exit 1
