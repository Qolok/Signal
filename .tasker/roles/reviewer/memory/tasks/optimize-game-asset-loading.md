<!-- [task-doc-auto:optimize-game-asset-loading] -->
# Reduce game asset payload and preload cost
_Auto-recorded on completion (2026-07-30T07:27:34.204Z)._

# Reduced game asset payload and preload cost

Recovered and integrated the verified asset-optimization work from the preserved Tasker worktree.

- Converted 145 tile PNGs to WebP and removed the superseded PNGs.
- Converted all remaining WAV audio to MP3 and removed the WAVs.
- Updated runtime, CSS, and Field Guide asset references.
- Startup preloading uses the small `_hex.webp` board assets; full tile art remains lazy-loaded.
- Measured tracked payload reduction: 501.37 MiB to 46.24 MiB (90.8%).
- Measured startup tile preload reduction: 150.39 MiB to 1.52 MiB (99.0%).
- Measured decoded preload memory reduction: 412.52 MiB to 21.29 MiB (94.8%).

Verification after integration:
- `node --check game.js` passed.
- `npm test` passed: 31/31 tests.
- `git diff --check` passed.
- 145 WebP tile assets, 0 tile PNGs, 52 MP3 files, and 0 WAV files remain.
