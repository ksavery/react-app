/* eslint-disable no-console */
const logLevels = {
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  silent: 'silent',
};

// Console Coloring for logging
const error = message => console.error(message);
const info = message => console.info(message);
const warn = message => console.warn(message);

export { logLevels, error, info, warn };
