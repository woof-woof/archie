const express = require('express');
const { http: config } = require('../config');

const server = express();
server.get('/ping', (req, res) => res.json({ success: true }));
// enable cors
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
server.listen(config.port, () => console.log(`Started http server on port ${config.port}!`));

module.exports = server;
