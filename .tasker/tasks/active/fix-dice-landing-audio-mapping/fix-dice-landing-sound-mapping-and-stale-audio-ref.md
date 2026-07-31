## Summary

Fixed two problems in the `sfx()` sound map in `game.js`:

1. **Missing `dice_land` mapping** — `sfx("dice_land")` is called after every dice-roll animation finishes (movement/table dice, single-die rolls, and multi-die event rolls — 4 call sites total in the current file). The `picks` map had no `dice_land` key, so `sfx()` silently returned early (`if (!v) return;`) and no landing sound ever played. Added:
   ```js
   dice_land: "plink.wav",
   ```
   `plink.wav` exists in `sfx/` and was otherwise unused, and its short percussive character fits a dice-landing cue (distinct from the roll/rattle sound `dice.wav` already used for `dice_roll`).

2. **Stale/nonexistent `heal` mapping** — `heal: "base-medbay.wav"` pointed at a file that does not exist anywhere in `sfx/` (confirmed via directory listing and HTTP 404 against a local static server). `sfx("heal")` is not currently called anywhere in the code, so this was dead but broken — if it were ever wired up it would throw a network 404 and fail silently. Replaced it with the existing, semantically-equivalent `health-up.wav` (same file already used for the `health_up` sound):
   ```js
   heal: "health-up.wav",
   ```

### Diff (`game.js`)
```diff
     dice_roll: "dice.wav",
+    dice_land: "plink.wav",
     move: "pop.wav",
     card: ["card1.wav", "card2.wav", "card3.wav", "card4.wav"],
     equip: "base-equip.wav",
     damage: "shock.wav",
-    heal: "base-medbay.wav",
+    heal: "health-up.wav",
```

## Verification

- `node --check game.js` — passes, no syntax errors introduced.
- Programmatically enumerated every value in the `picks` map (including array variants like `card`) and confirmed each resolves to a file that exists under `sfx/` — all pass, no missing assets remain.
- Confirmed `base-medbay.wav` is no longer referenced anywhere in `game.js` (`grep` returns no matches).
- Started a local static file server and verified over HTTP: `sfx/plink.wav` → 200, `sfx/health-up.wav` → 200, `sfx/base-medbay.wav` → 404 (and is now unreferenced, so it will never be requested by the app).
- Confirmed all 4 `sfx("dice_land")` call sites (movement/table dice roller, single-die roller, multi-die event roller, and the signal/nest-site die roll) resolve through the same fixed map entry, so movement, signal, and event dice all play one consistent landing sound (`plink.wav`) with no console/network errors.

Note: no headless-browser/Playwright tooling was available in this environment to capture a live console log, so verification was done via syntax check + full static-file-existence audit + live HTTP fetch of the affected assets, which covers the failure mode described in the task (404s / silent no-ops from missing sfx mappings).