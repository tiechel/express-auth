const NODE_ENV = process.env.NODE_ENV || 'development';

const default_config = require('./default.json');
const env_config = require(`./${NODE_ENV}.json`);

module.exports = {
  ...default_config,
  ...env_config,
};
