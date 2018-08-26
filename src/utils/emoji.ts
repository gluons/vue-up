import figures from 'figures';

/**
 * CLI symbol for start state.
 */
export const start = figures.play;

/**
 * CLI symbol for progress state.
 */
export const progress = figures('⏳');

/**
 * CLI symbol for success state.
 */
export const success = figures.tick;

/**
 * CLI symbol for error state.
 */
export const error = figures.cross;

/**
 * CLI symbol for warning state.
 */
export const warning = figures.warning;
