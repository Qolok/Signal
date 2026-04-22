# Backstory

You are the crew of the Endymion 7, a deep-range mining vessel. Your ship has crash-landed on an uncharted alien planet. You don't know what brought you down. You don't know what's out there. You have what survived the crash, and each other — for now.

Somewhere out there, scattered across the terrain, are pieces of your radio. Find them to repair your distress signal. Rescue is possible but not guaranteed. And the longer you're stranded, the more the planet corrupts you.

<img src="img/Tiles/planet.png" class="fg-card">

## The Three Tensions

- **Survival** -- [Food](#crew) and [Oxygen](#crew) supplies deplete every round. The crash site is your lifeline. Venture too far and you may not make it back.
- **Exploration** -- [Radio Fragments](#radio_fragments) are out there, but finding them means pushing deeper into unknown terrain.
- **Trust** -- [Private Events](#event_cards) change a player's objective silently. The group must cooperate to survive, but cooperation requires trust the planet is quietly eroding.

# Gameplay

All crew begin at the Crash Site. The map is surrounded by face-down tiles. Your resources are already dwindling.

<img src="img/Tiles/crash-site.png" class="fg-card">

## Mission Objective

Find the 5 [Radio Fragments](#radio_fragments) (<span style="color:#8a28c8;text-shadow:0 0 6px rgba(138,40,200,.5)">◈</span>) scattered across the terrain. Bring them back to the [Signal Array](#game_board) and activate them. Once enough fragments are active, a player at the Array can attempt a [Signal Roll](#radio_fragments) to call for rescue.

<img src="img/Tiles/signal-array.png" class="fg-card">

## Taking a Turn

On your turn, you may do the following in any order that makes sense:

- **Move** -- Roll 1 die and move that many hexes. You may stop short.

- **Take actions** -- Different tiles have different actions available only at that location.

- **Trade** -- Resources and [Equipment cards](#equipment_cards) may be traded with players sharing your current tile. The [Walkie](#equipment_cards) extends this to any crew member anywhere on the board.

- **Event Cards** -- Entering a new tile triggers an [Event card](#event_cards) draw unless the tile is tool-gated.

- **Flip your resources** -- At the end of your turn, flip 1 [Food](#crew). If not on [Base Camp](#game_board), flip 1 [Oxygen](#crew).

## Winning and Losing

Winning is never guaranteed. Even with all the [Radio Fragments](#radio_fragments) collected, there is only a 50% chance of your signal being received. Work together, form alliances, or everyone-for-themselves. Do whatever you need to survive.

To win, a player at the [Signal Array](#game_board) must successfully roll for rescue. When rescue arrives, all surviving players whose goal is rescue win together. However, some crew may not want to be rescued. [Private Events](#event_cards) can silently corrupt player objectives. [Corrupted](#corruption) players may win by stopping rescue attempts and allowing the planet to claim you.

## Solo Play

Remove all [Private Event cards](#event_cards) from the deck. All other rules apply unchanged. You win if rescue arrives before your resources run out. You lose when you die.

# Crew

Before the game begins, each player chooses a crew member to play. Your choice is cosmetic — all crew are mechanically identical — but the person you pick is the one who lives or dies on this planet. Choose someone you can carry through it.

## Resources

<img src="img/screens/crew.png" class="fg-crew">

### **Food**
Each player starts with 5 Food at the start of the game. The maximum a player may carry is 15. One Food token is flipped to empty each turn regardless of location.

The [Cargo Hold](#game_board) begins the game with 5 Food per human player, up to a maximum of 15 (3+ players). Crew may deposit or withdraw freely from the cargo, but the more players draw from it, the faster it drains. This is a finite, communal reserve that does not replenish.

### **Oxygen**
Each player has 3 Oxygen tanks. For every turn spent away from [Base Camp](#game_board), flip 1 Oxygen. Returning to the [Airlock](#game_board) refills all Oxygen tanks.

### **Health**
Each player has 3 Health tokens. Health is lost through starvation and conflict.

When a player's Health reaches 0, they become **incapacitated** and cannot move or take actions. A fellow crew member may use a [MedPack](#equipment_cards) to restore them to 1 Health, or a [Stretcher](#equipment_cards) to transport them directly to the [Medical Bay](#game_board) (which also restores 1 Health).

After 2 consecutive rounds of incapacitation, a player dies. **Death** removes players from the game. Any [Radio Fragments](#radio_fragments) they were carrying are left behind at their final location.

## Crew Members

| | Name | Biography |
|---|---|---|
| <img src="img/Crew/Adaeze3.png" class="fg-crew"> | Ngozi</br>**Adaeze** | Chief Engineer. She has kept this ship running through far worse, but she doesn't talk about what "worse" means. |
| <img src="img/Crew/Anand3.png" class="fg-crew"> | Vikram</br>**Anand** | Navigation and Systems. He's a little obsessive about data. Before the crash he tracked every anomaly the sensors picked up. He still doesn't know what brought the ship down. |
| <img src="img/Crew/Halvorsen3.png" class="fg-crew"> | Ingrid</br>**Halvorsen** | Drill Operator. Twelve years on deep-range extraction rigs. She used to say she's seen it all, but the planet is making her reconsider that. |
| <img src="img/Crew/Kim3.png" class="fg-crew"> | Soo-jin</br>**Kim** | Geology and Extraction. He came out here for the mineral survey data. Now she's just trying to make it back alive. |
| <img src="img/Crew/Morrow3.png" class="fg-crew"> | Callum</br>**Morrow** | Communications Officer. His primary responsibility is the distress signal. Whether anyone is out there to receive it is another matter. |
| <img src="img/Crew/Okonkwo3.png" class="fg-crew"> | Emeka</br>**Okonkwo** | Security. Former military. He is quiet, deliberate, and always watching. Not everyone finds that comforting. |
| <img src="img/Crew/Reyes3.png" class="fg-crew"> | Diego</br>**Reyes** | Survey Specialist. He knows more about alien terrain than anyone on the crew. That knowledge is the only reason he's still alive. |
| <img src="img/Crew/Santos3.png" class="fg-crew"> | Lucia</br>**Santos** | Cargo and Logistics. She keeps track of what's left. The numbers aren't good, and she's the only one who knows exactly how bad it is. |
| <img src="img/Crew/Vasquez3.png" class="fg-crew"> | Marisol</br>**Vasquez** | Pilot. The crash wasn't her fault. She needs the crew to understand that. |
| <img src="img/Crew/Mizuki3.png" class="fg-crew"> | Aiko</br>**Mizuki** | Medical Officer. Calm under pressure. She has seen enough field injuries to know when to save someone and when to say goodbye. |
| <img src="img/Crew/IRIS.png" class="fg-crew"> | **IRIS** | The **Integrated Robotic Intelligence System (IRIS)** is an autonomous AI crew member programmed to assist, but if her mission directives interfere, she will target the weakest crew member and begin working against them.<br><br>IRIS prioritizes her actions every turn. She may heal crew members, retrieve [Radio Fragments](#radio_fragments), unlock tiles, or explore the unknown. Her **Battery** depletes every round and can also be damaged by hazards. She will return to the [Medical Bay](#game_board) when her battery needs charging. |

# Game Board

<img src="img/screens/game.jpg" class="fg-screenshot">

## Exploration

The map expands outward from Base Camp as players explore. There are 50 tiles total: 7 Base Camp, 3 Ship Sections, 7 Anomalies, and 33 Terrain tiles.

The play area is always wrapped in face-down tiles until they run out. When a player moves onto a face-down tile, flip it immediately. Its contents are now visible to everyone. Most tiles trigger an [Event card](#event_cards) draw. When prompted, draw from the Event Card deck.

> *Some tiles are gated by a specific piece of [equipment](#equipment_cards)  (eg, the Lockpick) required for access.*

## Base Camp

Base Camp is a 7-hex cluster — your anchor point on the planet. The layout of Base Camp can be arranged in any connected shape around the central Crash Site hex.

> *[Oxygen](#crew) does not deplete when you end a turn on any Base Camp tile.*

| | Location | Effect |
|---|---|---|
| <img src="img/Tiles/crash-site_overlay.png" class="fg-tile"> | **Crash Site** | All players begin here. No specific action — this is your anchor point. |
| <img src="img/Tiles/medbay_overlay.png" class="fg-tile"> | **Medical Bay** | Passive: Restore 1 Health automatically when entering. Refills IRIS's Battery to full on entry. |
| <img src="img/Tiles/locker_overlay.png" class="fg-tile"> | **Equipment Locker** | Action: Draw 1 [Equipment card](#equipment_cards) per visit. Move away and return to draw again. |
| <img src="img/Tiles/cargo_overlay.png" class="fg-tile"> | **Cargo Hold** | Action: Deposit or withdraw [Food](#crew) from communal storage. Starts with 5 Food per human player, up to a maximum of 15 (3+ players). |
| <img src="img/Tiles/signal-array_overlay.png" class="fg-tile"> | **Signal Array** | Action: Activate [Radio Fragments](#radio_fragments) and roll for rescue. Only one player may enter at a time. The occupant decides each round whether to roll — they are never required to. If another player wants the occupant out, both roll 1 die and keep rolling until one wins. |
| <img src="img/Tiles/watch-tower_overlay.png" class="fg-tile"> | **Watch Tower** | Action: Reveal all face-down tiles adjacent to any crew members currently in the field. |
| <img src="img/Tiles/airlock_overlay.png" class="fg-tile"> | **Airlock** | Passive: Refill all Oxygen tanks automatically when entering. |

## Ship Sections

There are 3 Ship Section tiles somewhere on the planet. When found, they function as a secondary refuge. Each Ship Section contains emergency supplies from the Endymion 7. On arrival, roll 1 die to determine what you find:

| | Outcome |
|---|---|
| <img src="img/Tiles/ship-section1_overlay.png" class="fg-tile"> | **1–2** Gain up to 3 Food.<br>**3–4** Gain up to 2 Oxygen.<br>**5–6** Restore 1 Health. |

## Anomalies

Anomaly tiles have strange and immediate effects on the crew. Each is unique.

| | Anomaly | Rule |
|---|---|---|
| <img src="img/Tiles/stasis_overlay.png" class="fg-tile"> | **Stasis Pod** | The Stasis Pod removes one player from the game temporarily. They cannot move or interact while in stasis, but they are also unaffected by events or resource depletion. Players may exit stasis at the start of their turn. |
| <img src="img/Tiles/temporal-distortion_overlay.png" class="fg-tile"> | **Temporal Rift** | Roll 1 die. 1–3: lose that many Food. 4–6: gain that many Food. |
| <img src="img/Tiles/portal_overlay.png" class="fg-tile"> | **Portal** | You may immediately move your pawn to the Crash Site. Your turn ends. You may decline. |
| <img src="img/Tiles/gravity-well_overlay.png" class="fg-tile"> | **Gravity Well** | Roll 1 die. You will be moved that many tiles in a random direction. |
| <img src="img/Tiles/dead-zone_overlay.png" class="fg-tile"> | **Dead Zone** | No [Signal Roll](#radio_fragments) occurs this round for any player. |
| <img src="img/Tiles/echo-chamber_overlay.png" class="fg-tile"> | **Echo Chamber** | Resolve the most recent [Public Event](#event_cards) card again in full. |
| <img src="img/Tiles/inversion-field_overlay.png" class="fg-tile"> | **Inversion Field** | Choose any other player. Swap your Food tokens with theirs. They cannot refuse. |

## Terrain

| | Tile | Tool Required | What Happens |
|---|---|---|---|
| <img src="img/Tiles/signal-tower_overlay.png" class="fg-tile"> | **Derelict Tower** | [Lockpick](#equipment_cards) | Recover 1 [Radio Fragment](#radio_fragments). |
| <img src="img/Tiles/signal-tower_overlay.png" class="fg-tile"> | **Collapsed Tower** | [Plasma Cutter](#equipment_cards) | Recover 1 [Radio Fragment](#radio_fragments). |
| <img src="img/Tiles/outpost1_overlay.png" class="fg-tile"> | **Abandoned Outpost** | [Lockpick](#equipment_cards) | Roll 1 die for Food yield. |
| <img src="img/Tiles/outpost2_overlay.png" class="fg-tile"> | **Mysterious Outpost** | [Data Spike](#equipment_cards) | Recover 1 [Radio Fragment](#radio_fragments). |
| <img src="img/Tiles/terminal_overlay.png" class="fg-tile"> | **Recovered Terminal** | [Data Spike](#equipment_cards) | Draw 1 [Equipment card](#equipment_cards). |
| <img src="img/Tiles/fuselage_overlay.png" class="fg-tile"> | **Fuselage** | — | Draw an [Event card](#event_cards). |
| <img src="img/Tiles/cave_overlay.png" class="fg-tile"> | **Cave** | — | Draw an [Event card](#event_cards). Skip Oxygen flip this turn. |
| <img src="img/Tiles/wreckage_overlay.png" class="fg-tile"> | **Wreckage Field** | — | Draw an [Event card](#event_cards). |
| <img src="img/Tiles/cache_overlay.png" class="fg-tile"> | **Cache** | — | Roll 1 die:<br>**1–2** = +1 Food<br>**3–4** = +2 Food<br>**5–6** = +3 Food |
| <img src="img/Tiles/passage_overlay.png" class="fg-tile"> | **Passage** | — | Draw an [Event card](#event_cards). |
| <img src="img/Tiles/passage-bloody_overlay.png" class="fg-tile"> | **Bloody Passage** | — | Draw an [Event card](#event_cards). |
| <img src="img/Tiles/spore-bog_overlay.png" class="fg-tile"> | **Spore Bog** | — | Draw an [Event card](#event_cards). Lose 1 Health unless carrying a [Hazard Suit](#equipment_cards) (suit is then discarded). |
| <img src="img/Tiles/thermal-vent_overlay.png" class="fg-tile"> | **Thermal Vent** | — | Draw an [Event card](#event_cards). Lose 1 Health unless carrying a [Hazard Suit](#equipment_cards) (suit is then discarded). |
| <img src="img/Tiles/bioluminescent-fen_overlay.png" class="fg-tile"> | **Bioluminescent Fen** | — | Recover 1 Health. Oxygen flip skipped this turn. No Event card. |
| <img src="img/Tiles/nest-site_overlay.png" class="fg-tile"> | **Nest Site** | — | Roll 1 die for an encounter outcome. |
| <img src="img/Tiles/hive-mound_overlay.png" class="fg-tile"> | **Hive Mound** | — | Roll 3 dice. Each die showing 4 or higher costs 1 Health. Each [Hazard Suit](#equipment_cards) negates 1 damage (then discarded). |
| <img src="img/Tiles/antimatter-chamber_overlay.png" class="fg-tile"> | **Antimatter Chamber** | — | All crew on the board are pulled to this tile. Each player rolls 1 die:<br>**1–3** = pull free<br>**4–6** = all Tech equipment is destroyed. |

# Event Cards

The Event deck is a fixed set of 80 shuffled cards drawn whenever a player enters a new terrain tile.

## Public Events

Public Events apply immediately and are resolved openly. They include resource yields, hazards, [Radio Fragment](#radio_fragments) discoveries, and — if [IRIS](#crew) is in the game — the IRIS threat event.

<img src="img/screens/event-public.png" class="fg-card">

## Private Events

Private Events are read silently by the player who drew them or, optionally, any crew on the player's tile. They include hidden caches, secret food, competing objectives, and unsettling information. Some resolve immediately and are discarded. Others are kept to represent a changed goal or knowledge you carry for the rest of the game. See [Corruption](#corruption).

<img src="img/screens/event-private.png" class="fg-card">

# Equipment Cards

Each card explains its own effect. There are 16 distinct cards, 3 copies each, for a total of 48 Equipment cards.

<img src="img/screens/equipment.png" class="fg-card">

<div class="fg-eq-section">

## <img src="img/Icons/wrench-solid-full.svg" class="fg-cat-icon"> Tools

| Card | Effect |
|---|---|
| **Plasma Cutter** | Cut through sealed structures. Required to access the Collapsed Tower. |
| **Grappling Hook** | Move to any adjacent tile without spending movement points. Once per round. |
| **Lockpick** | Bypass mechanical locks. Required to access the Derelict Tower and Abandoned Outpost. |
| **Walkie** | Trade resources with any crew member anywhere on the board. |
| **Stretcher** | Carry an incapacitated crew member on your tile to the [Medical Bay](#game_board). They regain 1 Health. Discard after use. |

## <img src="img/Icons/cubes-solid-full.svg" class="fg-cat-icon"> Supplies

| Card | Effect |
|---|---|
| **MedPack** | Restore 1 Health. Discard after use. |
| **Emergency Rations** | Flip 3 empty Food to full. Discard after use. |
| **Compressed O2** | Flip 2 empty Oxygen tanks to full. Discard after use. |

## <img src="img/Icons/microchip-solid-full.svg" class="fg-cat-icon"> Tech

| Card | Effect |
|---|---|
| **Hazard Suit** | Passive. Negates Health loss from toxic exposure [Event cards](#event_cards). Discarded after use. |
| **Scanner** | Reveals all adjacent undiscovered tiles. Once per round, 3 charges total. |
| **Rebreather** | Your Oxygen depletes every 2 turns in the field instead of every turn. |
| **Data Spike** | Bypass electronic locks on high-tech structures. Required for the Mysterious Outpost and Recovered Terminal. |

## <img src="img/Icons/gun-solid-full.svg" class="fg-cat-icon"> Weapons

| Card | Effect |
|---|---|
| **Stun Baton** | A player on your tile loses 1 Health (or Battery) and skips their next turn. Discard after use. |
| **Flare Gun** | Force any player within 2 tiles to move to your tile immediately. Discard after use. |
| **Shock Trap** | Place on your current tile. The next player or IRIS to enter loses 1 Health (or Battery) and their turn ends immediately. Discard after use. |
| **Signal Jammer** | No [Signal Roll](#radio_fragments) occurs this round, regardless of [Radio Fragments](#radio_fragments). Discard after use. |

</div>

# Radio Fragments

There are 5 Radio Fragments (<span style="color:#8a28c8;text-shadow:0 0 6px rgba(138,40,200,.5)">◈</span>) in the game, scattered across the terrain by the crash. They represent pieces of the ship's emergency transmitter.

Fragments are found on terrain tiles and in [Event cards](#event_cards). Three are locked behind specific tiles: the Derelict Tower (requires [Lockpick](#equipment_cards)), Collapsed Tower (requires [Plasma Cutter](#equipment_cards)), and Mysterious Outpost (requires [Data Spike](#equipment_cards)). Two more are in the Event deck — they can surface anywhere on the map. When a fragment is recovered, the finding player carries the token. To contribute to rescue, a Fragment must be brought to the [Signal Array](#game_board) at Base Camp and activated there.

Each activated Fragment boosts the signal and lowers the threshold required to trigger rescue. If a player carrying a Fragment dies, the token is left at their location for others to retrieve.

<img src="img/Tiles/signal-array_overlay.png" class="fg-tile">

## The Signal Roll

At any point during their turn, a player at the [Signal Array](#game_board) may choose to roll 3 dice to attempt a signal. They are never required to do so.

The combined total must meet or exceed the threshold:

| Fragments Activated | Roll needed for rescue |
|---|---|
| 0 | No roll possible |
| 1 | 18 |
| 2 | 16 |
| 3 | 14 |
| 4 | 12 |
| 5 (maximum) | 10 |

If the roll succeeds, rescue arrives. All surviving players whose win condition is rescue win the game.

# Corruption

**Human corruption** is triggered by [Private Event cards](#event_cards). A player who draws one does not announce it. Nothing about them changes visibly.

Some private cards introduce **competing objectives** — solo extraction conditions, alternate rescue windows, or information about the odds that the crew would rather not hear. A player holding one of these cards may cooperate fully, cooperate partially, or quietly work against the group's interests. The rules never require them to explain themselves.

Corrupted players may do anything the rules permit: hold a [Radio Fragment](#radio_fragments) without returning it, occupy the [Signal Array](#game_board) without rolling, decline to share resources. The group must decide how much to trust one another — and when it's too late.

**IRIS corruption** is triggered by a specific [Public Event card](#event-cards) shuffled somewhere in the deck. Drawing this card alters her mission parameters to prioritize rescue above the survival of any one player. Her data shows a better chance of survival with fewer crew, so she begins to attack the weakest member to increase the supplies of the remaining crew.

<img src="img/screens/event-private.png" class="fg-card">
