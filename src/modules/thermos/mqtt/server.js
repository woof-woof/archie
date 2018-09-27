const configParser = require('temperature-config-parser');
const config = require('../../../config');
const server = require('../../../mqtt');
const storage = require('../storage');
const { getHistory } = require('../storage/history/repo');

function init({ redux: { state: getState } }) {
  function getSchedules() {
    return JSON.stringify(storage.schedule.getAll());
  }

  function setSchedules(message) {
    const schedules = JSON.parse(message);
    Object.entries(schedules).forEach(([id, schedule]) => storage.schedule.set(id, schedule));
    return JSON.stringify(storage.schedule.getAll());
  }

  function status() {
    const state = getState();
    return JSON.stringify({
      ...state.thermos,
      program: configParser.getProgram(storage.schedule.getActive()),
    });
  }

  function history({ start, end, interval }) {
    return getHistory(start, end, interval);
  }

  server.sub(`${config.SERVER_TOPIC}/${config.ETOPIC_SCHEDULES}/get/in`, null, getSchedules);
  server.sub(`${config.SERVER_TOPIC}/${config.ETOPIC_SCHEDULES}/set/in`, `${config.SERVER_TOPIC}/${config.ETOPIC_SCHEDULES}/get/out`, setSchedules);
  server.sub(`${config.SERVER_TOPIC}/${config.ETOPIC_STATUS}/in`, null, status);
  server.res(`${config.SERVER_TOPIC}/${config.ETOPIC_HISTORY}/get/in`, history);
}

module.exports = init;
