require('dotenv').config();

module.exports = {
  mqtt: {
    hostname: `mqtt://${process.env.MQTT_HOST || 'localhost'}`,
    options: {
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASS,
    },
  },
  http: {
    port: process.env.HTTP_PORT || 3000,
  },
  SERVER_TOPIC: process.env.SERVER_TOPIC || 'thermos',
  ETOPIC_SCHEDULES: process.env.ETOPIC_SCHEDULES || 'schedules',
  ETOPIC_STATUS: process.env.ETOPIC_STATUS || 'status',
  ETOPIC_HISTORY: process.env.ETOPIC_HISTORY || 'history',
  TOPIC_TEMPERATURE: process.env.TOPIC_TEMPERATURE || 'sensors/temperature',
  TOPIC_HEATING: process.env.TOPIC_HEATING || '/heating',
  STATE_LOG_INTERVAL: process.env.STATE_LOG_INTERVAL
    ? parseInt(process.env.STATE_LOG_INTERVAL, 10) : 600, // 10 minutes
};
