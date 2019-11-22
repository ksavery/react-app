import { logLevels } from './constants';

const doNothing = () => {};

const logLevel = process.env.LOG_LEVEL || logLevels.silent;

const isLogging = level => logLevel !== logLevels.silent && (logLevel === level || logLevel === logLevels.debug);

const callLog = level => (isLogging(level) ? level : doNothing);

export { callLog, logLevel };
