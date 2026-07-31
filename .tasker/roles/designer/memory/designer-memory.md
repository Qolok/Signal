# Designer Memory

*No entries yet.*

### optimize-game-asset-loading
**Title:** Reduce game asset payload and preload cost
**Tags:** Maintenance
**Summary:** The board renders getTileImg(t, "hex") → _hex.png in render(). The full-res art is used only by on-demand views — setTileHeroSprite(), tileImgHtml(), and the tooltip hero — which already fetch lazily when their element is displayed. So…
**Key decisions:** 
**Status:** ready
**Last updated:** 2026-07-29

