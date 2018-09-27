const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'archie' });
module.exports = log;
