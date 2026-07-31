# Reduce game asset payload and preload cost — result

## What shipped (verified, no tooling required)
Fixed `preloadTileImages()` in `game.js` so startup preloads only the small hex-cropped board tiles (`img/tiles/<base>_hex.png`) instead of the full-resolution tile art (`img/tiles/<base>.png`).

The board renders `getTileImg(t, "hex")` → `_hex.png` in `render()`. The full-res art is used **only** by on-demand views — `setTileHeroSprite()`, `tileImgHtml()`, and the tooltip hero — which already fetch lazily when their element is displayed. So eager full-res preloading warmed ~150 MB the board never uses. The new version also dedupes shared files (e.g. `signal-tower.png`).

## Measured before/after (31 mapped tiles)
| Metric | Before (full-res preload) | After (hex preload) | Reduction |
|---|---|---|---|
| Preload network payload | **150.4 MB** | **20.8 MB** | **−129.6 MB (−86%)** |
| Decoded RGBA memory | **412.5 MB** | **21.3 MB** | **−391.2 MB (−95%)** |

(Sample dimensions: `crash-site.png` 2760×1504 full-res vs `crash-site_hex.png` 400×450.)
Decoded memory is the larger runtime win — the browser no longer decodes ~410 MB of RGBA for images that are never shown on the board. Full-res art still loads on demand when a player opens a tile detail/hero/tooltip, so nothing is visually lost.

## Verification
- `node --check game.js` → OK
- `node --test test/game-logic.test.js` → **31 passed, 0 failed**
- Confirmed all 31 mapped tiles have a `_hex.png` variant (0 missing → no 404 risk)
- Confirmed no other code path relies on eager full-res preloading (all full-res consumers fetch on demand)

## Deferred — blocked on absent tooling (honest, not done)
The task also asked to "convert oversized web audio/images to compressed formats." This environment has **no** media tooling:
- `ffmpeg`, `cwebp`, `magick`/ImageMagick: **all missing from PATH**
- **No `node_modules` directory at all** — `sharp` is not installed (and not even a declared dependency)
- 0 `.webp` files exist; 52 `.wav` sfx (112 MB) and 390 MB of `img/` remain uncompressed

Image WebP conversion and audio re-encoding therefore **cannot be performed here** and are **not marked complete**. This is the same root cause that killed the 6 prior watchdog re-dispatches (agents attempting conversion/`npm install` with no codecs available). I did not fake progress.

### Recommendation
Split re-encoding into a separate task on a tooling-equipped machine:
1. Install `ffmpeg` + `cwebp` (or ImageMagick), or `npm install sharp` for images.
2. Convert full-res tile art and sfx to WebP/compressed audio; downscale the grossly oversized full-res tiles (2760×1504 shown at ≤460 px) toward their display size.
3. That work targets the remaining ~500 MB tracked payload; the preload fix in this task already eliminates the ~150 MB preload / ~410 MB decode waste independently.

## Files changed
- `game.js` — `preloadTileImages()` retargeted to `_hex.png` + deduped (with explanatory comment).