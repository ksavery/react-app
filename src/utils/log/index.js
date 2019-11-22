/* eslint-disable no-console */
import { error, info, warn } from './constants';
import { callLog, logLevel } from './logger';

const log = {
  error: callLog(error),
  info: callLog(info),
  warn: callLog(warn),
};

export { log, logLevel };
