const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(js|ts|tsx|jsx|mjs|cjs|json|md|env|yml|yaml)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function scanAxes(root) {
  const files = walk(root);
  let secretHits = 0;
  let debugHits = 0;
  let authHints = 0;
  let configIssues = 0;
  let depHints = 0;

  for (const file of files) {
    let content;
    try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }

    if (/sk_live_[a-zA-Z0-9]{16,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{30,}|xox[baprs]-|AIza[0-9A-Za-z_-]{30,}/.test(content)) secretHits += 3;
    if (/console\.log\s*\(.*?(api.?key|secret|token|password|sk_)/i.test(content) || /debugger;/.test(content)) debugHits += 1;
    if (/(admin|internal|debug)\s*(route|endpoint|path)/i.test(content) && !/(auth|protect|middleware|guard)/i.test(content)) authHints += 1;
    if (file.includes('.env') && !content.includes('.gitignore') && !file.includes('.example')) configIssues += 2;
    if (/"dependencies"|"devDependencies"/.test(content) && /latest|\*|http:\/\//.test(content)) depHints += 1;
  }

  return {
    Secrets: Math.max(5, 100 - secretHits * 12),
    Debug: Math.max(5, 100 - debugHits * 8),
    Auth: Math.max(5, 100 - authHints * 10),
    Config: Math.max(5, 100 - configIssues * 15),
    Deps: Math.max(5, 100 - depHints * 12),
    Hygiene: Math.max(5, 100 - (secretHits + debugHits + configIssues) * 4)
  };
}

module.exports = { scanAxes };
