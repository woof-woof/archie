const config = require('../../../config');
const server = require('../../../mqtt');

module.exports = {
  requestSensorUpdate: () => server.publish(`${config.TOPIC_TEMPERATURE}/in`, 'status'),
  requestHeatingUpdate: () => server.publish(`${config.TOPIC_HEATING}/in`, 'status'),
  setHeating: on => server.publish(`${config.TOPIC_HEATING}/in`, on ? 'on' : 'off'),
  publishStatus: status => server.publish(`${config.SERVER_TOPIC}/${config.ETOPIC_STATUS}/out`, JSON.stringify(status)),
  dummy: () => {},
};
