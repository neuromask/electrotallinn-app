// PM2 process configuration for the production server.
// Usage:
//   pm2 startOrReload ecosystem.config.js --update-env
//   pm2 save
//
// IMPORTANT: the pm2 daemon is shared by every application of this user, and the
// daemon itself runs on whatever `node` started it. If another app on this server
// uses a different Node version (e.g. Node 24), never rely on the daemon's Node:
// the interpreter for this app is pinned explicitly below.
const fs = require('fs');
const os = require('os');
const path = require('path');

// Find an installed Node <major> version in nvm and return the path to its binary.
function findNvmNode(major) {
  const nvmDir = process.env.NVM_DIR || path.join(os.homedir(), '.nvm');
  const versionsDir = path.join(nvmDir, 'versions', 'node');

  try {
    const version = fs.readdirSync(versionsDir)
      .filter((dir) => dir.startsWith(`v${major}.`))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .pop();

    if (!version) {
      return null;
    }

    const bin = path.join(versionsDir, version, 'bin', 'node');
    return fs.existsSync(bin) ? bin : null;
  } catch (e) {
    return null;
  }
}

// The required Node major version is pinned in .nvmrc (single source of truth).
function readNvmrcMajor() {
  try {
    const raw = fs.readFileSync(path.join(__dirname, '.nvmrc'), 'utf8').trim();
    const match = raw.match(/^v?(\d+)/);
    return match ? Number(match[1]) : null;
  } catch (e) {
    return null;
  }
}

const nodeMajor = readNvmrcMajor();
const interpreter = (nodeMajor && findNvmNode(nodeMajor)) || process.execPath;

if (nodeMajor && !findNvmNode(nodeMajor)) {
  console.warn(`[ecosystem] Node ${nodeMajor} not found in nvm, using ${interpreter}`);
}

module.exports = {
  apps: [
    {
      name: 'electroapp',
      cwd: __dirname,
      // nuxt 2 CLI: `nuxt start` serves the already built .nuxt bundle
      script: 'node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      // This app always runs on the Node version from .nvmrc, regardless of the
      // Node version the pm2 daemon itself was started with
      interpreter,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      // never watch files in production: it causes random restarts and high CPU usage
      watch: false,
      max_memory_restart: '700M',
      time: true,
      env: {
        NODE_ENV: 'production',
        // webpack 4 (Nuxt 2) uses md4, which OpenSSL 3 (Node 17+) does not provide
        NODE_OPTIONS: '--openssl-legacy-provider'
      }
    }
  ]
};
