## Summary
Resolved the npm audit high-severity findings introduced through `serve` that had a compatible fix, and documented the one that does not.

## Changes
- `package-lock.json` updated (no `package.json` range changes needed — `serve@^14.2.6` already resolves to the latest published `serve`):
  - `fast-uri`: `3.1.0` → `3.1.4` (via `serve → ajv@8.18.0 → fast-uri@^3.0.1`). This fully resolves **GHSA-hhrq-c6r8-9cr2** (fast-uri, high). Confirmed via `npm audit`: `fast-uri` no longer appears in the report.
  - `brace-expansion`: `1.1.13` → `1.1.16` (via `serve → serve-handler@6.1.7 → minimatch@3.1.5 → brace-expansion@^1.1.7`). This resolves **GHSA-3jxr-9vmj-r5cp** (ReDoS on consecutive non-expanding `{}` groups, high).
  - Applied with `npm audit fix` (no `--force`, no semver-major changes), then verified by re-running `npm audit`.

## Advisory that could not be removed (documented per task instructions)
- **GHSA-mh99-v99m-4gvg** — brace-expansion: DoS via unbounded expansion length (high, CVSS 7.5) — remains open in the `serve → serve-handler@6.1.7 → minimatch@3.1.5 → brace-expansion` chain.
  - **Why it can't be fixed compatibly:** the registry's advisory data marks *every* brace-expansion release `<=5.0.7` as vulnerable to this specific issue — only `5.0.8+` is patched, and no 1.x/2.x/3.x/4.x version was backported. `serve@14.2.6` (already the latest published `serve`) pins `serve-handler` to the exact version `6.1.7` (also latest), which itself pins `minimatch` to the exact version `3.1.5`, which requires `brace-expansion@^1.1.7` — there is no newer 1.x release to move to.
  - **Why an override is unsafe:** `brace-expansion@5.0.8` changed its module shape from a directly-callable function (`module.exports = expand`) to an object (`{ expand, EXPANSION_MAX, ... }`). `minimatch@3.1.5` calls `require('brace-expansion')(pattern)` directly, so forcing an `overrides` entry to `5.0.8` would silently break `minimatch`'s pattern matching inside `serve-handler`/`serve` (risking `npm start`'s static file serving) rather than fix anything — verified by unpacking both packages and inspecting their CommonJS entry points.
  - **Path to resolution:** requires an upstream release of `serve`/`serve-handler` that bumps its `minimatch` dependency to `>=10.2.6` (the first minimatch release whose `brace-expansion` dependency itself reaches `^5.0.8`). This is outside the repo's control; re-run `npm audit` periodically (or on future `serve` bumps) to check if it's been fixed upstream.
  - Note: `npm audit` also still lists this same brace-expansion advisory against unrelated nested copies under `firebase-tools`' own dependency tree (`glob`, `readdir-glob`, `superstatic`) and various other `firebase-tools`-only findings (archiver, exegesis, gaxios, uuid, etc.). These were **not** introduced through `serve` and are out of scope per the task description; a full fix would require `firebase-tools@14.23.0` (a semver-major downgrade from the currently pinned `^15.24.0`), which was not applied.

## Verification
- `npm audit`: `fast-uri` no longer present; `brace-expansion` reduced to only the one unfixable advisory (GHSA-mh99-v99m-4gvg) described above; overall count dropped from 22 to 21 vulnerabilities (3 moderate / 18 high, all pre-existing/out-of-scope `firebase-tools` findings plus the one documented brace-expansion advisory).
- `npm test`: all 31 tests pass (`node --test test/game-logic.test.js`).
- `npm start`: started `serve` on port 3000; verified HTTP 200 responses for `/`, `/game.js`, `/style.css`, and `/game-logic.js`, confirming the game is still served correctly. Server process stopped afterward.
