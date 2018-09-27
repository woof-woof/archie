const store = require('./store');
const mqtt = require('./mqtt');
const history = require('./history');

function init(args) {
  mqtt.init(args);
  history.init(args);
}

module.exports = {
  name: 'thermos',
  init,
  store,
};
