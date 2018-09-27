const CFG = require('../../../config');
const server = require('../../../mqtt');

function init() {
  server.sub(`${CFG.SERVER_TOPIC}/${CFG.ETOPIC_SCHEDULES}/get/in`, null, () => {});
  server.sub(`${CFG.SERVER_TOPIC}/${CFG.ETOPIC_SCHEDULES}/set/in`, `${CFG.SERVER_TOPIC}/${CFG.ETOPIC_SCHEDULES}/get/out`, () => {});
  server.sub(`${CFG.SERVER_TOPIC}/${CFG.ETOPIC_STATUS}/in`, null, () => {});
  server.res(`${CFG.SERVER_TOPIC}/${CFG.ETOPIC_HISTORY}/get/in`, () => {});
}

module.exports = init;
