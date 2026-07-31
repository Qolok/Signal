## Added CI to run game-logic and Firebase rules tests on every push

Created a GitHub Actions workflow that runs the full test suite on every push and pull request, and documented the badge plus how to reproduce the checks locally.

### Files changed

- **`.github/workflows/ci.yml`** (new) — CI workflow.
- **`README.md`** — added the CI badge and a local-checks section.

### Workflow (`.github/workflows/ci.yml`)

Triggers on `push` and `pull_request`. Single `ubuntu-latest` job with least-privilege `permissions: contents: read`:

1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 20, npm cache keyed off `package-lock.json`)
3. `actions/setup-java@v4` (Temurin JDK 17) — the Firebase Realtime Database emulator is a Java process
4. `npm ci`
5. `npm test` — game-logic regression suite (**blocking**)
6. `npm run test:rules` — Firebase database rules suite against the emulator (**blocking**)
7. `npm audit` — **reported, non-blocking** via `continue-on-error: true`

Test failures fail the build; the audit step surfaces advisories without blocking.

### README documentation

- Added a status badge linking to the workflow: `https://github.com/Qolok/Signal/actions/workflows/ci.yml/badge.svg`.
- Documented the local equivalents (`npm ci`, `npm test`, `npm run test:rules`, `npm audit`) and noted that `test:rules` boots the emulator and needs a JDK 17+ on PATH but no live Firebase project.

### Verification (run locally in this worktree)

- `npm ci` → 782 packages installed, **0 vulnerabilities**.
- `npm test` → **31/31 pass**.
- `npm run test:rules` → emulator booted, **9/9 pass**, script exited code 0. This closes the review gap that `test:rules` had never been executed end-to-end.
- Workflow YAML parsed successfully: triggers `push`/`pull_request`; steps in order; `npm audit` confirmed `continue-on-error: true`.

Note: `node_modules/` created by `npm ci` is already covered by `.gitignore` and is not part of the change set.