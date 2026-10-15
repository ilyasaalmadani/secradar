const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(js|ts|tsx|jsx|json|md|env)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function scanAxes(root) {
  const files = walk(root);
  let secretHits = 0;
  let debugHits = 0;
  let authHints = 0;
  let configIssues = 0;

  for (const file of files) {
    let content;
    try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }

    if (/sk_live_|AKIA|ghp_|xox[baprs]-|AIza/.test(content)) secretHits += 2;
    if (/console\.log\s*\(.*?(key|secret|token)|debugger;/.test(content)) debugHits += 1;
    if (/admin|internal|debug/.test(content) && !/auth|protected|middleware/.test(content)) authHints += 1;
    if (/\.env/.test(file) && !/\.gitignore/.test(content)) configIssues += 1;
  }

  // Higher score = better (safer)
  return {
    Secrets: Math.max(0, 100 - secretHits * 15),
    Debug: Math.max(0, 100 - debugHits * 10),
    Auth: Math.max(0, 100 - authHints * 12),
    Config: Math.max(0, 100 - configIssues * 20),
    Hygiene: Math.max(0, 100 - (secretHits + debugHits) * 5)
  };
}

module.exports = { scanAxes };
