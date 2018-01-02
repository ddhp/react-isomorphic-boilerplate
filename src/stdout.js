// import debug from 'debug'
const debug = require('debug');

// we can enable debug
// server side: DEBUG={namespace}*
// client side: localStorage.debug = '*' or 'namespace*'
// so better name your namespace to this structure
// YOUR_APP:YOUR_CURRENT_DEBUG_MODULE
export default function stdout(namespace) {
  const log = debug(`${namespace}:log`);
  /* eslint-disable no-console */
  log.log = console.log.bind(console);
  /* eslint-enable no-console */
  return log;
}
