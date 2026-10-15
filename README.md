# secradar

> Local security radar for your project.  
> Scan multiple axes and generate a pure SVG radar chart of your posture.

```bash
npx secradar
```

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Novelty

Most security tools give you a list of findings.  
**secradar** gives you a visual radar of your security posture across axes (Secrets, Debug, Auth, Config, Hygiene).

The output is a self-contained SVG you can open in a browser or embed directly in a README — no external services, no dashboard to host.

## Quick start

```bash
npx secradar
# or
npx secradar ./my-project security-radar.svg
```

This writes `security-radar.svg` in the current directory.

## Example

The generated SVG looks like a classic radar/spider chart:

- Concentric rings for score levels
- Axes for each security dimension
- Filled polygon showing relative strength (higher = safer)

Embed it:

```markdown
![Security Radar](security-radar.svg)
```

## What it measures (current axes)

| Axis     | What higher score means                          |
|----------|--------------------------------------------------|
| Secrets  | Fewer hardcoded keys / tokens                    |
| Debug    | Fewer debug leftovers that could leak data       |
| Auth     | Fewer unprotected-looking admin/internal routes  |
| Config   | Better .env / gitignore hygiene                  |
| Hygiene  | Overall lower risk density                       |

Scores are simple heuristics. They are intentionally lightweight so the radar is fast and local.

## Relationship to other tools

- **aiship**: focused readiness score + findings list for AI-generated code.
- **secradar**: visual multi-axis radar of the same class of issues.
- **SHIPSAFE** (Mac App Store): the full local scanner with 148 checks. This open-source radar does not replace it.

## Roadmap

- [ ] More precise rules per axis
- [ ] Custom axes via config
- [ ] Animation / sweep effect in SVG
- [ ] JSON output for CI
- [ ] Pre-commit + GitHub Action templates

## License

MIT © Ilyas Akbar Almadani

---

Built by [Ilyas Almadani](https://github.com/ilyasaalmadani). Visual open-source radar — the deep scanner stays in SHIPSAFE.
