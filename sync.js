'use strict';
// ═══════════════════════════════════════════════════════════════════
// SIGNAL — Online Multiplayer Sync (Firebase Realtime Database)
// ═══════════════════════════════════════════════════════════════════
//
// FIRST-TIME SETUP:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (e.g. "signal-game")
// 3. Click "Add app" → Web → register the app
// 4. Copy your config values into FIREBASE_CONFIG below
// 5. In the Firebase console, go to Build → Realtime Database
// 6. Click "Create database" → choose a region → start in TEST MODE
//    (test mode allows read/write without auth — fine for friends)
//
// ═══════════════════════════════════════════════════════════════════

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyAmAEV8aSWmNC0euQo9nIjXRONAuAS0s64',
  authDomain:        'signal-serve.firebaseapp.com',
  databaseURL:       'https://signal-serve-default-rtdb.firebaseio.com',
  projectId:         'signal-serve',
  storageBucket:     'signal-serve.firebasestorage.app',
  messagingSenderId: '856688466444',
  appId:             '1:856688466444:web:22f65380f65c8412756c29',
};

// ── Internal state ──────────────────────────────────────────────────
const _clientId = (typeof crypto !== 'undefined' && crypto.randomUUID)
  ? crypto.randomUUID()
  : Math.random().toString(36).slice(2);

const SESSION_KEY = 'signal_mp_session';

let _db             = null;
let _gameRef        = null;
let _joinCode       = null;
let _myPlayerIndex  = null;
let _active         = false;
let _receivingState = false;
let _onStateUpdate  = null;

// ── Public API ──────────────────────────────────────────────────────
window.Sync = {

  isActive()      { return _active; },
  myPlayerIndex() { return _myPlayerIndex; },
  joinCode()      { return _joinCode; },
  isReceiving()   { return _receivingState; },

  // Call once on page load before using any other Sync method
  init() {
    if (typeof firebase === 'undefined') {
      console.error('Sync: Firebase SDK not loaded. Check your <script> tags.');
      return false;
    }
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.database();
    return true;
  },

  generateJoinCode() {
    // Excludes ambiguous characters: I, O, 0, 1
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  },

  // HOST: register a game room in Firebase and claim player slot 0
  async hostGame(joinCode) {
    _joinCode      = joinCode;
    _myPlayerIndex = 0;
    _active        = true;
    _gameRef       = _db.ref(`games/${joinCode}`);

    await _gameRef.child('meta').set({
      hostId:  _clientId,
      created: Date.now(),
      started: false,
    });
    await _gameRef.child('connections').child(_clientId).set(0);

    _saveSession();
    _startListening();
  },

  // JOIN: connect to an existing game and claim the next open slot (1–5)
  async joinGame(joinCode) {
    _joinCode = joinCode.toUpperCase().trim();
    _active   = true;
    _gameRef  = _db.ref(`games/${_joinCode}`);

    const metaSnap = await _gameRef.child('meta').once('value');
    if (!metaSnap.exists()) throw new Error('Game not found. Check the join code and try again.');

    const connSnap  = await _gameRef.child('connections').once('value');
    const takenSlots = Object.values(connSnap.val() || {});
    let slot = 1;
    while (takenSlots.includes(slot) && slot <= 5) slot++;
    if (slot > 5) throw new Error('Game is full (6 players maximum).');

    _myPlayerIndex = slot;
    await _gameRef.child('connections').child(_clientId).set(slot);

    _saveSession();
    _startListening();
    return slot;
  },

  // Called by saveGame() to broadcast the new state to all other players.
  // Only fires when it's this client's player turn, and never during reception.
  pushState(serializedState) {
    if (!_active || !_gameRef || _receivingState) return;
    // Prevent non-current-player browsers from writing (basic turn lock)
    if (typeof G !== 'undefined' && G && G.currentPlayer !== _myPlayerIndex) return;
    _gameRef.child('state').set({ ...serializedState, _source: _clientId });
  },

  // Register the callback that game.js calls with incoming remote state
  onStateUpdate(callback) {
    _onStateUpdate = callback;
  },

  // Returns the stored multiplayer session, or null if none
  restoreSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  // Re-attach to an existing Firebase room after a page reload
  async reconnect(joinCode, playerIndex) {
    _joinCode      = joinCode;
    _myPlayerIndex = playerIndex;
    _active        = true;
    _gameRef       = _db.ref(`games/${joinCode}`);
    await _gameRef.child('connections').child(_clientId).set(playerIndex);
    _startListening();
  },

  // Suppress echo push while applying incoming state (call before/after render)
  beginReceive() { _receivingState = true;  },
  endReceive()   { _receivingState = false; },

  // Write this client's lobby selection (portrait + name)
  updateLobbySlot(data) {
    if (!_active || !_gameRef) return;
    _gameRef.child('lobby').child(_clientId).set(data);
  },

  // Listen for any lobby change (fires immediately with current data)
  onLobbyUpdate(callback) {
    if (!_gameRef) return;
    _gameRef.child('lobby').on('value', snap => callback(snap.val() || {}));
  },

  // One-time read of the full lobby (used by host at launch)
  async getLobbyOnce() {
    const snap = await _gameRef.child('lobby').once('value');
    return snap.val() || {};
  },

  // Graceful leave: remove lobby + connection entries, then clear session
  async leaveLobby() {
    if (_gameRef) {
      try {
        await Promise.all([
          _gameRef.child('lobby').child(_clientId).remove(),
          _gameRef.child('connections').child(_clientId).remove(),
        ]);
      } catch(_) {}
      _gameRef.off();
      _gameRef = null;
    }
    localStorage.removeItem(SESSION_KEY);
    _active = false;
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
    _active = false;
    if (_gameRef) { _gameRef.off(); _gameRef = null; }
  },
};

// ── Private helpers ─────────────────────────────────────────────────

function _saveSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    joinCode:    _joinCode,
    playerIndex: _myPlayerIndex,
  }));
}

function _startListening() {
  if (!_gameRef) return;
  _gameRef.child('state').on('value', snap => {
    if (!snap.exists()) return;
    const data = snap.val();
    if (data._source === _clientId) return; // suppress our own echo
    if (_onStateUpdate) _onStateUpdate(data);
  });
}
