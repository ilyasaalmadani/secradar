#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { scanAxes } = require('../src/scan');
const { generateRadarSVG } = require('../src/radar');

const target = process.argv[2] || process.cwd();
const outFile = process.argv[3] || 'security-radar.svg';

console.log('\n🛡️  secradar — local security radar\n');
console.log(`Scanning: ${path.resolve(target)}\n`);

const axes = scanAxes(target);
const svg = generateRadarSVG(axes);

fs.writeFileSync(outFile, svg);
console.log(`Radar chart written to ${outFile}`);
console.log('\nAxes scores (higher = safer):');
Object.entries(axes).forEach(([k, v]) => {
  console.log(`  ${k.padEnd(12)} ${v}/100`);
});
console.log('\nOpen the SVG or embed it in your README.\n');
