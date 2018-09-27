const Server = require('mqtt-server');
const { mqtt: config } = require('../config');

module.exports = Server(config);
