## Content-Security-Policy and security headers — added and reconciled

Defense-in-depth for the served game is in place. The earlier `write_conflict` was resolved via the **persist-then-reapply** path: the dependency task committed the in-review working tree first, and this task's CSP work was reapplied cleanly onto the new committed baseline. Exactly one real conflict existed (the lobby join-code input); it was resolved per Reviewer guidance.

### What changed

**1. Strict CSP (no `unsafe-inline` for scripts)** — delivered two ways:
- `<meta http-equiv="Content-Security-Policy">` in `index.html` (covers the directives a meta tag can carry).
- HTTP headers in `serve.json` (read by `npx serve`, the project's `npm start`), which additionally carry `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy`.

Final policy:
```
default-src 'self';
script-src 'self' https://www.gstatic.com https://cdn.jsdelivr.net https://www.google.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
media-src 'self';
connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://signal-serve.firebaseapp.com;
frame-src 'self' https://www.google.com;
object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

**2. Removed all inline event-handler attributes** so `script-src` needs no `'unsafe-inline'`:
- `index.html`: every `onclick`/`onchange`/`oninput`/`onkeydown` attribute → `data-action` / `data-change` / `data-input` / `data-keydown`.
- `game.js`: inline handlers inside generated HTML strings (trade modal `trAdj`, portrait pickers `cyclePortrait`, online lobby `onlineToggleReady` / `_onlineNameChange`) → `data-action` + `data-args`.
- New `ui-events.js` does event delegation, dispatching `data-*` intents to the existing global functions (looked up on `window` at dispatch time). Wrappers added for handlers that read `this`/`event` (`upperCaseInput`, `lobbyJoinEnter`, `toggleSynthFromEl`, `rbSearchFromEl`).
- Note: existing `el.onclick = fn` DOM-property assignments in `game.js` are **CSP-safe** (they run from an allowed external script) and were left as-is.

### Enumerated external origins (why each is allowed)
| Origin | Directive | Used by |
|---|---|---|
| `www.gstatic.com` | script-src | Firebase compat SDKs (app/app-check/auth/database 10.12.0) + reCAPTCHA assets |
| `cdn.jsdelivr.net` | script-src | `marked` markdown renderer |
| `www.google.com` | script-src, frame-src | reCAPTCHA v3 (Firebase App Check) script + challenge iframe |
| `*.googleapis.com` | connect-src | Firebase Auth / Installations / App Check |
| `*.firebaseio.com` (https + wss) | connect-src | Realtime Database (`signal-serve-default-rtdb`) |
| `signal-serve.firebaseapp.com` | connect-src | Firebase auth domain |
| self | img/media/font-src | all art (WebP), audio (MP3), favicon are same-origin |

reCAPTCHA origins are included because `firebase-app-check-compat` is loaded and `docs/FirebaseSetup.md` mandates App Check in production; the site key is currently a placeholder, so App Check is a no-op in this build but the policy won't break online multiplayer once a real reCAPTCHA v3 key is set.

### Conflict resolution (lobby join-code input)
Kept the CSP refactor (`data-input="upperCaseInput"`, `data-keydown="lobbyJoinEnter"`) and **discarded** this task's stale `maxlength="6"`/`placeholder="ABC123"`, using the baseline's correct `maxlength="8"`/`placeholder="ABCD2345"` — matching `sync.js` `JOIN_CODE_LENGTH = 8` and the 8-char validation in `game.js`. The delegated `lobbyJoinEnter`/`upperCaseInput` wiring lands in `ui-events.js`, so Enter-to-join and auto-uppercase keep working.

### Verification
- **Static audit:** no inline `on*="..."` attributes remain in `index.html`/`game.js`/`sync.js`/`game-logic.js`; no `javascript:` URIs; no inline `<script>` blocks (all `<script src>` are external and allow-listed).
- **Delegation wiring:** all 45 `data-*` handler names resolve to a defined global function.
- **Tests:** `node --test test/game-logic.test.js` → 36 passed, 0 failed.
- **Runtime smoke test:** started `npm start` (`npx serve`); `GET /` returns all five security headers, `index.html` and `ui-events.js` both serve `200`. Firebase/marked/reCAPTCHA script origins, Realtime DB connect/wss, and same-origin audio/art are all permitted by the policy.

### Files
- `index.html` — CSP meta tag + `data-*` handlers + `ui-events.js` include; conflict resolved.
- `game.js` — inline handlers in HTML strings → `data-action`/`data-args`.
- `serve.json` (new) — CSP + security headers for `serve`.
- `ui-events.js` (new) — CSP-safe event delegation.

Changes are staged in the task worktree for snapshot; no self-commit was made (commits require explicit approval).