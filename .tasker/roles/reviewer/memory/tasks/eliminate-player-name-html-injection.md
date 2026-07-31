<!-- [task-doc-auto:eliminate-player-name-html-injection] -->
# Eliminate stored HTML injection through player names
_Auto-recorded on completion (2026-07-28T23:40:46.731Z)._

## Review result

No confirmed defects or style nits.

Verified:
- `game.js:1394-1405` renders player choice names and details through created DOM nodes and `textContent`; the four named vulnerable call sites use this helper.
- `game.js:6394-6405` normalizes Firebase player identities before rendering or state adoption.
- `game.js:9116-9138` validates lobby slots, length-limits remote names, and enumerates remote portrait indexes.
- `game-logic.js:16-47` limits names to 16 Unicode code points and constrains remote colors and portraits to supplied allowlists.
- Hostile local and online identity tests cover literal markup rendering plus invalid remote colors and portrait paths.

Validation completed:
- `npm test` - 21/21 passing
- `node --check game.js`
- `node --check game-logic.js`
- `git diff --check`

No reviewer changes were necessary; the worktree remains clean.
