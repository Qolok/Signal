'use strict';
// ═══════════════════════════════════════════════════════════════════
// SIGNAL — CSP-safe UI event delegation
// ═══════════════════════════════════════════════════════════════════
//
// The Content-Security-Policy served with this game uses a strict
// `script-src` with NO `'unsafe-inline'`, which blocks inline event-handler
// attributes (onclick, onchange, ...). To keep behaviour identical without
// inline handlers, markup declares its intent with data-* attributes and this
// module dispatches to the corresponding global function via delegation:
//
//   <button data-action="fnName">              → fnName()
//   <button data-action="fnName" data-args='["x",-1]'> → fnName("x", -1)
//   <input  data-change="fnName">              → fnName()   on "change"
//   <input  data-input="fnName">               → fnName()   on "input"
//   <input  data-keydown="fnName">             → fnName(event) on "keydown"
//
// Functions are looked up on `window` at dispatch time, so this file may load
// before or after the scripts that define them.
// ═══════════════════════════════════════════════════════════════════

(function () {
  function parseArgs(el) {
    const raw = el.getAttribute('data-args');
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (_) {
      return [];
    }
  }

  function invoke(el, name, extraArgs) {
    const fn = window[name];
    if (typeof fn !== 'function') return;
    fn.apply(el, extraArgs || parseArgs(el));
  }

  // Click delegation — skip disabled controls (native buttons already suppress
  // their own click, but delegation could otherwise match a disabled ancestor).
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-action]');
    if (el && !el.disabled) invoke(el, el.getAttribute('data-action'));
  });

  document.addEventListener('change', function (e) {
    const el = e.target.closest('[data-change]');
    if (el) invoke(el, el.getAttribute('data-change'));
  });

  document.addEventListener('input', function (e) {
    const el = e.target.closest('[data-input]');
    if (el) invoke(el, el.getAttribute('data-input'));
  });

  document.addEventListener('keydown', function (e) {
    const el = e.target.closest('[data-keydown]');
    if (el) invoke(el, el.getAttribute('data-keydown'), [e]);
  });

  // ── Wrappers for handlers that previously read `this`/`event` inline ──
  // (defined globally so delegation can resolve them by name)
  window.upperCaseInput = function () {
    this.value = this.value.toUpperCase();
  };
  window.lobbyJoinEnter = function (e) {
    if (e.key === 'Enter' && typeof window.lobbyJoinConnect === 'function') {
      window.lobbyJoinConnect();
    }
  };
  window.toggleSynthFromEl = function () {
    if (typeof window.toggleSynth === 'function') window.toggleSynth(this.checked);
  };
  window.rbSearchFromEl = function () {
    if (typeof window.rbSearch === 'function') window.rbSearch(this.value);
  };
})();
