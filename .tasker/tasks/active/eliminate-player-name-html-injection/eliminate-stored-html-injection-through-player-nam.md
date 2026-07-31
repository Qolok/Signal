Implemented player-name injection hardening.

- Replaced the four player-choice `innerHTML` sinks with DOM nodes whose names and status text use `textContent`.
- Added shared 16-character player-name normalization and enum validation for colors and portraits.
- Normalized Firebase game state and lobby entries at receipt, including slot and portrait-index bounds.
- Escaped preserved local setup names when rebuilding the name input.
- Added hostile local/online name tests verifying markup stays text and remote style/image values fall back to allowed values.

Validation: `npm test` (21/21 passing), `node --check game.js`, `node --check game-logic.js`, and `git diff --check`.

Commit: `2992c9b Harden player identity rendering`