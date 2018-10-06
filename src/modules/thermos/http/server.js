const express = require('express');
const server = require('../../../http');
const apiBuilder = require('../lib/api');

const HOUR = 1000 * 60 * 60;
function historyPayload(end, duration, interval) {
  return {
    start: end - duration,
    end,
    interval: interval / 1000,
  };
}

function init(args) {
  const api = apiBuilder(args);
  const router = express.Router();
  // get status
  router.get('/status', (req, res) => res.json(api.status()));
  // get schedules
  router.get('/schedule', (req, res) => res.json(api.getSchedules()));
  // get history
  router.get('/history', async (req, res) => {
    const data = await api.history(historyPayload(Date.now(), HOUR * 36, HOUR));
    res.json(data);
  });

  server.use('/thermos', router);
}

module.exports = { init };
