const config = require('../../../config');
const server = require('../../../mqtt');
const apiBuilder = require('../lib/api');

function init(args) {
  const api = apiBuilder(args);
  // Get schedules
  server.sub(
    `${config.SERVER_TOPIC}/${config.ETOPIC_SCHEDULES}/get/in`,
    null,
    () => JSON.stringify(api.getSchedules()),
  );
  // Set schedules
  server.sub(
    `${config.SERVER_TOPIC}/${config.ETOPIC_SCHEDULES}/set/in`,
    `${config.SERVER_TOPIC}/${config.ETOPIC_SCHEDULES}/get/out`,
    message => JSON.stringify(api.setSchedules(message)),
  );
  // Get status
  server.sub(
    `${config.SERVER_TOPIC}/${config.ETOPIC_STATUS}/in`,
    null,
    () => JSON.stringify(api.status()),
  );
  // Get history
  server.res(
    `${config.SERVER_TOPIC}/${config.ETOPIC_HISTORY}/get/in`,
    api.history,
  );
}

module.exports = init;
