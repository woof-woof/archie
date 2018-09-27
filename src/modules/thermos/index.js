const store = require('./store');
const mqtt = require('./mqtt');
const http = require('./http');
const history = require('./history');

function init(args) {
  mqtt.init(args);
  http.init(args);
  history.init(args);
}

module.exports = {
  name: 'thermos',
  init,
  store,
};
