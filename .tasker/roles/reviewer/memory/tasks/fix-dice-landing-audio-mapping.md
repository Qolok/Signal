<!-- [task-doc-auto:fix-dice-landing-audio-mapping] -->
# Fix dice landing sound mapping and stale audio reference
_Auto-recorded on completion (2026-07-29T02:58:45.203Z)._

## Result: Already fixed in the dispatched baseline — verified, no code change needed

The issues described were already resolved by the commit `6b9a6ce` ("Tasker dispatch baseline for fix-dice-landing-audio-mapping"), which is the current HEAD of this worktree. I verified the fix rather than re-applying it:

**1. `sfx("dice_land")` mapping — present**
`game.js:25` in the `picks` map inside `function sfx(name)`:
```js
dice_roll: "dice.wav",
dice_land: "plink.wav",
```
`sfx/plink.wav` exists on disk and serves with HTTP 200 (confirmed via a local `serve` instance).

**2. Stale `base-medbay.wav` reference — removed**
The old `heal: "base-medbay.wav"` entry (pointing at a nonexistent file — confirmed 404) has been replaced with `heal: "health-up.wav"`, which exists in `sfx/`. No remaining references to `base-medbay.wav` anywhere in `game.js`, `game-logic.js`, or `sync.js`.

**3. Movement / signal / event dice each play exactly one landing sound**
Traced every `sfx("dice_land")` call site relevant to these three dice types — each fires exactly once, inside the roll animation's `setTimeout`, after the corresponding single `sfx("dice_roll")`:
- Movement dice: `rollTableDice()` (`game.js:2852`, mode `"move"`).
- Signal/contest dice: the 3-die contest roll (`game.js:1990`) and the generic multi-die roller used by contests (`game.js:7226`).
- Event-card dice: the event card roll callback (`game.js:7325`).

**4. No missing audio assets / no 404 risk**
Extracted all 38 unique `"*.wav"/"*.mp3"` string literals referenced in `game.js` and diffed against the contents of `sfx/` — zero missing files.

**5. Sanity checks**
- `node --check game.js` — syntax OK.
- Served the app locally and spot-checked `sfx/plink.wav` (200), `sfx/health-up.wav` (200), and confirmed `sfx/base-medbay.wav` correctly 404s and is unreferenced.

**Working tree:** clean, no diff from HEAD — no commit was needed since the fix already exists in the dispatched baseline.

**Note (out of scope, not touched):** several *other* dice rolls unrelated to movement/signal/event (e.g. Ship Section, Cache, Nest Site, Temporal Rift, and the tech-destroy contest roll) call `sfx("dice_roll")` but never call `sfx("dice_land")` after their roll animation. This wasn't part of the described task scope (which named movement, signal, and event dice specifically), so I left it alone — flagging in case a follow-up task is wanted.
