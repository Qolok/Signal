(function (root, factory) {
  const logic = factory();
  if (typeof module === "object" && module.exports) module.exports = logic;
  else root.SignalGameLogic = logic;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function firebaseArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return Object.keys(value)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => value[key]);
  }

  function playerName(value, fallback = "Crew") {
    const fallbackName =
      typeof fallback === "string" && fallback.trim() ? fallback.trim() : "Crew";
    if (typeof value !== "string" || !value.trim())
      return Array.from(fallbackName).slice(0, 16).join("");
    return Array.from(value.trim()).slice(0, 16).join("");
  }

  function enumeratedValue(value, allowed, fallback) {
    return allowed.includes(value) ? value : fallback;
  }

  function normalizePlayerIdentities(game, colors, portraits) {
    if (!game?.players) return game;
    game.players.forEach((player, index) => {
      const synth = player.isSynth === true;
      const fallbackPortrait = synth
        ? "iris"
        : portraits[index % portraits.length];
      const fallbackColor = synth
        ? colors[colors.length - 1]
        : colors[index % (colors.length - 1)];
      player.name = playerName(player.name, synth ? "IRIS" : fallbackPortrait);
      player.portrait = enumeratedValue(
        player.portrait,
        portraits,
        fallbackPortrait,
      );
      player.color = enumeratedValue(player.color, colors, fallbackColor);
    });
    return game;
  }

  function normalizeSavedGame(saved) {
    const game = saved.G;
    game.tiles = new Map(Object.entries(game.tiles || {}));
    game.reach = new Map();
    game.terrainDeck = firebaseArray(game.terrainDeck);
    game.eqDeck = firebaseArray(game.eqDeck);
    game.evtDeck = firebaseArray(game.evtDeck);
    game.players = firebaseArray(game.players).map((player) => ({
      ...player,
      equipment: firebaseArray(player.equipment),
    }));
    return saved;
  }

  function isTurnOwner({ online, active, playerIndex, currentPlayer }) {
    return !online || !active || playerIndex === currentPlayer;
  }

  function canWriteState(context) {
    const currentPlayer = context.writerTurnOwner ?? context.currentPlayer;
    const hostControlsSynth =
      context.online &&
      context.active &&
      context.writerIsSynth &&
      context.playerIndex === 0;
    return (
      !context.receiving &&
      (hostControlsSynth || isTurnOwner({ ...context, currentPlayer }))
    );
  }

  function controllingPlayerIndex(players, currentPlayer) {
    return players[currentPlayer]?.isSynth ? 0 : currentPlayer;
  }

  function ownsPrivateCard({ online, active, playerIndex, currentPlayer, cardPlayerIndex }) {
    return (online && active ? playerIndex : currentPlayer) === cardPlayerIndex;
  }

  const PRIVATE_PLAYER_DEFAULTS = {
    soloRescueActive: false,
    rfExtractionActive: false,
    signalArrayRounds: 0,
  };
  const PRIVATE_PLAYER_FIELDS = Object.keys(PRIVATE_PLAYER_DEFAULTS);

  function publicGameState(game) {
    return {
      ...game,
      evtDeck: [],
      players: game.players.map((player) => {
        const publicPlayer = {
          ...player,
          equipment: player.equipment.filter((card) => !card.eventCard),
        };
        for (const field of PRIVATE_PLAYER_FIELDS) delete publicPlayer[field];
        return publicPlayer;
      }),
    };
  }

  function privateGameState(game, ownerIndex) {
    const player = game.players[ownerIndex];
    if (!player) return { ownerIndex, evtDeck: [...game.evtDeck] };
    const privatePlayer = {
      equipment: player.equipment.filter((card) => !!card.eventCard),
    };
    for (const field of PRIVATE_PLAYER_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(player, field))
        privatePlayer[field] = player[field];
    }
    return { ownerIndex, evtDeck: [...game.evtDeck], player: privatePlayer };
  }

  function mergePrivateGameState(game, secret, existingGame, ownerIndex) {
    if (secret?.ownerIndex !== ownerIndex) secret = null;
    const existingPlayer = existingGame?.players?.[ownerIndex];
    const secretPlayer = secret?.player;
    const player = game.players[ownerIndex];
    if (player) {
      const hasSecretCards =
        secretPlayer &&
        Object.prototype.hasOwnProperty.call(secretPlayer, "equipment");
      const privateCards = hasSecretCards
        ? firebaseArray(secretPlayer.equipment)
        : (existingPlayer?.equipment || []).filter((card) => !!card.eventCard);
      player.equipment = [
        ...player.equipment.filter((card) => !card.eventCard),
        ...privateCards,
      ];
      for (const field of PRIVATE_PLAYER_FIELDS) {
        if (
          secretPlayer &&
          Object.prototype.hasOwnProperty.call(secretPlayer, field)
        )
          player[field] = secretPlayer[field];
        else if (
          existingPlayer &&
          Object.prototype.hasOwnProperty.call(existingPlayer, field)
        )
          player[field] = existingPlayer[field];
        else player[field] = PRIVATE_PLAYER_DEFAULTS[field];
      }
    }
    if (secret && Object.prototype.hasOwnProperty.call(secret, "evtDeck"))
      game.evtDeck = firebaseArray(secret.evtDeck);
    else if (existingGame?.evtDeck?.length) game.evtDeck = existingGame.evtDeck;
    return game;
  }

  function eventDeckComposition(deck) {
    return deck.reduce(
      (result, card) => {
        result.total++;
        result[card.pub ? "public" : "private"]++;
        if (card.irisCorruption) result.irisThreat++;
        return result;
      },
      { total: 0, public: 0, private: 0, irisThreat: 0 },
    );
  }

  function expectedEventDeckComposition(withSynth, humanPlayerCount) {
    const irisThreat = withSynth ? 2 : 0;
    if (humanPlayerCount === 1)
      return { total: 51, public: 51, private: 0, irisThreat };
    return { total: 80, public: 51, private: 29, irisThreat };
  }

  function incapacitationAfterSkippedTurn(player) {
    if (!player.alive || player.isSynth || player.health !== 0)
      return { skipped: false, died: false, incapacitated: player.incapacitated };
    const incapacitated = (player.incapacitated || 0) + 1;
    return { skipped: true, died: incapacitated >= 2, incapacitated };
  }

  function nextLivingPlayer(players, currentPlayer) {
    let next = (currentPlayer + 1) % players.length;
    let tries = 0;
    while (!players[next].alive && tries++ < players.length)
      next = (next + 1) % players.length;
    return next;
  }

  // Inversion Field is mandatory: the acting player must swap Food with a
  // chosen crew member and neither side may decline (docs/FieldGuide.md).
  // Both the first-landing and repeat/anomaly resolution paths in game.js
  // share this logic so the rule can't drift out of sync between them.
  function inversionFieldTargets(players, actingPlayerId) {
    return players.filter(
      (player) => player.alive && player.id !== actingPlayerId,
    );
  }

  function swapFood(playerA, playerB) {
    const tmp = playerA.food;
    playerA.food = playerB.food;
    playerB.food = tmp;
  }

  return {
    firebaseArray,
    playerName,
    enumeratedValue,
    normalizePlayerIdentities,
    normalizeSavedGame,
    isTurnOwner,
    canWriteState,
    controllingPlayerIndex,
    ownsPrivateCard,
    publicGameState,
    privateGameState,
    mergePrivateGameState,
    eventDeckComposition,
    expectedEventDeckComposition,
    incapacitationAfterSkippedTurn,
    nextLivingPlayer,
    inversionFieldTargets,
    swapFood,
  };
});
