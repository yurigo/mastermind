/**
 * history.js
 * Utilities for persisting and loading completed game snapshots in localStorage.
 */

const STORAGE_KEY = 'mastermind_history';

/**
 * Generates a unique identifier for a snapshot.
 * Uses crypto.randomUUID() when available; falls back to a timestamp-based id.
 *
 * @returns {string}
 */
function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Creates a snapshot of a completed game state.
 *
 * @param {{ secret: string[], attempts: object[], status: string }} state
 * @returns {object} snapshot
 */
export function createSnapshot(state) {
  return {
    id:           generateId(),
    date:         new Date().toISOString(),
    secret:       state.secret,
    attempts:     state.attempts,
    status:       state.status,
    attemptCount: state.attempts.length,
  };
}

/**
 * Appends a snapshot to the history stored in localStorage.
 * Silently ignores storage errors (e.g. private mode, quota exceeded).
 *
 * @param {object} snapshot
 */
export function saveSnapshot(snapshot) {
  const history = loadHistory();
  history.unshift(snapshot); // newest first
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage not available — fail silently
  }
}

/**
 * Loads all completed game snapshots from localStorage.
 * Returns an empty array if nothing is stored or parsing fails.
 *
 * @returns {object[]}
 */
export function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
