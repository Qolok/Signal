## CSP reviewer defect resolved

Self-hosted the pinned **marked 13.0.3** browser build and removed the origin-wide jsDelivr allowance from both CSP delivery paths.

### Changes

- `index.html`
  - Loads `vendor/marked-13.0.3.min.js` from `'self'`.
  - Removes `https://cdn.jsdelivr.net` from `script-src`.
  - Updates the external-origin inventory to identify marked as a same-origin vendored dependency.
- `serve.json`
  - Removes `https://cdn.jsdelivr.net` from the HTTP `Content-Security-Policy` header.
  - Retains `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `X-Frame-Options: DENY`, and `Permissions-Policy`.
- `vendor/marked-13.0.3.min.js`
  - Exact pinned MIT-licensed browser build from the `marked@13.0.3` npm package.
  - SHA-256: `5ADEA7D8EE41A700FCCC14BB9D503104F0470CC17A84AD3E167D3F5251EAE0DA`.
- `vendor/marked-13.0.3.LICENSE.md`
  - Upstream license retained beside the vendored build.

### Allowed origins after the fix

- Scripts: `'self'`, `https://www.gstatic.com` (pinned Firebase compat SDKs and App Check), `https://www.google.com` (reCAPTCHA).
- Connections: `'self'`, `https://*.googleapis.com`, `https://*.firebaseio.com`, `wss://*.firebaseio.com`, `https://signal-serve.firebaseapp.com`.
- Frames: `'self'`, `https://www.google.com`.
- Images: `'self'` and `data:`; fonts, media/audio: `'self'`.
- Objects are disabled and base/form targets remain restricted to `'self'`.

### Verification

- `npm test`: **39 passed, 0 failed**, including multiplayer join, reconnect, synchronization, sanitization, and privacy paths.
- JavaScript syntax checks passed for `game.js`, `sync.js`, and `ui-events.js`.
- Vendored marked build evaluated in a clean VM context and rendered Markdown successfully.
- Static audit passed: no jsDelivr references, inline `on*` attributes, or `unsafe-inline` script allowance remain.
- Live `serve` check:
  - `/`: `200` with the expected CSP and security headers.
  - `/vendor/marked-13.0.3.min.js`: `200 application/javascript`.
  - `/sfx/activate.mp3`: `200 audio/mpeg`.
  - `/sync.js`: `200 application/javascript`; Firebase HTTPS/WSS origins remain allowed by the active policy.
- `git diff --check` passed.

The temporary validation server was stopped. Changes remain uncommitted in the isolated task worktree for Tasker snapshot/review.