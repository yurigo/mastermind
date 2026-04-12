/**
 * mastermind.js
 * Core game logic for Mastermind — pure functions, no side effects.
 */

// ─── Constants ───────────────────────────────────────────────────────────────

export const COLORS = [
  { id: 'red',    label: 'Rojo',    bg: '#ef4444' },
  { id: 'blue',   label: 'Azul',    bg: '#3b82f6' },
  { id: 'green',  label: 'Verde',   bg: '#22c55e' },
  { id: 'yellow', label: 'Amarillo',bg: '#eab308' },
  { id: 'purple', label: 'Morado',  bg: '#a855f7' },
  { id: 'orange', label: 'Naranja', bg: '#f97316' },
];

export const CODE_LENGTH   = 4;
export const MAX_ATTEMPTS  = 10;

// ─── Secret generation ───────────────────────────────────────────────────────

/**
 * Returns a random secret combination of `CODE_LENGTH` color ids.
 */
export function generateSecret() {
  return Array.from({ length: CODE_LENGTH }, () =>
    COLORS[Math.floor(Math.random() * COLORS.length)].id
  );
}

// ─── Attempt evaluation ──────────────────────────────────────────────────────

/**
 * Evaluates a guess against the secret.
 *
 * @param {string[]} secret  – array of color ids (length CODE_LENGTH)
 * @param {string[]} guess   – array of color ids (length CODE_LENGTH)
 * @returns {{ exact: number, partial: number }}
 *   exact   = correct color in correct position (black peg)
 *   partial = correct color in wrong position   (white peg)
 */
export function evaluateGuess(secret, guess) {
  let exact   = 0;
  let partial = 0;

  const secretRemaining = [];
  const guessRemaining  = [];

  // First pass: count exact matches
  for (let i = 0; i < CODE_LENGTH; i++) {
    if (secret[i] === guess[i]) {
      exact++;
    } else {
      secretRemaining.push(secret[i]);
      guessRemaining.push(guess[i]);
    }
  }

  // Second pass: count partial matches (color exists but wrong position)
  for (const color of guessRemaining) {
    const idx = secretRemaining.indexOf(color);
    if (idx !== -1) {
      partial++;
      secretRemaining.splice(idx, 1); // consume so it's not counted twice
    }
  }

  return { exact, partial };
}

// ─── Game state ──────────────────────────────────────────────────────────────

/**
 * Creates a fresh game state object.
 */
export function createInitialState() {
  return {
    secret:   generateSecret(),
    attempts: [],       // [{ guess: string[], exact: number, partial: number }]
    status:   'playing', // 'playing' | 'won' | 'lost'
  };
}

/**
 * Submits a guess, updates state, and returns new state (immutable pattern).
 *
 * @param {object} state  – current game state
 * @param {string[]} guess – array of color ids
 * @returns {object} new state
 */
export function submitGuess(state, guess) {
  if (state.status !== 'playing') return state;
  if (guess.length !== CODE_LENGTH) return state;

  const result  = evaluateGuess(state.secret, guess);
  const attempts = [...state.attempts, { guess, ...result }];

  let status = 'playing';
  if (result.exact === CODE_LENGTH) {
    status = 'won';
  } else if (attempts.length >= MAX_ATTEMPTS) {
    status = 'lost';
  }

  return { ...state, attempts, status };
}
