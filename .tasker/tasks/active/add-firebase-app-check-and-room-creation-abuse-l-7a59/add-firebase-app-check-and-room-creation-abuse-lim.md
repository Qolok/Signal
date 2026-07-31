# Firebase App Check + room-creation abuse limits

Added client attestation and per-uid room-creation abuse controls to the Signal
multiplayer stack, hardened room codes, enforced expiry pruning, documented the
setup, and added emulator rule tests. All unit tests (31) and emulator rule
tests (12) pass.

## What changed

### 1. Firebase App Check (attestation)
- **`index.html`** — loads `firebase-app-check-compat.js` alongside the other
  Firebase SDKs.
- **`sync.js`** — `Sync.init()` now calls `_activateAppCheck()` right after
  `initializeApp` and before authentication. It activates the **reCAPTCHA v3**
  provider using a public site key (`APP_CHECK_RECAPTCHA_SITE_KEY`, placeholder
  to be filled per deployment) with automatic token refresh. If the SDK or key
  is absent it logs a warning and continues, so local play still works.
- Enforcement itself is a console setting (App Check → Realtime Database →
  Enforced); documented, including the `localhost` debug-token flow. The
  `@firebase/rules-unit-testing` emulator does not evaluate App Check, so rule
  tests are unaffected.

### 2. Per-uid room-creation rate limit (rules-enforced)
- **`database.rules.json`** — new top-level `hosts/$uid/lastCreated` throttle
  token that a uid may advance at most once every **15 s**
  (`newData.val() >= data.val() + 15000`). The `games/$code/meta` create branch
  now requires that the *same atomic write* set `hosts/$uid/lastCreated` equal to
  `meta.created`, so room creation and the throttle commit or fail together —
  a uid cannot reuse a stale token to create many rooms.
- **`sync.js`** — `hostGame()` now writes room meta and the throttle token in one
  root-level multi-path `update()`. Constant `ROOM_CREATE_MIN_INTERVAL_MS`
  mirrors the rules value.

### 3. Expiry pruning enforcement
- **`database.rules.json`** — a `$code`-level `.write` permits any authenticated
  client to delete a whole room **only once it has expired**
  (`!newData.exists() && meta/expiresAt <= now`); live rooms still cannot be
  deleted wholesale.
- **`sync.js`** — `joinGame()` and `reconnect()` opportunistically prune (delete)
  an expired room they land on via `_pruneExpiredRoom()`. A scheduled trusted job
  (Admin SDK Cloud Function) is still documented for rooms no client revisits.

### 4. Higher-entropy room codes
- **`sync.js`** — `generateJoinCode()` now draws an **8-character** code (was 6)
  from the 32-symbol unambiguous alphabet using the **Web Crypto CSPRNG**
  (`crypto.getRandomValues`) instead of `Math.random()`. That is ~40 bits
  (32^8 ≈ 1.1×10^12) of unpredictable entropy, making enumeration through the
  auth-gated `meta` read rule impractical. Falls back to `Math.random` only where
  Web Crypto is unavailable. The 32-symbol alphabet divides 256 evenly, so
  `byte % 32` is unbiased (no rejection sampling needed).
- **`index.html`** / **`game.js`** — join-code input `maxlength`, placeholder,
  code display, and the length validation updated from 6 to 8 characters.

### 5. Documentation
- **`docs/FirebaseSetup.md`** — new **App Check** section (reCAPTCHA v3 provider,
  public site key vs. secret, enforcement toggle, localhost debug token) and an
  **Abuse controls** section (rate limit + code entropy), plus an updated
  **Expiry and pruning** section describing the rule-permitted client deletion of
  expired rooms and the scheduled cleanup for the rest.

### 6. Tests
- **`test/database-rules.test.js`** — 3 new emulator tests:
  - room creation requires a matching per-uid throttle token (meta-only writes
    and mismatched tokens are rejected; the correct atomic write succeeds);
  - room creation is rate-limited to one per 15 s per uid, is independent across
    uids, and one uid cannot advance another's token;
  - expired rooms may be pruned by any authenticated client while live rooms
    cannot.
- **`test/game-logic.test.js`** — updated the obsolete
  "rejects an expired room without client-side deletion" test to assert the new
  intended behavior: joining an expired room rejects **and** prunes it.

## Verification
- `npm test` → **31 passed, 0 failed**.
- `npm run test:rules` (Firebase database emulator, Java) → **12 passed,
  0 failed** (the `permission_denied` log lines are the expected `assertFails`
  cases).

## Deployment notes / follow-ups (require console/project access, out of repo scope)
- Register the web app under **App Check** with reCAPTCHA v3, put the real site
  key in `APP_CHECK_RECAPTCHA_SITE_KEY`, and switch RTDB enforcement to
  **Enforced** after confirming attestation metrics.
- Deploy the updated rules (`npm run deploy:rules`) and client together — the new
  `hosts/$uid` coupling means an old client (single meta write) can no longer
  create rooms.
- Add a scheduled Admin SDK cleanup to delete expired `/games` children and stale
  `hosts/$uid` tokens that no client revisits.
- The 15 s interval and 8-char code length are tunable constants (`sync.js` +
  `database.rules.json` must stay in sync for the interval).
