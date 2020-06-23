const { createClient } = require('redis');
const { promisify } = require('util');

const client = createClient();

const _redis = ['get', 'incr', 'flushdb', 'zrevrange', 'zincrby'].reduce((acc, key)=> {
  acc[key] = promisify(client[key]).bind(client);
  return acc;
}, {});

module.exports = _redis; 
