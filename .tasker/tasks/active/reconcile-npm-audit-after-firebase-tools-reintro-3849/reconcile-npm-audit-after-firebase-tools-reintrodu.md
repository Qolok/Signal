# Reconcile npm audit after firebase-tools reintroduced vulnerabilities

## Result: `npm audit` is now CLEAN — 0 vulnerabilities (was 21: 18 high, 3 moderate)

firebase-tools@15 stays on its current line (15.24.0). No downgrade, no regression of the harden-firebase-access-control work.

## Root cause

All 21 advisories traced to just three transitive packages pulled in by `firebase-tools@15` (dev-only tooling):

| Root advisory | Severity | Fan-out | Notes |
|---|---|---|---|
| `brace-expansion` <=5.0.7 (ReDoS/DoS) | high | 18 highs via minimatch → glob → rimraf/archiver/serve-handler/superstatic/exegesis/gaxios/... | The reintroduced chain |
| `uuid` <11.1.1 (buffer bounds check) | moderate | 1 | via firebase-tools |
| `@opentelemetry/core` <2.8.0 (unbounded memory alloc) | moderate | 1 | via @google-cloud/pubsub |

`npm audit fix` (non-breaking) resolved **nothing**; `npm audit fix --force` only offered a breaking **downgrade to firebase-tools@14.23.0** — unacceptable, since it reverses the access-control hardening.

## Fix applied

There is no patched `firebase-tools` release, so the three offending transitive packages are pinned to their patched versions via `overrides` in `package.json`:

```json
"overrides": {
  "brace-expansion": "5.0.9",
  "uuid": "11.1.1",
  "@opentelemetry/core": "2.8.0"
}
```

`brace-expansion@5.0.9` is an API-stable drop-in (single `expand()` export) and sits above every advisory range; 5.0.9 was required because 1.1.12 was still flagged by a second advisory (needs >=1.1.16).

## Verification (all green with overrides applied)

- `npm audit` → **found 0 vulnerabilities**
- `npm test` → **31 pass, 0 fail**
- `npm run test:rules` (real Firebase database emulator on Java 21) → **9 pass, 0 fail**, emulator started and shut down cleanly — confirms firebase-tools tooling is fully intact
- `npm start` (`serve`) → boots, returns **HTTP 200**
- `firebase --version` → **15.24.0** (not downgraded)
- Resolved override versions confirmed: brace-expansion 5.0.9, uuid 11.1.1, @opentelemetry/core 2.8.0

## Documentation

Added a **Dependencies & Security** section to `README.md` explaining: the game ships no npm deps to the browser (static `index.html`/`game.js`/`game-logic.js`/`sync.js`/`style.css`); the npm packages are dev-only tooling (serve, firebase-tools, rules-unit-testing); why the overrides exist; and that they can be removed once firebase-tools adopts the patched versions natively. This restores the honesty of the board’s "audit clean" claim.

## Files changed

- `package.json` — added `overrides` block
- `package-lock.json` — regenerated (patched transitive versions)
- `README.md` — new Dependencies & Security section
