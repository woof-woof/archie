const moment = require('moment');
const configParser = require('temperature-config-parser');
const config = require('../../../config');
const server = require('../../../mqtt');
const storage = require('../storage');

function init({ redux: { actions } }) {
  // heating handler
  function heatingHandler(message) {
    actions.updateHeating(
      parseInt(message, 10),
      moment().format(),
      configParser.getProgram(storage.schedule.getActive()),
    );
  }
  // temperature handler
  function temperatureHandler(message) {
    const response = JSON.parse(message);
    const { id, temperature, humidity, timestamp } = response;
    actions.updateSensors(id, { temperature, humidity, timestamp: moment(timestamp).format() });
  }
  // internal
  server.listen(`${config.TOPIC_HEATING}/out`, heatingHandler);
  server.listen(`${config.TOPIC_TEMPERATURE}/out`, temperatureHandler);
}

module.exports = init;
