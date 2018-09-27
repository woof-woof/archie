const express = require('express');
const { http: config } = require('../config');

const server = express();
server.get('/ping', (req, res) => res.json({ success: true }));
server.listen(config.port, () => console.log(`Started http server on port ${config.port}!`));

module.exports = server;
