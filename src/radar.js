function generateRadarSVG(axes) {
  const labels = Object.keys(axes);
  const values = Object.values(axes);
  const n = labels.length;
  const cx = 300, cy = 300, r = 200;
  const angleStep = (2 * Math.PI) / n;

  let points = '';
  let grid = '';
  let labelsSvg = '';

  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + i * angleStep;
    const x = cx + Math.cos(angle) * r * (values[i] / 100);
    const y = cy + Math.sin(angle) * r * (values[i] / 100);
    points += `${x},${y} `;

    const gx = cx + Math.cos(angle) * r;
    const gy = cy + Math.sin(angle) * r;
    grid += `<line x1="${cx}" y1="${cy}" x2="${gx}" y2="${gy}" stroke="#333" stroke-width="1"/>`;

    const lx = cx + Math.cos(angle) * (r + 30);
    const ly = cy + Math.sin(angle) * (r + 30);
    labelsSvg += `<text x="${lx}" y="${ly}" fill="#ccc" font-family="monospace" font-size="14" text-anchor="middle">${labels[i]}</text>`;
  }

  // Concentric circles
  let circles = '';
  for (let level = 20; level <= 100; level += 20) {
    const rr = r * (level / 100);
    circles += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#222" stroke-width="1"/>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <rect width="100%" height="100%" fill="#0d1117"/>
  ${circles}
  ${grid}
  <polygon points="${points.trim()}" fill="#39d353" fill-opacity="0.35" stroke="#39d353" stroke-width="2"/>
  ${labelsSvg}
  <text x="300" y="40" fill="#ffffff" font-family="monospace" font-size="18" text-anchor="middle" font-weight="bold">Security Radar</text>
</svg>`;
}

module.exports = { generateRadarSVG };
