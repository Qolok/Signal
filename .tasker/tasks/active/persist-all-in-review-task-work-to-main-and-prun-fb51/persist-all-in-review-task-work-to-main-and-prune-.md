## Persisted all in-review work to `main` and pruned stale worktrees

All previously-uncommitted in-review output on `main` (9 modified files, 195 new WebP/MP3 assets, 195 deleted PNG/WAV, plus 6 new untracked files) is now committed in four coherent, reviewable chunks. Nothing was lost; `.tasker/` board data was deliberately left untracked and never staged.

### Commits (on `main`, atop baseline `18f94d7`)
1. `6d07e7a` **chore(assets): convert art to WebP and audio to MP3** — add 145 `img/**.webp` + 50 `sfx/*.mp3`, remove 145 PNG + 50 WAV, update `style.css` and `docs/FieldGuide.md` references.
2. `d28f6cf` **test: add deterministic game-logic module and Node test harness** — new `game-logic.js` (shared `SignalGameLogic` module), `test/game-logic.test.js` (31 tests), `test/database-rules.test.js`, `package.json`/`package-lock.json` (test + rules dev-deps and scripts), `README.md`, and `index.html` wiring (loads `game-logic.js` + `firebase-auth-compat`).
3. `d8be371` **fix(game): logic and security fixes, use shared rules module** — `game.js` routes turn-ownership, incapacitation/death, inversion-field swaps, event-deck building and identity normalization through `game-logic.js`, and points art/audio at the WebP/MP3 assets.
4. `3ce27f0` **feat(firebase): lock down Realtime Database with auth-gated rules** — `sync.js` (anonymous auth, presence + onDisconnect cleanup, serialized/transactional writes, owner-private state, room TTL), `database.rules.json` (default-deny, auth-gated, slot/host/TTL validation), `firebase.json`, `docs/FirebaseSetup.md`, and `.gitignore` (emulator debug logs).

### Verification
- `npm test` → **31 passing / 0 failing** against the committed tree.
- `git status` clean except the intentionally-untracked `.tasker/`.
- `git fsck` reports no errors.
- Asset references resolve: `style.css`, `game.js`, `index.html`, `docs/FieldGuide.md` point only to committed files. Remaining `.png` references are the intentionally-kept `img/crew/*.png` portraits and `img/screens/*` (not part of the conversion), all tracked.

### Worktree / branch pruning
- Removed all **16** stale `optimize-game-asset-loading-*` (14) and `update-vulnerable-dev-dependencies-*` (2) worktrees and force-deleted their branches. Their only commits were auto-generated `Tasker dispatch baseline` / `isolated snapshot` scaffolding (old pre-conversion state), not deliverables — the real task output is what is now committed on `main`.
- `git worktree prune` run; `git worktree list` now shows only `main` and this task's own worktree. No `optimize`/`update` branches remain.
- One leftover **empty** directory (`optimize-game-asset-loading-e7c1d13af7627a4f`, its `.git` link already broken before removal) could not be deleted from disk — Windows reports it busy (OS handle lock). It is de-registered and holds no data; it can be removed once the lock clears. Two out-of-scope `fix-dice-landing-audio-mapping-*` directories (never registered worktrees) were left untouched.

No in-review task should be signed off elsewhere until its corresponding work above is confirmed; all such work is now committed.