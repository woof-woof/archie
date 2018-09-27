const config = require('../../config');
const { logState } = require('./storage/history/repo');

function init({ redux: { state } }) {
  setInterval(() => logState(state().thermos), config.STATE_LOG_INTERVAL * 1000);
}

module.exports = { init };
