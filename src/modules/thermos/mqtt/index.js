const internal = require('./internal');
const server = require('./server');

function init(args) {
  internal(args);
  server(args);
}

module.exports = { init };
